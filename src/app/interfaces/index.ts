export interface Suggestion {
  full_address: string;
  matching_name: string;
  locality: string | undefined;
  original_search_text: string;
  feature_name: string;
  description: string;
  language: string;
  metadata: { iso_3166_1: string };
  action: { id: string };
  address_level_1: string | undefined;
  address_level_2: string | undefined;
  address_line_1: string | undefined;
  match_code: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    confidence: any;
    exact_match: boolean;
    house_number: boolean;
    locality?: boolean;
    place: boolean;
    postcode: boolean;
    region?: boolean;
    street: boolean;
  };
}
