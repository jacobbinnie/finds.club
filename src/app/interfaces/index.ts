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
  | "PROPERTYTYPE";

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

export interface SelectedProperty extends MapPosition {
  address: MapboxFeatures;
}
