import PropertyListing from "../PropertyListing";

interface PropertyGridProps {}

function PropertyGrid({}: PropertyGridProps) {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-6 grid px-6 lg:px-8 py-8 max-w-[1400px]">
        <PropertyListing />
        <PropertyListing />
        <PropertyListing />
        <PropertyListing />
        <PropertyListing />
        <PropertyListing />
        <PropertyListing />
        <PropertyListing />
      </div>
    </div>
  );
}

export default PropertyGrid;
