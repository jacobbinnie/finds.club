import MapElement from "@/app/components/MapElement";
import NavBar from "@/app/components/NavBar";
import { useLocation } from "@/app/providers/LocationProvider";

function MapPage() {
  const { selectedProperty, mapPosition } = useLocation();

  if (!selectedProperty) {
    return <div>Loading...</div>;
  }

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
