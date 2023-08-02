import { MapboxFeatures } from "@/app/interfaces";
import clsx from "clsx";

interface SuggestionsProps {
  suggestions: MapboxFeatures[];
  tab: "BUY" | "SELL";
  handleSelect: (tab: "BUY" | "SELL", selected: MapboxFeatures) => void;
}

function Suggestions({ suggestions, tab, handleSelect }: SuggestionsProps) {
  console.log(suggestions);
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
        {suggestions.map((suggestion) => (
          <li
            className="w-full h-12 hover:bg-primary tracking-tighter hover:text-tertiary transition-all cursor-pointer flex items-center px-6"
            onClick={() => handleSelect(tab, suggestion)}
            key={suggestion.properties.mapbox_id}
          >
            {suggestion.properties.name},{" "}
            {suggestion.properties.feature_type === "street"
              ? suggestion.properties.context.locality
                ? suggestion.properties.context.locality?.name
                : suggestion.properties.context.place.name
              : suggestion.properties.feature_type === "place"
              ? suggestion.properties.context.country.name
              : suggestion.properties.context.region.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Suggestions;
