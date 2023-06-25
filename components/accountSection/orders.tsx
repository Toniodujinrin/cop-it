import { useContext, useState } from "react"
import { OrderContext } from "../../Contexts/OrderContex"
import { Orders } from "../../types"
import Pagination from "../utilities/pagination"
import OrderBox from "./orderBox"
const Orders = ()=>{
const {orders}= useContext(OrderContext)
const [currentItems, setCurrentItems]= useState<any[]>([])

return(
    <div>
        {
            orders.orders.length>0?
            <div className="flex flex-col justify-between">
            <div className="flex h-full flex-col gap-4 lg:mb-4 lg:p-0 p-4">
                {
                    currentItems.map((order:Orders, index:number)=>
                        <OrderBox key={index} order={order}/>

                    )
                }
            </div>
            <Pagination setCurrentItems={setCurrentItems} items={orders.orders} itemsPerPage={2} />
            </div>
            :
            <div>No orders</div>
        }
        
    </div>
)
}

export default Orders