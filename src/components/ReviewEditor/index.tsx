interface ReviewEditorProps {}

function ReviewEditor({}: ReviewEditorProps) {
  const renderRatingValues = () => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => {
      return (
        <div className="bg-gray-200 w-[10%] px-2 py-1 rounded-lg text-sm cursor-pointer flex justify-center">
          {value}
        </div>
      );
    });
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <p className="text-lg font-bold tracking-tighter">Review your find</p>

      <textarea className="rounded-lg resize-none focus:outline-none p-3" />

      <div className="flex justify-between gap-1">{renderRatingValues()}</div>
    </div>
  );
}

export default ReviewEditor;
