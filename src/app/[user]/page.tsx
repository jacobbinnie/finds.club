"use client";
import MapElement from "@/components/MapElement";
import NavBar from "@/components/HeaderNav";

import { useLocation } from "@/providers/LocationProvider";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProfileAndFinds, isProfileAndFindsResponse } from "@/interfaces";
import Profile from "@/components/Profile";
import { usernamePattern } from "@/utils/utils";

function Home() {
  const { mapPosition, setMapPosition } = useLocation();

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState<string>();
  const [profileAndFinds, setProfileAndFinds] =
    useState<ProfileAndFinds | null>();

  const [invalidUsername, setInvalidUsername] = useState(false);

  const params = useParams();

  function isValidUsername(username: string) {
    return usernamePattern.test(username);
  }

  useEffect(() => {
    if (params.user) {
      isValidUsername(params.user.toString())
        ? setUsername(params.user.toString())
        : setInvalidUsername(true);
    }
  }, [params]);

  const fetchProfile = useCallback(async () => {
    if (username) {
      setLoading(true);
      try {
        const response = await fetch(`/api/get-profile?username=${username}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const json = await response.json();

        if (isProfileAndFindsResponse(json)) {
          setProfileAndFinds(json);
        } else {
          setProfileAndFinds(null);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    }
  }, [username]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    fetchProfile();
  }, [username]);

  return (
    <div className="bg-tertiary w-full h-full">
      <NavBar />
      <div className="flex flex-col sm:flex-row w-full transition-all">
        <MapElement
          mapPosition={mapPosition}
          setMapPosition={setMapPosition}
          fullScreen={true}
        />
        <Profile
          loading={loading}
          profileAndFinds={profileAndFinds}
          invalidUsername={invalidUsername}
        />
      </div>
    </div>
  );
}

export default Home;
