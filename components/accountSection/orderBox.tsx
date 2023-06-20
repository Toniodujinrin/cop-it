import { toast } from "react-toastify";
import { Orders } from "../../types"
import 'dayjs/locale/es'
import dayjs from "dayjs";



interface OrderBoxProps{
    order:Orders
}

const OrderBox:React.FC<OrderBoxProps> = ({order})=>{

    return(
        <div className="w-full rounded-lg border h-fit border-lightGray shadow-lg gap-6 flex flex-col p-4">
            <div className="flex flex-col gap-4">
                {
                    order.products.map((product)=>
                         <div className="flex flex-row gap-4">
                            <img className="w-[100px] h-[70px] rounded-lg" src={product.product.imageConfig[0].url} alt="" />
                            <div>
                                <h1 className="font-bold text-[21px]">{product.product.name}</h1>
                                <p>{`${product.product.description.slice(0,10)}...`}</p>
                            </div>
                         </div>
                    )
                }
            </div>
            <div className="flex flex-row justify-between gap-3">
                <div>
                    <div className="flex flex-row items-center gap-3">
                    <p className="font-bold lg:text-[18px]`   text-[16px]  ">{`Order ID: ${order.orderId}`}</p>
                     
                        <img onClick={()=>{navigator.clipboard.writeText(order.orderId).then(() => {
        toast.success("successfully copied");
      })
      .catch(() => {
        toast.error("something went wrong");
      });}} className="w-[15px] h-[15px] cursor-pointer " src="../assets/copy.svg" alt="" />
                    
                    </div>
                    <p>{dayjs(order.timeOrdered).format('YYYY-MM-DD')}</p>
                </div>

                <div>
                    <p className="font-bold ">{`$${order.total}`}</p>
                    <p className=" text-green-400">Paid</p>
                </div>
            </div>

        </div>
    )
}

export default OrderBox