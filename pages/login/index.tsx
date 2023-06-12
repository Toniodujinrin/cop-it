import InputGroup from "../../components/inputGroup";
import { useState, useContext } from "react";
import Joi from "joi";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserContext } from "./../../Contexts/UserContext";

const LoginPage = () => {
  const router = useRouter()
  const { authenticate, returnToAccountIfLoggedIn, handleGoogleSignIn, authLoading} = useContext(UserContext);
  returnToAccountIfLoggedIn();
  const Schema = Joi.object({
    email: Joi.string()
      .min(3)
      .max(100)
      .email({ minDomainSegments: 2, tlds: { allow: false } })
      .label("Email"),
    password: Joi.string().required().label("Password"),
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const errorsObject = Schema.validate(
      { email, password },
      { abortEarly: false }
    );
    const temporaryErrorObject = {
      email: "",
      password: "",
    };
    if (errorsObject.error) {
      errorsObject.error?.details.forEach((detail) => {
        if (
          Object.keys(temporaryErrorObject).includes(detail.path[0].toString())
        ) {
          const path: string = detail.path[0].toString();
          temporaryErrorObject[
            path as keyof { email: string; password: string }
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
            error as keyof { email: string; password: string }
          ] = "";
        }
      });

      setErrors(temporaryErrorObject);
    } else {
      setErrors(temporaryErrorObject);
      

      const payload = {
        email: email,
        password: password,
      };
      
      await authenticate(payload);
   
    }
  };
  return (
    <main className="flex flex-row justify-between min-h-screen">
      <section className="lg:w-[50%] w-full flex flex-col justify-center items-center">
        <div className="w-full lg:hidden pt-3 pl-4">
          <img
          onClick={()=>{router.push('/')}}
            src="../assets/logog2.svg"
            className="w-[70px] h-[70px]"
            alt=""
          />
        </div>
        <div className="w-[60%] h-full flex flex-col  pt-[30px] ">
          <div className=" mt-[30px] mb-[60px]">
            <h1 className="text-darkGreen font-bold text-[32px]">
              Welcome Back
            </h1>
            <p className="text-">Welcome back! please enter your details</p>
          </div>

          <form
            className="space-y-[20px]"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <InputGroup
              label="Email"
              value={email}
              setValue={setEmail}
              errors={errors.email}
              type="string"
            />
            <InputGroup
              label="Password"
              value={password}
              setValue={setPassword}
              errors={errors.password}
              type="password"
            />

            <p className="text-forestGreen">Forgot Password?</p>

            <button
              disabled={authLoading}
              className="bg-forestGreen w-full py-2 flex justify-center items-center rounded-md text-white"
            >
              {authLoading? (
                <div className="spinnerSmall"></div>
              ) : (
                <p> Sign in </p>
              )}
            </button>
            <button onClick={()=>{handleGoogleSignIn()}} className="flex flex-row border border-black  items-center w-full py-2 rounded-md text-black justify-center">
              <img
                className="w-[25px] h-[25px]
                "
                src="../assets/google.svg"
                alt=""
              />
              <p className="font-semibold ml-4">Sign in with Google</p>
            </button>
            <div>
              <span>Dont have an account?</span>{" "}
              <span className="text-forestGreen cursor-pointer">
                <Link href={"/signup"}>Sign up</Link>
              </span>
            </div>
          </form>
        </div>
      </section>
      <section className="lg:flex lg:w-[50%] justify-center items-center hidden l">
        <img
          onClick={()=>router.push('/')}
          className="w-[300px] h-[300px]"
          src="../assets/logog2.svg"
          alt=""
        />
      </section>
    </main>
  );
};

export default LoginPage;
