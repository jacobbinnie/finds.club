import PropertyListing from "../PropertyListing";

interface PropertyGridProps {}

function PropertyGrid({}: PropertyGridProps) {
  return (
    <div className="w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-6 grid px-6 lg:px-8 py-6">
      <PropertyListing />
      <PropertyListing />
      <PropertyListing />
      <PropertyListing />
      <PropertyListing />
      <PropertyListing />
      <PropertyListing />
      <PropertyListing />
    </div>
  );
}

export default PropertyGrid;
