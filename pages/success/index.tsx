import GreenButton from "../../components/utilities/greenButton"
import { useRouter } from "next/router"
import NavBar from "../../components/navBar"
import {motion} from 'framer-motion'
const Success = ()=>{
    const router = useRouter()

    return(
        <>
        <NavBar hideSearchBar={false}/>

        <motion.div initial={{y:30, opacity:0.5}} animate={{y:0, opacity:1}} className="w-screen h-[calc(100vh-100px)] p-4 flex flex-col items-center justify-center">
            <img className="lg:w-[300px] w-[200px] aspect-square" src="../assets/orderConfirmed.svg" alt="" />
            <h1 className="text-[32px] font-bold ">Order Confirmed!</h1>
            <p className=" mb-4 text-center">Your order has been confirmed and a comfirmation email has been sent to you</p>

            <GreenButton text="Return Home" loading={false} disabled={false} onCLick={()=>{router.replace('/')}}/>
            

        </motion.div>
        </>
    )

}

export default Success