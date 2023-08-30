interface AddressContext {
  country: {
    id?: string;
    name: string;
    country_code: string;
    country_code_alpha_3: string;
  };
  region?: {
    id?: string;
    name: string;
    region_code: string;
    region_code_full: string;
  };
  place?: {
    id?: string;
    name: string;
  };
  postcode?: {
    id?: string;
    name: string;
  };
  locality?: {
    id?: string;
    name: string;
  };
  address?: {
    id?: string;
    name: string;
    address_number?: string;
    street_name?: string;
  };
  street?: {
    id?: string;
    name: string;
  };
}

interface ExternalIds {
  [key: string]: string;
}

export interface PlacesSuggestion {
  name: string;
  mapbox_id: string;
  feature_type: string;
  place_formatted: string;
  context: AddressContext;
  language: string;
  maki: string;
  external_ids: ExternalIds;
  metadata: Record<string, unknown>;
  poi_category?: string[];
  poi_category_ids?: string[];
  address?: string;
  full_address?: string;
}

export function isPlacesSuggestions(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response: any
): response is PlacesSuggestion[] {
  if (Array.isArray(response)) {
    for (const obj of response) {
      if (
        typeof obj.name !== "string" ||
        typeof obj.mapbox_id !== "string" ||
        typeof obj.feature_type !== "string" ||
        typeof obj.place_formatted !== "string" ||
        typeof obj.context !== "object" ||
        typeof obj.language !== "string" ||
        typeof obj.maki !== "string" ||
        typeof obj.external_ids !== "object" ||
        typeof obj.metadata !== "object"
      ) {
        return false;
      }
    }

    return true;
  }
  return false;
}

type Coordinates = number[];

export interface PlacesFeature {
  type: string;
  geometry: {
    coordinates: Coordinates;
    type: string;
  };
  properties: PlacesSuggestion;
}

export interface PlacesFeatureFullResponse {
  type: string;
  features: PlacesFeature[];
  attribution: string;
}

export function isPlacesFeatureFullResponse(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
): data is PlacesFeatureFullResponse {
  if (
    typeof data === "object" &&
    data !== null &&
    typeof data.type === "string" &&
    Array.isArray(data.features) &&
    typeof data.attribution === "string"
  ) {
    for (const feature of data.features) {
      if (
        typeof feature.type !== "string" ||
        !Array.isArray(feature.geometry.coordinates) ||
        typeof feature.geometry.type !== "string" ||
        typeof feature.properties !== "object"
      ) {
        return false;
      }
    }
    return true;
  }
  return false;
}

export interface PlaceDeconstructed {
  mapbox_hash_id: string;
  name: string;
  full_address: string;
  lat: number;
  lng: number;
  locality?: string;
  region?: string;
  country?: string;
  categories?: string[];
  postcode?: string;
}
