import { useState, useContext } from "react";
import Products from "./products";

import { ProfileContext } from "../../Contexts/ProfileContext";
import { motion } from "framer-motion";
import ReviewsComp from "./reviews";
import ProfilePic from "../profilepic";
const ProfileComp = () => {
  const [currentSection, setSection] = useState("Products");
  const { profile } = useContext(ProfileContext);
  const sections = ["Products", "Reviews"];
  return (
    <motion.div initial={{ scale:0.8, opacity: 0 }}
    animate={{ opacity: 1, scale:1 }} className="w-full p-4">
      <div className="flex flex-col items-center ">
        <div
          className="border-black border-2
       rounded-full w-[200px] h-[200px] mb-4 flex flex-col  overflow-hidden "
        >
          <ProfilePic email='' imageUrl={profile.imageConfig.url} />
        </div>
        <h1 className="font-bold text-[24px]  text-darkGreen ">{`${profile.firstName} ${profile.lastName}`}</h1>
      </div>
      <div className="w-full flex flex-col items-center justify-center ">
        <ul className=" flex flex-row mb-6 text-[21px] font-semibold space-x-4">
          {sections.map((section) => (
            <li
              className={` cursor-pointer ${
                currentSection == section ? "text-lightGreen" : "text-black"
              }`}
              onClick={() => setSection(section)}
            >
              {section}
            </li>
          ))}
        </ul>

        {currentSection == "Products" && <Products />}
        {currentSection == "Reviews" && <ReviewsComp />}
      
      </div>
    </motion.div>
  );
};

export default ProfileComp;
