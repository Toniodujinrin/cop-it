import { AnimatePresence } from "framer-motion";
import { useState, useEffect, useContext } from "react";
import Orders from "./orders";
import Products from "./products";
import Profile from "./profile";

import Reviews from "./reviews";

const sections = ["Profile", "Products", "Reviews", "Orders"];
const Account = ({}) => {
  
  const [currentPage, setCurrentPage] = useState("Profile");


  return (
    <div className="mx-auto lg:w-[70%] w-full h-full  ">
      <h1 className="font-bold ml-2 text-[32px]">My Account</h1>
      <ul className="flex flex-row text-darkGreen font-semibold lg:text-[24px] text-[16px] justify-between p-4 ">
        {sections.map((section) => (
          <li
          key={section}
            className={` cursor-pointer ${
              currentPage == section ? "text-lightGreen" : "text-black"
            }`}
            onClick={() => {
              setCurrentPage(section);
            }}
          >
            {section}
          </li>
        ))}
      </ul>
      <div className="lg:h-[calc(100%-120px)]">
      <AnimatePresence>
      {currentPage == "Profile" && <Profile />}
      {currentPage == "Products" && <Products />}
      {currentPage == "Reviews" && <Reviews />}
      {currentPage=='Orders' &&<Orders/>}
      </AnimatePresence>
      </div>
    </div>
  );
};

export default Account;
