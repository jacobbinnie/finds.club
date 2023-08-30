import { ArrowPathIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useState } from "react";

interface ReviewEditorProps {
  isReviewing: boolean;
  isSubmittingFind: boolean;
  submitFindReview: (
    review: string,
    rating: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  ) => Promise<void>;
}

function ReviewEditor({
  isReviewing,
  isSubmittingFind,
  submitFindReview,
}: ReviewEditorProps) {
  const [review, setReview] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  const handleSubmitFind = () => {
    if (review.length >= 20 && rating > 0 && rating <= 10) {
      submitFindReview(
        review,
        rating as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
      );
    }
  };

  const handleUpdateReview = (value: string) => {
    if (value.length <= 180 && review.length <= 180) {
      setReview(value);
    } else if (value.length < 180) {
      setReview(value);
    }
  };

  const renderRatingValues = () => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value, key) => {
      return (
        <button
          key={key}
          disabled={isSubmittingFind}
          onClick={() =>
            setRating((prev) => {
              if (prev === value) {
                return 0;
              }

              return value;
            })
          }
          className={clsx(
            value <= rating ? "bg-accent" : "bg-gray-200",
            "w-[10%] px-2 py-1 rounded-lg text-sm cursor-pointer flex justify-center transition-all"
          )}
        >
          {value}
        </button>
      );
    });
  };

  return (
    <div
      className={clsx(
        isReviewing ? "h-64 opacity-100" : "h-0 opacity-0",
        "w-full flex flex-col gap-3 py-3 border-t-2 overflow-hidden transition-all"
      )}
    >
      <div className="w-full flex justify-between items-center">
        <p className="text-lg font-bold tracking-tighter">Review your find</p>
        <p
          className={clsx(
            review.length >= 170 ? "text-red-600" : "text-accent",
            "tracking-tighter text-sm"
          )}
        >
          {180 - review.length}
        </p>
      </div>

      <textarea
        disabled={isSubmittingFind}
        onChange={(e) => handleUpdateReview(e.target.value)}
        value={review}
        placeholder="Great wine, excellent service, vibrant atmosphere etc"
        className="rounded-lg h-24 text-sm resize-none focus:outline-none p-3 bg-transparent border-2"
      />

      <div className="flex justify-between gap-1">{renderRatingValues()}</div>

      <button
        onClick={handleSubmitFind}
        disabled={isSubmittingFind || review.length < 20}
        className="bg-accent transition-all disabled:bg-gray-200 disabled:text-gray-300 flex gap-1 items-center justify-center w-full rounded-lg text-sm py-2 tracking-tighter"
      >
        {isSubmittingFind ? "Adding to finds" : "Add to finds"}
        <ArrowPathIcon
          className={clsx(
            isSubmittingFind ? "block" : "hidden",
            "w-4 h-4 animate-spin"
          )}
        />
      </button>
    </div>
  );
}

export default ReviewEditor;
