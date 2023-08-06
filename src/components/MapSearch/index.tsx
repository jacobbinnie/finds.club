import { XCircleIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useState } from "react";

interface MapSearchProps {
  isMapHidden: boolean;
  selectedProperty: boolean;
}

function MapSearch({ isMapHidden, selectedProperty }: MapSearchProps) {
  const [isSearching, setIsSearching] = useState(false);

  return (
    <div
      className={clsx(
        selectedProperty ? "hidden" : !isMapHidden ? "block" : "hidden",
        "gap-1 z-20 flex flex-col absolute bottom-2 right-2 text-tertiary text-small font-regular transition-all tracking-tighter"
      )}
    >
      <div
        className={clsx(
          isSearching ? "w-full" : "w-min",
          "flex gap-3 bg-white px-3 py-1 rounded-lg items-center w-full transition-all shadow-lg"
        )}
      >
        <p
          onClick={() => setIsSearching(true)}
          className={clsx(
            isSearching ? "hidden" : "block",
            "text-small text-primary tracking-tighter cursor-pointer"
          )}
        >
          Search...
        </p>
        <XCircleIcon
          onClick={() => setIsSearching(false)}
          className={clsx(
            isSearching ? "block" : "hidden",
            "w-6 text-primary cursor-pointer"
          )}
        />
        <input
          className={clsx(
            isSearching ? "block" : "hidden",
            "text-small text-primary tracking-tighter transition-all focus:outline-none focus:"
          )}
          placeholder="Enter a suburb / street / road"
        />
      </div>
    </div>
  );
}

export default MapSearch;
