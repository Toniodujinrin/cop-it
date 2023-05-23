import QuantityCounter from "./quantityCounter"
import { useRouter } from "next/router"
import { Dispatch, SetStateAction, useEffect, useState, useContext } from "react"
import { BasketContext } from "../Contexts/BasketContext"
interface CartItemProps{
    price:number
    name:string
    amount:number
    imageUrl:string
    productId:string
    setDeleteAction: Dispatch<SetStateAction<boolean>>
    setProductId:Dispatch<SetStateAction<string>>

}

const CartItem:React.FC<CartItemProps>=({price, imageUrl, name, amount, productId, setDeleteAction, setProductId})=>{
    const router = useRouter()
    const [quantity, setQuantity]= useState(amount)
    const [edit, setEdit]= useState(false)
    const [totalAmount, setTotalAmount]= useState(price*amount)
    const {editBasketAmount}= useContext(BasketContext)
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
        <div className="w-full p-4 flex flex-row items-center justify-between">
               <div className=" flex flex-row gap-3">
                <div   onClick={() => {
            router.push({ pathname: "/details", query: { id: productId } });
          }} className="rounded-lg w-[200px] h-[200px]">
                <img src={imageUrl} className="w-full rounded-lg h-full" alt="" />
                </div>
                <p className="font-semibold text-[28px] ">{name}</p>
           </div>

                
                <div className="flex flex-col items-center gap-8 ">
                {
                    !edit?
                    <p className="text-[21px] font-semibold">{amount}</p>:
                    <QuantityCounter setQuantity={setQuantity} quantity={quantity}/>
                }
                {
                    edit?
                    <div className="flex flex-row  gap-4">
                    <img onClick={()=>{handleAmountChange()}} className="w-[30px] h-[30px]" src="../assets/tick.svg" alt="" />
                    <img onClick={( )=>{setEdit(false); setQuantity(amount)}} className="w-[30px] h-[30px]" src="../assets/close.svg" alt="" />
                </div>

                    :
                    <div className="flex flex-row  gap-4">
                    <img onClick={()=>{setDeleteAction(true); setProductId(productId)}} className="w-[30px] h-[30px]" src="../assets/trash.svg" alt="" />
                    <img onClick={( )=>{setEdit(true)}} className="w-[30px] h-[30px]" src="../assets/edit.svg" alt="" />
                </div>

                }
              
                </div>

                <p className="font-bold text-[24px]">{`$${totalAmount}`}</p>

            
        </div>
    )
}

export default CartItem