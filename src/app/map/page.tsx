"use client";
import MapElement from "@/components/MapElement";
import NavBar from "@/components/NavBar";
import SelectedPropertyDetails from "@/components/SelectedPropertyDetails";
import { useLocation } from "@/providers/LocationProvider";
import { useEffect } from "react";

function MapPage() {
  const { selectedProperty, mapPosition } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [selectedProperty]);

  return (
    <div className="bg-tertiary w-full h-full min-h-screen">
      <NavBar />
      <MapElement
        selectedProperty={selectedProperty}
        mapPosition={mapPosition}
        fullScreen={selectedProperty ? false : true}
      />
      {selectedProperty && (
        <div className="w-full flex justify-center pt-10">
          <div className="flex flex-col w-full max-w-[900px]">
            <SelectedPropertyDetails addressDetails={selectedProperty} />
          </div>
        </div>
      )}
    </div>
  );
}

export default MapPage;
