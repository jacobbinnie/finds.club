"use client";
import useAddresses from "@/hooks/useAddresses";
import usePlacesStreets from "@/hooks/usePlacesStreets";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import Suggestions from "../Suggestions";
import { ArrowPathIcon, MapPinIcon } from "@heroicons/react/24/solid";
import FilterBar from "../FilterBar";
import SellingInfoBar from "../SellingInfoBar";
import {
  AddressableAddress,
  MapboxFeatures,
  isAddressableAddress,
} from "@/interfaces";
import SelectedPlacesDisplay from "../SelectedPlacesDisplay";
import { useLocation } from "@/providers/LocationProvider";
import { useRouter } from "next/navigation";

const JumboSearch: React.FC = () => {
  const [tab, setTab] = useState<"BUY" | "SELL">("BUY");
  const [placesStreetsQuery, setPlacesStreetsQuery] = useState<string>();
  const [addressesQuery, setAddressesQuery] = useState<string>();

  const [selectedPlacesStreets, setSelectedPlacesStreets] = useState<
    MapboxFeatures[]
  >([]);

  const { setSelectedProperty } = useLocation();
  const { push } = useRouter();

  const resetQueries = () => {
    setAddressesQuery("");
    setPlacesStreetsQuery("");
  };

  const resetSelected = () => {
    setSelectedPlacesStreets([]);
  };

  const handleUpdateSelected = (
    tab: "BUY" | "SELL",
    selected: MapboxFeatures | AddressableAddress
  ) => {
    if (tab === "BUY") {
      setPlacesStreetsQuery("");
      if (
        !selectedPlacesStreets.find(
          (entry) => entry.id === (selected as MapboxFeatures).id
        )
      ) {
        setSelectedPlacesStreets((prev: MapboxFeatures[] | []) => [
          ...prev,
          selected as MapboxFeatures,
        ]);
      }
    } else {
      if (isAddressableAddress(selected)) {
        setSelectedProperty(selected as AddressableAddress);
        push("/map");
        resetQueries();
      }
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
    loading: placesStreetsLoading,
  } = usePlacesStreets(placesStreetsQuery);

  const {
    data: addressSuggestions,
    setData: setAddressSuggestions,
    loading: addressLoading,
  } = useAddresses(addressesQuery);

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
            "w-full flex-col shadow-lg transition-all h-36 overflow-hidden flex max-w-[900px] focus:outline-none"
          )}
        >
          <div className="flex w-full h-1/2 bg-white">
            <div
              className={clsx(
                tab === "BUY"
                  ? "bg-accent text-tertiary"
                  : "bg-white text-primary",
                "w-1/2 flex cursor-pointer border-b-4 font-regular h-full tracking-tighter transition-all duration-300 ease-out justify-center items-center"
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
                tab === "SELL"
                  ? "bg-accent text-tertiary"
                  : "bg-white text-primary",
                "w-1/2 flex cursor-pointer border-b-4 font-regular h-full tracking-tighter text-primary transition-all duration-300 justify-center items-center"
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
            <MapPinIcon
              width={16}
              className={clsx(
                addressLoading || placesStreetsLoading ? "hidden" : "block",
                "transition-all"
              )}
            />
            <ArrowPathIcon
              width={16}
              className={clsx(
                addressLoading || placesStreetsLoading
                  ? "block animate-spin"
                  : "hidden",
                "transition-all"
              )}
            />
            <input
              placeholder={
                tab === "BUY"
                  ? "Enter suburb / street / road"
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

      <div
        className={clsx(
          tab === "SELL" ? "mt-10" : "mt-0 hidden",
          "w-full flex justify-between items-center max-w-[900px] transition-all"
        )}
      >
        <div className="flex flex-col">
          <p className="tracking-tighter flex font-bold text-xl">
            Get listed today &nbsp; 🚀
          </p>

          <p className="text-[10px] tracking-tighter">
            Enter your property address
          </p>
        </div>

        <div className="bg-white h-min px-3 py-1 rounded-md shadow-lg flex items-center justify-center gap-1">
          <p className="text-[10px] tracking-tighter">
            Kiwi owned and operated
          </p>
          <p className="text-[10px] mt-[1px]">🇳🇿</p>
        </div>
      </div>
    </div>
  );
};

export default JumboSearch;
