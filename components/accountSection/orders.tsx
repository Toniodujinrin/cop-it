import { useContext } from "react"
import { OrderContext } from "../../Contexts/OrderContex"
import { Orders } from "../../types"
import OrderBox from "./orderBox"
const Orders = ()=>{
const {orders}= useContext(OrderContext)

return(
    <div>
        {
            orders.orders.length>0?
            <div className="flex flex-col gap-4 lg:p-0 p-4">
                {
                    orders.orders.map((order:Orders)=>
                        <OrderBox order={order}/>

                    )
                }
            </div>:
            <div>No orders</div>
        }
        
    </div>
)
}

export default Orders