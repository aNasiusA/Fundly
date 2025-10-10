import { db } from "./db";

export const formatCurrency = (
  amount: number,
  currency?: string,
  locale = "en-US"
) => {
  const settings = (db.get("settings") as { currency?: string }) || {};
  const curr = currency || settings.currency || "USD";

  return amount.toLocaleString(locale, {
    style: "currency",
    currency: curr,
  });
};

export const generateAccountId = (accountName: string, createdAt?: Date) => {
  const date = createdAt || new Date();
  const namePart = accountName
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 4);

  const timePart = date.getTime().toString(36).toUpperCase();
  return `${namePart}-${timePart}`;
};

export const generateTransactionId = (accountName: string): string => {
  // 1. Shorten the account name (remove spaces, take first 3 letters)
  const namePart = accountName
    .replace(/\s+/g, "")
    .substring(0, 3)
    .toUpperCase();

  // 2. Add a timestamp (YYYYMMDDHHMMSS)
  const now = new Date();
  const timestamp = now
    .toISOString()
    .replace(/[-:.TZ]/g, "") // remove dashes, colons, etc.
    .slice(0, 14); // take YYYYMMDDHHMMSS

  // 3. Add a random 4-digit number
  const randomPart = Math.floor(1000 + Math.random() * 9000); // 1000–9999

  // Combine parts
  return `${namePart}-${timestamp}-${randomPart}`;
};
