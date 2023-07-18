interface ActionBarProps {}

function ActionBar({}: ActionBarProps) {
  return (
    <div className="w-full flex justify-between items-center px-6 lg:px-8 h-10 bg-accent">
      <div>
        <p className="text-sm font-bold">Find an off-market seller</p>
      </div>
      <div className="flex gap-6">
        <p className="text-sm font-bold">List a property</p>
        <p className="text-sm font-bold">I&apos;m open to selling</p>
      </div>
    </div>
  );
}

export default ActionBar;
