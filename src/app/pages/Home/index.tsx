import NavBar from "../../components/NavBar";

function Home() {
  return (
    <div className="bg-tertiary w-full h-full min-h-screen">
      <NavBar />
      <div className="w-full flex justify-between items-center px-6 lg:px-8 py-12 min-h-[calc(100vh-20vh)]">
        <div className="w-full max-w-2xl">
          <p className="text-primary text-4xl lg:text-5xl xl:text-6xl font-bold">
            Discover the <span className="bg-accent">discreet</span> way to sell
            your home
          </p>
          <p className="text-primary text-sm lg:text-lg xl:text-xl mt-6">
            Engage in real-time conversations with potential buyers and
            negotiate offers – all with complete transparency. No agents.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
