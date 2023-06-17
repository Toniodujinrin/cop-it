import { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useQuery } from "react-query";

import { get } from "../api/config";
export const OrderContext = createContext()

const OrderContextProvider = ({children})=>{
    const [orders,setOrders]= useState({})
    const [cookies] = useCookies()
    const {refetch:refreshOrders, isLoading:ordersByUserLoading, isError } = useQuery({
        queryKey: ["ordersByUser"],
        queryFn: async () =>{
          if(cookies.token){
          const {data:orderData} = await get(
            `orders?email=${cookies.token.user}`,{headers:{token:cookies.token._id}}
          )
          
          if (orderData) {
            setOrders(orderData);
          }
        }
      },
      });
      useEffect(() => {
        if(isError){
          refreshOrders()
        }
    }, [isError]);

    const getOrderForUser = ()=>{

    }
    return(

        <OrderContext.Provider value={{orders, refreshOrders, ordersByUserLoading}}>
            {children}
        </OrderContext.Provider>
    )
}


export default OrderContextProvider
