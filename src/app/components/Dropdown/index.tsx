import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface DropdownProps {
  options: string[];
  selectedOption: string;
  type: "MIN" | "MAX";
  category: "BEDS" | "BATHS" | "PRICE";
  handleUpdateCallback: (
    option: string,
    type: "MIN" | "MAX",
    category: "BEDS" | "BATHS" | "PRICE"
  ) => void;
}

function Dropdown({
  options,
  selectedOption,
  handleUpdateCallback,
  category,
  type,
}: DropdownProps) {
  const renderOptions = () => {
    return options.map((option) => (
      <Menu.Item key={option}>
        {({ active }) => (
          <a
            onClick={() => handleUpdateCallback(option, type, category)}
            className={`${
              active ? "bg-gray-100 text-gray-900" : "text-gray-700"
            } block px-4 py-2 text-sm cursor-pointer tracking-tighter`}
          >
            {option}
          </a>
        )}
      </Menu.Item>
    ));
  };

  return (
    <Menu as="div" className="relative inline-block text-left w-full">
      <div>
        <Menu.Button className="inline-flex w-full justify-between gap-x-1.5 tracking-tighter rounded-md px-3 py-2 text-sm font-regular text-primary shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {selectedOption}
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute max-h-52 overflow-scroll no-scrollbar right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => handleUpdateCallback("Any", type, category)}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block w-full px-4 py-2 text-left text-sm cursor-pointer"
                  )}
                >
                  Any
                </button>
              )}
            </Menu.Item>
            {renderOptions()}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default Dropdown;
