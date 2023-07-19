function ActionBar() {
  return (
    <div className="w-full hidden sm:flex justify-between items-center px-6 lg:px-8 h-14 bg-accent">
      <div className="flex gap-6">
        <p className="font-medium text-tertiary">Find an off-market seller</p>
      </div>
      <div className="flex gap-6">
        <p className="font-bold text-tertiary">List a property</p>
        <p className="font-medium text-tertiary">I&apos;m open to selling</p>
      </div>
    </div>
  );
}

export default ActionBar;
