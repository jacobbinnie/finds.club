import JumboSearch from "@/app/components/JumboSearch";
import NavBar from "../../components/NavBar";

function Home() {
  return (
    <div className="bg-tertiary w-full h-full min-h-screen">
      <NavBar />
      <div className="w-full flex justify-between px-6 lg:px-8 py-12 min-h-[calc(100vh-20vh)]">
        <JumboSearch />
      </div>
    </div>
  );
}

export default Home;
