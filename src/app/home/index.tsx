import JumboSearch from "@/components/JumboSearch";
import NavBar from "@/components/HeaderNav";

function Home() {
  return (
    <div className="bg-tertiary w-full h-full min-h-screen">
      <NavBar />
      <div className="w-full flex flex-col items-center px-6 lg:px-8 pb-12 min-h-[calc(100vh-20vh)]">
        <div className="w-full max-w-[900px] my-10">
          <p className="font-bold text-5xl lg:text-6xl tracking-tighter transition-all">
            Share your best food finds with your friends
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
