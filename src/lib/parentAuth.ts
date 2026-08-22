import crypto from "crypto";
import { getParentSettings, setParentSettings } from "./repo";

const SESSION_COOKIE = "parent_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

function hashPin(pin: string, salt: string): string {
  return crypto.scryptSync(pin, salt, 64).toString("hex");
}

export function isPinConfigured(): boolean {
  return !!getParentSettings();
}

export function setPin(pin: string): void {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = `${salt}:${hashPin(pin, salt)}`;
  const sessionSecret = crypto.randomBytes(32).toString("hex");
  setParentSettings(hash, sessionSecret);
}

export function verifyPin(pin: string): boolean {
  const settings = getParentSettings();
  if (!settings) return false;
  const [salt, storedHash] = settings.pinHash.split(":");
  const candidate = hashPin(pin, salt);
  const a = Buffer.from(candidate);
  const b = Buffer.from(storedHash);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function createSessionToken(): { value: string; maxAge: number } {
  const settings = getParentSettings();
  if (!settings) throw new Error("Parent PIN not configured");
  const issuedAt = Date.now().toString();
  const sig = crypto.createHmac("sha256", settings.sessionSecret).update(issuedAt).digest("hex");
  return { value: `${issuedAt}.${sig}`, maxAge: SESSION_MAX_AGE_SECONDS };
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const settings = getParentSettings();
  if (!settings) return false;
  const [issuedAt, sig] = token.split(".");
  if (!issuedAt || !sig) return false;
  const age = Date.now() - Number(issuedAt);
  if (!Number.isFinite(age) || age < 0 || age > SESSION_MAX_AGE_SECONDS * 1000) return false;
  const expected = crypto.createHmac("sha256", settings.sessionSecret).update(issuedAt).digest("hex");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export { SESSION_COOKIE };
