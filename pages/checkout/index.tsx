
import CheckOutComp from "../../components/checkout/checkout";
import NavBar from "../../components/navBar";
import { useContext, useEffect } from "react";
import { CheckoutContext } from "../../Contexts/CheckoutContext";
const CheckOut = ()=>{
    const {getCheckOut,checkout, checkoutLoading} = useContext(CheckoutContext)
    
    useEffect(()=>{
       getCheckOut()
     
    },[])
    return(
        <>
        <NavBar hideSearchBar={false}/>
        {
            checkoutLoading?
            <div className="spinner"></div>
            :
            checkout?
            <CheckOutComp/>
            :
            <h1>NO check Out</h1>
        }
        
        </>
    )


}

export default CheckOut