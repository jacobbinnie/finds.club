import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { MapPosition, SelectedProperty } from "@/app/interfaces";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

const access_token = process.env.NEXT_PUBLIC_MAPBOX_MAP_TOKEN || "";
interface MapElementProps {
  selectedProperty: SelectedProperty | null;
  mapPosition: MapPosition;
}

function MapElement({ selectedProperty, mapPosition }: MapElementProps) {
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
          isMapHidden ? "h-[100px] w-full" : "h-[calc(400px)]",
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
          isOffCenter ? (!isMapHidden ? "block" : "hidden") : "hidden",
          "px-3 z-20 cursor-pointer h-8 flex items-center absolute bottom-2 right-2 rounded-md bg-accent shadow-lg text-tertiary text-small font-regular tracking-tighter"
        )}
      >
        Re-center
      </div>
    </div>
  );
}

export default MapElement;
