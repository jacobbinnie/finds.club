"use client";
import MapElement from "@/components/MapElement";
import NavBar from "@/components/HeaderNav";

import {
  ClaimStatusType,
  PropertyWithRelationships,
  isAddressableAddressArray,
  isClaimStatus,
} from "@/interfaces";
import { useLocation } from "@/providers/LocationProvider";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams, useParams } from "next/navigation";
import Profile from "@/components/Profile";

function Home() {
  const { selectedProperty, mapPosition, setMapPosition, setSelectedProperty } =
    useLocation();

  const [propertyData, setPropertyData] = useState<
    PropertyWithRelationships | null | undefined
  >(undefined);

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState<string>();
  const [invalidUsername, setInvalidUsername] = useState(false);

  const searchParams = useSearchParams();
  const params = useParams();

  const usernamePattern = /^(?![-.])[\w.-]{3,20}(?<![-.])$/;

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

  console.log(username, invalidUsername);

  const number = searchParams.get("username");
  const street = searchParams.get("street");
  const locality = searchParams.get("locality");
  const region = searchParams.get("region");

  const fetchProperty = useCallback(async () => {
    if (number && street && locality && region) {
      setLoading(true);
      fetch(
        `/api/get-property?number=${number}&street=${street}&locality=${locality}&region=${region}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.text(); // Read the response as text
        })
        .then((text) => {
          if (text.length === 0) {
            setPropertyData(null);
            setLoading(false);
          } else {
            try {
              const data = JSON.parse(text); // Attempt to parse the text as JSON
              if (data !== null && data !== undefined) {
                setPropertyData(data);
              } else {
                setPropertyData(null);
                setLoading(false);
              }
            } catch (error) {
              console.debug(error);
              setLoading(false);
            }
          }
        });
    }
  }, [number, street, locality, region]);

  const fetchAddressLocation = useCallback(
    (searchQuery: string) => {
      if (number && street && locality && region) {
        fetch(`/api/suggest-address?q=${searchQuery}`)
          .then((response) => response.json())
          .then((data) => {
            if (isAddressableAddressArray(data)) {
              setSelectedProperty(data[0]);
            }
          })
          .catch(() => {
            console.debug("Error fetching address location");
          });
      }
    },
    [number, street, locality, region]
  );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    fetchProperty();
  }, [number, street, locality, region]);

  useEffect(() => {
    if (!selectedProperty) {
      fetchAddressLocation(`${number} ${street}, ${locality}, ${region}`);
    }
  }, [number, street, locality, region]);

  return (
    <div className="bg-tertiary w-full h-full">
      <NavBar />
      <div className="flex flex-col sm:flex-row w-full transition-all">
        <MapElement
          selectedProperty={selectedProperty}
          baseAddress={{ number, street, locality, region }}
          mapPosition={mapPosition}
          setMapPosition={setMapPosition}
          setSelectedProperty={setSelectedProperty}
          fullScreen={number && street && locality && region ? false : true}
        />
        <Profile loading={loading} username={username} />
      </div>
    </div>
  );
}

export default Home;
