import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { NavContext } from "../../Contexts/NavBarContext";
import BasketNotePill from "../basketSection/basketNotePill";
import getCategories from "../../AppData/categories";
import { AnimatePresence, motion} from "framer-motion";


const NavBarSmall= () => {
  const { setNavBarOpen, navBarOpen } = useContext(NavContext);
  const router = useRouter();
  const [dropDownShowing, setDropDownShowing]= useState(false)
  const items = [
    {
      name: "Account",
      link: "/account",
      notification: 0,
    },
  
    {
      name: "Profiles",
      link: "/profiles",
      notication: 0,
    },


  ];
  return (
    <div className="flex flex-col">
      <div className="bg-forestGreen text-white flex flex-row justify-between p-4 items-center  h-[150px] w-full ">
        <img className="w-[60px] h-[60px]" src="../assets/logo3.svg" alt="" />

      </div>

      <div className="w-full flex flex-col mt-4 ml-4  ">
        <h1 className="font-semibold text-[24px] mb-4">Navigate</h1>
        {items.map((item, index) => (
          <div
          key={index}
            className="text-[18px] flex  mb-6  "
            onClick={() => {
              router.push(item.link);
              setNavBarOpen(false);
            }}
          >
            <p className="cursor-pointer">{item.name}</p>
            
          </div>
        ))}
        <div className="flex flex-col gap-3 mb-3">
          <div className="flex flex-row items-center" onClick={()=>setDropDownShowing(!dropDownShowing)}>
          <p >Categories</p>

          <img className={`w-[20px] h-[20px] ${dropDownShowing?' rotate-180':''} transition-[5000ms]`} src="../assets/dropDownArrow.svg" alt="" />
          </div>
          <AnimatePresence>
          { dropDownShowing&&
            
            <motion.ul initial={{y:10}} animate={{y:0}} exit={{y:10}}  className="pl-2 gap-2
            ">
            {
              getCategories().map(category=>(
                <li onClick={()=>{router.push(category.href); setNavBarOpen(false)}}>{category.name}</li>
              ))
            }

          </motion.ul>
           }
           </AnimatePresence>

  
        </div>
        <div className="flex gap-3">
          <p onClick={()=>{router.push('/basket'); setNavBarOpen(false)}} className="cursor-pointer">Basket</p>
          <BasketNotePill/>
        </div>
      </div>
    </div>
  );
};

export default NavBarSmall;
