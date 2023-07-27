interface MapboxCoordinate {
  longitude: number;
  latitude: number;
}

interface MapboxContext {
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
