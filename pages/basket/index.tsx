import NavBar from "../../components/navBar";
import BasketComp from "../../components/basketSection/basket";
import { useContext, useEffect } from "react";

import { BasketContext } from "../../Contexts/BasketContext";


const Basket = () => {
  const { refetchBasket, basketLoading  } = useContext(BasketContext);
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
