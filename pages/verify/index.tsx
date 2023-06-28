import InputGroup from "../../components/inputGroup";
import SignUpBar from "../../components/SignUpBar";
import { useState, useContext } from "react";
import Joi from "joi";
import { SignUpContext } from "../../Contexts/SignUpContext";
import 'react-phone-number-input/style.css'
import AddressInput from "../../components/inputGroup/addressInput";
import PhoneInputComp from "../../components/inputGroup/phoneInput";
import SignUpButton from "../../components/utilities/signupButtons";
import { motion } from "framer-motion";
const Verify = () => {
  const { processAccountVerification, signupLoading } = useContext(SignUpContext);
  const Schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    address: Joi.string().required().label("Address"),
    phone: Joi.string().required().label("Phone Number"),
  });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState<string|undefined>("");

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
  });

  const handleSubmit = async () => {
   
   
    const errorsObject = Schema.validate(
      { firstName, lastName, address, phone },
      { abortEarly: false }
    ); 
    
    if (errorsObject.error) {
      const temporaryErrorObject = {
        firstName: "",
        lastName: "",
        address: "",
        phone: "",
      };
      errorsObject.error?.details.forEach((detail) => {
        if (
          Object.keys(temporaryErrorObject).includes(detail.path[0].toString())
        ) {
          const path: string = detail.path[0].toString();
          temporaryErrorObject[
            path as keyof {
              lastName: string;
              firstName: string;
              phone: string;
              address: string;
            }
          ] = detail.message;
        }
      });
      let errorsArray: string[] = [];
      errorsObject.error?.details.forEach((error) =>
        errorsArray.push(error.path[0].toString())
      );
      Object.keys(temporaryErrorObject).forEach((error) => {
        if (!errorsArray.includes(error)) {
          temporaryErrorObject[
            error as keyof {
              lastName: string;
              firstName: string;
              phone: string;
              address: string;
            }
          ] = "";
        }
      });

      setErrors(temporaryErrorObject);
    } else {
      const payload = {
        lastName: lastName,
        firstName: firstName,
        phone: phone,
        address: address,
      };
      await processAccountVerification(payload);
    }
  };
  return (
    <SignUpBar>
      <motion.section initial={{y:30, opacity:0.8}} animate={{y:0, opacity:1}} className="flex flex-col mt-[50px] h-screen lg:p-0 p-2  lg:w-[60%] items-center w-full  ">
        <div>
          <img
            src="../assets/logog2.svg"
            className="w-[60px] h-[60px] "
            alt=""
          />
        </div>
        <h1 className="text-[28px] mt-[30px] text-darkGreen font-semibold ">
          Create an Account{" "}
        </h1>

        <div className="lg:w-[700px]   pt-[40px] space-y-4">
          <div className="w-full h-auto flex flex-col  lg:grid grid-cols-2 lg:justify-items-start justify-center">
            <InputGroup
              value={firstName}
              setValue={setFirstName}
              errors={errors.firstName}
              label="First Name"
              type="string"
            />
            <InputGroup
              value={lastName}
              setValue={setLastName}
              errors={errors.lastName}
              type={"string"}
              label={"Last Name"}
            />
             <div>
            
            <PhoneInputComp label="Phone" value={phone} setValue={setPhone} errors={errors.phone}/>
            
          </div>
          </div>
         <AddressInput label={'Address'} errors={errors.address} value={address} setValue={setAddress}/>
         <div className="w-full flex flex-col items-center">
            <SignUpButton text="Submit" loading={signupLoading} onClick={()=>{handleSubmit()}} />
          </div>
        </div>
 
      </motion.section>
    </SignUpBar>
  );
};

export default Verify;
