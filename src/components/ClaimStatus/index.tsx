import { ClaimStatusType } from "@/interfaces";
import { ViewfinderCircleIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

interface ClaimStatusProps {
  loading: boolean;
  status: ClaimStatusType;
}

function ClaimStatus({ loading, status }: ClaimStatusProps) {
  return (
    <div
      className={clsx(
        status === "CLAIMED"
          ? "bg-primary text-tertiary"
          : "bg-transparent text-accent border-2 border-accent cursor-pointer hover:bg-accent hover:text-tertiary",
        "w-36 items-center whitespace-nowrap px-3 transition-all rounded-2xl h-8 flex justify-center tracking-tighter"
      )}
    >
      {loading ? (
        <ViewfinderCircleIcon className="w-4 h-4 animate-spin" />
      ) : (
        <h1 className="text-small">
          {status === "CLAIMED" ? "Claimed" : "Claim"}
        </h1>
      )}
    </div>
  );
}

export default ClaimStatus;
