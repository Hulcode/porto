import { NextResponse } from "next/server";

export function jsonError(message, status) {
  return NextResponse.json({ error: message }, { status });
}
