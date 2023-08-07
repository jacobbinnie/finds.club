function NavBar() {
  const isSignedIn = true;

  return (
    <div className="w-full bg-tertiary border-b-[1px]">
      <div className="relative flex w-full h-16 justify-between px-6">
        <div className="h-full w-min flex items-center justify-between rounded-md">
          <a
            className="text-lg tracking-tight text-primary uppercase focus:outline-none focus:ring"
            href="/"
          >
            <span className="lg:text-lg font-bold lowercase focus:ring-0">
              Lettrbox
            </span>
          </a>
        </div>

        <div className="whitespace-nowrap w-full items-center gap-6 ml-10 hidden sm:flex transition-all">
          <a
            className="text-small text-secondary hover:text-accent"
            href="/map"
          >
            map
          </a>
          <a className="text-small text-secondary hover:text-accent">pricing</a>
          <a className="text-small text-secondary hover:text-accent">
            for services
          </a>
        </div>

        {isSignedIn ? (
          <div className="flex items-center gap-6 list-none lg:ml-auto">
            <button className="inline-flex tracking-tighter items-center justify-center px-4 py-1 text-small transition-all hover:px-10 hover:shadow-lg rounded-md text-tertiary bg-primary group focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 hover:bg-accent">
              Messages
            </button>
            <button className="block py-2 text-small text-gray-500 md:mt-0 hover:text-accent focus:outline-none focus:shadow-outline">
              <div className="w-6 h-6 rounded-full bg-accent" />
            </button>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 list-none lg:ml-auto">
            <button className="block px-4 py-2 mt-2 text-small text-gray-500 md:mt-0 hover:text-accent focus:outline-none focus:shadow-outline">
              Sign in
            </button>
            <button className="inline-flex items-center justify-center px-4 h-8 text-small font-bold transition-all hover:px-10 hover:shadow-lg rounded-md text-tertiary bg-primary group focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 hover:text-primary hover:bg-accent">
              Sign up
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
