import { createContext, useState } from "react";
import { useCookies } from "react-cookie";
import { setHeaders, get, post } from "./../api/config";

import axios from "axios";
export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [cookie, setCookie] = useState();
  const [user, setUser] = useState({});
  const authenticate = async (payload) => {
    try {
      const res = await post("auth", {}, payload);
      if (res) {
        setCookie("token", res);
        const user = await get(`users?email=${payload.email}`, {
          headers: { token: res.data.data._id },
        });
        setUser(user);
        if (user) {
          return true;
        } else return false;
      } else return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  return (
    <UserContext.Provider value={{ user, setUser, authenticate }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
