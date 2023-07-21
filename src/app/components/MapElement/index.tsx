import clsx from "clsx";
import { useState } from "react";
import { GoogleMap } from "@react-google-maps/api";
import Search from "../Search";
import Script from "next/script";

interface MapElementProps {
  apiKey: string;
}

function MapElement({ apiKey }: MapElementProps) {
  const [isMapHidden, setIsMapHidden] = useState(true);
  const [mapLocation, setMapLocation] = useState({
    lat: -36.789211,
    lng: 174.772339,
    zoom: 10,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  function handleUpdateLocation(lat: number, lng: number, zoom: number) {
    isMapHidden && setIsMapHidden(false);
    setMapLocation({ lat, lng, zoom });
  }

  return (
    <div className="w-full flex-col flex justify-between items-center px-6 lg:px-8 pt-8">
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&`}
        onLoad={() => setIsLoaded(true)}
      />
      <div
        className={clsx(
          isMapHidden ? "h-[100px]" : "h-[calc(100vh-300px)]",
          "w-full overflow-hidden bg-gray-300 transition-all relative rounded-lg shadow-lg flex justify-center items-center"
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
            center={{ lat: mapLocation.lat, lng: mapLocation.lng }}
            zoom={mapLocation.zoom}
            options={{
              mapId: process.env.NEXT_PUBLIC_MAP_ID || "",
              disableDefaultUI: true,
              zoomControl: true,
              tilt: 45,
              keyboardShortcuts: false,
            }}
          />
        )}
      </div>
      {isLoaded && (
        <Search apiKey={apiKey} handleUpdateLocation={handleUpdateLocation} />
      )}
    </div>
  );
}

export default MapElement;
