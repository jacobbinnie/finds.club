import {
  AddressableAddress,
  MapboxFeatures,
  isAddressableAddressArray,
} from "@/interfaces";
import clsx from "clsx";

interface SuggestionsProps {
  suggestions: (MapboxFeatures | AddressableAddress)[];
  tab: "BUY" | "SELL";
  handleSelect: (
    tab: "BUY" | "SELL",
    selected: MapboxFeatures | AddressableAddress
  ) => void;
}

function Suggestions({ suggestions, tab, handleSelect }: SuggestionsProps) {
  const isAddressableAddress = isAddressableAddressArray(suggestions);

  return (
    <div className="w-full max-w-[900px]">
      <ul
        className={clsx(
          suggestions.length > 0
            ? "h-full py-6 border-t-gray-300 border-t-[1px]"
            : "py-0 h-0",
          "w-full h-min flex flex-col max-w-[900px] bg-white transition-all shadow-lg rounded-b-lg"
        )}
      >
        {suggestions.map((suggestion, index) => (
          <li
            className="w-full h-12 hover:bg-primary tracking-tighter hover:text-tertiary transition-all cursor-pointer flex items-center px-6"
            onClick={() => handleSelect(tab, suggestion)}
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

export default Suggestions;
