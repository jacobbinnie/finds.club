"use client";
import React, { createContext, useContext, useState } from "react";
import { MapPosition } from "../interfaces";

interface LocationContextValues {
  mapPosition: MapPosition;
  setMapPosition: (mapPosition: MapPosition) => void;
}

const LocationContext = createContext<LocationContextValues>({
  mapPosition: { lat: 40.776676, lng: -73.971321, zoom: 10 },
  setMapPosition: () => {},
});

interface LocationProviderOptions {
  children?: React.ReactNode;
}

export const LocationProvider = ({ children }: LocationProviderOptions) => {
  const [mapPosition, setMapPosition] = useState<MapPosition>({
    lat: 40.776676,
    lng: -73.971321,
    zoom: 12,
  });

  const value = {
    mapPosition,
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
