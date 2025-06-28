import { NextRequest, NextResponse } from "next/server";
import crypto, { BinaryLike } from "crypto";

// Ensure the environment variable is defined
const privateKey = process.env.PRIVATE_KEY as BinaryLike;

if (!privateKey) {
  console.error("PRIVATE_KEY environment variable is not set");
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  // Parse URL and search parameters
  const { searchParams } = new URL(request.url);

  // Get token, use random UUID if not provided
  const token = searchParams.get("token") || crypto.randomUUID();

  // Get expire time, default to 40 minutes from now
  const expire =
    searchParams.get("expire") ||
    (Math.floor(Date.now() / 1000) + 2400).toString();

  // Create signature using HMAC
  const signature = crypto
    .createHmac("sha1", privateKey)
    .update(token + expire)
    .digest("hex");

  // Return JSON response with token, expire time, and signature
  return NextResponse.json({
    token,
    expire,
    signature,
  });
}

// Optional: Define a type for the response if needed
export interface TokenResponse {
  token: string;
  expire: string;
  signature: string;
}
