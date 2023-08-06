import { XCircleIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useState } from "react";

interface MapSearchProps {
  isMapHidden: boolean;
  selectedProperty: boolean;
}

function MapSearch({ isMapHidden, selectedProperty }: MapSearchProps) {
  const [isSearching, setIsSearching] = useState(false);
  const [searchType, setSearchType] = useState<"places" | "addresses">(
    "places"
  );

  return (
    <div
      className={clsx(
        selectedProperty
          ? "hidden"
          : !isMapHidden
          ? isSearching
            ? "w-full sm:w-96"
            : "w-36 rounded-lg"
          : "hidden w-0",
        "gap-1 px-2 z-20 rounded-lg flex flex-col absolute top-2 text-tertiary text-small font-regular transition-all tracking-tighter"
      )}
    >
      <div
        className={clsx(
          isSearching ? "flex" : "hidden",
          "w-full bg-white rounded-t-lg overflow-hidden shadow-lg"
        )}
      >
        <p
          onClick={() => setSearchType("places")}
          className={clsx(
            searchType === "places"
              ? "bg-accent text-tertiary"
              : "bg-white text-primary",
            "text-small px-3 py-1 text-center w-1/2 tracking-tighter cursor-pointer transition-all"
          )}
        >
          Places
        </p>
        <p
          onClick={() => setSearchType("addresses")}
          className={clsx(
            searchType === "addresses"
              ? "bg-accent text-tertiary"
              : "bg-white text-primary",
            "text-small px-3 text-center py-1 w-1/2 tracking-tighter cursor-pointer transition-all duration-300"
          )}
        >
          Addresses
        </p>
      </div>

      <div
        className={clsx(
          isSearching ? "rounded-b-lg" : "rounded-lg",
          "flex px-3 py-1 bg-white shadow-lg"
        )}
      >
        <p
          onClick={() => setIsSearching(true)}
          className={clsx(
            isSearching ? "hidden" : "block",
            "text-small text-primary w-full tracking-tighter cursor-pointer"
          )}
        >
          Search...
        </p>
        <XCircleIcon
          onClick={() => setIsSearching(false)}
          className={clsx(
            isSearching ? "block" : "hidden",
            "w-5 text-gray-300 cursor-pointer"
          )}
        />
        <input
          className={clsx(
            isSearching ? "block" : "hidden",
            "text-small placeholder:text-gray-300 bg-transparent text-primary px-3 tracking-tighter transition-all focus:outline-none focus:"
          )}
          placeholder={
            searchType === "places"
              ? "Search suburbs and streets"
              : "Search addresses"
          }
        />
      </div>
    </div>
  );
}

export default MapSearch;
