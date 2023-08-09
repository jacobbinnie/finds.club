import { PropertyWithRelationships, SelectedProperty } from "@/interfaces";
import ListedStatus from "../ListedStatus";

interface SelectedPropertyDetailsProps {
  addressDetails: SelectedProperty;
  propertyData: PropertyWithRelationships | null | undefined;
}

function SelectedPropertyDetails({
  addressDetails,
  propertyData,
}: SelectedPropertyDetailsProps) {
  return (
    <div className="w-full px-6 flex flex-col gap-3">
      <ListedStatus
        status={
          propertyData?.listing_status.status
            ? propertyData?.listing_status.status
            : "NOT_LISTED"
        }
      />
      <h1 className="font-bold tracking-tighter text-3xl">
        {addressDetails.street_number} {addressDetails.street},{" "}
        {addressDetails.locality}
      </h1>

      {propertyData === undefined && (
        <div role="status" className="max-w-sm animate-pulse">
          <div className="h-6 bg-gray-200 rounded-full w-full mb-4"></div>
          <div className="h-6 bg-gray-200 rounded-full  max-w-[360px] mb-2.5"></div>
          <div className="h-6 bg-gray-200 rounded-full  mb-2.5"></div>
          <div className="h-6 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
          <div className="h-6 bg-gray-200 rounded-full  max-w-[300px] mb-2.5"></div>
          <div className="h-6 bg-gray-200 rounded-full  max-w-[360px]"></div>
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
}

export default SelectedPropertyDetails;
