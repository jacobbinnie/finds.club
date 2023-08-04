import { SelectedProperty } from "@/app/interfaces";
import ListedStatus from "../ListedStatus";

interface SelectedPropertyDetailsProps {
  addressDetails: SelectedProperty;
}

function SelectedPropertyDetails({
  addressDetails,
}: SelectedPropertyDetailsProps) {
  return (
    <div className="w-full px-6 flex flex-col gap-3">
      <ListedStatus />
      <h1 className="font-bold tracking-tighter text-3xl">
        {addressDetails.address.properties.name},{" "}
        {addressDetails.address.properties.context.locality
          ? addressDetails.address.properties.context.locality?.name
          : addressDetails.address.properties.context.place.name}
      </h1>
    </div>
  );
}

export default SelectedPropertyDetails;
