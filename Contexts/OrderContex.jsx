import { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useQuery } from "react-query";
import { setTokenHeaders } from "../api/config";
import { get } from "../api/config";
export const OrderContext = createContext()

const OrderContextProvider = ({children})=>{
    const [orders,setOrders]= useState({})
    const [cookies] = useCookies()
    const {refetch:refreshOrders, isLoading:ordersByUserLoading, isError } = useQuery({
        queryKey: ["ordersByUser"],
        queryFn: async () =>{
          if(cookies.token){
          setTokenHeaders(cookies.token._id)
          const {data:orderData} = await get(
            `orders?email=${cookies.token.user}`
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
