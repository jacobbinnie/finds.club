import { useState } from "react";
import Dropdown from "../Dropdown";
import pricesJson from "../../utils/housePrices.json";
import {
  CategoryType,
  NewBuildsType,
  OwnershipType,
  PropertyType,
} from "@/interfaces";
import clsx from "clsx";
import Checkbox from "../Checkbox";
import Input from "../Input";

type Prices = {
  [key: string]: number;
};

const prices: Prices = pricesJson.prices;

function getValueByKey(keyToRetrieve: string): number | undefined {
  const value: number | undefined = prices[keyToRetrieve];
  return value;
}

function getKeyByValue(value: number): string {
  const res = Object.keys(prices).find((key) => prices[key] === value);
  if (res) {
    return res;
  } else {
    return "";
  }
}

interface FilterBarProps {
  tab: "BUY" | "SELL";
}

function FilterBar({ tab }: FilterBarProps) {
  const [minBeds, setMinBeds] = useState<number | "Any">("Any");
  const [maxBeds, setMaxBeds] = useState<number | "Any">("Any");

  const [minBaths, setMinBaths] = useState<number | "Any">("Any");
  const [maxBaths, setMaxBaths] = useState<number | "Any">("Any");

  const [minPrice, setMinPrice] = useState<number | "Any">("Any");
  const [maxPrice, setMaxPrice] = useState<number | "Any">("Any");

  const [ownershipType, setOwnershipType] = useState<OwnershipType | "Any">(
    "Any"
  );

  const [newBuilds, setNewBuilds] = useState<NewBuildsType>("Show");

  const [propertyType, setPropertyType] = useState<PropertyType | "Any">("Any");

  const handleUpdateCallback = (
    option: string,
    type: "MIN" | "MAX" | "N/A",
    category: CategoryType
  ) => {
    switch (category) {
      case "BEDS":
        if (type === "MIN") {
          setMinBeds(option === "Any" ? "Any" : parseInt(option));
        } else {
          setMaxBeds(option === "Any" ? "Any" : parseInt(option));
        }
        break;

      case "BATHS":
        if (type === "MIN") {
          setMinBaths(option === "Any" ? "Any" : parseInt(option));
        } else {
          setMaxBaths(option === "Any" ? "Any" : parseInt(option));
        }
        break;

      case "PRICE":
        if (type === "MIN") {
          if (option === "Any") {
            setMinPrice("Any");
          } else {
            const priceNumber = getValueByKey(option);
            if (priceNumber) {
              setMinPrice(priceNumber);
            }
          }
        } else {
          if (option === "Any") {
            setMaxPrice("Any");
          } else {
            const priceNumber = getValueByKey(option);
            if (priceNumber) {
              setMaxPrice(priceNumber);
            }
          }
        }
        break;

      case "OWNERSHIP":
        if (option === "Any") {
          setOwnershipType("Any");
        } else {
          setOwnershipType(option as OwnershipType);
        }
        break;

      case "NEWBUILDS":
        setNewBuilds(option as NewBuildsType);
        break;

      case "PROPERTYTYPE":
        if (option === "Any") {
          setPropertyType("Any");
        } else {
          setPropertyType(option as PropertyType);
        }
        break;

      default:
        break;
    }
  };

  return (
    <div
      className={clsx(
        tab === "BUY" ? "py-8 mt-3" : "h-0 py-0 mt-0 overflow-hidden",
        "w-full rounded-lg bg-white px-6 gap-x-3 grid gap-y-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 shadow-lg transition-all duration-500"
      )}
    >
      {/* BEDS */}
      <div className="flex flex-col gap-1">
        <p className="font-regular tracking-tighter text-small">Bedrooms</p>
        <div className="flex gap-3 items-center">
          <Dropdown
            options={["Any", "1", "2", "3", "4", "5"]}
            selectedOption={minBeds.toString()}
            handleUpdateCallback={handleUpdateCallback}
            type="MIN"
            category="BEDS"
          />

          <p className="tracking-tighter text-small">to</p>

          <Dropdown
            options={["Any", "1", "2", "3", "4", "5"]}
            selectedOption={maxBeds.toString()}
            handleUpdateCallback={handleUpdateCallback}
            type="MAX"
            category="BEDS"
          />
        </div>
      </div>

      {/* BATHS */}
      <div className="flex flex-col gap-1">
        <p className="font-regular tracking-tighter text-small">Bathrooms</p>
        <div className="flex gap-3 items-center">
          <Dropdown
            options={["Any", "1", "2", "3", "4", "5"]}
            selectedOption={minBaths.toString()}
            handleUpdateCallback={handleUpdateCallback}
            type="MIN"
            category="BATHS"
          />

          <p className="tracking-tighter text-small">to</p>

          <Dropdown
            options={["Any", "1", "2", "3", "4", "5"]}
            selectedOption={maxBaths.toString()}
            handleUpdateCallback={handleUpdateCallback}
            type="MAX"
            category="BATHS"
          />
        </div>
      </div>

      {/* PRICES */}
      <div className="flex flex-col gap-1">
        <p className="font-regular tracking-tighter text-small">Price</p>
        <div className="flex gap-3 items-center">
          <Dropdown
            options={["Any", ...Object.keys(pricesJson.prices)]}
            selectedOption={
              typeof minPrice === "number" ? getKeyByValue(minPrice) : minPrice
            }
            handleUpdateCallback={handleUpdateCallback}
            type="MIN"
            category="PRICE"
          />

          <p className="tracking-tighter text-small">to</p>

          <Dropdown
            options={["Any", ...Object.keys(pricesJson.prices)]}
            selectedOption={
              typeof maxPrice === "number" ? getKeyByValue(maxPrice) : maxPrice
            }
            handleUpdateCallback={handleUpdateCallback}
            type="MAX"
            category="PRICE"
          />
        </div>
      </div>

      <div className="flex w-full gap-3">
        {/* Ownership */}
        <div className="flex flex-col gap-1 w-full">
          <p className="font-regular tracking-tighter text-small">
            Ownership type
          </p>
          <div className="flex gap-3">
            <Dropdown
              options={[
                "Any",
                "Freehold",
                "Cross Lease",
                "Unit Title",
                "Leasehold",
              ]}
              selectedOption={ownershipType}
              handleUpdateCallback={handleUpdateCallback}
              type="N/A"
              category="OWNERSHIP"
            />
          </div>
        </div>

        {/* New Builds */}
        <div className="flex flex-col gap-1">
          <p className="font-regular tracking-tighter text-small">New builds</p>
          <div className="flex gap-3">
            <Dropdown
              options={["Show", "Hide", "Only"]}
              selectedOption={newBuilds}
              handleUpdateCallback={handleUpdateCallback}
              type="N/A"
              category="NEWBUILDS"
            />
          </div>
        </div>
      </div>

      {/* Property Type */}
      <div className="flex flex-col gap-1">
        <p className="font-regular tracking-tighter text-small">
          Property Type
        </p>
        <div className="flex gap-3">
          <Dropdown
            options={[
              "Any",
              "Apartment",
              "House",
              "Lifetyle Dwelling",
              "Lifestyle Land",
              "Section",
              "Townhouse",
              "Unit",
            ]}
            selectedOption={propertyType}
            handleUpdateCallback={handleUpdateCallback}
            type="N/A"
            category="PROPERTYTYPE"
          />
        </div>
      </div>

      <div className="flex flex-col gap-[5px]">
        <p className="font-regular tracking-tighter text-small">Search terms</p>
        <Input />
      </div>

      <Checkbox title="Needs renovation" />

      <div className="flex w-full transition-all items-end md:col-span-2 justify-end">
        <button className="inline-flex w-full tracking-tighter items-center justify-center px-4 py-1 text-small transition-all hover:px-10 hover:shadow-lg rounded-md text-tertiary bg-primary group focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 hover:bg-accent">
          Search
        </button>
      </div>
    </div>
  );
}

export default FilterBar;
