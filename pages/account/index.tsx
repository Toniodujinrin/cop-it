import * as React from "react";
import Account from "../../components/accountSection";
import NavBar from "../../components/navBar";
import { useState, useEffect, useContext } from "react";
import { User } from "../../types";
import { UserContext } from "../../Contexts/UserContext";
import { useQuery } from "react-query";

import getUser from "./../../DummyData/user";
const MyAccount = () => {
  const { refreshUser, user } = useContext(UserContext);

  const { isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await refreshUser(),
  });

  return (
    <div>
      <NavBar />
      <div className="w-full pl-4">
        {Object.keys(user).includes("_id") ? (
          <Account />
        ) : (
          <div className="spinner"></div>
        )}
      </div>
    </div>
  );
};

export default MyAccount;
