import { createContext, useState } from "react";
export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const authenticate = (payload) => {};
  return (
    <UserContext.Provider value={{ user, setUser, authenticate }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
