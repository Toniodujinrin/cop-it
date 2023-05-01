import { createContext, useState } from "react";
import { useCookies } from "react-cookie";
import { get, post } from "./../api/config";
import { useRouter } from "next/router";

import { toast } from "react-toastify";
export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [cookie, setCookie] = useCookies();
  const [user, setUser] = useState({});
  const getUser = async (email, token) => {
    try {
      const user = await get(`users?email=${email}`, {
        headers: { token: token },
      });
      return user;
    } catch (error) {
      throw error;
    }
  };
  const updateUser = async (email, token) => {
    try {
      const user = await get(`users?email=${email}`, {
        headers: { token: token },
      });
      if (user) setUser(user);
    } catch (error) {
      throw error;
    }
  };

  const authenticate = async (payload) => {
    try {
      const res = await post("auth", {}, payload);
      if (res) {
        setCookie("token", res.data.data);
        const verificationStatus = await get(`users?email=${email}`, {
          headers: { token: token },
        });
        setUser(getUser(payload.email, res.data.dat._id));
        if (user) {
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      toast.error(error.response.data.data);
      return false;
    }
  };
  return (
    <UserContext.Provider
      value={{ user, setUser, authenticate, getUser, updateUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
