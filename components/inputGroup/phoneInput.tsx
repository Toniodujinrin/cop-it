import { Dispatch, SetStateAction } from "react";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

interface PhoneInputProps{
  value: string | undefined;
  errors: string;
  label: string;
  setValue: Dispatch<SetStateAction<any>>;
  

}
 

const PhoneInputComp:React.FC<PhoneInputProps> = ({setValue,value, label, errors})=>{
return(
    <div className="w-full">
    <label className="text-[#9c9c9c] font-semibold">{label}</label>
  <PhoneInput defaultCountry="US" onChange={setValue} value={value}/>
  <small className=" text-red-500">{errors}</small>
</div>
)

}

export default PhoneInputComp