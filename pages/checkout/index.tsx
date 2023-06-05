import { useState } from "react";
import CheckOutComp from "../../components/checkout/checkout";
import NavBar from "../../components/navBar";

const CheckOut = ()=>{
    return(
        <>
        <NavBar/>
        <CheckOutComp/>
        </>
    )


}

export default CheckOut