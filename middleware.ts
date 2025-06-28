import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {

  if (process.env.MAINTENANCE === "true") {
    req.nextUrl.pathname = `/maintenance`;

    // Rewrite to the url
    return NextResponse.rewrite(req.nextUrl);
  }
}
