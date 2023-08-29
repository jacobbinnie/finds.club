import NavBar from "@/components/HeaderNav";

function Home() {
  return (
    <div className="bg-tertiary w-full h-full min-h-screen">
      <NavBar />
      <div className="w-full flex flex-col items-center px-6 lg:px-8 pb-12 min-h-[calc(100vh-20vh)] justify-center">
        <div className="w-full max-w-[900px] my-10 flex flex-col">
          <p className="font-bold text-5xl lg:text-6xl tracking-tighter transition-all">
            Share your best food finds with your friends
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-10 items-center">
            <div className="flex gap-3 items-center border-2 px-3 rounded-lg">
              <p className="transition-all text-primary font-bold mt-[-2px]">
                @
              </p>
              <input
                placeholder="michaelscott"
                className="w-full h-12 text-lg bg-transparent font-normal tracking-tighter placeholder:text-gray-200 focus:outline-none"
              />
            </div>
            <p className="font-bold bg-accent px-6 h-12 flex items-center rounded-lg w-min whitespace-nowrap text-2xl tracking-tighter transition-all">
              Claim username
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
