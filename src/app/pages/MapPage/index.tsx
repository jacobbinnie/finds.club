import MapElement from "@/app/components/MapElement";
import NavBar from "@/app/components/NavBar";
import { useLocation } from "@/app/providers/LocationProvider";
import { useEffect } from "react";

function MapPage() {
  const { selectedProperty, mapPosition } = useLocation();

  if (!selectedProperty) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [selectedProperty]);

  return (
    <div className="bg-tertiary w-full h-full min-h-screen">
      <NavBar />
      <MapElement
        selectedProperty={selectedProperty}
        mapPosition={mapPosition}
      />
    </div>
  );
}

export default MapPage;
