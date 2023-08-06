import {
  AddressableAddress,
  MapboxFeatures,
  isAddressableAddressArray,
} from "@/interfaces";
import {
  ArrowPathIcon,
  MapPinIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

interface MapSearchProps {
  isMapHidden: boolean;
  selectedProperty: boolean;
  suggestions: (MapboxFeatures | AddressableAddress)[];
  searchType: "places" | "addresses";
  setSearchType: Dispatch<SetStateAction<"places" | "addresses">>;
  queryLoading: boolean;
  handleUpdateQuery: (query: string) => void;
  placesStreetsQuery: string;
  addressesQuery: string;
  isSearching: boolean;
  handleUpdateIsSearching: (value: boolean) => void;
  handleSelect: (
    tab: "places" | "addresses",
    selected: MapboxFeatures | AddressableAddress
  ) => void;
}

function MapSearchSuggestions({
  suggestions,
  handleSelect,
  searchType,
}: MapSearchProps) {
  const isAddressableAddress = isAddressableAddressArray(suggestions);

  return (
    <div className="w-full max-w-[900px]">
      <ul
        className={clsx(
          suggestions.length > 0
            ? "h-full border-t-gray-300 border-t-[1px]"
            : "py-0 h-0",
          "w-full h-min flex flex-col max-w-[900px] bg-white transition-all shadow-lg rounded-b-lg"
        )}
      >
        {suggestions.map((suggestion, index) => (
          <li
            className="w-full py-1 hover:bg-primary tracking-tighter text-primary hover:text-tertiary transition-all cursor-pointer flex items-center px-6"
            onClick={() => handleSelect(searchType, suggestion)}
            key={index}
          >
            {isAddressableAddress ? (
              <>
                {(suggestion as AddressableAddress).street_number}{" "}
                {(suggestion as AddressableAddress).street},{" "}
                {(suggestion as AddressableAddress).locality},{" "}
              </>
            ) : (
              <>
                {(suggestion as MapboxFeatures).properties.name},{" "}
                {(suggestion as MapboxFeatures).properties.feature_type ===
                "street"
                  ? (suggestion as MapboxFeatures).properties.context.locality
                      ?.name ||
                    (suggestion as MapboxFeatures).properties.context.place.name
                  : (suggestion as MapboxFeatures).properties.feature_type ===
                    "place"
                  ? (suggestion as MapboxFeatures).properties.context.country
                      .name
                  : (suggestion as MapboxFeatures).properties.context.region
                      .name}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function MapSearch({
  isMapHidden,
  selectedProperty,
  suggestions,
  searchType,
  setSearchType,
  queryLoading,
  handleUpdateQuery,
  placesStreetsQuery,
  addressesQuery,
  isSearching,
  handleUpdateIsSearching,
  handleSelect,
}: MapSearchProps) {
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
          isSearching
            ? suggestions.length > 0
              ? "rounded-none"
              : "rounded-b-lg"
            : "rounded-lg",
          "flex px-3 py-1 bg-white shadow-lg justify-between"
        )}
      >
        <div className="flex w-full">
          <MapPinIcon
            width={16}
            className={clsx(
              queryLoading ? "hidden" : "block",
              "transition-all text-primary"
            )}
          />
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
                ? "Search suburbs and streets"
                : "Search addresses"
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
        suggestions={suggestions}
        isMapHidden={isMapHidden}
        selectedProperty={selectedProperty}
        searchType={searchType}
        queryLoading={queryLoading}
        setSearchType={setSearchType}
        handleUpdateQuery={handleUpdateQuery}
        placesStreetsQuery={placesStreetsQuery}
        addressesQuery={addressesQuery}
        handleUpdateIsSearching={handleUpdateIsSearching}
        isSearching={isSearching}
        handleSelect={handleSelect}
      />
    </div>
  );
}

export default MapSearch;
