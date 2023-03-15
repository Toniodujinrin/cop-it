import { SetStateAction, Dispatch } from "react";
interface SearchBarProps {
  value: string;
  placeholder: string;
  setValue: Dispatch<SetStateAction<string>>;
}
const SearchBar: React.FC<SearchBarProps> = ({
  value,
  placeholder,
  setValue,
}) => {
  return (
    <div className="w-[400px] h-[30px]    border-b-2 border-darkGreen flex flex-row justify-between items-center px-4  ">
      <input
        className="h-full w-[80%] bg-transparent   placeholder:text-[#5A5353]  focus:outline-none outline-none border-none "
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
      />
      <img
        className="w-[25px] h-[25px]"
        src="../../assets/searchIcon.svg"
        alt=""
      />
    </div>
  );
};

export default SearchBar;
