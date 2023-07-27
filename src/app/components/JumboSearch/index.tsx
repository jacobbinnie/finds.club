import useAddresses from "@/app/hooks/useAddresses";
import usePlacesStreets from "@/app/hooks/usePlacesStreets";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import Suggestions from "../Suggestions";

const JumboSearch: React.FC = () => {
  const [tab, setTab] = useState<"BUY" | "SELL">("BUY");
  const [placesStreetsQuery, setPlacesStreetsQuery] = useState<string>();
  const [addressesQuery, setAddressesQuery] = useState<string>();

  const {
    data: placesStreetsSuggestions,
    setData: setPlacesStreetsSuggestions,
  } = usePlacesStreets(placesStreetsQuery);

  const { data: addressSuggestions, setData: setAddressSuggestions } =
    useAddresses(addressesQuery);

  useEffect(() => {
    (placesStreetsQuery && placesStreetsQuery.length < 3) ||
      (!placesStreetsQuery && setPlacesStreetsSuggestions([]));
  }, [placesStreetsQuery]);

  useEffect(() => {
    setPlacesStreetsQuery("");
    setPlacesStreetsSuggestions([]);
    setAddressesQuery("");
    setAddressSuggestions([]);
  }, [tab]);

  return (
    <div className="flex flex-col w-full relative items-center px-3 lg:px-6">
      <div
        className={clsx(
          placesStreetsSuggestions.length > 0 ? "rounded-t-lg" : "rounded-lg",
          "w-full flex-col shadow-lg transition-all h-48 overflow-hidden flex max-w-[800px] focus:outline-none"
        )}
      >
        <div className="flex w-full h-2/5 bg-white">
          <div
            className={clsx(
              tab === "BUY" ? "border-primary" : "border-tertiary",
              "w-1/2 flex cursor-pointer border-b-4 h-full text-primary transition-all duration-300 ease-out justify-center items-center"
            )}
            onClick={() => setTab("BUY")}
          >
            I'm buying
          </div>
          <div
            className={clsx(
              tab === "SELL" ? "border-primary" : "border-tertiary",
              "w-1/2 flex cursor-pointer border-b-4 h-full text-primary transition-all duration-300 justify-center items-center"
            )}
            onClick={() => setTab("SELL")}
          >
            I'm selling
          </div>
        </div>
        <input
          placeholder={
            tab === "BUY"
              ? "Where are you buying?"
              : "Enter your property address?"
          }
          className="w-full h-3/5 px-6 font-normal focus:outline-none"
          autoComplete="shipping address-line1"
          value={
            tab === "BUY" ? placesStreetsQuery ?? "" : addressesQuery ?? ""
          }
          onChange={(e) => {
            tab === "BUY"
              ? setPlacesStreetsQuery(e.target.value)
              : setAddressesQuery(e.target.value);
          }}
        />
      </div>
      <Suggestions
        suggestions={
          tab === "BUY" ? placesStreetsSuggestions : addressSuggestions
        }
      />
    </div>
  );
};

export default JumboSearch;
