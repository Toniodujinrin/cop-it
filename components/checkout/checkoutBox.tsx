import { Basket } from "../../types"
import GreenButton from "../utilities/greenButton"

interface CheckoutBoxProps{
    checkout:{products:Basket[], items:number, total:number}
    checkoutLoading:boolean; 
    handleCheckout:()=>void
}


const CheckOutBox:React.FC<CheckoutBoxProps> = ({checkout, handleCheckout, checkoutLoading})=>{
return(
    <div className="lg:w-[80%]w-[90%] shadow-lg border border-lightGray rounded-[18px] flex flex-col items-center lg:p-4 p-2 gap-3">
              <div className="flex flex-col gap-3 p-4 w-full">
               {
                checkout.products.map((product:Basket,index)=>(
                  <div key={index} className="w-full flex flex-row justify-between">
                    <img className="w-[25%] aspect-square rounded-[15px]" src={product.product.imageConfig[0].url} alt="" />
                    <h1 className="font-bold text-[16px] lg:text-[21px] w-[50%]">{product.product.name}</h1>
                    <p className="w-[20%] font-bold text-[16px] lg:text-[21px]">{`$${product.product.price * product.amount}`}</p>
                  </div>
                ))
               }
               </div>
               <h1 className=" text-[18px] lg:text-[24px] font-semibold ">{`${checkout.items} Items`}</h1>

               <div className="w-[80%] flex flex-row justify-between items-center ">
                <p className="font-bold">Total</p>
                <p className="lg:ext-[32px] text-[21px]">{`$${checkout.total}`}</p>
               </div>

               <GreenButton text="Pay" onCLick={()=>{handleCheckout()}} loading={checkoutLoading} disabled={checkoutLoading} />
             </div>
)
}

export default CheckOutBox