import { NextResponse } from "next/server";
import {
  verifyAdminSession,
  adminCookieName,
} from "../../../lib/admin-session";
import { jsonError } from "../../../lib/http";
import { getPortfolio, savePortfolio } from "../../../lib/portfolio-store";
import { validatePortfolio } from "../../../lib/validate-portfolio";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json(await getPortfolio(), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Could not load portfolio content:", error);
    return jsonError(
      "Portfolio content is unavailable. Check server configuration.",
      503,
    );
  }
}

export async function PUT(request) {
  if (!verifyAdminSession(request.cookies.get(adminCookieName)?.value)) {
    return jsonError("You must sign in to update portfolio content.", 401);
  }

  const body = await request.text();
  if (new TextEncoder().encode(body).byteLength > 1024 * 1024) {
    return jsonError("Content exceeds the 1 MB limit.", 413);
  }

  let portfolio;
  try {
    portfolio = JSON.parse(body);
  } catch {
    return jsonError("Request body must contain valid JSON.", 400);
  }

  const validationError = validatePortfolio(portfolio);
  if (validationError) return jsonError(validationError, 400);

  try {
    await savePortfolio(portfolio);
    return NextResponse.json({ saved: true });
  } catch (error) {
    console.error("Could not save portfolio content:", error);
    return jsonError(
      "Portfolio content could not be saved. Check MongoDB configuration.",
      503,
    );
  }
}
