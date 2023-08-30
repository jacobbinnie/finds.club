import { PlaceDeconstructed, PlacesFeature } from "@/interfaces/places";
import {
  ArrowLeftCircleIcon,
  ArrowTopRightOnSquareIcon,
  PlusCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import ReviewEditor from "../ReviewEditor";
import { useState } from "react";
import { supabase } from "@/utils/supabase";
import { useSupabase } from "@/providers/SupabaseProvider";
import * as crypto from "crypto";

interface PlaceOverviewProps {
  selectedPoi: PlaceDeconstructed | null;
  handleUpdateSelectedPoi: (value: PlaceDeconstructed | null) => void;
}

function PlaceOverview({
  selectedPoi,
  handleUpdateSelectedPoi,
}: PlaceOverviewProps) {
  const [isReviewing, setIsReviewing] = useState<boolean>(false);
  const [isSubmittingFind, setIsSubmittingFind] = useState<boolean>(false);

  const { profile } = useSupabase();

  const submitFindReview = async (
    review: string,
    rating: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  ) => {
    setIsSubmittingFind(true);

    const submitFind = (placeId: string) => {
      if (profile?.id) {
        supabase
          .from("finds")
          .insert([
            {
              review,
              place: placeId,
              rating,
              user_id: profile?.id,
            },
          ])
          .select()
          .then((res) => {
            if (res) {
              setIsReviewing(false);
              setIsSubmittingFind(false);
            }
          });
      }
    };

    if (selectedPoi) {
      supabase
        .from("places")
        .select("*")
        .eq(
          "hashed_mapbox_id",
          crypto
            .createHash("md5")
            .update(selectedPoi?.mapbox_hash_id)
            .digest("hex")
        )
        .eq("name", selectedPoi?.name)

        .throwOnError()

        .then((place) => {
          if (place.data && place.data.length > 0) {
            console.log("Trying to submit first find step");
            submitFind(place.data[0].id);
          } else {
            if (selectedPoi?.full_address) {
              supabase
                .from("places")
                .insert([
                  {
                    hashed_mapbox_id: crypto
                      .createHash("md5")
                      .update(selectedPoi?.mapbox_hash_id)
                      .digest("hex"),
                    name: selectedPoi?.name,
                    full_address: selectedPoi?.full_address,
                    lat: selectedPoi?.lat,
                    lng: selectedPoi?.lng,
                    locality: selectedPoi?.locality,
                    postcode: selectedPoi?.postcode,
                    region: selectedPoi?.region,
                    country: selectedPoi?.country,
                  },
                ])
                .select()
                .then((place) => {
                  if (place.data && place.data.length > 0) {
                    submitFind(place.data[0].id);
                  }
                });
            }
          }
        });
    }
  };

  const renderPoiCategories = () => {
    return selectedPoi?.categories?.map((category, key) => {
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

  const urlMapString =
    selectedPoi?.full_address &&
    "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(selectedPoi.name) +
      " " +
      encodeURIComponent(selectedPoi?.full_address);

  return (
    <div className="w-full sm:max-w-[500px] p-6 gap-3 flex flex-col h-screen">
      <div className="flex w-full justify-between">
        <ArrowLeftCircleIcon
          className="w-6 h-6 text-primary cursor-pointer hover:text-gray-200 transition-all"
          onClick={() => handleUpdateSelectedPoi(null)}
        />

        <div className="flex items-center gap-3 justify-between">
          <div
            onClick={() => setIsReviewing((prev) => !prev)}
            className="flex items-center group gap-1 hover:bg-accent transition-all cursor-pointer bg-gray-200 px-2 py-1 rounded-lg"
          >
            <p className="tracking-tighter text-sm">
              {isReviewing ? "Cancel review" : "Add to finds"}
            </p>
            {isReviewing ? (
              <XCircleIcon className="w-5 h-5 text-primary group-hover:rotate-180 transition-all" />
            ) : (
              <PlusCircleIcon className="w-5 h-5 text-primary group-hover:rotate-180 transition-all" />
            )}
          </div>

          {selectedPoi?.full_address && (
            <a
              target="_blank"
              href={urlMapString}
              rel="noopener noreferrer"
              className="bg-accent whitespace-nowrap flex justify-center items-center px-2 py-1 rounded-lg text-sm tracking-tighter cursor-pointer hover:bg-gray-200 transition-all"
            >
              Open in maps
              <ArrowTopRightOnSquareIcon className="w-3 h-3 ml-1" />
            </a>
          )}
        </div>
      </div>

      <div className="w-full flex flex-col gap-1">
        <h1 className="text-2xl tracking-tighter font-bold">
          {selectedPoi?.name}
        </h1>
        <p className="tracking-tighter text-sm">{selectedPoi?.full_address}</p>
      </div>

      <div className="flex gap-3 flex-wrap">{renderPoiCategories()}</div>

      <div className="w-full mt-6 flex flex-col gap-3">
        <ReviewEditor
          isReviewing={isReviewing}
          isSubmittingFind={isSubmittingFind}
          submitFindReview={submitFindReview}
        />

        <div className="w-full flex justify-between">
          <p className="tracking-tighter text-sm font-bold">Reviews</p>
          <p className="bg-accent px-2 flex items-center rounded-lg text-sm tracking-tighter">
            Overall 8.9
          </p>
        </div>
      </div>
    </div>
  );
}

export default PlaceOverview;
