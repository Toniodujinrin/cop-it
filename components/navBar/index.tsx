import { useState } from "react";
import SearchBar from "../searchBar";
import NavItem from "./navItem";
import { useRouter } from "next/router";

const NavBar = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  return (
    <div className="w-full h-[100px] lg:pt-0 pt-[20px] px-4 justify-around flex lg:flex-row flex-col items-center">
      {/* logo div */}
      <div className="lg:py-0 py-4 w-full lg:block lg:w-auto flex flex-row justify-between items-center  ">
        <img
          onClick={() => {
            router.push("/");
          }}
          className="w-[60px] cursor-pointer h-[60px]"
          src="../assets/logog2.svg"
          alt=""
        />
        <img
          src="../assets/hamburger.svg"
          className="lg:hidden cursor-pointer w-[30px] h-[30px]"
          alt=""
        />
      </div>
      {/* links div */}
      <div className="lg:flex hidden">
        <ul className="flex flex-row space-x-3 mx-4">
          <NavItem
            title="Categories"
            menus={[
              { label: "Games", icon: "../../assets/gameIcon.svg", href: "" },
              { label: "Food", icon: "../../assets/foodIcon.svg", href: "" },
              {
                label: "Clothes",
                icon: "../../assets/clothesIcon.svg",
                href: "",
              },
            ]}
          />
          <NavItem
            title="Deals"
            menus={[{ label: "Clothing", icon: "", href: "" }]}
          />
          <NavItem title="Login" />
        </ul>
      </div>
      {/* serch bar div */}
      <div className="flex flex-row items-center space-x-[40px] ">
        <SearchBar
          value={search}
          setValue={setSearch}
          placeholder={"search for any item"}
        />
        <button
          onClick={() => {
            router.push("/account");
          }}
          className="lg:flex hidden flex-row space-x-2    items-center"
        >
          <img
            className="h-[20px] w-[20px]"
            src="../../assets/profileIcon.svg"
            alt=""
          />
          <p className="text-darkGreen">Account</p>
        </button>
        <button
          onClick={() => router.push("/basket")}
          className="lg:flex hidden flex-row space-x-2   items-center"
        >
          <img
            className="h-[20px] w-[20px]"
            src="../../assets/cartIcon.svg"
            alt=""
          />
          <p className="text-darkGreen">Basket</p>
        </button>
      </div>
    </div>
  );
};

export default NavBar;
