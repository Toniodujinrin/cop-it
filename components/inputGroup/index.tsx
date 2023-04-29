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
    <div className="flex flex-col w-full">
      <label className="text-darkGreen font-semibold">{label}</label>
      <input
        className="border focus:outline-none border-[#5A5353] w-full p-2 rounded-lg"
        type={type}
        value={value}
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
      />
      <small className=" text-red-500">{errors}</small>
    </div>
  );
};

export default InputGroup;
