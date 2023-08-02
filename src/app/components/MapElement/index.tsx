import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
interface MapElementProps {
  apiKey: string;
}

function MapElement({ apiKey }: MapElementProps) {
  const [isMapHidden, setIsMapHidden] = useState(false);
  const [mapLocation, setMapLocation] = useState({
    lat: -36.789211,
    lng: 174.772339,
    zoom: 10,
  });

  // function handleUpdateLocation(lat: number, lng: number, zoom: number) {
  //   isMapHidden && setIsMapHidden(false);
  //   setMapLocation({ lat, lng, zoom });
  // }

  const mapNode = useRef(null);

  useEffect(() => {
    const node = mapNode.current;

    if (typeof window === "undefined" || node === null) return;

    const mapboxMap = new mapboxgl.Map({
      container: node,
      accessToken: apiKey,
      style: "mapbox://styles/jacobbinnie/clkt9g77a004w01pp11bb3hbd",
      center: [mapLocation.lng, mapLocation.lat],
      zoom: mapLocation.zoom,
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
