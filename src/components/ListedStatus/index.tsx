interface ListedStatusProps {}

function ListedStatus({}: ListedStatusProps) {
  return (
    <div className="w-min px-3 rounded-2xl h-6 bg-accent flex justify-center tracking-tighter">
      <h1 className="text-small text-tertiary">Listed</h1>
    </div>
  );
}

export default ListedStatus;
