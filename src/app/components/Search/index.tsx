import Autocomplete from "react-google-autocomplete";

interface SearchProps {
  apiKey: string;
  handleUpdateLocation(lat: number, lng: number, zoom: number): void;
}

function Search({ apiKey, handleUpdateLocation }: SearchProps) {
  // Returns ZOOM level based on address type
  const checkAddressType = (place: google.maps.places.PlaceResult) => {
    if (place.address_components) {
      if (place.address_components[0].types[0] === "street_number") {
        return 20;
      } else return 17;
    } else return 17;
  };

  return (
    <div className="flex w-full relative justify-center px-3 lg:px-6">
      <div className="w-full rounded-md transition-all flex mt-[-34px] h-16 lg:w-1/2 max-w-lg focus:outline-none shadow-t-lg">
        <Autocomplete
          className="text-primary bg-white rounded-md shadow-md px-6 lg:px-8 w-full font-regular focus:outline-none"
          apiKey={apiKey}
          onPlaceSelected={(place) => {
            if (place && place.geometry && place.geometry.location) {
              handleUpdateLocation(
                place.geometry.location.lat(),
                place.geometry.location.lng(),
                checkAddressType(place)
              );
            }
          }}
          placeholder="Enter an address or suburb"
          options={{
            componentRestrictions: { country: "nz" },
            types: ["geocode"],
          }}
        />
      </div>
    </div>
  );
}

export default Search;
