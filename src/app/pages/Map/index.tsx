import NavBar from "@/app/components/NavBar";

interface MapProps {}

function Map({}: MapProps) {
  return (
    <div className="bg-tertiary w-full h-full min-h-screen">
      <NavBar />
      <div className="w-full flex justify-between items-center px-6 lg:px-8 py-8">
        <div className="w-full min-h-[calc(100vh-160px)] bg-accent flex justify-center items-center shadow-lg">
          <p className="text-primary text-lg font-bold">Map</p>
        </div>
      </div>
    </div>
  );
}

export default Map;
