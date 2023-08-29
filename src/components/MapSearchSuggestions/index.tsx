import { SearchType } from "@/interfaces";
import { PlacesSuggestion, isPlacesSuggestions } from "@/interfaces/places";
import clsx from "clsx";

interface MapSearchSuggestionsProps {
  suggestions: PlacesSuggestion[];
  handleSelect: (searchType: SearchType, suggestion: PlacesSuggestion) => void;
  searchType: SearchType;
}

function MapSearchSuggestions({
  suggestions,
  handleSelect,
  searchType,
}: MapSearchSuggestionsProps) {
  const isPlacesSuggestionsArray = isPlacesSuggestions(suggestions);

  return (
    <div className="w-full max-w-[900px] rounded-b-lg overflow-hidden">
      <ul
        className={clsx(
          suggestions.length > 0
            ? "h-full border-t-gray-200 border-t-[1px]"
            : "py-0 h-0",
          "w-full max-w-[900px] bg-white transition-all shadow-lg rounded-b-lg"
        )}
      >
        {suggestions.map((suggestion, index) => (
          <li
            className="w-full hover:bg-gray-100 cursor-pointer"
            onClick={() => handleSelect(searchType, suggestion)}
            key={index}
          >
            {isPlacesSuggestionsArray ? (
              <div className="flex flex-col py-1 px-6">
                <span className="text-primary">
                  {(suggestion as PlacesSuggestion).name}
                </span>
                <span className="text-xs text-secondary">
                  {(suggestion as PlacesSuggestion).full_address}
                </span>
              </div>
            ) : (
              <></>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MapSearchSuggestions;
