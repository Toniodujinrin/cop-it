import { SetStateAction, Dispatch } from "react";

interface SearchBarProps {
  value: string;
  placeholder: string;
  setValue: Dispatch<SetStateAction<string>>;
  handleSearch:any
}
const SearchBar: React.FC<SearchBarProps> = ({
  value,
  placeholder,
  setValue,
  handleSearch
}) => {
  
  return (
    <div className="lg:w-[400px] h-[50px] rounded-[18px] bg-lightGray     flex flex-row justify-between items-center px-4  ">
          <img
        className="w-[25px] h-[25px]"
        src="../../assets/searchIcon.svg"
        alt=""
      />
      <input
        onKeyUp={(e)=>{ if(e.key == 'Enter')handleSearch()}}
        className="h-full w-[80%] bg-transparent   placeholder:text-[#5A5353]  focus:outline-none outline-none border-none "
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
      />
 
    </div>
  );
};

export default SearchBar;
