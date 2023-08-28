import { NextRequest, NextResponse } from "next/server";

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  const updatedEndpoint = `https://api.mapbox.com/search/searchbox/v1/retrieve/${q}?session_token=123&access_token=${MAPBOX_ACCESS_TOKEN}`;

  const res = await fetch(updatedEndpoint);

  return new NextResponse(res.body, { status: res.status });
}
