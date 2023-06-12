import { createContext, useState } from "react";
import { useCookies } from "react-cookie";
import { get, post } from "./../api/config";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {useSession,signIn,signOut} from 'next-auth/react'
import { toast } from "react-toastify";
export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const router = useRouter();
  const {data:session}= useSession()
  const [cookie, setCookie, removeCookie] = useCookies();
  const [user, setUser] = useState({});
  const [authLoading, setAuthLoading]= useState(false)
  
  
  
  useEffect(()=>{
    console.log(session)
    const googleSignInProcess = async ()=>{
      if(session && !cookie.token && session.user){
        try {
        setAuthLoading(true)
        const googleAuthData = await post('auth/googleAuthenticate',{},{email:session.user.email})
        console.log(googleAuthData)
        await authenticateProcess(googleAuthData.data.data) } 
        catch (error) {
        toast.error('an error occured')
        }
      }
    }
    googleSignInProcess()
  },[session])


  
  const handleGoogleSignIn = async ()=>{
   signIn();
  }
  
  const refreshUserAndNotRoute = async()=>{
    if(cookie.token){
    try {
      await updateUser(cookie.token.user, cookie.token._id);
    } catch (error) {
      console.log(error)
    }
    }
  
  }
  
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
      console.log(error)
    }
  };


  const authenticate = async (payload) => {

      try {
        const res = await post("auth", {}, payload); 
        console.log(res)
        await authenticateProcess(res.data.data)
      } catch (error) {
        toast.error(error.response.data.data);
      }
      
     
      
  };

  const authenticateProcess = async (authToken)=>{
    if (authToken) {
      setCookie("token", authToken);

      const token = authToken._id;
      const email = authToken.user;
      try {
        
       
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
    else {
      toast.error("could not log you in at the moment try again later");
    }}
   catch (error) {
     toast.error('Could not log you in at the momment ')
  }
  finally{
    setAuthLoading(false)
  }
}

}


  const returnToAccountIfLoggedIn = () => {
    if (cookie.token && cookie.token.expiry > Date.now()) {
      console.log('push to account', cookie.token)
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

  const handleLogout = ()=>{
    removeCookie('token');
    signOut()
    router.replace('/login')
  }

  return (
    <UserContext.Provider
      value={{
        authLoading,
        user,
        setUser,
        authenticate,
        getUser,
        updateUser,
        refreshUser,
        returnToAccountIfLoggedIn,
        uploadUserImage,
        handleGoogleSignIn, 
        handleLogout,
        refreshUserAndNotRoute
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
