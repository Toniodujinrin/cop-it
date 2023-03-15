import * as React from "react";
import Account from "../../components/accountSection";
import NavBar from "../../components/navBar";

const MyAccount = () => {
  return (
    <div>
      <NavBar />
      <div className="w-full pl-4">
        <Account firstName="" lastName="" registrationDate="" />
      </div>
    </div>
  );
};

export default MyAccount;
