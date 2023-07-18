import clsx from "clsx";

interface LetterboxFlagProps {
  active: boolean;
}

function LetterboxFlag({ active }: LetterboxFlagProps) {
  return (
    <div
      className={clsx(
        active ? "rotate-90 opacity-100" : "rotate-0 opacity-0",
        "transition-all flex origin-top-right"
      )}
    >
      <div className="w-6 h-8 relative bg-accent rounded-tr-none rounded-md" />
      <div className="w-10 relative ml-[-10px] h-2 bg-accent" />
    </div>
  );
}

export default LetterboxFlag;
