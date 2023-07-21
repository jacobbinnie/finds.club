import Autocomplete from "react-google-autocomplete";

interface SearchProps {
  apiKey: string;
  handleUpdateLocation(lat: number, lng: number, zoom: number): void;
}

function Search({ apiKey, handleUpdateLocation }: SearchProps) {
  // const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex w-full relative justify-center px-3 lg:px-6">
      <div className="w-full rounded-md transition-all flex mt-[-34px] border-4 border-tertiary h-16 md:w-1/2 focus:outline-none shadow-t-lg">
        <Autocomplete
          className="text-primary rounded-sm px-6 lg:px-8 w-full font-medium focus:outline-none"
          apiKey={apiKey}
          onPlaceSelected={(place) => {
            if (place && place.geometry && place.geometry.location) {
              handleUpdateLocation(
                place.geometry.location.lat(),
                place.geometry.location.lng(),
                18
              );
            }
          }}
          placeholder="Where's the next property?"
          options={{
            componentRestrictions: { country: "nz" },
            types: ["address"],
          }}
        />
        {/* <button
          onMouseOver={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={
            "hover:rounded-tr-none rounded-tr-lg rounded-br-lg bg-primary hover:bg-accent hover:w-60 w-44 relative text-tertiary transition-all font-bold"
          }
          type="submit"
        >
          <div className="absolute top-0 right-0">
            <LetterboxFlag active={isHovered} />
          </div>
          Search
        </button> */}
      </div>
    </div>
  );
}

export default Search;
