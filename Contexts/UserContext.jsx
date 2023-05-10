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
  const refreshUser = async () => {
    if (cookie.token && cookie.token.expiry > Date.now()) {
      try {
        await updateUser(cookie.token.user, cookie.token._id);
        return true;
      } catch (error) {
        router.replace("/login");
      }
    } else router.replace("/login");
  };
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
      if (user) setUser(user.data.data);
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
          await updateUser(email, token);
          router.replace("/account");
        } else if (!verificationObject.emailVerified) {
          await sendOTPCode(email);
          router.replace("/verifyEmail");
        } else if (!verificationObject.accountVerified) {
          router.replace("/verify");
        }
      } else {
        toast.error("could not log you in at the moment try again later");
      }
    } catch (error) {
      toast.error(error.response.data.data);
    }
  };

  const returnToAccountIfLoggedIn = () => {
    if (cookie.token && cookie.token.expiry > Date.now()) {
      console.log("hello");
      router.push("/account");
    }
  };
  const uploadUserImage = async (payload) => {
    try {
      payload.email = cookie.token.user;

      const res = await post(
        "images/uploadUserImage",
        { headers: { token: cookie.token._id } },
        payload
      );
      if (res.data.data) {
        await updateUser(cookie.token.user, cookie.token._id);
        toast.success("user profile updated");
      }
    } catch (error) {
      toast.error(error.response.data.data);
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        authenticate,
        getUser,
        updateUser,
        refreshUser,
        returnToAccountIfLoggedIn,
        uploadUserImage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
