import clsx from "clsx";
import { useState } from "react";

function MapElement() {
  const [isMapHidden, setIsMapHidden] = useState(false);

  return (
    <div className="w-full flex justify-between items-center px-6 lg:px-8 pt-8">
      <div
        className={clsx(
          isMapHidden ? "h-[100px]" : "h-[500px]",
          "w-full bg-gray-300 transition-all relative rounded-md flex justify-center items-center"
        )}
      >
        <div
          onClick={() => setIsMapHidden(!isMapHidden)}
          className="px-3 cursor-pointer py-2 absolute top-2 right-2 rounded-md bg-primary text-tertiary text-sm font-bold"
        >
          {isMapHidden ? "Show Map" : "Hide Map"}
        </div>
      </div>
    </div>
  );
}

export default MapElement;
