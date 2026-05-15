import { spawn } from "node:child_process";

const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const cdpPort = Number(process.env.CDP_PORT || Math.floor(9300 + Math.random() * 500));
const startAppPort = process.env.START_APP_PORT;
const appUrl = process.env.APP_URL || (startAppPort ? `http://localhost:${startAppPort}` : "http://localhost:3003");
const viewports = [
  { width: 320, height: 720 },
  { width: 375, height: 812 },
  { width: 768, height: 1024, mobile: false },
  { width: 1024, height: 768, mobile: false },
  { width: 1440, height: 900, mobile: false },
];

let appServer;
if (startAppPort) {
  appServer = spawn(process.env.ComSpec || "cmd.exe", ["/c", "npm.cmd", "run", "start", "--", "-p", startAppPort], {
    cwd: process.cwd(),
    stdio: "ignore",
  });
}

const browser = spawn(edgePath, [
  "--headless=new",
  `--remote-debugging-port=${cdpPort}`,
  "--disable-gpu",
  "--no-first-run",
  "--no-default-browser-check",
  `--user-data-dir=C:\\tmp\\edge-responsive-cdp-${cdpPort}`,
  "about:blank",
], { stdio: "ignore" });

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForCdp() {
  for (let i = 0; i < 50; i += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${cdpPort}/json/version`);
      if (response.ok) return;
    } catch {
      await wait(100);
    }
  }
  throw new Error("Edge CDP did not start");
}

async function waitForApp() {
  for (let i = 0; i < 80; i += 1) {
    try {
      const response = await fetch(appUrl);
      if (response.ok) return;
    } catch {
      await wait(150);
    }
  }
  throw new Error(`App did not respond at ${appUrl}`);
}

function createCdpClient(webSocketDebuggerUrl) {
  const socket = new WebSocket(webSocketDebuggerUrl);
  let id = 0;
  const pending = new Map();
  const events = new Map();

  socket.addEventListener("message", (message) => {
    const data = JSON.parse(message.data);
    if (data.id && pending.has(data.id)) {
      pending.get(data.id)(data);
      pending.delete(data.id);
      return;
    }
    if (data.method && events.has(data.method)) {
      events.get(data.method).forEach((handler) => handler(data.params));
    }
  });

  return {
    async open() {
      await new Promise((resolve, reject) => {
        socket.addEventListener("open", resolve, { once: true });
        socket.addEventListener("error", reject, { once: true });
      });
    },
    send(method, params = {}) {
      id += 1;
      socket.send(JSON.stringify({ id, method, params }));
      return new Promise((resolve, reject) => {
        pending.set(id, (data) => {
          if (data.error) reject(new Error(data.error.message));
          else resolve(data.result);
        });
      });
    },
    once(method) {
      return new Promise((resolve) => {
        const handler = (params) => {
          events.set(method, (events.get(method) || []).filter((item) => item !== handler));
          resolve(params);
        };
        events.set(method, [...(events.get(method) || []), handler]);
      });
    },
    close() {
      socket.close();
    },
  };
}

const auditExpression = String.raw`
(() => {
  const doc = document.documentElement;
  const body = document.body;
  const viewportWidth = window.innerWidth;
  const scrollWidth = Math.max(doc.scrollWidth, body.scrollWidth);
  const viewportMeta = document.querySelector('meta[name="viewport"]')?.getAttribute("content") || "";
  const offenders = [...body.querySelectorAll("*")]
    .map((element) => {
      const overflowParent = element.closest('[class*="overflow-hidden"], [class*="overflow-x-auto"]');
      const rect = element.getBoundingClientRect();
      return {
        tag: element.tagName.toLowerCase(),
        className: typeof element.className === "string" ? element.className : "",
        text: (element.innerText || element.textContent || "").trim().replace(/\s+/g, " ").slice(0, 90),
        left: Math.round(rect.left),
        right: Math.round(rect.right),
        width: Math.round(rect.width),
        insideOverflowContainer: Boolean(overflowParent),
      };
    })
    .filter((item) => item.width > 0 && !item.insideOverflowContainer && (item.left < -1 || item.right > viewportWidth + 1))
    .slice(0, 12);

  return {
    viewportWidth,
    viewportMeta,
    scrollWidth,
    overflow: scrollWidth - viewportWidth,
    pageHeight: Math.max(doc.scrollHeight, body.scrollHeight),
    offenders,
  };
})()
`;

try {
  if (startAppPort) await waitForApp();
  await waitForCdp();
  const tabResponse = await fetch(`http://127.0.0.1:${cdpPort}/json/new?${encodeURIComponent(appUrl)}`, { method: "PUT" });
  const tab = await tabResponse.json();
  const client = createCdpClient(tab.webSocketDebuggerUrl);
  await client.open();
  await client.send("Page.enable");
  await client.send("Runtime.enable");

  const results = [];
  for (const viewport of viewports) {
    await client.send("Emulation.setDeviceMetricsOverride", {
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: 1,
      mobile: false,
    });
    const loaded = client.once("Page.loadEventFired");
    await client.send("Page.navigate", { url: appUrl });
    await loaded;
    await wait(700);
    const result = await client.send("Runtime.evaluate", {
      expression: auditExpression,
      returnByValue: true,
    });
    results.push({ ...viewport, ...result.result.value });
  }

  console.log(JSON.stringify(results, null, 2));
  client.close();
} finally {
  browser.kill();
  appServer?.kill();
}
