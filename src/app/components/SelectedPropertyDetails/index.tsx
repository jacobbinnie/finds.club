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
        {addressDetails.street_number} {addressDetails.street},{" "}
        {addressDetails.locality}
      </h1>
    </div>
  );
}

export default SelectedPropertyDetails;
