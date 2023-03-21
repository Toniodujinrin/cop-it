import * as React from "react";
import Account from "../../components/accountSection";
import NavBar from "../../components/navBar";
import { useState, useEffect } from "react";
import { User } from "../../types";

import getUser from "./../../DummyData/user";
const MyAccount = () => {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const user = getUser();
    if (user) {
      setUser(user);
    }
  });
  return (
    <div>
      <NavBar />
      <div className="w-full pl-4">
        {user && (
          <Account
            firstName={user?.firstName}
            lastName={user?.lastName}
            email={user?.email}
            phoneNumber={user?.phoneNumber}
          />
        )}
      </div>
    </div>
  );
};

export default MyAccount;
