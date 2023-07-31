import useAddresses from "@/app/hooks/useAddresses";
import usePlacesStreets from "@/app/hooks/usePlacesStreets";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import Suggestions from "../Suggestions";
import { MapPinIcon } from "@heroicons/react/24/solid";
import FilterBar from "../FilterBar";

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

  const resetStates = () => {
    setAddressesQuery("");
    setPlacesStreetsQuery("");
  };

  useEffect(() => {
    (placesStreetsQuery && placesStreetsQuery.length < 3) ||
      (!placesStreetsQuery && setPlacesStreetsSuggestions([]));
  }, [placesStreetsQuery]);

  useEffect(() => {
    (addressesQuery && addressesQuery.length < 3) ||
      (!addressesQuery && setAddressSuggestions([]));
  }, [addressesQuery]);

  return (
    <div className="flex flex-col w-full relative items-center gap-3 max-w-[800px]">
      <div className="w-full">
        <div
          className={clsx(
            placesStreetsSuggestions.length > 0 || addressSuggestions.length > 0
              ? "rounded-t-lg"
              : "rounded-lg",
            "w-full flex-col shadow-lg transition-all h-48 overflow-hidden flex max-w-[800px] focus:outline-none"
          )}
        >
          <div className="flex w-full h-2/5 bg-white">
            <div
              className={clsx(
                tab === "BUY" ? "border-accent" : "border-tertiary",
                "w-1/2 flex cursor-pointer border-b-4 h-full tracking-tighter text-primary transition-all duration-300 ease-out justify-center items-center"
              )}
              onClick={() => {
                resetStates();
                setTab("BUY");
              }}
            >
              I'm buying
            </div>
            <div
              className={clsx(
                tab === "SELL" ? "border-accent" : "border-tertiary",
                "w-1/2 flex cursor-pointer border-b-4 h-full tracking-tighter text-primary transition-all duration-300 justify-center items-center"
              )}
              onClick={() => {
                resetStates();
                setTab("SELL");
              }}
            >
              I'm selling
            </div>
          </div>
          <div className="flex bg-white justify-center h-3/5 px-6 items-center">
            <MapPinIcon width={16} />
            <input
              placeholder={
                tab === "BUY"
                  ? "Enter a suburb or street"
                  : "Enter your property address"
              }
              className="w-full h-3/5 px-6 font-normal tracking-tighter placeholder:text-gray-300 focus:outline-none"
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
        </div>
        <Suggestions
          suggestions={
            tab === "BUY" ? placesStreetsSuggestions : addressSuggestions
          }
        />
      </div>
      <FilterBar />
    </div>
  );
};

export default JumboSearch;
