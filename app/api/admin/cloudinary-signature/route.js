import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import {
  adminCookieName,
  verifyAdminSession,
} from "../../../../lib/admin-session";
import { jsonError } from "../../../../lib/http";

export async function POST(request) {
  if (!verifyAdminSession(request.cookies.get(adminCookieName)?.value)) {
    return jsonError("You must sign in to upload images.", 401);
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    return jsonError("Cloudinary is not configured on the server.", 503);
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = "portfolio";
  const signature = cloudinary.utils.api_sign_request(
    { folder, timestamp },
    apiSecret,
  );

  return NextResponse.json({ cloudName, apiKey, timestamp, folder, signature });
}
