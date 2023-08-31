import { Database } from "@/libs/database.types";

export type Profile = Database["public"]["Tables"]["profile"]["Row"];
export type Place = Database["public"]["Tables"]["places"]["Row"];

export type Find = Database["public"]["Tables"]["finds"]["Row"] & {
  place: Place;
};

type ReviewProfile = {
  username: string;
};

export type Review = {
  id: string;
  created_at: string;
  rating: number;
  review: string;
  profile: ReviewProfile;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isArrayOfReviews(data: any): data is Review[] {
  if (!Array.isArray(data)) {
    return false;
  }

  for (const item of data) {
    if (
      typeof item.id !== "string" ||
      typeof item.created_at !== "string" ||
      typeof item.rating !== "number" ||
      typeof item.review !== "string" ||
      !item.profile ||
      typeof item.profile.username !== "string"
    ) {
      return false;
    }
  }

  return true;
}

export type UserProfile = {
  username: Database["public"]["Tables"]["profile"]["Row"]["username"];
  description: Database["public"]["Tables"]["profile"]["Row"]["description"];
};
export interface ProfileAndFinds {
  username: UserProfile["username"];
  description: UserProfile["description"];
  finds: Find[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- function to check response os of type ProfileAndFinds
export function isProfileAndFindsResponse(data: any): data is ProfileAndFinds {
  return (
    typeof data === "object" &&
    data !== null &&
    "username" in data &&
    "description" in data &&
    "finds" in data
  );
}

export interface MapPosition {
  lat: number;
  lng: number;
  zoom: number;
}

export type SearchType = "PLACES" | "PROFILES";
