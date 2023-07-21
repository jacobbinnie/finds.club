import { useState } from "react";
import Dropdown from "../Dropdown";
import pricesJson from "../../utils/housePrices.json";

type Prices = {
  [key: string]: number;
};

const prices: Prices = pricesJson.prices;

function FilterBar() {
  const [minBedrooms, setMinBedrooms] = useState(2);
  const [minBathrooms, setMinBathrooms] = useState(1);
  const [minPrice, setMinPrice] = useState(100000);
  const [maxPrice, setMaxPrice] = useState(1000000);

  const handleSetBedrooms = (bedrooms: string) => {
    setMinBedrooms(parseInt(bedrooms));
  };

  const handleSetBathrooms = (bathrooms: string) => {
    setMinBathrooms(parseInt(bathrooms));
  };

  const handleSetMinPrice = (priceString: string) => {
    setMinPrice(prices[priceString]);
  };

  const handleSetMaxPrice = (priceString: string) => {
    setMaxPrice(prices[priceString]);
  };

  function getKeyByValue(object: Prices, value: number): string {
    const res = Object.keys(object).find((key) => object[key] === value);
    if (res) {
      return res;
    } else {
      return "";
    }
  }

  return (
    <div className="px-6 lg:px-8 h-32 mt-6 bg-accent shadow-md">
      <div className="w-full gap-8 flex rounded-md">
        <div className="flex flex-col gap-1 text-primary font-bold">
          <p>Bedrooms</p>
          <Dropdown
            value={minBedrooms.toString()}
            setValue={handleSetBedrooms}
            options={["1", "2", "3", "4", "5", "6"]}
            includePlus={true}
          />
        </div>

        <div className="flex flex-col gap-1 text-primary font-bold">
          <p>Bathrooms</p>
          <Dropdown
            value={minBathrooms.toString()}
            setValue={handleSetBathrooms}
            options={["1", "2", "3", "4", "5", "6"]}
            includePlus={true}
          />
        </div>

        <div className="flex flex-col gap-1 text-primary font-bold">
          <p>Price</p>
          <div className="flex gap-3">
            <Dropdown
              value={getKeyByValue(prices, minPrice)}
              setValue={handleSetMinPrice}
              options={Object.keys(prices)}
            />

            <p>to</p>

            <Dropdown
              value={getKeyByValue(prices, maxPrice)}
              setValue={handleSetMaxPrice}
              options={Object.keys(prices)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
