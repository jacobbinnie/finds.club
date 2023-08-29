import { PlacesFeature } from "@/interfaces/places";
import {
  ArrowLeftCircleIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/solid";

interface PlaceOverviewProps {
  selectedPoi: PlacesFeature | null;
  handleUpdateSelectedPoi: (value: PlacesFeature | null) => void;
}

function PlaceOverview({
  selectedPoi,
  handleUpdateSelectedPoi,
}: PlaceOverviewProps) {
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
      <div className="flex justify-between">
        <ArrowLeftCircleIcon
          className="w-6 h-6 text-primary cursor-pointer hover:text-gray-300 transition-all"
          onClick={() => handleUpdateSelectedPoi(null)}
        />
        {selectedPoi?.properties.full_address && (
          <a
            target="_blank"
            href={urlMapString}
            rel="noopener noreferrer"
            className="bg-accent whitespace-nowrap flex justify-center items-center px-2 rounded-lg text-sm tracking-tighter cursor-pointer hover:bg-gray-300 transition-all"
          >
            Open in maps
            <ArrowTopRightOnSquareIcon className="w-3 h-3 ml-1" />
          </a>
        )}
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

      <div className="w-full mt-6">
        <p className="tracking-tighter text-sm font-bold">Reviews</p>
      </div>
    </div>
  );
}

export default PlaceOverview;
