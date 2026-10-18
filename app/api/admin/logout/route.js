import { NextResponse } from "next/server";
import { adminCookieName } from "../../../../lib/admin-session";

export async function POST() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(adminCookieName, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  return response;
}
