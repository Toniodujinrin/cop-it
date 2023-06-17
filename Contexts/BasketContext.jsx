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
  const [basketProcessLoading,setBasketProcessLoading]= useState(false)
  const [amountInBasket, setAmountInBasket] = useState(0);
 const { refetch: refetchBasket, isError, isLoading:basketLoading } = useQuery({
    queryKey: ["basketData"],
    queryFn: async () => {
      if(cookie.token){

      
      const { data } = await get(
        `basket/getBasket?email=${cookie.token.user}`,
        {
          headers: { token: cookie.token._id },
        }
      );
      if (data && data.items && data.items.length > 0) {
        setBasket(data.items);
     
        setAmountInBasket(data.items.length);
      } else {
        setAmountInBasket(0)
        setBasket([]);
      }
      }
    
      
    },
  });

  useEffect(() => {
    if(isError && cookie.token){
      refetchBasket()
    }
 }, [isError]);

  const addItemToBasket = async (payload) => {
    if (cookie.token) {
      try {
        setBasketProcessLoading(true)
        payload.email = cookie.token.user;
        await post(
          "basket/add",
          { headers: { token: cookie.token._id } },
          payload
        );

        refetchBasket();
        toast.success("item added to basket");
      } catch (error) {
        toast.error("could not add item to basket");
      }
      finally{
        setBasketProcessLoading(false)
      }
    } else router.push("/login");
  };

  const removeItemFromBasket = async (payload) => {
    payload.email = cookie.token.user;
    try {
      setBasketProcessLoading(true)
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
    finally{
      setBasketProcessLoading(false)
    }
  };

  const editBasketAmount = async (payload)=>{
    try {
      setBasketProcessLoading(true)
      payload.email = cookie.token.user
      await post('basket/editItemAmount',{headers:{token:cookie.token._id}},payload)
      refetchBasket()
      toast.success('Basket Updated')
    } catch (error) {
      
      toast.error('Could not update Basket')
    }
    finally{
      setBasketProcessLoading(false)
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
        editBasketAmount,
        basketLoading,
        basketProcessLoading
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export default BasketContextProvider;
