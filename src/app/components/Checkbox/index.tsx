interface CheckboxProps {
  title: string;
}

function Checkbox({ title }: CheckboxProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <p className="font-medium tracking-tighter text-small">{title}</p>

      <div className="h-full items-center flex">
        <label className="relative inline-flex items-center cursor-pointer rounded-xl">
          <input type="checkbox" value="" className="sr-only peer h-full" />
          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
        </label>
      </div>
    </div>
  );
}

export default Checkbox;
