import { SearchType } from "@/interfaces";
import { PlacesSuggestion } from "@/interfaces/places";
import {
  ArrowPathIcon,
  MapPinIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import MapSearchSuggestions from "../MapSearchSuggestions";

interface MapSearchProps {
  suggestions: PlacesSuggestion[] | []; // TODO: Add profile suggestions
  searchType: SearchType;
  setSearchType: Dispatch<SetStateAction<SearchType>>;
  queryLoading: boolean;
  handleUpdateQuery: (query: string) => void;
  handleSelect: (searchType: SearchType, suggestion: PlacesSuggestion) => void;
  placesQuery: string;
  profilesQuery: string;
  isSearching: boolean;
  handleUpdateIsSearching: (value: boolean) => void;
}

function MapSearch({
  suggestions,
  searchType,
  setSearchType,
  queryLoading,
  handleUpdateQuery,
  handleSelect,
  placesQuery,
  profilesQuery,
  isSearching,
  handleUpdateIsSearching,
}: MapSearchProps) {
  return (
    <div
      className={clsx(
        isSearching
          ? "w-full sm:w-full max-w-[500px]"
          : "w-44 rounded-lg max-w-[500px]",
        "gap-1 px-[6px] z-20 rounded-lg flex flex-col absolute top-[6px] text-tertiary text-small font-regular transition-all tracking-tighter"
      )}
    >
      <div
        className={clsx(
          isSearching ? "h-8 opacity-100" : "h-0 opacity-0",
          "w-full bg-white flex rounded-t-lg overflow-hidden shadow-lg transition-all"
        )}
      >
        <p
          onClick={() => setSearchType("PLACES")}
          className={clsx(
            searchType === "PLACES"
              ? "bg-accent text-tertiary"
              : "bg-white text-primary",
            "text-small px-3 py-1 text-center w-1/2 tracking-tighter cursor-pointer transition-all"
          )}
        >
          Search
        </p>
        <p
          onClick={() => setSearchType("PROFILES")}
          className={clsx(
            searchType === "PROFILES"
              ? "bg-accent text-tertiary"
              : "bg-white text-primary",
            "text-small px-3 text-center py-1 w-1/2 tracking-tighter cursor-pointer transition-all duration-300"
          )}
        >
          Find user
        </p>
      </div>

      <div
        className={clsx(
          isSearching
            ? suggestions.length > 0
              ? "rounded-none"
              : "rounded-b-lg"
            : "rounded-lg",
          "flex px-3 py-1 bg-white shadow-lg justify-between transition-all"
        )}
      >
        <div className="flex w-full">
          <MapPinIcon
            width={16}
            className={clsx(
              searchType === "PLACES"
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
                : searchType === "PROFILES"
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
              searchType === "PLACES" ? placesQuery ?? "" : profilesQuery ?? ""
            }
            onChange={(e) => handleUpdateQuery(e.target.value)}
            className={clsx(
              isSearching ? "block" : "hidden",
              "text-small w-full focus:border-none placeholder:text-gray-300 bg-transparent text-primary px-3 tracking-tighter transition-all focus:outline-none focus:"
            )}
            placeholder={
              searchType === "PLACES"
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
        suggestions={suggestions}
        searchType={searchType}
        handleSelect={handleSelect}
      />
    </div>
  );
}

export default MapSearch;
