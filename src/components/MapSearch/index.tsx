import {
  ArrowPathIcon,
  MapPinIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

interface MapSearchProps {
  selectedProperty: boolean;
  searchType: "places" | "addresses";
  setSearchType: Dispatch<SetStateAction<"places" | "addresses">>;
  queryLoading: boolean;
  handleUpdateQuery: (query: string) => void;
  placesStreetsQuery: string;
  addressesQuery: string;
  isSearching: boolean;
  handleUpdateIsSearching: (value: boolean) => void;
}

function MapSearchSuggestions({ searchType }: MapSearchProps) {
  return <div className="w-full max-w-[900px]"></div>;
}

function MapSearch({
  selectedProperty,

  searchType,
  setSearchType,
  queryLoading,
  handleUpdateQuery,
  placesStreetsQuery,
  addressesQuery,
  isSearching,
  handleUpdateIsSearching,
}: MapSearchProps) {
  return (
    <div
      className={clsx(
        isSearching
          ? "w-full sm:w-full max-w-[500px]"
          : "w-44 rounded-lg max-w-[500px]",

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
          Search
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
          Find user
        </p>
      </div>

      <div className="flex px-3 py-1 bg-white shadow-lg justify-between">
        <div className="flex w-full">
          <MapPinIcon
            width={16}
            className={clsx(
              searchType === "places"
                ? queryLoading
                  ? "hidden"
                  : "block"
                : isSearching
                ? "hidden"
                : "block",
              "transition-all text-primary"
            )}
          />
          <p
            className={clsx(
              !isSearching
                ? "hidden"
                : searchType === "addresses"
                ? queryLoading
                  ? "hidden"
                  : "block"
                : "hidden",
              "transition-all text-primary font-bold mt-[-2px]"
            )}
          >
            @
          </p>
          <ArrowPathIcon
            width={16}
            className={clsx(
              queryLoading ? "block animate-spin" : "hidden",
              "transition-all text-primary"
            )}
          />
          <p
            onClick={() => handleUpdateIsSearching(true)}
            className={clsx(
              isSearching ? "hidden" : "block",
              "text-small px-3 text-gray-300 w-full tracking-tighter cursor-pointer"
            )}
          >
            Search...
          </p>
          <input
            autoComplete="shipping address-line1"
            value={
              searchType === "places"
                ? placesStreetsQuery ?? ""
                : addressesQuery ?? ""
            }
            onChange={(e) => handleUpdateQuery(e.target.value)}
            className={clsx(
              isSearching ? "block" : "hidden",
              "text-small w-full focus:border-none placeholder:text-gray-300 bg-transparent text-primary px-3 tracking-tighter transition-all focus:outline-none focus:"
            )}
            placeholder={
              searchType === "places"
                ? "neighborhood, restaurant, cafe.."
                : "michaelscott"
            }
          />
        </div>
        <XCircleIcon
          onClick={() => {
            handleUpdateIsSearching(false);
          }}
          className={clsx(
            isSearching ? "block" : "hidden",
            "w-5 text-gray-300 cursor-pointer"
          )}
        />
      </div>

      <MapSearchSuggestions
        selectedProperty={selectedProperty}
        searchType={searchType}
        queryLoading={queryLoading}
        setSearchType={setSearchType}
        handleUpdateQuery={handleUpdateQuery}
        placesStreetsQuery={placesStreetsQuery}
        addressesQuery={addressesQuery}
        handleUpdateIsSearching={handleUpdateIsSearching}
        isSearching={isSearching}
      />
    </div>
  );
}

export default MapSearch;
