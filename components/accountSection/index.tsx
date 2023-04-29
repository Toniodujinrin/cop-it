import { useState } from "react";
import Products from "./products";
import Profile from "./profile";
interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

const sections = ["Profile", "Products", "Reviews", "Orders"];
const Account: React.FC<UserProps> = ({
  firstName,
  lastName,
  email,
  phoneNumber,
}) => {
  const [currentPage, setCurrentPage] = useState("Profile");
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
        {currentPage == "Profile" && (
          <Profile
            firstName={firstName}
            lastName={lastName}
            email={email}
            phoneNumber={phoneNumber}
          />
        )}
        {currentPage == "Products" && <Products />}
      </div>
    </div>
  );
};

export default Account;
