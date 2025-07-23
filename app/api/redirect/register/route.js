import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.redirect(new URL("/auth/register", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"));
} 