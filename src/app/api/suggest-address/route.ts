import { NextRequest, NextResponse } from "next/server";

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";
const MAPBOX_ENDPOINT = process.env.NEXT_PUBLIC_MAPBOX_ENDPOINT || "";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  const updatedEndpoint = `${MAPBOX_ENDPOINT}?q=${q}&country=nz&proximity=ip&types=address&access_token=${MAPBOX_ACCESS_TOKEN}`;

  const res = await fetch(updatedEndpoint);

  return new NextResponse(res.body, { status: res.status });
}
