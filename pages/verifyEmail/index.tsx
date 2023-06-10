import InputGroup from "../../components/inputGroup";
import SignUpBar from "../../components/SignUpBar";
import { useState, useContext } from "react";
import Joi from "joi";
import { SignUpContext } from "../../Contexts/SignUpContext";
import SignUpButton from "../../components/utilities/signupButtons";

const VerifyEmail = () => {
  const { processEmailVerfication, signupLoading } = useContext(SignUpContext);

  const Schema = Joi.object({
    otp: Joi.string().required().max(6).min(4).label("OTP"),
  });
  const [otp, setOtp] = useState("");

  const [errors, setErrors] = useState({
    otp: "",
  });

  const handleSubmit = async () => {
  
    const errorsObject = Schema.validate({ otp }, { abortEarly: false });
    if (errorsObject.error) {
      const temporaryErrorObject = {
        otp: "",
      };
      errorsObject.error?.details.forEach((detail) => {
        if (
          Object.keys(temporaryErrorObject).includes(detail.path[0].toString())
        ) {
          const path: string = detail.path[0].toString();
          temporaryErrorObject[path as keyof { otp: string }] = detail.message;
        }
      });
      let errorsArray: string[] = [];
      errorsObject.error?.details.forEach((error) =>
        errorsArray.push(error.path[0].toString())
      );
      Object.keys(temporaryErrorObject).forEach((error) => {
        if (!errorsArray.includes(error)) {
          temporaryErrorObject[error as keyof { otp: string }] = "";
        }
      });

      setErrors(temporaryErrorObject);
    } else {
      const payload = { code: otp };
      await processEmailVerfication(payload);
    }
  };
  return (
    <SignUpBar>
      <section className="flex flex-col mt-[50px]  lg:w-[60%] items-center w-full h-full ">
        <div>
          <img
            src="../assets/logog2.svg"
            className="w-[60px] h-[60px]"
            alt=""
          />
        </div>
        <h1 className="text-[28px] mt-[30px] text-darkGreen font-semibold ">
          Verify Your Email{" "}
        </h1>

        <div className="w-[400px] pt-[40px] space-y-[40px]" >
          <InputGroup
            value={otp}
            setValue={setOtp}
            type={"text"}
            errors={errors.otp}
            label={"OTP"}
          />

       <SignUpButton text="Submit" loading={signupLoading} onClick={()=>{handleSubmit()}} />
        </div>
      </section>
    </SignUpBar>
  );
};

export default VerifyEmail;
