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
    const [processCheckoutLoading,setProcessCheckoutLoading]= useState(false)
  
    const getCheckOut = async ()=>{
        if(cookie.token){
            try {
            setCheckOutLoading(true)
            const {data} = await get(`checkout?email=${cookie.token.user}`)
            if(data){
                setCheckOut(data)
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
                const {data} = await get(`guestCheckout?checkoutId=${cookie.checkoutId}`)
                if(data){
                    setCheckOut(data)
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
            await post('checkout',payload)
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
                const {data} = await post('guestCheckout',payload)
                if(data){
                  setCookie('checkoutId',data.checkoutId)
                }
                router.push('/checkout')
                
            } catch (error) {
              
                toast.error('an error occured please try again later')
                
            }
            finally{
                setCheckOutLoading(false)
            }
        }
        
       
    }
    const processCheckout = async (payload)=>{
        if(cookie.token){
        try {
            setProcessCheckoutLoading(true)
             await post('checkout/processCheckout',payload)
             router.push('/success')
             toast.success('checkout successfull')
        } catch (error) {
            toast.error('unable to process checkout. Try again later')
        }
        finally{
           setProcessCheckoutLoading(false)
        }
        }
        else{
            try {
                setCheckOutLoading(setProcessCheckoutLoading(true))
                await post('checkout/processGuestCheckout',payload)
                router.push('/success')
                toast.success('checkout successful')
            } catch (error) {
                toast.error('unable to process checkout. TRy again later')
            }
            finally{
                setProcessCheckoutLoading(false)
            }

        }
    }

    return(
            <CheckoutContext.Provider value={{ createCheckout, checkout, getCheckOut, checkoutLoading, processCheckout, processCheckoutLoading}}>
                {children}
            </CheckoutContext.Provider>
    )
}

export default CheckoutContextProvider