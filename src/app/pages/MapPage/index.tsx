import ActionBar from "@/app/components/ActionBar";
// import FilterBar from "@/app/components/FilterBar";
import MapElement from "@/app/components/MapElement";
import NavBar from "@/app/components/NavBar";
import PropertyGrid from "@/app/components/PropertyGrid";

function MapPage() {
  const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  if (GOOGLE_API_KEY === undefined) {
    return <p>Loading API Key</p>;
  }

  return (
    <div className="bg-tertiary w-full h-full min-h-screen">
      <NavBar />
      <ActionBar />
      <MapElement apiKey={GOOGLE_API_KEY} />
      {/* <Search apiKey={GOOGLE_API_KEY} /> */}
      {/* <FilterBar /> */}
      <PropertyGrid />
    </div>
  );
}

export default MapPage;
