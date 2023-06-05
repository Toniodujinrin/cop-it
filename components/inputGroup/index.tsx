import { Dispatch, SetStateAction } from "react";
interface InputGroupProps {
  value: string | number;
  errors: string;
  label: string;
  setValue: Dispatch<SetStateAction<string>>;
  type: string;

}

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  errors,
  value,
  setValue,
 
  type,
}) => {
  return (
    
      
      
      <div className="flex w-full flex-col items-start">
      <label className="text-[#9c9c9c] focus:text-forestGreen text-[16px] font-semibold">{label}</label>
      <input
      
        className=" font-semibold text-[21px] border-b-2 focus:border-forestGreen border-lightGray focus:outline-none w-full p-2 "
        type={type}
        value={value}
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
      >
        
      </input>
      <small className=" text-red-500">{errors}</small>
      </div>
   
  );
};

export default InputGroup;
