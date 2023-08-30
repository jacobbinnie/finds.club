"use client";
import React, { createContext, useContext, useState } from "react";
import { MapPosition } from "../interfaces";
import { PlaceDeconstructed, PlacesFeature } from "@/interfaces/places";

interface LocationContextValues {
  mapPosition: MapPosition;
  setMapPosition: (mapPosition: MapPosition) => void;
  selectedPoi: PlaceDeconstructed | null;
  handleUpdateSelectedPoi: (value: PlaceDeconstructed | null) => void;
}

const LocationContext = createContext<LocationContextValues>({
  mapPosition: { lat: 40.776676, lng: -73.971321, zoom: 10 },
  setMapPosition: () => {},
  selectedPoi: null,
  handleUpdateSelectedPoi: () => null,
});

interface LocationProviderOptions {
  children?: React.ReactNode;
}

export const LocationProvider = ({ children }: LocationProviderOptions) => {
  const [selectedPoi, setSelectedPoi] = useState<PlaceDeconstructed | null>(
    null
  );

  const [mapPosition, setMapPosition] = useState<MapPosition>({
    lat: 40.776676,
    lng: -73.971321,
    zoom: 0,
  });

  const handleUpdateSelectedPoi = (value: PlaceDeconstructed | null) => {
    setSelectedPoi(value);
  };

  const value = {
    mapPosition,
    setMapPosition,
    selectedPoi,
    handleUpdateSelectedPoi,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  return useContext(LocationContext);
};
