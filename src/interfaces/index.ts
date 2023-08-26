import { Database } from "@/libs/database.types";

export type UserProfile = {
  username: Database["public"]["Tables"]["profile"]["Row"]["username"];
  description: Database["public"]["Tables"]["profile"]["Row"]["description"];
};

type Place = Database["public"]["Tables"]["places"]["Row"];

type Find = Database["public"]["Tables"]["finds"]["Row"] & {
  place_id: Place;
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
