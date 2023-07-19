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
          className="flex items-center cursor-pointer w-48 px-4 h-8 hover:bg-accent bg-primary"
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
        className="text-white w-22 transition-all bg-primary hover:bg-accent focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex h-8 items-center justify-between"
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
          "z-10 max-h-60 transition-all absolute top-12 left-0 bg-white divide-y divide-gray-100 rounded-md overflow-y-scroll overflow-x-hidden no-scrollbar shadow dark:bg-gray-700 w-full"
        )}
      >
        <ul
          className="text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          {mappedOptions}
        </ul>
      </div>
    </div>
  );
}

export default Dropdown;
