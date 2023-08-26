"use client";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { MapPosition } from "@/interfaces";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import MapSearch from "../MapSearch";

import { useRouter } from "next/navigation";

const access_token = process.env.NEXT_PUBLIC_MAPBOX_MAP_TOKEN || "";
interface MapElementProps {
  mapPosition: MapPosition;
  setMapPosition: (mapPosition: MapPosition) => void;
  fullScreen?: boolean;
}

function MapElement({
  mapPosition,
  fullScreen,
  setMapPosition,
}: MapElementProps) {
  const [currentMap, setCurrentMap] = useState<mapboxgl.Map | null>(null);

  const [mapLoaded, setMapLoaded] = useState(false);

  const mapNode = useRef(null);

  useEffect(() => {
    currentMap?.flyTo({
      center: [mapPosition.lat, mapPosition.lng],
      zoom: mapPosition.zoom,
    });
  }, [mapPosition]);

  useEffect(() => {
    const node = mapNode.current;

    if (typeof window === "undefined" || node === null) return;

    if (mapNode.current !== null) {
      mapNode.current;
    }

    const mapboxMap = new mapboxgl.Map({
      container: node,
      accessToken: access_token,
      style: "mapbox://styles/jacobbinnie/clkt9g77a004w01pp11bb3hbd",
      center: [mapPosition.lng, mapPosition.lat],
      zoom: mapPosition.zoom,
      attributionControl: false,
    });

    setCurrentMap(mapboxMap);

    mapboxMap.on("load", () => setMapLoaded(true));

    return () => {
      mapboxMap.remove();
    };
  }, []);

  useEffect(() => {
    if (currentMap) {
      setTimeout(() => {
        currentMap.resize();
      }, 250);
    }
  }, [fullScreen]);

  window.addEventListener("resize", () => {
    if (currentMap) {
      setTimeout(() => {
        currentMap.resize();
      }, 250);
    }
  });

  return (
    <div
      className={clsx(
        mapLoaded ? "bg-transparent" : "bg-gray-400 animate-pulse",
        "w-full relative overflow-hidden h-100% flex"
      )}
    >
      <ArrowPathIcon
        className={clsx(
          mapLoaded && "hidden",
          "absolute top-[calc(50%-2%)] left-[calc(50%-2%)] w-6 animate-spin text-accent"
        )}
      />
      <div
        ref={mapNode}
        className="w-full transition-all h-[400px] sm:h-full"
      />

      {/* <MapSearch
        selectedProperty={selectedProperty ? true : false}
        suggestions={
          searchType === "places"
            ? placesStreetsSuggestions
            : addressSuggestions
        }
        searchType={searchType}
        setSearchType={setSearchType}
        queryLoading={
          searchType === "places" ? placesStreetsLoading : addressLoading
        }
        handleUpdateQuery={handleUpdateQuery}
        placesStreetsQuery={placesStreetsQuery}
        addressesQuery={addressesQuery}
        isSearching={isSearching}
        handleUpdateIsSearching={handleUpdateIsSearching}
        handleSelect={handleSelect}
      /> */}
    </div>
  );
}

export default MapElement;
