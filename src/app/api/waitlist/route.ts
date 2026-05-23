import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export const runtime = "nodejs";

type WaitlistFormData = {
  fullName: string;
  email: string;
  whatsapp: string;
  country: string;
  persona: string;
  tierInterest?: string;
  notes?: string;
  consent: boolean;
};

type WaitlistSubmissionResult = {
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

const waitlistSheetName = "Waitlist";
const waitlistHeaders = [
  "Timestamp",
  "Full name",
  "Email address",
  "WhatsApp number",
  "Country",
  "Best describes you",
  "Interested tier",
  "Specific membership needs",
  "Consent to updates"
];

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

  if (/Unable to parse range|Unable to retrieve row|No grid/i.test(message)) {
    return "The Waitlist sheet tab could not be prepared. Create a tab named Waitlist with columns A:I and try again.";
  }

  if (/DECODER|private key|PEM|unsupported/i.test(message)) {
    return "Google private key is invalid. In Vercel, paste the full GOOGLE_PRIVATE_KEY without wrapping quotes, or use escaped \\n newlines.";
  }

  if (/invalid_grant|JWT|No key or keyFile/i.test(message)) {
    return "Google service account credentials are invalid. Check GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY belong to the same service account.";
  }

  return "Waitlist signup could not be saved. Please check Google Sheets configuration.";
}

function formatTimestamp() {
  return new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
}

function validateData(data: Partial<WaitlistFormData>): data is WaitlistFormData {
  return Boolean(
    data.fullName?.trim() &&
      data.email?.trim() &&
      data.whatsapp?.trim() &&
      data.country?.trim() &&
      data.persona?.trim() &&
      data.consent === true
  );
}

function sanitizeWaitlistData(data: WaitlistFormData): WaitlistFormData {
  return {
    fullName: data.fullName.trim(),
    email: data.email.trim(),
    whatsapp: data.whatsapp.trim(),
    country: data.country.trim(),
    persona: data.persona.trim(),
    tierInterest: data.tierInterest?.trim() || "Not sure yet",
    notes: data.notes?.trim() || "",
    consent: data.consent
  };
}

async function createSheetsClient() {
  requiredEnv(["GOOGLE_PRIVATE_KEY", "GOOGLE_CLIENT_EMAIL", "GOOGLE_SHEET_ID"]);

  const auth = await google.auth.getClient({
    credentials: {
      private_key: googlePrivateKey(),
      client_email: envValue("GOOGLE_CLIENT_EMAIL")
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });

  return google.sheets({ version: "v4", auth });
}

async function ensureWaitlistSheet(sheets: Awaited<ReturnType<typeof createSheetsClient>>) {
  const spreadsheetId = envValue("GOOGLE_SHEET_ID");
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: "sheets(properties(title))"
  });
  const hasWaitlistSheet = spreadsheet.data.sheets?.some((sheet) => sheet.properties?.title === waitlistSheetName);

  if (!hasWaitlistSheet) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: {
                title: waitlistSheetName
              }
            }
          }
        ]
      }
    });
  }

  const headerRange = `${waitlistSheetName}!A1:I1`;
  const headerResponse = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: headerRange
  });
  const currentHeaders = headerResponse.data.values?.[0] || [];
  const shouldWriteHeaders = waitlistHeaders.some((header, index) => currentHeaders[index] !== header);

  if (shouldWriteHeaders) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: headerRange,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [waitlistHeaders]
      }
    });
  }
}

async function saveToGoogleSheets(data: WaitlistFormData) {
  const sheets = await createSheetsClient();
  await ensureWaitlistSheet(sheets);

  await sheets.spreadsheets.values.append({
    spreadsheetId: envValue("GOOGLE_SHEET_ID"),
    range: `${waitlistSheetName}!A:I`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        [
          formatTimestamp(),
          data.fullName,
          data.email,
          data.whatsapp,
          data.country,
          data.persona,
          data.tierInterest || "Not sure yet",
          data.notes || "Not provided",
          data.consent ? "Yes" : "No"
        ]
      ]
    }
  });
}

async function sendTelegramAlert(data: WaitlistFormData) {
  requiredEnv(["TELEGRAM_BOT_TOKEN", "TELEGRAM_CHAT_ID"]);

  const message = [
    "NEW MEMBERSHIP WAITLIST SIGNUP",
    "",
    `Name: ${data.fullName}`,
    `Email: ${data.email}`,
    `WhatsApp: ${data.whatsapp}`,
    `Country: ${data.country}`,
    `Best describes them: ${data.persona}`,
    `Interested tier: ${data.tierInterest || "Not sure yet"}`,
    `Specific needs: ${data.notes || "Not provided"}`,
    `Consent to updates: ${data.consent ? "Yes" : "No"}`,
    `Time: ${formatTimestamp()} IST`
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
    const body: Partial<WaitlistFormData> = await req.json();

    if (!validateData(body)) {
      return NextResponse.json<WaitlistSubmissionResult>(
        {
          success: false,
          message: "Missing required fields: full name, email, WhatsApp number, country, description, and consent"
        },
        { status: 400 }
      );
    }

    const waitlistData = sanitizeWaitlistData(body);
    const [googleSheets, telegram] = await Promise.allSettled([
      saveToGoogleSheets(waitlistData),
      sendTelegramAlert(waitlistData)
    ]);

    const delivery = {
      googleSheets: googleSheets.status,
      telegram: telegram.status
    };

    if (googleSheets.status === "rejected") {
      console.error("Google Sheets waitlist delivery failed:", googleSheets.reason);
    }

    if (telegram.status === "rejected") {
      console.error("Telegram waitlist delivery failed:", telegram.reason);
    }

    if (googleSheets.status === "rejected") {
      return NextResponse.json<WaitlistSubmissionResult>(
        {
          success: false,
          message: googleSheetsErrorMessage(googleSheets.reason),
          delivery
        },
        { status: 502 }
      );
    }

    return NextResponse.json<WaitlistSubmissionResult>(
      {
        success: true,
        message: "Waitlist signup received successfully",
        delivery
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Waitlist API Error:", error);
    return NextResponse.json<WaitlistSubmissionResult>(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
