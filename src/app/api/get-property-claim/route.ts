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

  if (property_claim === null) {
    return new NextResponse(JSON.stringify({ status: null }));
  } else if (property_claim) {
    if (property_claim.owner_id === null) {
      return new NextResponse(JSON.stringify({ status: "UNCLAIMED" }), {
        status: 200,
      });
    } else {
      return new NextResponse(JSON.stringify({ status: "CLAIMED" }), {
        status: 200,
      });
    }
  }
}
