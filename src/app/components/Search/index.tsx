import { Dispatch, SetStateAction } from "react";
import Autocomplete from "react-google-autocomplete";

interface SearchProps {
  apiKey: string;
  setMapLocation: Dispatch<
    SetStateAction<{
      lat: number;
      lng: number;
      zoom: number;
    }>
  >;
}

function Search({ apiKey, setMapLocation }: SearchProps) {
  // const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex w-full relative justify-center px-3 lg:px-6">
      <div className="w-full rounded-md transition-all flex mt-[-34px] h-16 md:w-1/2 focus:outline-none shadow-lg">
        <Autocomplete
          className="text-primary rounded-lg px-6 lg:px-8 w-full font-medium focus:outline-none"
          apiKey={apiKey}
          onPlaceSelected={(place) => {
            if (place && place.geometry && place.geometry.location) {
              setMapLocation({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
                zoom: 18,
              });
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
