import { createContext, useState, useContext } from "react";
import { useCookies } from "react-cookie";
import { get, post, put, setTokenHeaders } from "./../api/config";
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
  const [searchLoading, setSearchLoading]= useState(false)
  const [searchedProfiles, setSearchedProfiles]= useState([])
  const [userUpdateLoading,setUserUpdateLoading] = useState(false)
  
  
  useEffect(()=>{
    
    const googleSignInProcess = async ()=>{
      if(session && !cookie.token && session.user){
        try {
        setAuthLoading(true)
        const {data} = await post('auth/googleAuthenticate',{email:session.user.email})
        
        await authenticateProcess(data) } 
        catch (error) {
          
        setAuthLoading(false)
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
      await updateUser(cookie.token.user);
    } catch (error) {
      
    }
    }
  
  }
  
  const refreshUser = async () => {
    
    if (cookie.token && cookie.token.expiry > Date.now()) {
      try {
        await updateUser(cookie.token.user);
        return true;
      } catch (error) {
        router.replace("/login");
      }
    } else router.replace("/login");
  };
  const getUser = async (email) => {
    try {
      const {data} = await get(`users?email=${email}`);
      return data;
    } catch (error) {
      throw error;
    }
  };
  const sendOTPCode = async (email) => {
    try {
      const {data}= await post(`auth/sendEmailCode?email=${email}`);
      if (data) {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error('could not send OTP')
    }
  };
  const updateUser = async (email) => {
    try {
      const user = await getUser(email);
      if (user) setUser(user);
    } catch (error) {
    
    }
  };


  const authenticate = async (payload) => {

      try {
        setAuthLoading(true)
        const {data} = await post("auth", payload); 
       
        await authenticateProcess(data)
      } catch (error) {
        console.log(error)
        setAuthLoading(false)
        if(error.response){
          toast.error(error.response.data.data);
        }
        else{
          toast.error("An error occured logging you in")
        }
    
      }
    
      
     
      
  };

  const authenticateProcess = async (authToken)=>{
    if (authToken) {
      setCookie("token", authToken);

      const token = authToken._id;
      const email = authToken.user;
      if(token){
        setTokenHeaders(token)
      }
      try {
       const {data:verificationObject} = await get(
        `auth/checkVerified?email=${email}`
      );
      
      if (
        verificationObject.accountVerified &&
        verificationObject.emailVerified
      ) {
        await updateUser(email);
        if(router.pathname == '/login') router.replace("/account");
      } else if (!verificationObject.emailVerified) {
        router.replace("/verifyEmail");
        await sendOTPCode(email);
        
      } else if (!verificationObject.accountVerified) {
        router.replace("/verify");
      }
    else {
      router.push('/login')
    }}
   catch (error) {
    console.log(error)
     router.push('/login')
  }
  finally{
    setAuthLoading(false)
  }
}

}


  const returnToAccountIfLoggedIn = () => {
    // if (cookie.token && cookie.token.expiry > Date.now()) {
    //   console.log('push to account', cookie.token)
    //   router.push("/account");
    // }
  };
  const uploadUserImage = async (payload) => {
    try {
      payload.email = cookie.token.user;

      const {data} = await post(
        "images/uploadUserImage",        
        payload
      );
      if (data) {
        await updateUser(cookie.token.user);
        toast.success("user profile updated");
      }
    } catch (error) {
      toast.error(error.response.data.data);
      console.log(error);
    }
  };

  const searchProfile = async (string)=>{
    try {
      setSearchLoading(true)
      const {data} = await get(`users/searchUser?searchString=${string}`)
      if(data){
        setSearchedProfiles(data)
      }
      else {setSearchedProfiles([])}
    } catch (error) {
     
    }
    finally{
      setSearchLoading(false)
    }
  }

  const updateUserInfo  =async (payload)=>{
    try {
      setUserUpdateLoading(true)
      await put('users',payload)
      await refreshUser()
      toast.success('user profile updated')
    } catch (error) {
      
      toast.error('failed to update profile, try again later')
    }
    finally{
      setUserUpdateLoading(false)
    }
    
  }

  const handleLogout = ()=>{
    removeCookie('token');
    signOut()
    router.replace('/login')
  }

  return (
    <UserContext.Provider
      value={{
        authLoading,
        userUpdateLoading,
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
        refreshUserAndNotRoute,
        searchLoading,
        searchedProfiles,
        searchProfile,
        updateUserInfo
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
