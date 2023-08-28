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
