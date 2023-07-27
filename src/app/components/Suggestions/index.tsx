import { MapboxFeatures } from "@/app/interfaces";
import clsx from "clsx";

interface SuggestionsProps {
  suggestions: MapboxFeatures[];
}

function Suggestions({ suggestions }: SuggestionsProps) {
  return (
    <div className="w-full max-w-[800px]">
      <ul
        className={clsx(
          suggestions.length > 0
            ? "h-full py-6 border-t-gray-300 border-t-[1px]"
            : "py-0 h-0",
          "w-full h-min flex flex-col max-w-[800px] bg-white transition-all shadow-lg rounded-b-lg"
        )}
      >
        {suggestions.map((suggestion) => (
          <li
            className="w-full h-12 hover:bg-primary tracking-tighter hover:text-tertiary transition-all cursor-pointer flex items-center px-6"
            // onClick={() => setSelectedSuggestion(suggestion)}
            key={suggestion.properties.name}
          >
            {suggestion.properties.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Suggestions;
