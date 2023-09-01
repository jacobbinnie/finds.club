"use client";
import MapElement from "@/components/MapElement";
import NavBar from "@/components/HeaderNav";

import { useLocation } from "@/providers/LocationProvider";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  ProfileAndFinds,
  Review,
  isArrayOfReviews,
  isProfileAndFindsResponse,
} from "@/interfaces";
import Profile from "@/components/Profile";
import { usernamePattern } from "@/utils/utils";
import PlaceOverview from "@/components/PlaceOverview";

function Home() {
  const { mapPosition, setMapPosition } = useLocation();

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState<string>();
  const [profileAndFinds, setProfileAndFinds] =
    useState<ProfileAndFinds | null>();
  const [placeReviews, setPlaceReviews] = useState<Review[] | "LOADING">([]);

  const [invalidUsername, setInvalidUsername] = useState(false);

  const { selectedPoi, handleUpdateSelectedPoi } = useLocation();

  const params = useParams();

  function isValidUsername(username: string) {
    return usernamePattern.test(username);
  }

  useEffect(() => {
    const controller = new AbortController();

    if (params.user) {
      isValidUsername(params.user.toString())
        ? setUsername(params.user.toString())
        : setInvalidUsername(true);
    }

    return () => controller.abort();
  }, [params]);

  const fetchPlaceReviews = useCallback(async (hashed_mapbox_id: string) => {
    setPlaceReviews("LOADING");
    fetch(`/api/get-place-reviews?q=${hashed_mapbox_id}`)
      .then((response) => response.json())
      .then((data) => {
        if (isArrayOfReviews(data)) {
          setPlaceReviews(data);
        } else {
          console.debug("Received data is not in the expected format.");
          setPlaceReviews([]);
        }
      })
      .catch(() => {
        console.debug("An error occurred while fetching data.");
        setPlaceReviews([]);
      });
  }, []);

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
    const controller = new AbortController();

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    fetchProfile();

    return () => controller.abort();
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
        {selectedPoi ? (
          <PlaceOverview
            selectedPoi={selectedPoi}
            handleUpdateSelectedPoi={handleUpdateSelectedPoi}
            fetchProfile={fetchProfile}
            profileAndFinds={profileAndFinds}
            fetchPlaceReviews={fetchPlaceReviews}
            placeReviews={placeReviews}
          />
        ) : (
          <Profile
            loading={loading}
            profileAndFinds={profileAndFinds}
            invalidUsername={invalidUsername}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
