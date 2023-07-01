import NavBar from "../../components/navBar";
import BasketComp from "../../components/basketSection/basket";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { BasketContext } from "../../Contexts/BasketContext";
import { NavContext } from "../../Contexts/NavBarContext";

const Basket = () => {
  const {setNavBarOpen} = useContext(NavContext)
  const { refetchBasket, basketLoading  } = useContext(BasketContext);
  useEffect(()=>{
   setNavBarOpen(false)
  },[])
 useEffect(()=>{
  refetchBasket()
 },[])
  return (
    <div>
      <NavBar hideSearchBar={false} />
      {basketLoading ? (
        <div className="spinner"></div>
      ) : (
        <div className="w-full h-[calc(100vh-100px)] lg:mt-0 mt-[40px] ">
          <BasketComp />
        </div>
      )}
    </div>
  );
};

export default Basket;
