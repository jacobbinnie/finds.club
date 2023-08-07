import JumboSearch from "@/components/JumboSearch";
import NavBar from "@/components/NavBar";

function Home() {
  return (
    <div className="bg-tertiary w-full h-full min-h-screen">
      <NavBar />
      <div className="w-full flex flex-col items-center px-6 lg:px-8 pb-12 min-h-[calc(100vh-20vh)]">
        <div className="w-full max-w-[900px] mt-10">
          <p className="font-bold text-6xl tracking-tighter">
            The easiest way to buy & sell homes
            <span className="underline decoration-accent"> privately</span> in
            New Zealand
          </p>
        </div>
        <JumboSearch />
      </div>
    </div>
  );
}

export default Home;
