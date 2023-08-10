import clsx from "clsx";

interface ListedStatusProps {
  status: string | null;
}

function ListedStatus({ status }: ListedStatusProps) {
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
        "w-min whitespace-nowrap px-3 rounded-2xl h-6 flex justify-center tracking-tighter"
      )}
    >
      <h1 className="text-small text-tertiary">{displayStatus}</h1>
    </div>
  );
}

export default ListedStatus;
