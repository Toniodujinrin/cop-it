import * as React from "react";
import Account from "../../components/accountSection";
import NavBar from "../../components/navBar";
import { useState, useEffect, useContext } from "react";
import { ProductsContext } from "../../Contexts/ProductsContexts";
import { UserContext } from "../../Contexts/UserContext";
import { useQuery } from "react-query";
import { ReviewContext } from "../../Contexts/ReviewContext";

const MyAccount = () => {
  const { refreshUser, user } = useContext(UserContext);
  const { refreshProducts } = useContext(ProductsContext);
  const {refetch} = useContext(ReviewContext)
 useEffect(()=>{
  refreshUser()
  refreshProducts()
  refetch()
  
 },[])

  return (
    <div>
      <NavBar />
      <div className="w-full lg:mt-0 mt-[40px] ">
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
