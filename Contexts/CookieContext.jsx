import { useCookies } from "react-cookie";
import {  createContext, useEffect } from "react";
import {setTokenHeaders} from "../api/config"
import { useState } from "react";


export const CookieContext= createContext()

const CookieContextProvider = ({children})=>{
    const [authed, setAuthed]= useState()
    const [cookie] = useCookies()

    useEffect(()=>{
    if(cookie.token){
        setTokenHeaders(cookie.token._id)
        setAuthed(true)
    }
    else{
        setAuthed(false)
    }
    },[])
    
    return(
       
        <CookieContext.Provider value={{authed}}>
            {children}
        </CookieContext.Provider>

    )
}



export default CookieContextProvider