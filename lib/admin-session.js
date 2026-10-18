import { createHmac, timingSafeEqual } from "node:crypto";

const cookieName = "portfolio-admin";
const sessionDurationSeconds = 60 * 60 * 8;

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET must be at least 32 characters.");
  }
  return secret;
}

function sign(value) {
  return createHmac("sha256", getSessionSecret())
    .update(value)
    .digest("base64url");
}

function constantTimeEqual(left, right) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

export function verifyAdminCredentials(username, password) {
  const expectedUsername = process.env.ADMIN_USERNAME;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedUsername || !expectedPassword) {
    throw new Error("ADMIN_USERNAME and ADMIN_PASSWORD must be configured.");
  }

  return (
    constantTimeEqual(username, expectedUsername) &&
    constantTimeEqual(password, expectedPassword)
  );
}

export function createAdminSession() {
  const now = Math.floor(Date.now() / 1000);
  const payload = Buffer.from(
    JSON.stringify({ sub: "admin", iat: now, exp: now + sessionDurationSeconds }),
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifyAdminSession(token) {
  if (typeof token !== "string") return false;
  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra) return false;

  try {
    if (!constantTimeEqual(signature, sign(payload))) return false;

    const session = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    );
    const now = Math.floor(Date.now() / 1000);
    return session.sub === "admin" && Number.isInteger(session.exp) && session.exp > now;
  } catch {
    return false;
  }
}

export const adminCookieName = cookieName;
export const adminCookieMaxAge = sessionDurationSeconds;
