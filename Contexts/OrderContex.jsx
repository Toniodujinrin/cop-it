import { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useQuery } from "react-query";
import {toast} from 'react-toastify'
import { get } from "../api/config";
export const OrderContext = createContext()

const OrderContextProvider = ({children})=>{
    const [orders,setOrders]= useState({})
    const [cookies] = useCookies()
    const {refetch:refreshOrders, isLoading:ordersByUserLoading, isError } = useQuery({
        queryKey: ["ordersByUser"],
        queryFn: async () =>{
          if(cookies.token){
          const orderData = await get(
            `orders?email=${cookies.token.user}`,{headers:{token:cookies.token._id}}
          )
          if (orderData && orderData.data && orderData.data.data) {
            setOrders(orderData.data.data);
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
