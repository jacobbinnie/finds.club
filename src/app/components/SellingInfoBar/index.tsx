import clsx from "clsx";
import { CheckCircleIcon, ShieldCheckIcon } from "@heroicons/react/24/solid";

interface SellingInfoBarProps {
  tab: "BUY" | "SELL";
}

function SellingInfoBar({ tab }: SellingInfoBarProps) {
  return (
    <div className="w-full flex">
      <div
        className={clsx(
          tab === "SELL" ? "mt-3 py-4 sm:py-6" : "h-0 mt-0 y-0 overflow-hidden",
          "w-full rounded-l-lg md:rounded-lg bg-accent px-6 grid gap-y-3 md:gap-y-6 md:grid-cols-3 shadow-lg transition-all duration-300"
        )}
      >
        <div className="flex justify-left md:justify-center transition-all gap-3">
          <CheckCircleIcon className="w-4 text-tertiary" />
          <p className="text-small text-left tracking-tighter font-regular text-tertiary">
            Only $49 to list. That's it ✨
          </p>
        </div>

        <div className="flex justify-left md:justify-center transition-all items-center gap-3">
          <CheckCircleIcon className="w-4 text-tertiary" />
          <p className="text-small text-left tracking-tighter font-regular text-tertiary">
            Live chat with buyers.
          </p>
        </div>

        <div className="flex justify-left md:justify-center transition-all gap-3 col-span-1">
          <CheckCircleIcon className="w-4 text-tertiary" />
          <p className="text-small text-left tracking-tighter font-regular text-tertiary">
            No commission.
          </p>
        </div>
      </div>
      <div
        className={clsx(
          tab === "SELL" ? "flex" : "hidden",
          "md:hidden w-1/5 bg-accent mt-3 items-center rounded-r-lg"
        )}
      >
        <ShieldCheckIcon className="w-6 text-tertiary" />
      </div>
    </div>
  );
}

export default SellingInfoBar;
