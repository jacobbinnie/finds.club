import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const propertyId = searchParams.get("propertyId");
  const profile = searchParams.get("profile");

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

  if (property_claim !== null && property_claim !== undefined) {
    if (property_claim.owner_id === profile) {
      return new NextResponse(
        JSON.stringify({ status: "CLAIMED_USER", profile: profile })
      );
    } else {
      return new NextResponse(JSON.stringify({ status: "CLAIMED" }));
    }
  } else {
    return new NextResponse(JSON.stringify({ status: "UNCLAIMED" }), {
      status: 200,
    });
  }
}
