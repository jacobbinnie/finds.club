import { Find } from "@/interfaces";

interface FindProps {
  find: Find;
}

function Find({ find }: FindProps) {
  return (
    <div
      key={find.id}
      className="w-full flex gap-2 flex-col bg-white hover:bg-slate-50 shadow-lg p-4 rounded-lg cursor-pointer transition-all"
    >
      <div className="flex justify-between">
        <p className="bg-primary w-min whitespace-nowrap h-min px-2 py-1 text-tertiary rounded-lg text-sm font-light tracking-tighter">
          {find.place.neighborhood}
        </p>
        <p className="bg-accent h-min px-2 py-1 flex items-center text-tertiary rounded-lg text-sm font-bold tracking-tighter">
          {find.rating}
        </p>
      </div>

      <p className="text-md font-bold tracking-tighter">{find.place.name}</p>

      <p className="text-sm tracking-tighter font-light">{find.description}</p>

      <p className="tracking-tighter font-light text-sm text-gray-300">
        {new Date(find.created_at).toDateString()}
      </p>
    </div>
  );
}

export default Find;
