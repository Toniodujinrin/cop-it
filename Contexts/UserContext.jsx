import { createContext, useState } from "react";
import { useCookies } from "react-cookie";
import { get, post } from "./../api/config";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { toast } from "react-toastify";
export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const router = useRouter();

  const [cookie, setCookie] = useCookies();
  const [user, setUser] = useState({});
  //   useEffect(async () => {
  //     const refresh = async () => {
  //       if (
  //         cookie.token &&
  //         cookie.token.expiry > Date.now() &&
  //         router.pathname == "/account"
  //       ) {
  //         const res = await updateUser(cookie.token.user, cookie.token._id);
  //         console.log(res);
  //       } else {
  //         router.push("/login");
  //       }
  //     };

  //     try {
  //       const res = await refresh();
  //       console.log(res);
  //     } catch (error) {
  //       console.lof(error);
  //     }
  //   }, []);
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
  const sendOTPCode = async (email) => {
    try {
      const res = await post(`auth/sendEmailCode?email=${email}`);
      if (res) {
        toast.success(res.data.data.message);
      }
    } catch (error) {
      throw error;
    }
  };
  const updateUser = async (email, token) => {
    try {
      const user = await getUser(email, token);
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
        const token = res.data.data._id;
        const email = res.data.data.user;
        const verificationStatus = await get(
          `auth/checkVerified?email=${email}`,
          {
            headers: { token: token },
          }
        );
        const verificationObject = verificationStatus.data.data;
        if (
          verificationObject.accountVerified &&
          verificationObject.emailVerified
        ) {
          await updateUser();
          router.push("/account");
        } else if (!verificationObject.emailVerified) {
          await sendOTPCode(email);
          router.push("/verifyEmail");
        } else if (!verificationObject.accountVerified) {
          router.push("/verify");
        }
      } else {
        toast.error("could not log you in at the moment try again later");
      }
    } catch (error) {
      toast.error(error.response.data.data);
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
