import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export const runtime = "nodejs";

type LeadFormData = {
  treatment: string;
  country: string;
  readiness: string;
  funding: string;
  name: string;
  phone: string;
  email?: string;
  contactTime?: string;
};

type LeadSubmissionResult = {
  success: boolean;
  message: string;
  delivery?: {
    googleSheets: "fulfilled" | "rejected";
    telegram: "fulfilled" | "rejected";
  };
};

class ConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConfigError";
  }
}

const placeholderMarkers = [
  "YOUR_KEY_HERE",
  "your-service-account",
  "your-project",
  "your_google_sheet_id_here",
  "AAHxyz",
  "..."
];

function envValue(key: string) {
  let value = process.env[key]?.trim();

  if (
    value &&
    ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'")))
  ) {
    value = value.slice(1, -1).trim();
  }

  return value && !placeholderMarkers.some((marker) => value.includes(marker)) ? value : "";
}

function googleSheetsErrorMessage(error: unknown) {
  if (error instanceof ConfigError) {
    return error.message;
  }

  const details = error as { code?: number | string; status?: number | string; message?: string };
  const status = Number(details?.code || details?.status || 0);
  const message = details?.message || "";

  if (status === 403) {
    return "Google Sheets rejected access. Share the spreadsheet with GOOGLE_CLIENT_EMAIL as Editor and confirm the Google Sheets API is enabled.";
  }

  if (status === 404) {
    return "Google Sheet was not found. Check GOOGLE_SHEET_ID and make sure the service account has access.";
  }

  if (/DECODER|private key|PEM|unsupported/i.test(message)) {
    return "Google private key is invalid. In Vercel, paste the full GOOGLE_PRIVATE_KEY without wrapping quotes, or use escaped \\n newlines.";
  }

  if (/invalid_grant|JWT|No key or keyFile/i.test(message)) {
    return "Google service account credentials are invalid. Check GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY belong to the same service account.";
  }

  return "Lead could not be saved. Please check Google Sheets configuration.";
}

function formatTimestamp() {
  return new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
}

function validateData(data: Partial<LeadFormData>): data is LeadFormData {
  return Boolean(
    data.treatment?.trim() &&
      data.country?.trim() &&
      data.readiness?.trim() &&
      data.funding?.trim() &&
      data.name?.trim() &&
      data.phone?.trim()
  );
}

function sanitizeLead(data: LeadFormData): LeadFormData {
  return {
    treatment: data.treatment.trim(),
    country: data.country.trim(),
    readiness: data.readiness.trim(),
    funding: data.funding.trim(),
    name: data.name.trim(),
    phone: data.phone.trim(),
    email: data.email?.trim() || "",
    contactTime: data.contactTime?.trim() || "Anytime"
  };
}

function requiredEnv(keys: string[]) {
  const missing = keys.filter((key) => !envValue(key));
  if (missing.length) {
    throw new ConfigError(`Missing or placeholder environment variables: ${missing.join(", ")}`);
  }
}

function googlePrivateKey() {
  const privateKey = envValue("GOOGLE_PRIVATE_KEY").replace(/\\n/g, "\n");

  if (
    !privateKey ||
    privateKey.length < 1000 ||
    !privateKey.includes("-----BEGIN PRIVATE KEY-----") ||
    !privateKey.includes("-----END PRIVATE KEY-----")
  ) {
    throw new ConfigError(
      "Google private key is missing or incomplete. Replace GOOGLE_PRIVATE_KEY with the full service account private_key."
    );
  }

  return privateKey;
}

async function saveToGoogleSheets(data: LeadFormData) {
  requiredEnv(["GOOGLE_PRIVATE_KEY", "GOOGLE_CLIENT_EMAIL", "GOOGLE_SHEET_ID"]);

  const auth = await google.auth.getClient({
    credentials: {
      private_key: googlePrivateKey(),
      client_email: envValue("GOOGLE_CLIENT_EMAIL")
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: envValue("GOOGLE_SHEET_ID"),
    range: "Sheet1!A:I",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          formatTimestamp(),
          data.name,
          data.phone,
          data.email || "Not provided",
          data.treatment,
          data.country,
          data.readiness,
          data.funding,
          data.contactTime || "Anytime"
        ]
      ]
    }
  });
}

async function sendTelegramAlert(data: LeadFormData) {
  requiredEnv(["TELEGRAM_BOT_TOKEN", "TELEGRAM_CHAT_ID"]);

  const message = [
    "NEW PATIENT LEAD",
    "",
    `Name: ${data.name}`,
    `WhatsApp: ${data.phone}`,
    `Email: ${data.email || "Not provided"}`,
    `Treatment: ${data.treatment}`,
    `Country: ${data.country}`,
    `Reports / diagnosis: ${data.readiness}`,
    `Funding: ${data.funding}`,
    `Preferred contact time: ${data.contactTime || "Anytime"}`,
    `Time: ${formatTimestamp()} IST`,
    "",
    "Please reply within 24 hours."
  ].join("\n");

  const response = await fetch(`https://api.telegram.org/bot${envValue("TELEGRAM_BOT_TOKEN")}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: envValue("TELEGRAM_CHAT_ID"),
      text: message
    })
  });

  if (!response.ok) {
    throw new Error(`Telegram request failed with status ${response.status}`);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: Partial<LeadFormData> = await req.json();

    if (!validateData(body)) {
      return NextResponse.json<LeadSubmissionResult>(
        {
          success: false,
          message: "Missing required fields: treatment, country, readiness, funding, name, phone"
        },
        { status: 400 }
      );
    }

    const lead = sanitizeLead(body);
    const [googleSheets, telegram] = await Promise.allSettled([
      saveToGoogleSheets(lead),
      sendTelegramAlert(lead)
    ]);

    const delivery = {
      googleSheets: googleSheets.status,
      telegram: telegram.status
    };

    if (googleSheets.status === "rejected") {
      console.error("Google Sheets lead delivery failed:", googleSheets.reason);
    }

    if (telegram.status === "rejected") {
      console.error("Telegram lead delivery failed:", telegram.reason);
    }

    if (googleSheets.status === "rejected") {
      return NextResponse.json<LeadSubmissionResult>(
        {
          success: false,
          message: googleSheetsErrorMessage(googleSheets.reason),
          delivery
        },
        { status: 502 }
      );
    }

    return NextResponse.json<LeadSubmissionResult>(
      {
        success: true,
        message: "Lead received successfully",
        delivery
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Submit API Error:", error);
    return NextResponse.json<LeadSubmissionResult>(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
