import { useState } from "react";
import Dropdown from "../Dropdown";
import pricesJson from "../../utils/housePrices.json";

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

function FilterBar() {
  const [minBeds, setMinBeds] = useState<number | "Any">("Any");
  const [maxBeds, setMaxBeds] = useState<number | "Any">("Any");

  const [minBaths, setMinBaths] = useState<number | "Any">("Any");
  const [maxBaths, setMaxBaths] = useState<number | "Any">("Any");

  const [minPrice, setMinPrice] = useState<number | "Any">("Any");
  const [maxPrice, setMaxPrice] = useState<number | "Any">("Any");

  const handleUpdateCallback = (
    option: string,
    type: "MIN" | "MAX",
    category: "BEDS" | "BATHS" | "PRICE"
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

      default:
        break;
    }
  };

  return (
    <div className="w-full rounded-lg bg-white p-6 grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 shadow-lg">
      {/* BEDS */}
      <div className="flex flex-col gap-1">
        <p className="font-regular tracking-tighter text-sm">Bedrooms</p>
        <div className="flex gap-3">
          <Dropdown
            options={["1", "2", "3", "4", "5"]}
            selectedOption={minBeds.toString()}
            handleUpdateCallback={handleUpdateCallback}
            type="MIN"
            category="BEDS"
          />

          <Dropdown
            options={["1", "2", "3", "4", "5"]}
            selectedOption={maxBeds.toString()}
            handleUpdateCallback={handleUpdateCallback}
            type="MAX"
            category="BEDS"
          />
        </div>
      </div>

      {/* BATHS */}
      <div className="flex flex-col gap-1">
        <p className="font-regular tracking-tighter text-sm">Bathrooms</p>
        <div className="flex gap-3">
          <Dropdown
            options={["1", "2", "3", "4", "5"]}
            selectedOption={minBaths.toString()}
            handleUpdateCallback={handleUpdateCallback}
            type="MIN"
            category="BATHS"
          />

          <Dropdown
            options={["1", "2", "3", "4", "5"]}
            selectedOption={maxBaths.toString()}
            handleUpdateCallback={handleUpdateCallback}
            type="MAX"
            category="BATHS"
          />
        </div>
      </div>

      {/* PRICES */}
      <div className="flex flex-col gap-1">
        <p className="font-regular tracking-tighter text-sm">Price</p>
        <div className="flex gap-3">
          <Dropdown
            options={Object.keys(pricesJson.prices)}
            selectedOption={
              typeof minPrice === "number" ? getKeyByValue(minPrice) : minPrice
            }
            handleUpdateCallback={handleUpdateCallback}
            type="MIN"
            category="PRICE"
          />

          <Dropdown
            options={Object.keys(pricesJson.prices)}
            selectedOption={
              typeof maxPrice === "number" ? getKeyByValue(maxPrice) : maxPrice
            }
            handleUpdateCallback={handleUpdateCallback}
            type="MAX"
            category="PRICE"
          />
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
