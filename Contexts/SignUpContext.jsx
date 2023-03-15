import { createContext, useState } from "react";

export const SignUpContext = createContext();

const SignUpContextProvider = ({ children }) => {
  const [firstSignUp, setFirstSignUp] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [accountVerified, setAccountVerified] = useState(false);
  return (
    <SignUpContext.Provider
      value={{
        firstSignUp,
        setFirstSignUp,
        emailVerified,
        setEmailVerified,
        accountVerified,
        setAccountVerified,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
};

export default SignUpContextProvider;
