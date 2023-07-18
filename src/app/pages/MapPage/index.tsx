import Search from "@/app/components/Search";
import MapElement from "@/app/components/MapElement";
import NavBar from "@/app/components/NavBar";

function MapPage() {
  return (
    <div className="bg-tertiary w-full h-full min-h-screen">
      <NavBar />
      <MapElement />
      <Search />
    </div>
  );
}

export default MapPage;
