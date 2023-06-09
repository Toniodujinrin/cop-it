import * as React from "react";
import Account from "../../components/accountSection";
import NavBar from "../../components/navBar";
import {  useEffect, useContext } from "react";
import { ProductsContext } from "../../Contexts/ProductsContexts";
import { UserContext } from "../../Contexts/UserContext";
import { ReviewContext } from "../../Contexts/ReviewContext";
import { BasketContext } from "../../Contexts/BasketContext";

const MyAccount = () => {
  const { refreshUser, user } = useContext(UserContext);
  const {refetch, reviewsByUserLoading} = useContext(ReviewContext)
  const {productsByUserLoading, refreshProducts} = useContext(ProductsContext)
  const {refetchBasket, basketLoading}= useContext(BasketContext)
 useEffect(()=>{
  refreshUser()
  refreshProducts()
  refetch()
  refetchBasket()
  },[])

  return (
    <div>
      <NavBar />
      <div className="w-full lg:mt-0 mt-[40px] ">
        {Object.keys(user).includes("_id") && !productsByUserLoading && !reviewsByUserLoading &&!basketLoading ? (
          <Account />
        ) : (
          <div className="spinner"></div>
        )}
      </div>
    </div>
  );
};

export default MyAccount;
