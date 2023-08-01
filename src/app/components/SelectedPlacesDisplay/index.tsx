import { MapboxFeatures } from "@/app/interfaces";
import { XCircleIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

interface SelectedPlacesDisplayProps {
  selectedPlacesStreets: MapboxFeatures[];
  handleRemoveSelected: (id: string) => void;
}

function SelectedPlacesDisplay({
  selectedPlacesStreets,
  handleRemoveSelected,
}: SelectedPlacesDisplayProps) {
  const renderItems = () => {
    return selectedPlacesStreets.map((selectedPlace) => (
      <div
        key={selectedPlace.id}
        className="bg-primary flex px-3 py-1 rounded-2xl shadow-lg gap-3"
      >
        <p className="text-small tracking-tighter text-tertiary">
          {selectedPlace.properties.name},{" "}
          {selectedPlace.properties.feature_type === "street"
            ? selectedPlace.properties.context.locality
              ? selectedPlace.properties.context.locality?.name
              : selectedPlace.properties.context.place.name
            : selectedPlace.properties.context.region.name}
        </p>
        <XCircleIcon
          className="w-4 text-tertiary cursor-pointer"
          onClick={() => handleRemoveSelected(selectedPlace.id)}
        />
      </div>
    ));
  };

  return (
    <div
      className={clsx(
        selectedPlacesStreets && selectedPlacesStreets.length > 0
          ? "mt-3"
          : "h-0 mt-0",
        "w-full flex items-center flex-wrap gap-3 transition-all duration-500"
      )}
    >
      {renderItems()}
    </div>
  );
}

export default SelectedPlacesDisplay;
