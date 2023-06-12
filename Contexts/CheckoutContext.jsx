import { createContext , useState} from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
export const CheckoutContext = createContext()
import { get, post } from "../api/config";
import { useRouter } from "next/router";
const CheckoutContextProvider = ({children})=>{
    const router = useRouter()
    const [cookie, setCookie]= useCookies()
    const [checkoutLoading, setCheckOutLoading] = useState(false)
    const [checkout, setCheckOut]= useState()
    const getCheckOut = async ()=>{
        if(cookie.token){
           try {
            setCheckOutLoading(true)
            const res = await get(`checkout?email=${cookie.token.user}`,{headers:{token:cookie.token._id}})

            if(res){
                setCheckOut(res.data.data)
            }
            
        } catch (error) {
            
        }
        finally{
            setCheckOutLoading(false)
        }  
        }
        else if(cookie.checkoutId){
            try {
                setCheckOutLoading(true)
                const res = await get(`guestCheckout?checkoutId=${cookie.checkoutId}`)
                if(res){
                    setCheckOut(res.data.data)
                }
            } catch (error) {
                
            }
            finally{
                setCheckOutLoading(false)
            }
        }
       

    }
    const createCheckout = async (payload)=>{
        if(cookie.token){
            
          try {
            setCheckOutLoading(true)
            payload.email = cookie.token.user
            console.log(payload)
            await post('checkout',{headers:{token:cookie.token._id}},payload)
            
            router.push('/checkout')

          } catch (error) {
            toast.error('an error occured please try again later')
            
          }
          finally{
            setCheckOutLoading(false)
          }
        }
        else{
            try {
                setCheckOutLoading(true)
                const res = await post('guestCheckout',{},payload)
                if(res){
                  setCookie('checkoutId',res.data.data.checkoutId)
                }
                router.push('/checkout')
                
            } catch (error) {
                console.log(error)
                toast.error('an error occured please try again later')
                
            }
            finally{
                setCheckOutLoading(false)
            }
        }
        
       
    }
    const processCheckout = async (payload)=>{
        payload.email = cookie.token.user 
        try {
             await post('checkout/processCheckout',{headers:{token:cookie.token._id}},payload)

        } catch (error) {
            console.log(error)
        }
      

    }

    return(
            <CheckoutContext.Provider value={{ createCheckout, checkout, getCheckOut, checkoutLoading, processCheckout}}>
                {children}
            </CheckoutContext.Provider>
    )
}

export default CheckoutContextProvider