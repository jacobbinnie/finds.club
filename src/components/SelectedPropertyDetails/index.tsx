import {
  BaseAddress,
  ClaimStatusType,
  PropertyWithRelationships,
} from "@/interfaces";
import ListedStatus from "../ListedStatus";
import PropertyFeaturesCore from "../PropertyFeaturesCore";
import ClaimStatus from "../ClaimStatus";

interface SelectedPropertyDetailsProps {
  baseAddress: BaseAddress | null;
  propertyData: PropertyWithRelationships | null | undefined;
  loading: boolean;
  claimStatus: ClaimStatusType;
}

function SelectedPropertyDetails({
  baseAddress,
  propertyData,
  loading,
  claimStatus,
}: SelectedPropertyDetailsProps) {
  return (
    <div className="w-full px-6 flex flex-col gap-3 h-screen">
      <div className="w-full flex justify-between">
        <ListedStatus
          loading={loading}
          status={
            propertyData?.listing_status.status
              ? propertyData?.listing_status.status
              : null
          }
        />
        <ClaimStatus loading={loading} status={claimStatus} />
      </div>
      <h1 className="font-bold tracking-tighter text-3xl">
        {baseAddress?.number} {baseAddress?.street}, {baseAddress?.locality}
      </h1>

      {loading ? (
        <div role="status" className="max-w-sm mt-3 animate-pulse">
          <div className="h-6 bg-gray-200 rounded-full w-full mb-4"></div>
          <div className="h-6 bg-gray-200 rounded-full  max-w-[360px] mb-2.5"></div>
          <div className="h-6 bg-gray-200 rounded-full  mb-2.5"></div>
          <div className="h-6 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
          <div className="h-6 bg-gray-200 rounded-full  max-w-[300px] mb-2.5"></div>
          <div className="h-6 bg-gray-200 rounded-full  max-w-[360px]"></div>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="w-full flex flex-col">
          <PropertyFeaturesCore features={propertyData?.property_features} />
        </div>
      )}
    </div>
  );
}

export default SelectedPropertyDetails;
