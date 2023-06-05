
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { useEffect, useState } from "react";


const AddressInput= ({ label,
    errors,
    value,
    setValue,
   
    })=>{
   
   const [_value,_setValue] = useState(value)
  useEffect(()=>{
   setValue(_value.label)
  },[_value])

  console.log(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)
    return(
        <div className="flex flex-col items-start">
        <label className="text-[#9c9c9c] focus:text-forestGreen text-[16px] font-semibold">{label}</label>

        <GooglePlacesAutocomplete
        
        selectProps={{
          _value,
          onChange:_setValue,
        }}
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
    />
          
        
        <small className=" text-red-500">{errors}</small>
        </div>
    )

}

export default AddressInput