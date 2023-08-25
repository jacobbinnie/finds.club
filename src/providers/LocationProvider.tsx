"use client";
import React, { createContext, useContext, useState } from "react";
import { MapPosition, SelectedProperty } from "../interfaces";

interface LocationContextValues {
  selectedProperty: SelectedProperty | null;
  mapPosition: MapPosition;
  setSelectedProperty: (selectedProperty: SelectedProperty | null) => void;
  setMapPosition: (mapPosition: MapPosition) => void;
}

const LocationContext = createContext<LocationContextValues>({
  selectedProperty: null,
  mapPosition: { lat: 40.776676, lng: -73.971321, zoom: 10 },
  setSelectedProperty: () => {},
  setMapPosition: () => {},
});

interface LocationProviderOptions {
  children?: React.ReactNode;
}

export const LocationProvider = ({ children }: LocationProviderOptions) => {
  const [selectedProperty, setSelectedProperty] =
    useState<SelectedProperty | null>(null);

  const [mapPosition, setMapPosition] = useState<MapPosition>({
    lat: 40.776676,
    lng: -73.971321,
    zoom: 12,
  });

  const value = {
    selectedProperty,
    mapPosition,
    setSelectedProperty,
    setMapPosition,
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
