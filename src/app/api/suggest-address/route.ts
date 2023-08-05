import { NextRequest, NextResponse } from "next/server";

const ADDRESSABLE_API_KEY = process.env.NEXT_PUBLIC_ADDRESSABLE_API_KEY || "";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  const updatedEndpoint = `https://api.addressable.dev/v2/autocomplete?api_key=${ADDRESSABLE_API_KEY}&country_code=NZ&type=number&q=${q}`;

  const res = await fetch(updatedEndpoint);

  return new NextResponse(res.body, { status: res.status });
}
