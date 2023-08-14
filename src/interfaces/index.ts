import { Database } from "@/libs/database.types";

type MapboxCoordinate = number[];

interface MapboxContext {
  locality?: {
    mapbox_id: string;
    name: string;
    wikidata_id: string;
  };
  district?: {
    mapbox_id: string;
    name: string;
    wikidata_id: string;
  };
  region: {
    mapbox_id: string;
    name: string;
    wikidata_id: string;
    region_code?: string;
    region_code_full?: string;
  };
  country: {
    mapbox_id: string;
    name: string;
    wikidata_id: string;
    country_code?: string;
    country_code_alpha_3?: string;
  };
  place: {
    mapbox_id: string;
    name: string;
    wikidata_id: string;
  };
}

export interface MapboxFeatures {
  type: string;
  id: string;
  geometry: {
    type: string;
    coordinates: MapboxCoordinate;
  };
  properties: {
    mapbox_id: string;
    feature_type: string;
    name: string;
    coordinates: MapboxCoordinate;
    place_formatted?: string;
    bbox: number[];
    context: MapboxContext;
  };
}

export interface MapboxResponse {
  type: string;
  features: MapboxFeatures[];
  attribution: string;
}

// Helper function to perform type check
export function isValidMapboxResponse(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
): data is MapboxResponse {
  return (
    typeof data === "object" &&
    data !== null &&
    "type" in data &&
    "features" in data &&
    "attribution" in data
  );
}

export type CategoryType =
  | "BEDS"
  | "BATHS"
  | "PRICE"
  | "OWNERSHIP"
  | "NEWBUILDS"
  | "PROPERTYTYPE"
  | "PARKING";

export type OwnershipType =
  | "Freehold"
  | "Cross Lease"
  | "Unit Title"
  | "Leasehold";

export type NewBuildsType = "Show" | "Hide" | "Only";

export type PropertyType =
  | "Apartment"
  | "House"
  | "Lifestyle Dwelling"
  | "Lifestyle Land"
  | "Section"
  | "Townhouse"
  | "Unit";

export interface MapPosition {
  lat: number;
  lng: number;
  zoom: number;
}

export interface SelectedProperty extends AddressableAddress {}

export interface AddressableAddress {
  street_number: string;
  street: string;
  locality: string;
  city: string;
  region: string;
  postcode: string;
  meshblock: string;
  lon: number;
  lat: number;
  formatted: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isAddressableAddress(data: any): data is AddressableAddress {
  return (
    typeof data === "object" &&
    data !== null &&
    "street_number" in data &&
    "street" in data &&
    "locality" in data &&
    "city" in data &&
    "region" in data &&
    "postcode" in data &&
    "meshblock" in data &&
    "lon" in data &&
    "lat" in data &&
    "formatted" in data
  );
}

export interface BaseAddress {
  number: string | null;
  street: string | null;
  locality: string | null;
  region: string | null;
}

export function isAddressableAddressArray(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
): data is AddressableAddress[] {
  if (!Array.isArray(data)) {
    return false;
  }

  for (const item of data) {
    if (!isAddressableAddress(item)) {
      return false;
    }
  }

  return true;
}

export type Property = Database["public"]["Tables"]["property"]["Row"];
export type PropertyFeatures =
  Database["public"]["Tables"]["property_features"]["Row"];
export type PropertyPricing =
  Database["public"]["Tables"]["property_pricing"]["Row"];
export type ListingStatus =
  Database["public"]["Tables"]["listing_status"]["Row"];

export interface PropertyWithRelationships extends Property {
  property_features: PropertyFeatures;
  property_pricing: PropertyPricing;
  listing_status: ListingStatus;
}

export type ClaimStatusType = "UNCLAIMED" | "CLAIMED_USER" | "CLAIMED";

export interface ClaimStatus {
  status: ClaimStatusType;
  profile?: string; // Adding the profile field as an optional string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isClaimStatus(data: any): data is ClaimStatus {
  return (
    typeof data === "object" &&
    data !== null &&
    "status" in data &&
    (data.status === "UNCLAIMED" ||
      data.status === "CLAIMED" ||
      data.status === "CLAIMED_USER") &&
    (data.profile === undefined || typeof data.profile === "string")
  );
}

export type Profile = Database["public"]["Tables"]["profile"]["Row"];
