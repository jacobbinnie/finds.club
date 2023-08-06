import {
  ArrowSmallDownIcon,
  ArrowSmallUpIcon,
} from "@heroicons/react/24/solid";
import { Dispatch, SetStateAction } from "react";

interface CountArrowsProps {
  min: number;
  max: number;
  setCount: Dispatch<SetStateAction<number>>;
}

function CountArrows({ setCount, min, max }: CountArrowsProps) {
  return (
    <div className="flex w-12 gap-2 h-full flex-col">
      <div
        onClick={() =>
          setCount((prev) => {
            if (prev + 1 <= max) {
              return prev + 1;
            } else {
              return prev;
            }
          })
        }
        className="w-full cursor-pointer py-1 flex items-center justify-center rounded-md bg-primary"
      >
        <ArrowSmallUpIcon className="w-5 h-5" />
      </div>
      <div
        onClick={() =>
          setCount((prev) => {
            if (prev - 1 >= min) {
              return prev - 1;
            } else {
              return prev;
            }
          })
        }
        className="w-full py-1 cursor-pointer flex items-center justify-center rounded-md bg-primary"
      >
        <ArrowSmallDownIcon className="w-5 h-5" />
      </div>
    </div>
  );
}

export default CountArrows;
