import { Database } from "@/libs/database.types";

export type Profile = Database["public"]["Tables"]["profile"]["Row"];
type Place = Database["public"]["Tables"]["places"]["Row"];

export type Find = Database["public"]["Tables"]["finds"]["Row"] & {
  place: Place;
};

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
