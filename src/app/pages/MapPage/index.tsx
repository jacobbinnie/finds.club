import MapElement from "@/app/components/MapElement";
import NavBar from "@/app/components/NavBar";
import { useLocation } from "@/app/providers/location";

function MapPage() {
  const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  const { selectedProperty, mapPosition } = useLocation();

  if (MAPBOX_ACCESS_TOKEN === undefined) {
    return <p>Loading Access Token</p>;
  }

  return (
    <div className="bg-tertiary w-full h-full min-h-screen">
      <NavBar />
      <MapElement
        apiKey={MAPBOX_ACCESS_TOKEN}
        selectedProperty={selectedProperty}
        mapPosition={mapPosition}
      />
    </div>
  );
}

export default MapPage;
