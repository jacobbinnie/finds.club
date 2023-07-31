interface InputProps {}

function Input({}: InputProps) {
  return (
    <div>
      <div className="relative rounded-md shadow-sm">
        <input
          type="text"
          className="block focus: w-full focus:outline-none rounded-md border-0 py-2 px-3 text-sm font-regular tracking-tighter text-gray-900 ring-1 ring-inse focus:border-none ring-gray-300 placeholder:text-gray-400"
          placeholder="Keywords"
        />
      </div>
    </div>
  );
}

export default Input;
