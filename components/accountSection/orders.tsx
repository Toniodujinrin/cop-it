import { useContext, useState } from "react"
import { OrderContext } from "../../Contexts/OrderContex"
import { Orders } from "../../types"
import Pagination from "../utilities/pagination"
import OrderBox from "./orderBox"
import { motion } from "framer-motion"
const Orders = ()=>{
const {orders}= useContext(OrderContext)
const [currentItems, setCurrentItems]= useState<any[]>([])

return(
    <div>
        {
            orders.orders.length>0?
            <motion.div initial={{y:10, opacity:0.8}} animate={{y:0, opacity:1}} className="flex flex-col justify-between">
            <div className="flex h-full flex-col gap-4 lg:mb-4 lg:p-0 p-4">
                {
                    currentItems.map((order:Orders, index:number)=>
                        <OrderBox key={index} order={order}/>

                    )
                }
            </div>
            <Pagination setCurrentItems={setCurrentItems} items={orders.orders} itemsPerPage={2} />
            </motion.div>
            :
            <div>No orders</div>
        }
        
    </div>
)
}

export default Orders