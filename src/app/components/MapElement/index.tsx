import clsx from "clsx";
import { useMemo, useState } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

function MapElement() {
  const [isMapHidden, setIsMapHidden] = useState(false);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "",
  });
  const center = useMemo(() => ({ lat: -36.789211, lng: 174.772339 }), []);

  return (
    <div className="w-full flex justify-between items-center px-6 lg:px-8 pt-8">
      <div
        className={clsx(
          isMapHidden ? "h-[100px]" : "h-[500px]",
          "w-full bg-gray-300 transition-all relative rounded-md flex justify-center items-center"
        )}
      >
        <div
          onClick={() => setIsMapHidden(!isMapHidden)}
          className="px-3 z-20 cursor-pointer h-8 flex items-center absolute top-2 right-2 rounded-md bg-primary text-tertiary text-sm font-bold"
        >
          {isMapHidden ? "Expand map" : "Hide map"}
        </div>

        {isLoaded && (
          <GoogleMap
            mapContainerStyle={{ height: "100%", width: "100%" }}
            mapContainerClassName="map-container"
            center={center}
            zoom={14}
            options={{
              mapId: process.env.NEXT_PUBLIC_MAP_ID || "",
              disableDefaultUI: true,
            }}
          />
        )}
      </div>
    </div>
  );
}

export default MapElement;
