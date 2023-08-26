import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  const { data: profile } = await supabase
    .from("profile")
    .select(
      `
   username,
   description,
   finds (
    id,
    created_at,
    description,
    place_id:places(*)
   )
  `
    )
    .eq("username", username)
    .single();

  if (profile === null) {
    return new NextResponse(null, { status: 200 });
  }

  return new NextResponse(JSON.stringify(profile));
}
