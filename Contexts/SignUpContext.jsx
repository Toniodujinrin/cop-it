import { createContext, useState } from "react";
import { post } from "../api/config";
import useCookies from "react-cookie/cjs/useCookies";
export const SignUpContext = createContext();

const SignUpContextProvider = ({ children }) => {
  const [firstSignUp, setFirstSignUp] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [accountVerified, setAccountVerified] = useState(false);
  const { cookie } = useCookies();
  const processFirstSignUp = async (payload) => {
    try {
      const res = await post("users", {}, payload);
      console.log(res);
      if (res.data) {
        setFirstSignUp(true);
        return true;
      } else return false;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SignUpContext.Provider
      value={{
        firstSignUp,
        processFirstSignUp,

        emailVerified,

        accountVerified,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
};

export default SignUpContextProvider;
