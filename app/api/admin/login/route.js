import { NextResponse } from "next/server";
import {
  adminCookieMaxAge,
  adminCookieName,
  createAdminSession,
  verifyAdminCredentials,
} from "../../../../lib/admin-session";
import { jsonError } from "../../../../lib/http";

export async function POST(request) {
  let credentials;
  try {
    credentials = await request.json();
  } catch {
    return jsonError("Request body must contain valid JSON.", 400);
  }

  if (
    credentials === null ||
    typeof credentials !== "object" ||
    typeof credentials.username !== "string" ||
    typeof credentials.password !== "string" ||
    credentials.username.length > 256 ||
    credentials.password.length > 1024
  ) {
    return jsonError("Enter a valid username and password.", 400);
  }

  try {
    if (!verifyAdminCredentials(credentials.username, credentials.password)) {
      return jsonError("The username or password is incorrect.", 401);
    }

    const response = NextResponse.json({ authenticated: true });
    response.cookies.set(adminCookieName, createAdminSession(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: adminCookieMaxAge,
    });
    return response;
  } catch (error) {
    console.error("Admin login is not configured:", error);
    return jsonError("Admin login is not configured on the server.", 503);
  }
}
