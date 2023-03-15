import { useState } from "react";
type menu = {
  label: string;
  icon: string;
  href: string;
};
interface NavItemProps {
  title: string;
  menus?: menu[];
}

const NavItem: React.FC<NavItemProps> = ({ title, menus }) => {
  const [dropDownShowing, setDropDownShowing] = useState(false);
  return (
    <div>
      <p
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
          } w-[400px] shadow-xl flex flex-col space-y-4  rounded-[18px] bg-[#ECEAEA] h-auto py-[20px]  `}
        >
          {menus.map((menu) => (
            <div className="flex cursor-pointer flex-row items-center w-full px-4 ">
              <img className="w-[40px] mr-4 h-[40px]" src={menu.icon} alt="" />
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
