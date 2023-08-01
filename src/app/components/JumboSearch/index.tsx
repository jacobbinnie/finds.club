import useAddresses from "@/app/hooks/useAddresses";
import usePlacesStreets from "@/app/hooks/usePlacesStreets";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import Suggestions from "../Suggestions";
import { MapPinIcon } from "@heroicons/react/24/solid";
import FilterBar from "../FilterBar";
import SellingInfoBar from "../SellingInfoBar";
import { MapboxFeatures } from "@/app/interfaces";
import SelectedPlacesDisplay from "../SelectedPlacesDisplay";

const JumboSearch: React.FC = () => {
  const [tab, setTab] = useState<"BUY" | "SELL">("BUY");
  const [placesStreetsQuery, setPlacesStreetsQuery] = useState<string>();
  const [addressesQuery, setAddressesQuery] = useState<string>();

  const [selectedPlacesStreets, setSelectedPlacesStreets] = useState<
    MapboxFeatures[]
  >([]);

  const [selectedAddress, setSelectedAddress] = useState<MapboxFeatures | null>(
    null
  );

  const handleUpdateSelected = (
    tab: "BUY" | "SELL",
    selected: MapboxFeatures
  ) => {
    if (tab === "BUY") {
      setPlacesStreetsQuery("");
      setSelectedPlacesStreets((prev: MapboxFeatures[] | []) => [
        ...prev,
        selected,
      ]);
    } else {
      setSelectedAddress(selected);
    }
  };

  const handleRemoveSelected = (id: string) => {
    setSelectedPlacesStreets((prev: MapboxFeatures[]) =>
      prev.filter((selected) => selected.id !== id)
    );
  };

  const {
    data: placesStreetsSuggestions,
    setData: setPlacesStreetsSuggestions,
  } = usePlacesStreets(placesStreetsQuery);

  const { data: addressSuggestions, setData: setAddressSuggestions } =
    useAddresses(addressesQuery);

  const resetQueries = () => {
    setAddressesQuery("");
    setPlacesStreetsQuery("");
  };

  const resetSelected = () => {
    setSelectedAddress(null);
    setSelectedPlacesStreets([]);
  };

  useEffect(() => {
    (placesStreetsQuery && placesStreetsQuery.length < 3) ||
      (!placesStreetsQuery && setPlacesStreetsSuggestions([]));
  }, [placesStreetsQuery]);

  useEffect(() => {
    (addressesQuery && addressesQuery.length < 3) ||
      (!addressesQuery && setAddressSuggestions([]));
  }, [addressesQuery]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [tab]);

  return (
    <div className="flex flex-col w-full relative items-center max-w-[900px]">
      <div className="w-full">
        <div
          className={clsx(
            placesStreetsSuggestions.length > 0 || addressSuggestions.length > 0
              ? "rounded-t-lg"
              : "rounded-lg",
            "w-full flex-col shadow-lg transition-all h-44 overflow-hidden flex max-w-[900px] focus:outline-none"
          )}
        >
          <div className="flex w-full h-1/2 bg-white">
            <div
              className={clsx(
                tab === "BUY" ? "border-accent" : "border-tertiary",
                "w-1/2 flex cursor-pointer border-b-[5px] font-regular h-full tracking-tighter text-primary transition-all duration-300 ease-out justify-center items-center"
              )}
              onClick={() => {
                resetQueries();
                resetSelected();
                setTab("BUY");
              }}
            >
              I'm buying
            </div>
            <div
              className={clsx(
                tab === "SELL" ? "border-accent" : "border-tertiary",
                "w-1/2 flex cursor-pointer border-b-[5px] font-regular h-full tracking-tighter text-primary transition-all duration-300 justify-center items-center"
              )}
              onClick={() => {
                resetQueries();
                resetSelected();
                setTab("SELL");
              }}
            >
              I'm selling
            </div>
          </div>
          <div className="flex bg-white justify-center h-1/2 px-6 items-center">
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
          tab={tab}
          handleSelect={handleUpdateSelected}
        />
      </div>
      <SelectedPlacesDisplay
        selectedPlacesStreets={selectedPlacesStreets}
        handleRemoveSelected={handleRemoveSelected}
      />
      <FilterBar tab={tab} />
      <SellingInfoBar tab={tab} />
    </div>
  );
};

export default JumboSearch;
