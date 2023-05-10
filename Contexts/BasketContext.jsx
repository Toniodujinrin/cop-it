import React from "react";
import { useState, createContext } from "react";
import { useQuery } from "react-query";
import { useCookies } from "react-cookie";
import { get } from "../api/config";
import { useEffect } from "react";

export const BasketContext = createContext();

const BasketContextProvider = ({ children }) => {
  const [cookie] = useCookies();
  const [basket, setBasket] = useState({});
  //   const {
  //     refetch: refetchBasket,
  //     isLoading,
  //     data,
  //   } = useQuery({
  //     queryKey: ["basketData"],
  //     queryFn: async () => {
  //       await get(`basket/getBasket?email=${cookie.token.user}`, {
  //         headers: { token: cookie.token._id },
  //       });
  //     },
  //   });
  //   useEffect(() => {
  //     console.log(basket, data, isLoading);
  //     if (data && data.data && data.data.data) {
  //       setBasket(data.data.data);
  //     }
  //   }, [data, isLoading]);
  return (
    <BasketContext.Provider value={{ basket }}>
      {children}
    </BasketContext.Provider>
  );
};

export default BasketContextProvider;
