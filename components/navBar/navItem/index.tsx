import { useState } from "react";
import { useRouter } from "next/router";
type menu = {
  label: string;
  icon: string;
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
          } w-auto shadow-xl grid grid-cols-2 gap-4 top-[50px]  rounded-[18px] bg-[#ECEAEA] h-auto py-[20px]  `}
        >
          {menus.map((menu) => (
            <div onClick={()=>router.push(menu.href)} className=" cursor-pointer  flex flex-row  items-center w-full px-4 ">
            
              <img className="w-[100px] mr-4 rounded-lg  h-[70px]" src={menu.icon} alt="" />
              <p className="text-darkGreen font-semibold text-[21px]">
                {menu.label}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavItem;
