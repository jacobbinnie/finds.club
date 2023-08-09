"use client";
import MapElement from "@/components/MapElement";
import NavBar from "@/components/NavBar";
import SelectedPropertyDetails from "@/components/SelectedPropertyDetails";

import { PropertyWithRelationships } from "@/interfaces";
import { useLocation } from "@/providers/LocationProvider";
import { useEffect, useState } from "react";

function MapPage() {
  const { selectedProperty, mapPosition, setMapPosition, setSelectedProperty } =
    useLocation();
  const [propertyData, setPropertyData] = useState<
    PropertyWithRelationships | null | undefined
  >(undefined);
  const [loading, setLoading] = useState(false);

  const fetchProperty = async () => {
    if (selectedProperty) {
      setLoading(true);
      fetch(
        `/api/get-property?number=${selectedProperty?.street_number}&street=${selectedProperty?.street}&locality=${selectedProperty?.locality}&region=${selectedProperty?.region}`
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
                setLoading(false);
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
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    fetchProperty();
  }, [selectedProperty]);

  return (
    <div className="bg-tertiary w-full h-full">
      <NavBar />
      <MapElement
        selectedProperty={selectedProperty}
        mapPosition={mapPosition}
        setMapPosition={setMapPosition}
        setSelectedProperty={setSelectedProperty}
        fullScreen={selectedProperty ? false : true}
      />
      {selectedProperty && (
        <div className="w-full flex justify-center pt-10">
          <div className="flex flex-col w-full max-w-[900px]">
            <SelectedPropertyDetails
              addressDetails={selectedProperty}
              propertyData={propertyData}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MapPage;
