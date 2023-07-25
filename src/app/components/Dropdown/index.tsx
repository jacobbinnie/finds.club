import clsx from "clsx";
import { useState } from "react";

interface DropdownProps {
  value: string;
  // eslint-disable-next-line no-unused-vars
  setValue: (priceString: string) => void;
  options: string[];
  includePlus?: boolean;
}

function Dropdown({ value, setValue, options, includePlus }: DropdownProps) {
  const [open, setOpen] = useState(false);

  const mappedOptions = options.map((option) => {
    return (
      <li key={option}>
        <a
          onClick={() => {
            setValue(option);
            setOpen(false);
          }}
          className="flex items-center cursor-pointer font-medium px-4 h-8 opacity-80 transition-all text-primary hover:bg-gray-200 bg-gray-300"
        >
          {option}
          {includePlus && " +"}
        </a>
      </li>
    );
  });

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="text-primary w-full flex grow transition-all bg-transparent border-2 border-gray-300 focus:outline-none font-medium rounded-md text-sm px-3 text-center h-10 items-center justify-between"
        type="button"
      >
        {value}
        {includePlus && " +"}
        <svg
          className="w-2.5 h-2.5 ml-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            className="stroke-primary"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        id="dropdown"
        className={clsx(
          open ? "block" : "hidden",
          "z-10 max-h-60 transition-all absolute top-10 left-0 rounded-md overflow-y-scroll overflow-x-hidden no-scrollbar w-full"
        )}
      >
        <ul
          className="text-sm text-primary"
          aria-labelledby="dropdownDefaultButton"
        >
          {mappedOptions}
        </ul>
      </div>
    </div>
  );
}

export default Dropdown;
