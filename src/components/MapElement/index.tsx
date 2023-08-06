"use client";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { MapPosition, SelectedProperty } from "@/interfaces";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import MapSearch from "../MapSearch";

const access_token = process.env.NEXT_PUBLIC_MAPBOX_MAP_TOKEN || "";
interface MapElementProps {
  selectedProperty: SelectedProperty | null;
  mapPosition: MapPosition;
  fullScreen?: boolean;
}

function MapElement({
  selectedProperty,
  mapPosition,
  fullScreen,
}: MapElementProps) {
  const [isMapHidden, setIsMapHidden] = useState(false);
  const [isOffCenter, setIsOffCenter] = useState(false);

  const initialPosition = selectedProperty
    ? { lat: selectedProperty.lat, lng: selectedProperty.lon, zoom: 18 }
    : mapPosition;

  const [position, setPosition] = useState<MapPosition>(initialPosition);
  const [mapLoaded, setMapLoaded] = useState(false);

  const mapNode = useRef(null);

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
      center: [position.lng, position.lat],
      zoom: position.zoom,
      attributionControl: false,
    });

    document.getElementById("reposition")?.addEventListener("click", () => {
      mapboxMap.flyTo({
        center: [position.lng, position.lat],
        zoom: position.zoom,
        essential: true,
      });
      setIsOffCenter(false);
    });

    mapboxMap.on("load", () => setMapLoaded(true));

    mapboxMap.on("moveend", () => {
      setIsOffCenter(true);
    });

    return () => {
      mapboxMap.remove();
    };
  }, []);

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
          "absolute top-[calc(50%-2%)] left-[calc(50vw-2vw)] w-6 animate-spin text-accent"
        )}
      />
      <div
        ref={mapNode}
        className={clsx(
          isMapHidden
            ? "h-[100px]"
            : fullScreen
            ? "h-[calc(100vh-96px)]"
            : "h-[calc(400px)]",
          "w-full transition-all"
        )}
      />
      <div
        onClick={() => setIsMapHidden(!isMapHidden)}
        className="px-3 z-20 cursor-pointer h-8 flex items-center absolute top-2 right-2 rounded-md bg-accent shadow-lg text-tertiary text-small font-regular tracking-tighter"
      >
        {isMapHidden ? "Expand map" : "Hide map"}
      </div>

      <div
        id="reposition"
        className={clsx(
          fullScreen
            ? "hidden"
            : isOffCenter
            ? !isMapHidden
              ? "block"
              : "hidden"
            : "hidden",
          "px-3 z-20 cursor-pointer h-8 flex items-center absolute bottom-2 right-2 rounded-md bg-accent shadow-lg text-tertiary text-small font-regular tracking-tighter"
        )}
      >
        Re-center
      </div>

      <div
        className={clsx(
          !isMapHidden ? "block" : "hidden",
          "gap-1 z-20 flex flex-col absolute bottom-2 left-2 text-tertiary text-small font-regular transition-all tracking-tighter"
        )}
      >
        <div className="flex gap-3 bg-white px-3 py-1 rounded-lg items-center w-min shadow-lg">
          <div className="w-4 h-4 bg-accent rounded-full border-[1px] border-secondary" />
          <p className="text-small text-primary tracking-tighter">Listed</p>
        </div>

        <div className="flex gap-3 bg-white px-3 py-1 rounded-lg items-center shadow-lg">
          <div className="w-4 h-4 bg-openToSelling rounded-full border-[1px] border-secondary" />
          <p className="text-small text-primary tracking-tighter">
            Open to selling
          </p>
        </div>
      </div>

      <MapSearch
        isMapHidden={isMapHidden}
        selectedProperty={selectedProperty ? true : false}
      />
    </div>
  );
}

export default MapElement;
