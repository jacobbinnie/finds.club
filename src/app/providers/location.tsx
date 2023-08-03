"use client";
import React, { createContext, useContext, useState } from "react";
import { MapPosition, SelectedProperty } from "../interfaces";

interface LocationContextValues {
  selectedProperty: SelectedProperty | null;
  mapPosition: MapPosition;
}

const LocationContext = createContext<LocationContextValues>({
  selectedProperty: null,
  mapPosition: { lat: -36.789211, lng: 174.772339, zoom: 10 },
});

interface LocationProviderOptions {
  children?: React.ReactNode;
}

export const LocationProvider = ({ children }: LocationProviderOptions) => {
  const [selectedProperty, setSelectedProperty] =
    useState<SelectedProperty | null>(null);

  const [mapPosition, setMapPosition] = useState<MapPosition>({
    lat: -36.789211,
    lng: 174.772339,
    zoom: 12,
  });

  const value = {
    selectedProperty,
    mapPosition,
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
