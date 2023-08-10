import { ViewfinderCircleIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

interface ListedStatusProps {
  loading: boolean;
  status: string | null;
}

function ListedStatus({ loading, status }: ListedStatusProps) {
  const displayStatus =
    status === null || status === "NOT_LISTED"
      ? "Not Listed"
      : status === "OPEN"
      ? "Open to selling"
      : "Listed";

  return (
    <div
      className={clsx(
        displayStatus === "Listed"
          ? "bg-accent"
          : displayStatus === "Open to selling"
          ? "bg-openToSelling"
          : "bg-gray-300",
        "w-min min-w-24 items-center whitespace-nowrap px-3 rounded-2xl h-6 flex justify-center tracking-tighter"
      )}
    >
      {loading ? (
        <ViewfinderCircleIcon className="w-4 h-4 animate-spin text-tertiary" />
      ) : (
        <h1 className="text-small text-tertiary">{displayStatus}</h1>
      )}
    </div>
  );
}

export default ListedStatus;
