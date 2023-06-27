import { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
type menu = {
  name: string;
  iconUrl: string;
  href: string;
};
interface NavItemProps {
  title: string;
  menus?: menu[];
  href:string
}

const NavItem: React.FC<NavItemProps> = ({ title, menus, href }) => {
  const router = useRouter()
  const [dropDownShowing, setDropDownShowing] = useState(false);
  return (
    <div>
      <p
      onClick={()=>router.push(href)}
        onMouseOver={() => {
          setDropDownShowing(true);
        }}
        onMouseOut={() => {
          setDropDownShowing(false);
        }}
        className="font-semibold cursor-pointer  text-darkGreen text-[18px]"
      >
        {title}
      </p>
      {menus && menus.length > 0 && (
        <div
          onMouseOver={() => {
            setDropDownShowing(true);
          }}
          onMouseOut={() => {
            setDropDownShowing(false);
          }}
          className={`${
            dropDownShowing ? " absolute" : "hidden"
          } w-auto shadow-xl grid grid-cols-2 gap-4 top-[58px]  rounded-[18px] bg-[#ECEAEA] h-auto py-[20px]  `}
        >
          {menus.map((menu,index) => (
            <motion.div initial={{y:-10}} animate={{y:0}} key={index} onClick={()=>router.push(menu.href)} className=" cursor-pointer  flex flex-row  items-center w-full px-4 ">
            
              <img className="w-[100px] mr-4 rounded-lg  h-[70px]" src={menu.iconUrl} alt="" />
              <p className="text-darkGreen font-semibold text-[21px]">
                {menu.name}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavItem;
