import { PlacesFeature } from "@/interfaces/places";
import {
  ArrowLeftCircleIcon,
  ArrowTopRightOnSquareIcon,
  PlusCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import ReviewEditor from "../ReviewEditor";
import { useState } from "react";

interface PlaceOverviewProps {
  selectedPoi: PlacesFeature | null;
  handleUpdateSelectedPoi: (value: PlacesFeature | null) => void;
}

function PlaceOverview({
  selectedPoi,
  handleUpdateSelectedPoi,
}: PlaceOverviewProps) {
  const [isReviewing, setIsReviewing] = useState<boolean>(false);
  const [isSubmittingFind, setIsSubmittingFind] = useState<boolean>(false);

  const renderPoiCategories = () => {
    return selectedPoi?.properties?.poi_category?.map((category) => {
      return (
        <p className="bg-accent whitespace-nowrap px-2 rounded-lg text-sm tracking-tighter">
          {category}
        </p>
      );
    });
  };

  const urlMapString =
    selectedPoi?.properties.full_address &&
    "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(selectedPoi.properties.name) +
      " " +
      encodeURIComponent(selectedPoi?.properties.full_address);

  return (
    <div className="w-full sm:max-w-[500px] p-6 gap-3 flex flex-col h-screen">
      <div className="flex w-full justify-between">
        <ArrowLeftCircleIcon
          className="w-6 h-6 text-primary cursor-pointer hover:text-gray-200 transition-all"
          onClick={() => handleUpdateSelectedPoi(null)}
        />

        <div className="flex items-center gap-3 justify-between">
          <div
            onClick={() => setIsReviewing((prev) => !prev)}
            className="flex items-center group gap-1 hover:bg-accent transition-all cursor-pointer bg-gray-200 px-2 py-1 rounded-lg"
          >
            <p className="tracking-tighter text-sm">
              {isReviewing ? "Cancel review" : "Add to finds"}
            </p>
            {isReviewing ? (
              <XCircleIcon className="w-5 h-5 text-primary group-hover:rotate-180 transition-all" />
            ) : (
              <PlusCircleIcon className="w-5 h-5 text-primary group-hover:rotate-180 transition-all" />
            )}
          </div>

          {selectedPoi?.properties.full_address && (
            <a
              target="_blank"
              href={urlMapString}
              rel="noopener noreferrer"
              className="bg-accent whitespace-nowrap flex justify-center items-center px-2 py-1 rounded-lg text-sm tracking-tighter cursor-pointer hover:bg-gray-200 transition-all"
            >
              Open in maps
              <ArrowTopRightOnSquareIcon className="w-3 h-3 ml-1" />
            </a>
          )}
        </div>
      </div>

      <div className="w-full flex flex-col gap-1">
        <h1 className="text-2xl tracking-tighter font-bold">
          {selectedPoi?.properties.name}
        </h1>
        <p className="tracking-tighter text-sm">
          {selectedPoi?.properties.full_address}
        </p>
      </div>

      <div className="flex gap-3 flex-wrap">{renderPoiCategories()}</div>

      <div className="w-full mt-6 flex flex-col gap-3">
        <ReviewEditor
          isReviewing={isReviewing}
          isSubmittingFind={isSubmittingFind}
        />

        <div className="w-full flex justify-between">
          <p className="tracking-tighter text-sm font-bold">Reviews</p>
          <p className="bg-accent px-2 flex items-center rounded-lg text-sm tracking-tighter">
            Overall 8.9
          </p>
        </div>
      </div>
    </div>
  );
}

export default PlaceOverview;
