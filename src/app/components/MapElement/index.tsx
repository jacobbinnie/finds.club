import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { MapPosition, SelectedProperty } from "@/app/interfaces";

const access_token = process.env.NEXT_PUBLIC_MAPBOX_MAP_TOKEN || "";
interface MapElementProps {
  selectedProperty: SelectedProperty | null;
  mapPosition: MapPosition;
}

function MapElement({ selectedProperty, mapPosition }: MapElementProps) {
  const [isMapHidden, setIsMapHidden] = useState(false);

  const position = selectedProperty ?? mapPosition;

  const mapNode = useRef(null);

  useEffect(() => {
    const node = mapNode.current;

    if (typeof window === "undefined" || node === null) return;

    const mapboxMap = new mapboxgl.Map({
      container: node,
      accessToken: access_token,
      style: "mapbox://styles/jacobbinnie/clkt9g77a004w01pp11bb3hbd",
      center: [position.lng, position.lat],
      zoom: position.zoom,
      attributionControl: false,
    });

    return () => {
      mapboxMap.remove();
    };
  }, []);

  return (
    <div className="w-full relative overflow-hidden h-100%">
      <div
        ref={mapNode}
        className={clsx(
          isMapHidden ? "h-[100px]" : "h-[calc(100vh-300px)]",
          "w-full transition-all"
        )}
      />
      <div
        onClick={() => setIsMapHidden(!isMapHidden)}
        className="px-3 z-20 cursor-pointer h-8 flex items-center absolute top-2 right-2 rounded-md bg-accent shadow-lg text-tertiary text-small font-regular tracking-tighter"
      >
        {isMapHidden ? "Expand map" : "Hide map"}
      </div>
    </div>
  );
}

export default MapElement;
