import ActionBar from "@/app/components/ActionBar";
import FilterBar from "@/app/components/FilterBar";
import MapElement from "@/app/components/MapElement";
import NavBar from "@/app/components/NavBar";
import PropertyGrid from "@/app/components/PropertyGrid";
import Search from "@/app/components/Search";

function MapPage() {
  return (
    <div className="bg-tertiary w-full h-full min-h-screen">
      <NavBar />
      <ActionBar />
      <MapElement />
      <Search />
      <FilterBar />
      <PropertyGrid />
    </div>
  );
}

export default MapPage;
