import { useState } from "react";
import LetterboxFlag from "../LetterboxFlag";

function Search() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex relative justify-center px-3 lg:px-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="w-full rounded-md transition-all flex mt-[-34px] h-16 md:w-1/2 focus:outline-none shadow-lg"
      >
        <input
          type="search"
          className="text-primary rounded-tl-lg rounded-bl-lg px-6 lg:px-8 w-full font-medium focus:outline-none"
          placeholder="Where's the next property?"
        />

        <button
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
        </button>
      </form>
    </div>
  );
}

export default Search;
