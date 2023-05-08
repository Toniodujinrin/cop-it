import { useState, useEffect, useContext } from "react";
import Products from "./products";
import Profile from "./profile";
import { ProductsContext } from "./../../Contexts/ProductsContexts";

const sections = ["Profile", "Products", "Reviews", "Orders"];
const Account = ({}) => {
  const { refreshProducts } = useContext(ProductsContext);
  const [currentPage, setCurrentPage] = useState("Profile");
  useEffect(() => {
    refreshProducts();
  }, [currentPage]);

  return (
    <div>
      <div className="mx-auto lg:w-[70%] w-[80%]  ">
        <h1 className="font-bold text-[32px]">My Account</h1>
        <ul className="flex flex-row text-darkGreen font-semibold lg:text-[24px] text-[16px] justify-between p-4 ">
          {sections.map((section) => (
            <li
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
        {currentPage == "Profile" && <Profile />}
        {currentPage == "Products" && <Products />}
      </div>
    </div>
  );
};

export default Account;
