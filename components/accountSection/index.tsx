import { useState } from "react";
import Profile from "./profile";
interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

const Account: React.FC<UserProps> = ({
  firstName,
  lastName,
  email,
  phoneNumber,
}) => {
  const [currentPage, setCurrentPage] = useState("Profile");
  return (
    <div>
      <h1 className="font-bold text-[32px]">My Account</h1>

      <div className="mx-auto lg:w-[70%] w-[80%] border border-darkGreen  ">
        <ul className="flex flex-row text-darkGreen font-semibold lg:text-[24px] text-[16px] justify-between p-4 ">
          <li
            className={` cursor-pointer ${
              currentPage == "Profile" ? "text-lightGreen" : "text-black"
            }`}
            onClick={() => {
              setCurrentPage("Profile");
            }}
          >
            Profile
          </li>
          <li
            className={`cursor-pointer ${
              currentPage == "Orders" ? "text-lightGreen" : "text-black"
            }`}
            onClick={() => {
              setCurrentPage("Orders");
            }}
          >
            Orders
          </li>
          <li
            className={` cursor-pointer ${
              currentPage == "Returns" ? "text-lightGreen" : "text-black"
            }`}
            onClick={() => {
              setCurrentPage("Returns");
            }}
          >
            Returns
          </li>
        </ul>
        {currentPage == "Profile" && (
          <Profile
            firstName={firstName}
            lastName={lastName}
            email={email}
            phoneNumber={phoneNumber}
          />
        )}
      </div>
    </div>
  );
};

export default Account;
