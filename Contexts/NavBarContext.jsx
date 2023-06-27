import React from "react";
import { useState, createContext, useEffect } from "react";
import { useRouter } from "next/router";

import NavBarSmall from "../components/navBar/navBarSmall";

export const NavContext = createContext();

const NavContextProvider = ({ children }) => {
  const router = useRouter()
 
  const [navBarOpen, setNavBarOpen] = useState(false);
  useEffect(()=>{
    console.log(router.pathname)
    setNavBarOpen(false)
 },[router.pathname])

  return (
    <NavContext.Provider value={{ setNavBarOpen, navBarOpen }}>
      <div
        className={` ${
          navBarOpen && "flex w-screen  flex-row justify-between relative"
        }`}
      >
        <div
          className={`w-full ${
            !navBarOpen && "hidden"
          } flex flex-row backdrop-blur-2xl blur-3xl justify-between gap-x-0    absolute opacity-80 top-0 left-0  h-screen z-10 `}
        >
          <div className="bg-white w-[80%] ">
            <NavBarSmall />
          </div>
          <div
            style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
            className="w-[40%] h-screen flex p-4 justify-end  "
          >
            <img
              onClick={() => {
                setNavBarOpen(false);
              }}
              src="../assets/close.svg"
              className="w-[40px] h-[40px]"
              alt=""
            />
          </div>
        </div>
        <div
          className={`lg:h-full h-screen z-50    ${
            navBarOpen && "overflow-hidden "
          }`}
        >
          {children}
        </div>
      </div>
    </NavContext.Provider>
  );
};

export default NavContextProvider;
