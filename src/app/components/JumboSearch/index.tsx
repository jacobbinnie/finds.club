import { Suggestion } from "@/app/interfaces";
import {
  useAddressAutofillCore,
  useSearchSession,
} from "@mapbox/search-js-react";
import React, { useCallback, useEffect, useState } from "react";

const JumboSearch: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion>();

  const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

  const searchCore = useAddressAutofillCore({
    accessToken: MAPBOX_ACCESS_TOKEN,
    country: "nz",
  });
  const searchSession = useSearchSession(searchCore);

  const suggestParam = useCallback(async () => {
    if (searchSession.sessionToken) {
      if (value.length > 2) {
        try {
          const e = await searchCore.suggest(value, searchSession);
          const formattedSuggestions: Suggestion[] = [];
          e.suggestions.forEach((suggestion) => {
            if (
              suggestion.full_address &&
              suggestion.address_line1 &&
              suggestion.address_level3
            ) {
              formattedSuggestions.push({
                full_address: suggestion.full_address,
                matching_name: suggestion.matching_name,
                locality: suggestion.address_level3,
                description: suggestion.description,
                feature_name: suggestion.feature_name,
                original_search_text: suggestion.original_search_text,
                action: suggestion.action,
                language: suggestion.language,
                metadata: suggestion.metadata,
                match_code: suggestion.match_code,
              });
            }
          });
          setSuggestions(formattedSuggestions);
        } catch (error) {
          console.error("Error occurred while fetching suggestions:", error);
        }
      } else {
        setSuggestions([]);
      }
    }
  }, [value, searchSession, searchCore, setSuggestions]); // Include all dependencies in the useCallback dependencies array

  const retrieveParam = useCallback(() => {
    if (selectedSuggestion) {
      searchCore
        .retrieve(selectedSuggestion, {
          sessionToken: searchSession.sessionToken,
        })
        .then((e) => console.log("Retrieved:", e))
        .catch((e) => {
          throw new Error(e);
        });
    }
  }, []);

  useEffect(() => {
    suggestParam();
  }, [value]);

  useEffect(() => {
    retrieveParam();
  }, [selectedSuggestion]);

  return (
    <div className="flex flex-col w-full relative items-center px-3 lg:px-6">
      <div className="w-full flex-col rounded-md transition-all h-32 flex lg:w-1/2 max-w-lg focus:outline-none">
        <div className="bg-primary flex w-full h-1/2"></div>
        <input
          className="w-full h-1/2"
          autoComplete="shipping address-line1"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <ul className="w-full flex flex-col lg:w-1/2 max-w-lg">
        {suggestions.map((suggestion) => (
          <li
            onClick={() => setSelectedSuggestion(suggestion)}
            key={suggestion.full_address}
          >
            {suggestion.matching_name}, {suggestion.locality}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JumboSearch;
