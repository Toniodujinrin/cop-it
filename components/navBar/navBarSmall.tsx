import { useRouter } from "next/router";
import { useContext } from "react";
import { NavContext } from "../../Contexts/NavBarContext";
import BasketNotification from "../basketSection/basketNotification";
const NavBarSmall = () => {
  const { setNavBarOpen, navBarOpen } = useContext(NavContext);
  const router = useRouter();
  const items = [
    {
      name: "Categories",
      link: "",
      notification: 0,
    },
    {
      name: "Profiles",
      link: "",
      notication: 0,
    },

    {
      name: "Basket",
      link: "/basket",
      notification: 0,
    },
  ];
  return (
    <div className="flex flex-col">
      <div className="bg-forestGreen text-white flex flex-row justify-between p-4 items-center  h-[150px] w-full ">
        <img className="w-[60px] h-[60px]" src="../assets/logo3.svg" alt="" />
        <button
          onClick={() => {
            router.push("/account");
            setNavBarOpen(false);
          }}
          className="flex space-x-2 flex-row items-center justify-center"
        >
          <img
            src="../assets/profileWhite.svg"
            className="w-[30px] h-[30px]"
            alt=""
          />
          <p>Your Account</p>
        </button>
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
            {/* {item.name == "Basket" && <BasketNotification />} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavBarSmall;
