import clsx from "clsx";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

interface SellingInfoBarProps {
  tab: "BUY" | "SELL";
}

function SellingInfoBar({ tab }: SellingInfoBarProps) {
  return (
    <div
      className={clsx(
        tab === "SELL" ? "mt-3 py-4 sm:py-8" : "h-0 mt-0 y-0 overflow-hidden",
        "w-full rounded-lg bg-accent px-6 grid gap-x-3 gap-y-3 sm:gap-y-6 sm:grid-cols-2 md:grid-cols-3 shadow-lg transition-all duration-300"
      )}
    >
      <div className="flex justify-center items-center gap-1">
        <CheckCircleIcon className="w-4 text-tertiary" />
        <p className="text-small text-center tracking-tighter font-medium text-tertiary">
          $5 to list. No commission.
        </p>
      </div>
      <div className="flex justify-center items-center gap-1">
        <CheckCircleIcon className="w-4 text-tertiary" />
        <p className="text-small text-center tracking-tighter font-medium text-tertiary">
          Live chat with buyers.
        </p>
      </div>
      <div className="flex justify-center items-center gap-1 col-span-1 sm:col-span-2 md:col-span-1">
        <CheckCircleIcon className="w-4 text-tertiary" />
        <p className="text-small text-center tracking-tighter font-medium text-tertiary">
          Deal done.
        </p>
      </div>
    </div>
  );
}

export default SellingInfoBar;
