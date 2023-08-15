import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const propertyId = searchParams.get("propertyId");

  const { data: property_claim } = await supabase
    .from("property_claim")
    .select(
      `
    id,
    owner_id
  `
    )
    .eq("id", propertyId)
    .single();

  if (property_claim) {
    return new NextResponse(JSON.stringify({ status: "CLAIMED" }), {
      status: 200,
      headers: {
        "content-type": "application/json",
        "cache-control": "public, max-age=0, must-revalidate",
      },
    });
  } else {
    return new NextResponse(JSON.stringify({ status: "UNCLAIMED" }), {
      status: 200,
      headers: {
        "content-type": "application/json",
        "cache-control": "public, max-age=0, must-revalidate",
      },
    });
  }
}
