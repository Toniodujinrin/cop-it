import React from "react";
import { useState, createContext, useEffect } from "react";
import { useQuery } from "react-query";
import { useCookies } from "react-cookie";
import { get, post } from "../api/config";

import { toast } from "react-toastify";
import { useRouter } from "next/router";

export const BasketContext = createContext();

const BasketContextProvider = ({ children }) => {
  const router = useRouter();
  const [cookie] = useCookies();
  const [basket, setBasket] = useState([]);
  const [amountInBasket, setAmountInBasket] = useState(0);
  const [data, setData] = useState();
  const { refetch: refetchBasket } = useQuery({
    queryKey: ["basketData"],
    queryFn: async () => {
      try {
        const { data } = await get(
        `basket/getBasket?email=${cookie.token.user}`,
        {
          headers: { token: cookie.token._id },
        }
      );
      setData(data);
      } catch (error) {
        console.log(error)
        
      }
      
    },
  });

  useEffect(() => {
  
    if (data && data.data && data.data.items && data.data.items.length > 0) {
      setBasket(data.data.items);
   
      setAmountInBasket(data.data.items.length);
    } else {
      setAmountInBasket(0)
      setBasket([]);
    }
  }, [data]);

  const addItemToBasket = async (payload) => {
    if (cookie.token) {
      try {
        payload.email = cookie.token.user;
        await post(
          "basket/add",
          { headers: { token: cookie.token._id } },
          payload
        );

        refetchBasket();
        toast.success("item added to basket");
      } catch (error) {
        console.log(error);
        toast.error("could not add item to basket");
      }
    } else router.push("/login");
  };

  const removeItemFromBasket = async (payload) => {
    payload.email = cookie.token.user;
    try {
      await post(
        "basket/removeItem",
        { headers: { token: cookie.token._id } },
        payload
      );
      refetchBasket();
      toast.success("item removed from basket");
    } catch (error) {
      toast.error("could not remove item from basket");
    }
  };

  const editBasketAmount = async (payload)=>{
    try {
      payload.email = cookie.token.user
      console.log(payload)
      await post('basket/editItemAmount',{headers:{token:cookie.token._id}},payload)
      refetchBasket()
      toast.success('Basket Updated')
    } catch (error) {
      console.log(error)
      toast.error('Could not update Basket')
    }
    
    
  }

  return (
    <BasketContext.Provider
      value={{
        basket,
        refetchBasket,
        addItemToBasket,
        amountInBasket,
        removeItemFromBasket,
        editBasketAmount
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export default BasketContextProvider;
