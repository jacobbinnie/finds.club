"use client";
import { Bars3Icon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function NavBar() {
  const isSignedIn = true;
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [isSliderOpen]);

  const menuItems = [
    {
      title: "home",
      href: "/",
    },
    {
      title: "map",
      href: "/map",
    },
    {
      title: "pricing",
      href: "/pricing",
    },
    {
      title: "services",
      href: "/services",
    },
    {
      title: "my properties",
      href: "/my-properties",
    },
  ];

  const renderDesktopMenuItems = () => {
    const filteredItems = menuItems.filter((item) => item.title !== "home");

    return filteredItems.map((item) => (
      <a
        key={item.title}
        className="text-small text-secondary hover:text-accent"
        href={item.href}
      >
        {item.title}
      </a>
    ));
  };

  const renderMobileMenuItems = () => {
    const filteredItems = menuItems.filter((item) => item.href !== pathname);

    return filteredItems.map((item) => (
      <a
        key={item.title}
        className="text-5xl rounded-lg text-tertiary hover:text-primary hover:tracking-tight tracking-tighter font-bold hover:primary transition-all"
        href={item.href}
      >
        {item.title}
      </a>
    ));
  };

  return (
    <div className="w-full relative bg-tertiary border-b-[1px]">
      <div
        className={clsx(
          isSliderOpen ? "w-full" : "w-0",
          "top-0 fixed overscroll-none right-0 h-[100vh] bg-accent z-20 transition-all"
        )}
      />
      <div
        className={clsx(
          isSliderOpen ? "w-full" : "w-0",
          "top-0 fixed overscroll-none right-0 h-screen bg-accent z-30 transition-all"
        )}
      >
        <div
          className={clsx(
            isSliderOpen ? "flex" : "hidden",
            "w-full flex-col justify-between px-6 py-6 gap-6 h-full"
          )}
        >
          <div className="flex flex-col gap-3">{renderMobileMenuItems()}</div>
          <a
            key={"Back"}
            className="text-5xl text-primary cursor-pointer hover:tracking-tight tracking-tighter font-bold hover:primary transition-all"
            onClick={() => setIsSliderOpen(false)}
          >
            back
          </a>
        </div>
      </div>

      <div className="relative flex w-full h-16 justify-between items-center px-6">
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

        <div className="whitespace-nowrap w-full items-center gap-6 ml-10 hidden sm:flex transition-all tracking-tighter">
          {renderDesktopMenuItems()}
        </div>

        <div className="flex items-center gap-6">
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

          <Bars3Icon
            onClick={() => setIsSliderOpen(true)}
            className="w-6 h-6 text-gray-500 sm:hidden cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
