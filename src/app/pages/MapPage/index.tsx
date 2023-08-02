import MapElement from "@/app/components/MapElement";
import NavBar from "@/app/components/NavBar";

function MapPage() {
  const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  if (MAPBOX_ACCESS_TOKEN === undefined) {
    return <p>Loading Access Token</p>;
  }

  return (
    <div className="bg-tertiary w-full h-full min-h-screen">
      <NavBar />
      <MapElement apiKey={MAPBOX_ACCESS_TOKEN} />
    </div>
  );
}

export default MapPage;
