import { Find } from "@/interfaces";
import { useLocation } from "@/providers/LocationProvider";

interface FindProps {
  find: Find;
  isReviewLayout?: boolean;
}

function Find({ find, isReviewLayout }: FindProps) {
  const { handleUpdateSelectedPoi } = useLocation();

  const renderPoiCategories = () => {
    return find.place.categories?.map((category, key) => {
      return (
        <p
          key={key}
          className="bg-accent whitespace-nowrap px-2 rounded-lg text-sm tracking-tighter"
        >
          {category}
        </p>
      );
    });
  };

  return (
    <div
      onClick={() =>
        handleUpdateSelectedPoi({
          full_address: find.place.full_address,
          name: find.place.name,
          lat: find.place.lat,
          lng: find.place.lng,
          mapbox_hash_id: find.place.id,
        })
      }
      key={find.id}
      className="w-full flex gap-3 flex-col bg-white hover:bg-slate-50 shadow-lg p-4 rounded-lg cursor-pointer transition-all"
    >
      <div className="flex justify-between">
        <p className="bg-primary w-min whitespace-nowrap h-min px-2 py-1 text-tertiary rounded-lg text-xs font-light tracking-tighter">
          {find.place.locality || find.place.region || find.place.country}
        </p>
        <p className="bg-accent h-min px-2 py-1 flex items-center text-tertiary rounded-lg text-xs font-bold tracking-tighter">
          {find.rating}
        </p>
      </div>

      <div>
        <p className="text-md font-bold tracking-tighter">{find.place.name}</p>

        <p className="text-sm tracking-tighter font-light">
          {find.place.full_address}
        </p>
      </div>

      <div className="flex gap-3 flex-wrap">{renderPoiCategories()}</div>

      <p className="tracking-tighter text-sm">{find.review}</p>

      <p className="tracking-tighter font-light text-sm text-gray-200">
        {new Date(find.created_at).toDateString()}
      </p>
    </div>
  );
}

export default Find;
