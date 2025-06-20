import { HiOutlineSearch } from "react-icons/hi";

type SearchTextProps = {
  text: string;
  setSearchValue: (value: string) => void;
};

const SearchText = ({ text, setSearchValue }: SearchTextProps) => {
  return (
    <div className="relative w-full">
      <HiOutlineSearch
        fontSize={16}
        className="absolute left-3 top-1/2 mt-[1px] -translate-y-1/2 text-gray-600"
      />
      <input
        type="text"
        name="searchValue"
        value={text}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        placeholder="Search..."
        className="text-md h-6 w-full rounded-md border bg-white ps-8 text-black placeholder:text-sm focus:outline-none active:outline-none 2xl:h-8"
      />
    </div>
  );
};

export default SearchText;
