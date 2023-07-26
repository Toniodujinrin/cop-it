import { useState, useContext } from "react";
import SearchBar from "../searchBar";
import NavItem from "./navItem";
import { useRouter } from "next/router";
import { NavContext } from "./../../Contexts/NavBarContext";

import BasketNotePill from "../basketSection/basketNotePill";
import getCategories from "../../AppData/categories";
interface NavBarProps{
  hideSearchBar:boolean
}

const NavBar:React.FC<NavBarProps> = ({hideSearchBar}) => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { setNavBarOpen } = useContext(NavContext);
  
  
  const handleSearch = ()=>{
    router.push(`list?search=${search}`)
  }
  return (
    <div className="w-full lg:mb-0 mb-4 dark:bg-black h-[100px] lg:pt-0 pt-[20px] px-4 justify-around flex lg:flex-row flex-col items-center">
      {/* logo div */}
      <div className="lg:py-0 py-4 w-full  lg:w-auto flex flex-row justify-between items-center  ">
        <img
          onClick={() => {
            router.push("/");
          }}
          className="w-[60px] cursor-pointer h-[60px]"
          src="../assets/logog2.svg"
          alt=""
        />

        <img
          onClick={() => {
            setNavBarOpen(true);
          }}
          src="../assets/hamburger.svg"
          className="lg:hidden cursor-pointer w-[30px] h-[30px]"
          alt=""
        />
      </div>
      {/* links div */}
      <div className="lg:flex flex-row space-x-3 mx-4 hidden">
       
          <NavItem
          href=""
            title="Categories"
            menus={getCategories()}
          />
      
          <NavItem href="/login" title="Login" />
          <NavItem href="/profiles" title="Profiles"/>
       
      </div>
      {/* serch bar div */}
      <div className={`lg:flex ${hideSearchBar&&'hidden'}  flex-row items-center space-x-[40px] `}>
        <SearchBar
        handleSearch={handleSearch}
          value={search}
          setValue={setSearch}
          placeholder={"Search"}
        />
        <button
          onClick={() => {
            router.push("/account");
          }}
          className="lg:flex hidden flex-row gap-2    items-center"
        >
          <img
            className="h-[20px] w-[20px]"
            src="../../assets/profileIcon.svg"
            alt=""
          />
          <p className="text-darkGreen p-0 m-0">Account</p>
        </button>
        <button
          onClick={() => router.push("/basket")}
          className="lg:flex hidden flex-row gap-2  items-center"
        >
          <img
            className="h-[20px] w-[20px]"
            src="../../assets/cartIcon.svg"
            alt=""
          />
          <p className="text-darkGreen p-0 m-0">Basket</p>
         <BasketNotePill/>
        </button>
      </div>
    </div>
  );
};

export default NavBar;
