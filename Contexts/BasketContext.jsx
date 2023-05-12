import React from "react";
import { useState, createContext } from "react";
import { useQuery } from "react-query";
import { useCookies } from "react-cookie";
import { get, post } from "../api/config";

import { toast } from "react-toastify";
import { useRouter } from "next/router";

export const BasketContext = createContext();

const BasketContextProvider = ({ children }) => {
  const router = useRouter();
  const [cookie] = useCookies();
  const [basket, setBasket] = useState({});
  const { refetch: refetchBasket } = useQuery({
    queryKey: ["basketData"],
    queryFn: async () => {
      const { data } = await get(
        `basket/getBasket?email=${cookie.token.user}`,
        {
          headers: { token: cookie.token._id },
        }
      );

      if (data && data.data && data.data.items && data.data.items.length > 0) {
        setBasket(data.data.items);
      } else {
        setBasket([]);
      }
    },
  });

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

  return (
    <BasketContext.Provider value={{ basket, refetchBasket, addItemToBasket }}>
      {children}
    </BasketContext.Provider>
  );
};

export default BasketContextProvider;
