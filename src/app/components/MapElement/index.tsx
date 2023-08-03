import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { MapPosition, SelectedProperty } from "@/app/interfaces";
interface MapElementProps {
  apiKey: string;
  selectedProperty: SelectedProperty | null;
  mapPosition: MapPosition;
}

async function MapElement({
  apiKey,
  selectedProperty,
  mapPosition,
}: MapElementProps) {
  const [isMapHidden, setIsMapHidden] = useState(false);

  const mapNode = useRef(null);

  useEffect(() => {
    const node = mapNode.current;

    if (typeof window === "undefined" || node === null) return;

    const mapboxMap = new mapboxgl.Map({
      container: node,
      accessToken: apiKey,
      style: "mapbox://styles/jacobbinnie/clkt9g77a004w01pp11bb3hbd",
      center: [mapPosition.lng, mapPosition.lat],
      zoom: mapPosition.zoom,
      attributionControl: false,
    });

    return () => {
      mapboxMap.remove();
    };
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={mapNode}
        className={clsx(
          isMapHidden ? "h-[100px]" : "h-[calc(100vh-400px)]",
          "w-full"
        )}
      />
    </div>
  );
}

export default MapElement;
