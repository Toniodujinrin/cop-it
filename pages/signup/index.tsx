import InputGroup from "../../components/inputGroup";
import SignUpBar from "../../components/SignUpBar";
import { useState, useContext } from "react";
import Joi from "joi";
import Router, { useRouter } from "next/router";
import { SignUpContext } from "./../../Contexts/SignUpContext";

const SignUp = () => {
  const { setFirstSignUp } = useContext(SignUpContext);
  const router = useRouter();
  const Schema = Joi.object({
    email: Joi.string()
      .min(3)
      .max(100)
      .email({ minDomainSegments: 2, tlds: { allow: false } })
      .label("Email"),
    password: Joi.string().required().label("Password"),
    confirmPassword: Joi.string().required().label("Confirm Password"),
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const errorsObject = Schema.validate(
      { email, password, confirmPassword },
      { abortEarly: false }
    );
    if (errorsObject.error) {
      const temporaryErrorObject = {
        email: "",
        password: "",
        confirmPassword: "",
      };
      errorsObject.error?.details.forEach((detail) => {
        if (
          Object.keys(temporaryErrorObject).includes(detail.path[0].toString())
        ) {
          const path: string = detail.path[0].toString();
          temporaryErrorObject[
            path as keyof { email: string; password: string }
          ] = detail.message;
        }
        if (confirmPassword !== password) {
          temporaryErrorObject.confirmPassword =
            "Confirm Password must match Password";
        }
      });
      let errorsArray: string[] = [];
      errorsObject.error?.details.forEach((error) =>
        errorsArray.push(error.path[0].toString())
      );
      Object.keys(temporaryErrorObject).forEach((error) => {
        if (!errorsArray.includes(error)) {
          temporaryErrorObject[
            error as keyof { email: string; password: string }
          ] = "";
        }
        if (confirmPassword !== password) {
          temporaryErrorObject.confirmPassword =
            "Confirm password must match password";
        } else {
          temporaryErrorObject.confirmPassword = "";
        }
      });

      setErrors(temporaryErrorObject);
      console.log(errorsObject.error);
    } else {
      //authentication processed
      setFirstSignUp(true);
      router.push("/verifyEmail");
    }
  };
  return (
    <SignUpBar>
      <section className="flex flex-col  lg:w-[60%] items-center w-full h-full ">
        <div>
          <img
            src="../assets/logog2.svg"
            className="w-[60px] h-[60px]"
            alt=""
          />
        </div>
        <h1 className="text-[28px] mt-[30px] text-darkGreen font-semibold ">
          Create an Account{" "}
        </h1>

        <form className="w-[400px] pt-[40px] space-y-4" action="">
          <InputGroup
            value={email}
            setValue={setEmail}
            errors={errors.email}
            label="Email"
            type="string"
          />
          <InputGroup
            value={password}
            setValue={setPassword}
            errors={errors.password}
            type={"password"}
            label={"Password"}
          />
          <InputGroup
            value={confirmPassword}
            setValue={setConfirmPassword}
            type={"password"}
            errors={errors.confirmPassword}
            label={"Confirm Password"}
          />

          <button
            className="w-full h-[50px] rounded-md bg-forestGreen text-white font-semibold "
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Submit
          </button>
          <button className="flex flex-row border border-black  items-center w-full py-2 rounded-md text-black justify-center">
            <img
              className="w-[25px] h-[25px]
                "
              src="../assets/google.svg"
              alt=""
            />
            <p className="font-semibold ml-4">Sign in with Google</p>
          </button>
        </form>
      </section>
    </SignUpBar>
  );
};

export default SignUp;
