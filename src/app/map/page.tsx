"use client";
import MapElement from "@/components/MapElement";
import NavBar from "@/components/HeaderNav";
import SelectedPropertyDetails from "@/components/SelectedPropertyDetails";

import {
  ClaimStatusType,
  PropertyWithRelationships,
  isAddressableAddressArray,
  isClaimStatus,
} from "@/interfaces";
import { useLocation } from "@/providers/LocationProvider";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function MapPage() {
  const { selectedProperty, mapPosition, setMapPosition, setSelectedProperty } =
    useLocation();
  const [propertyData, setPropertyData] = useState<
    PropertyWithRelationships | null | undefined
  >(undefined);
  const [loading, setLoading] = useState(false);
  const [claimStatus, setClaimStatus] = useState<ClaimStatusType>("UNCLAIMED");

  const searchParams = useSearchParams();
  const number = searchParams.get("number");
  const street = searchParams.get("street");
  const locality = searchParams.get("locality");
  const region = searchParams.get("region");

  const fetchClaimStatus = useCallback(async (propertyId: string) => {
    fetch(`/api/get-property-claim?propertyId=${propertyId}`)
      .then((status) => status.json())
      .then((data) => {
        if (isClaimStatus(data)) {
          setClaimStatus(data.status);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
  }, []);

  const fetchProperty = useCallback(async () => {
    setClaimStatus("UNCLAIMED");
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
                fetchClaimStatus((data as PropertyWithRelationships).id);
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
      <MapElement
        selectedProperty={selectedProperty}
        baseAddress={{ number, street, locality, region }}
        mapPosition={mapPosition}
        setMapPosition={setMapPosition}
        setSelectedProperty={setSelectedProperty}
        fullScreen={number && street && locality && region ? false : true}
      />
      {number && street && locality && region && (
        <div className="w-full flex justify-center pt-10">
          <div className="flex flex-col w-full max-w-[900px]">
            <SelectedPropertyDetails
              loading={loading}
              baseAddress={{ number, street, locality, region }}
              propertyData={propertyData}
              claimStatus={claimStatus}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MapPage;
