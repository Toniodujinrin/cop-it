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
      const {data} = await post("users", {}, payload);
      if (data) {
        setFirstSignUp(true);
        setCookie("token", data);
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
      const {data} = await post("users/verifyEmail", {}, payload);
      
      if (data) {
        const tokenObject = data;
        const token = data._id;
        const email = data.user;
        setEmailVerified(true);
        setCookie("token", tokenObject);
        const {data:verificationStatus} = await get(
          `auth/checkVerified?email=${email}`,
          {
            headers: { token: token },
          }
        );
        if (verificationStatus.accountVerified) {
          updateUser(email, token);
          router.push("/account");
        } else {
          router.push("verify");
        }
      }
    } catch (error) {
      toast.error('could not verify email please try again later');
      
    }
    finally{
      setSignUpLoading(false)
    }
  };

  const processAccountVerification = async (payload) => {
   
    if(cookie.token){

   
    try {
      setSignUpLoading(true)
      payload.email = cookie.token.user;
      const {data} = await post(
        "users/verifyAccount",
        { headers: { token: cookie.token._id } },
        payload
      );
   
      if (res.data) {
        const tokenObject = data;
        const token =data._id;
        const email = data.user;
        setAccountVerified(true);
        setCookie("token", tokenObject);
        const {data:verificationStatus} = await get(
          `auth/checkVerified?email=${email}`,
          {
            headers: { token: token },
          }
        );
        if (verificationStatus.emailVerified) {
          updateUser(email, token);
         router.push("/account");
        } else router.push("/verifyEmail");
      }
    } catch (error) {
      toast.error('something went wrong please try again later');
      router.push("./login");
      
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
