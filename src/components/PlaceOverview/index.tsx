import { PlaceDeconstructed } from "@/interfaces/places";
import {
  ArrowLeftCircleIcon,
  ArrowTopRightOnSquareIcon,
  CheckBadgeIcon,
  PlusCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import ReviewEditor from "../ReviewEditor";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { useSupabase } from "@/providers/SupabaseProvider";
import { ProfileAndFinds, Review } from "@/interfaces";
import JSConfetti from "js-confetti";
import { hashString } from "@/utils/utils";

interface PlaceOverviewProps {
  selectedPoi: PlaceDeconstructed | null;
  handleUpdateSelectedPoi: (value: PlaceDeconstructed | null) => void;
  fetchProfile: () => Promise<void>;
  profileAndFinds: ProfileAndFinds | null | undefined;
  fetchPlaceReviews: (hashed_mapbox_id: string) => Promise<void>;
  placeReviews: Review[] | "LOADING";
}

function PlaceOverview({
  selectedPoi,
  handleUpdateSelectedPoi,
  fetchProfile,
  profileAndFinds,
  fetchPlaceReviews,
  placeReviews,
}: PlaceOverviewProps) {
  const [isReviewing, setIsReviewing] = useState<boolean>(false);
  const [isSubmittingFind, setIsSubmittingFind] = useState<boolean>(false);

  const [isUserFind, setIsUserFind] = useState<boolean>(false);

  const jsConfetti = new JSConfetti();

  const { profile } = useSupabase();

  const checkUserFind = () => {
    const bool = profileAndFinds?.finds.some(
      (find) => find.place.hashed_mapbox_id === selectedPoi?.hashed_mapbox_id
    );
    bool ? setIsUserFind(true) : setIsUserFind(false);
  };

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
              fetchProfile().then(() => {
                jsConfetti.addConfetti();
                fetchPlaceReviews(selectedPoi?.hashed_mapbox_id || "");
                setIsUserFind(true);
                setIsReviewing(false);
                setIsSubmittingFind(false);
              });
            }
          });
      }
    };

    if (selectedPoi) {
      supabase
        .from("places")
        .select("*")
        .eq("hashed_mapbox_id", selectedPoi?.hashed_mapbox_id)
        .eq("name", selectedPoi?.name)

        .throwOnError()

        .then((place) => {
          if (place.data && place.data.length > 0) {
            submitFind(place.data[0].hashed_mapbox_id);
          } else {
            if (selectedPoi?.full_address) {
              supabase
                .from("places")
                .insert([
                  {
                    hashed_mapbox_id: selectedPoi.hashed_mapbox_id,
                    name: selectedPoi?.name,
                    full_address: selectedPoi?.full_address,
                    lat: selectedPoi?.lat,
                    lng: selectedPoi?.lng,
                    locality: selectedPoi?.locality,
                    postcode: selectedPoi?.postcode,
                    region: selectedPoi?.region,
                    country: selectedPoi?.country,
                    categories: selectedPoi?.categories,
                  },
                ])
                .select()
                .then((place) => {
                  if (place.data && place.data.length > 0) {
                    submitFind(place.data[0].hashed_mapbox_id);
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

  const renderReviews = () => {
    if (placeReviews === "LOADING") return <p>Loading...</p>;

    return placeReviews.map((review, key) => {
      return (
        <div
          key={key}
          className="w-full flex flex-col gap-1 border-b border-gray-200 pb-2"
        >
          <div className="flex justify-between">
            <p className="tracking-tighter text-sm font-bold">
              {review.profile.username}
            </p>
            <p className="bg-accent px-2 flex items-center rounded-lg text-sm tracking-tighter">
              {review.rating}
            </p>
          </div>
          <p className="tracking-tighter text-sm">{review.review}</p>
        </div>
      );
    });
  };

  const urlMapString =
    selectedPoi?.full_address &&
    "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(selectedPoi.name) +
      " " +
      encodeURIComponent(selectedPoi?.full_address);

  useEffect(() => {
    fetchPlaceReviews(selectedPoi?.hashed_mapbox_id || "");
    checkUserFind();
  }, [selectedPoi]);

  return (
    <div className="w-full sm:max-w-[500px] p-6 gap-3 flex flex-col h-screen">
      <div className="flex w-full justify-between">
        <ArrowLeftCircleIcon
          className="w-6 h-6 text-primary cursor-pointer hover:text-gray-200 transition-all"
          onClick={() => handleUpdateSelectedPoi(null)}
        />

        <div className="flex items-center gap-3 justify-between">
          {profile?.username &&
            (isUserFind ? (
              <div className="flex gap-1">
                <p className="text-sm tracking-tighter font-bold">Found</p>
                <CheckBadgeIcon className="w-5 h-5 text-primary" />
              </div>
            ) : (
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
            ))}

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
      {renderReviews()}
    </div>
  );
}

export default PlaceOverview;
