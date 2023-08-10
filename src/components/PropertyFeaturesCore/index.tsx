import { PropertyFeatures } from "@/interfaces";
import clsx from "clsx";

interface PropertyFeaturesCoreProps {
  features: PropertyFeatures | undefined;
}

function PropertyFeaturesCore({ features }: PropertyFeaturesCoreProps) {
  return (
    <div className={clsx(features ? "flex" : "hidden", "flex-col")}>
      <p className="text-small tracking-tighter text-primary">
        Beds: {features?.beds}
      </p>
      <p className="text-small tracking-tighter text-primary">
        Baths: {features?.baths}
      </p>
      <p className="text-small tracking-tighter text-primary">
        Floor SQM: {features?.floor_sqm}
      </p>
      <p className="text-small tracking-tighter text-primary">
        Land SQM: {features?.land_sqm}
      </p>
    </div>
  );
}

export default PropertyFeaturesCore;
