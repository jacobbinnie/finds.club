import { Find } from "@/interfaces";

interface FindProps {
  find: Find;
}

function Find({ find }: FindProps) {
  return (
    <div
      key={find.id}
      className="w-full flex gap-3 flex-col bg-white hover:bg-slate-50 shadow-lg p-6 rounded-lg cursor-pointer transition-all"
    >
      <div className="flex justify-between">
        <p className="bg-primary w-min whitespace-nowrap px-2 py-1 text-tertiary rounded-lg text-sm font-light tracking-tighter">
          {find.place.neighborhood}
        </p>
        <p className="bg-accent px-2 py-1 text-tertiary rounded-lg text-sm font-bold tracking-tighter">
          {find.rating}
        </p>
      </div>

      <p className="text-xl font-bold tracking-tighter">{find.place.name}</p>

      <p className="tracking-tighter font-light">{find.description}</p>

      <p className="tracking-tighter font-light text-sm">
        {new Date(find.created_at).toDateString()}
      </p>
    </div>
  );
}

export default Find;
