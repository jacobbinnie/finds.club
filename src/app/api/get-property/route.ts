import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const number = searchParams.get("number");
  const street = searchParams.get("street");
  const locality = searchParams.get("locality");
  const region = searchParams.get("region");

  const { data: property } = await supabase
    .from("property")
    .select(
      `
    id,
    full_address,
    street_number,
    street,
    locality,
    city,
    region,
    latitude,
    longitude,
    listing_status (
      status
    ),
    property_features (
      beds,
      baths,
      floor_sqm,
      land_sqm,
      living_areas,
      garage,
      parking,
      ownership_type,
      property_type,
      new_build,
      needs_renovation
    ),
    property_pricing (
      lower_range,
      upper_range,
      asking_price
    )
  `
    )
    .eq("street_number", number)
    .eq("street", street)
    .eq("locality", locality)
    .eq("region", region)
    .single();

  if (property === null) {
    return new NextResponse(null, { status: 200 });
  }

  return new NextResponse(JSON.stringify(property));
}
