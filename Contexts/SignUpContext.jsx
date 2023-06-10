import { createContext, useState, useContext } from "react";
import { post, get } from "../api/config";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
export const SignUpContext = createContext();
import { UserContext } from "./UserContext";

const SignUpContextProvider = ({ children }) => {
  const router = useRouter();
  const { updateUser } = useContext(UserContext);
  const [firstSignUp, setFirstSignUp] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [accountVerified, setAccountVerified] = useState(false);
  const [cookie, setCookie] = useCookies();
  const [signupLoading, setSignUpLoading]= useState(false)
  const processFirstSignUp = async (payload) => {
    try {
      setSignUpLoading(true)
      const res = await post("users", {}, payload);
      if (res.data) {
        setFirstSignUp(true);
        setCookie("token", res.data.data);
        router.push("/verifyEmail");
      } else return false;
    } catch (error) {
      toast.error(error.response.data.data);
    }
    finally{
      setSignUpLoading(false)
    }
  };
  const processEmailVerfication = async (payload) => {
    try {
      setSignUpLoading(true)
      payload.email = cookie.token.user;
      const res = await post("users/verifyEmail", {}, payload);
      console.log(res)
      if (res.data) {
        const tokenObject = res.data.data;
        const token = res.data.data._id;
        const email = res.data.data.user;
        setEmailVerified(true);
        setCookie("token", tokenObject);
        const verificationStatus = await get(
          `auth/checkVerified?email=${email}`,
          {
            headers: { token: token },
          }
        );
        if (verificationStatus.data.data.accountVerified) {
          updateUser(email, token);
          router.push("/account");
        } else {
          router.push("verify");
        }
      }
    } catch (error) {
      toast.error('could not verify email please try again');
      console.log(error);
    }
    finally{
      setSignUpLoading(false)
    }
  };

  const processAccountVerification = async (payload) => {
    console.log(cookie.token)
    if(cookie.token){

   
    try {
      setSignUpLoading(true)
      payload.email = cookie.token.user;
      const res = await post(
        "users/verifyAccount",
        { headers: { token: cookie.token._id } },
        payload
      );
      console.log(res)
      if (res.data) {
        const tokenObject = res.data.data;
        const token = res.data.data._id;
        const email = res.data.data.user;
        setAccountVerified(true);
        setCookie("token", tokenObject);
        const verificationStatus = await get(
          `auth/checkVerified?email=${email}`,
          {
            headers: { token: token },
          }
        );
        if (verificationStatus.data.data.emailVerified) {
          updateUser(email, token);
         router.push("/account");
        } else router.push("/verifyEmail");
      }
    } catch (error) {
      // toast.error(error.response.data.data);
      router.push("./login");
      console.log(error);
    }
    finally{
      setSignUpLoading(false)
    }
   }
  };

  return (
    <SignUpContext.Provider
      value={{
        firstSignUp,
        processFirstSignUp,
        processAccountVerification,
        processEmailVerfication,
        signupLoading,

        emailVerified,

        accountVerified,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
};

export default SignUpContextProvider;
