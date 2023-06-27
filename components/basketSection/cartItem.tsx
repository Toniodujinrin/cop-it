import QuantityCounter from "../utilities/quantityCounter"
import { useRouter } from "next/router"
import { Dispatch, SetStateAction, useEffect, useState, useContext } from "react"
import { BasketContext } from "../../Contexts/BasketContext"
interface CartItemProps{
    price:number
    name:string
    amount:number
    imageUrl:string
    productId:string
    setDeleteAction: Dispatch<SetStateAction<boolean>>
    setProductId:Dispatch<SetStateAction<string>>
    selected:string[]
    handleSelect:any

}

const CartItem:React.FC<CartItemProps>=({price, imageUrl, name, amount, productId, setDeleteAction, setProductId, selected, handleSelect})=>{
    const router = useRouter()
    const [quantity, setQuantity]= useState(amount)
    const [edit, setEdit]= useState(false)

    const [totalAmount, setTotalAmount]= useState(price*amount)
    const {editBasketAmount, basketProcessLoading}= useContext(BasketContext)
    const handleAmountChange = async()=>{
        const payload = {
            productId:productId,
            amount:quantity

        }
       
        await editBasketAmount(payload)
        setQuantity(amount)
      
        setEdit(false)
    }
    useEffect(()=>{
        setTotalAmount(quantity*price)
    },[quantity])
    useEffect(()=>{
      setQuantity(amount)
    }, [amount])
  

    return(
        <div className="w-full flex p-4 rounded-lg border border-lightGray shadow-md  flex-row items-center gap-2">
           <div onClick={()=> handleSelect(productId)} className={`  aspect-square w-[25px] border-2 border-forestGreen h-[25px] ${selected.includes(productId) && 'bg-forestGreen'} flex items-center justify-center rounded-md   cursor-pointer `}>
            {
                selected.includes(productId)&&
               <img src="../assets/whiteTick.svg" alt="" /> 
            }
            
            </div> 
   
        <div className="w-[90%] flex flex-row  justify-between">
               
               <div className=" flex flex-row gap-3">
                <div   onClick={() => {
            router.push({ pathname: "/details", query: { id: productId } });
          }} className="lg:w-[150px] w-[100px] h-[70px] lg:h-[150px] lg:aspect-square rounded-lg">
                <img src={imageUrl} className="w-full rounded-lg h-full" alt="" />
                </div>
                <div className=" flex flex-col items-start gap-3">
                <p className="font-semibold text-[16px]  ">{name}</p>
                <p className="font-bold text-[18px] lg:text-[24px]">{`$${totalAmount}`}</p>
         

                
                <div className={`flex  ${edit?`flex-col`:`flex-row`} items-center gap-2 `}>
                {
                    !edit?
                    <p className=" text-[16px] font-semibold">{amount}</p>:
                    <QuantityCounter setQuantity={setQuantity} quantity={quantity}/>
                }
                {
                    edit?
                    basketProcessLoading?
                    <div className="spinnerSmallBlack"></div>
                    :
                    <div className="flex flex-row  gap-4">
                    <img onClick={()=>{handleAmountChange()}} className=" w-[15px] cursor-pointer h-[15px] " src="../assets/tick.svg" alt="" />
                    <img onClick={( )=>{setEdit(false); setQuantity(amount)}} className=" w-[15px] cursor-pointer h-[15px] " src="../assets/close.svg" alt="" />
                    </div>

                    :
                   
                    
                    <img onClick={( )=>{setEdit(true)}} className=" w-[15px] cursor-pointer h-[15px] " src="../assets/edit.svg" alt="" />
                

                }
              
                </div>

                </div>
           </div>

                <button onClick={()=>{setDeleteAction(true); setProductId(productId)}} className="lg:flex hidden h-fit items-center justify-center rounded-lg border-2 border-red-600 p-2 text-red-600">
                    <p>Delete Item</p>
                </button>
                
                <img onClick={()=>{setDeleteAction(true); setProductId(productId)}} className=" lg:hidden cursor-pointer w-[20px] h-[20px] " src="../assets/trash.svg" alt="" />
                
        </div>
        </div>
    )
}

export default CartItem