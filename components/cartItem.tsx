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
    selected:string[]
    handleSelect:any

}

const CartItem:React.FC<CartItemProps>=({price, imageUrl, name, amount, productId, setDeleteAction, setProductId, selected, handleSelect})=>{
    const router = useRouter()
    const [quantity, setQuantity]= useState(amount)
    const [edit, setEdit]= useState(false)
    const [loading,setLoading]= useState(false)
    const [totalAmount, setTotalAmount]= useState(price*amount)
    const {editBasketAmount}= useContext(BasketContext)
    const handleAmountChange = async()=>{
        const payload = {
            productId:productId,
            amount:quantity

        }
        setLoading(true)
        await editBasketAmount(payload)
        setQuantity(amount)
        setLoading(false)
        setEdit(false)
        
        

    }
    useEffect(()=>{
        setTotalAmount(quantity*price)
    },[quantity])
    useEffect(()=>{
      setQuantity(amount)
    }, [amount])
  

    return(
        <div className="w-full flex p-4 rounded-lg h-[70px] bg-[#e9e9e9] shadow-md  flex-row items-center gap-2">
           <div onClick={()=> handleSelect(productId)} className={`  aspect-square w-[20px] h-[20px] ${selected.includes(productId) && 'bg-forestGreen'} flex items-center justify-center rounded-sm border  cursor-pointer border-darkGreen`}>
            {
                selected.includes(productId)&&
               <img src="../assets/whiteTick.svg" alt="" /> 
            }
            
            </div> 
   
        <div className="w-[90%] flex flex-row items-center justify-between">
               
               <div className=" flex flex-row gap-3">
                <div   onClick={() => {
            router.push({ pathname: "/details", query: { id: productId } });
          }} className="rounded-lg w-[50px] aspect-square">
                <img src={imageUrl} className="w-full rounded-lg h-full" alt="" />
                </div>
                <p className="font-semibold text-[18px]  ">{`${name.length>= 10 ?name.slice(0,10):name}...`}</p>
           </div>

                
                <div className="flex flex-col items-center gap-2 ">
                {
                    !edit?
                    <p className=" text-[16px] font-semibold">{amount}</p>:
                    <QuantityCounter setQuantity={setQuantity} quantity={quantity}/>
                }
                {
                    edit?
                    loading?
                    <div className="spinnerSmallBlack"></div>
                    :
                    <div className="flex flex-row  gap-4">
                    <img onClick={()=>{handleAmountChange()}} className=" w-[15px] cursor-pointer h-[15px] " src="../assets/tick.svg" alt="" />
                    <img onClick={( )=>{setEdit(false); setQuantity(amount)}} className=" w-[15px] cursor-pointer h-[15px] " src="../assets/close.svg" alt="" />
                </div>

                    :
                    <div className="flex flex-row  gap-4">
                    <img onClick={()=>{setDeleteAction(true); setProductId(productId)}} className=" cursor-pointer w-[15px] h-[15px] " src="../assets/trash.svg" alt="" />
                    <img onClick={( )=>{setEdit(true)}} className=" w-[15px] cursor-pointer h-[15px] " src="../assets/edit.svg" alt="" />
                </div>

                }
              
                </div>

                <p className="font-bold text-[18px] lg:text-[24px]">{`$${totalAmount}`}</p>

            
        </div>
        </div>
    )
}

export default CartItem