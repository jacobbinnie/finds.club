interface InputProps {}

function Input({}: InputProps) {
  return (
    <div className="w-full ring-gray-300 ring-1 rounded-md">
      <input
        type="text"
        className="flex w-full focus:outline-none rounded-md py-[7px] px-3 text-small font-regular tracking-tighter text-gray-900 ring-1 focus:border-none ring-gray-300 placeholder:text-gray-400"
        placeholder="Keywords"
      />
    </div>
  );
}

export default Input;
