function NavBar() {
  return (
    <div className="w-full mx-auto bg-tertiary border-b shadow-sm">
      <div className="relative flex flex-col w-full h-24 justify-center mx-auto md:items-center md:justify-between md:flex-row px-8">
        <div className="bg-accent w-min flex flex-row items-center justify-between lg:justify-start rounded-md">
          <a
            className="text-lg py-1 tracking-tight text-primary shadow-lg uppercase focus:outline-none focus:ring"
            href="/"
          >
            <span className="lg:text-lg font-bold lowercase focus:ring-0">
              Lettrbox
            </span>
          </a>
        </div>
        <nav className="flex-col ml-6 items-center mt-1 flex-grow hidden md:pb-0 md:flex md:justify-end md:flex-row">
          <div>
            <a
              className="px-2 py-2 text-sm text-secondary lg:px-6 md:px-3 hover:text-accent lg:ml-auto"
              href="#"
            >
              buyers
            </a>
            <a
              className="px-2 py-2 text-sm text-secondary lg:px-6 md:px-3 hover:text-accent"
              href="#"
            >
              homeowners
            </a>
            <a
              className="px-2 py-2 text-sm text-secondary lg:px-6 md:px-3 hover:text-accent"
              href="#"
            >
              pricing
            </a>
          </div>

          <div className="inline-flex items-center gap-2 list-none lg:ml-auto">
            <button className="block px-4 py-2 mt-2 text-sm text-gray-500 md:mt-0 hover:text-accent focus:outline-none focus:shadow-outline">
              Sign in
            </button>
            <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-bold transition-all hover:px-10 hover:shadow-lg rounded-md text-tertiary bg-primary group focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 hover:text-primary hover:bg-accent">
              Sign up
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default NavBar;
