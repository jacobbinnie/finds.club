import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const hash = searchParams.get("q");

  const { data: reviews } = await supabase
    .from("finds")
    .select(
      `
    id,
    created_at,
    rating,
    review,
    profile (
      username
    )
    `
    )
    .eq("place", hash);

  if (reviews === null) {
    return new NextResponse(null, { status: 200 });
  }

  return new NextResponse(JSON.stringify(reviews));
}
