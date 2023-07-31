import JumboSearch from "@/app/components/JumboSearch";
import NavBar from "../../components/NavBar";

function Home() {
  return (
    <div className="bg-tertiary w-full h-full min-h-screen">
      <NavBar />
      <div className="w-full flex flex-col items-center px-6 lg:px-8 py-12 min-h-[calc(100vh-20vh)]">
        <div className="w-full max-w-[800px] mb-10">
          <p className="font-bold text-6xl">
            The easiest way to sell your home privately
          </p>
        </div>
        <JumboSearch />
      </div>
    </div>
  );
}

export default Home;
