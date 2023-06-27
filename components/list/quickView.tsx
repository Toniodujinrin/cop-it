import { Dispatch, SetStateAction, useState, useContext } from "react"
import { Product } from "../../types"
import QuantityCounter from "../utilities/quantityCounter"
import RateMeter from "../utilities/rateMeter"
import {toast} from 'react-toastify'
import { CheckoutContext } from "../../Contexts/CheckoutContext"
import { BasketContext } from "../../Contexts/BasketContext"
import { AnimatePresence } from "framer-motion"
import { motion } from "framer-motion"
import GreenButton from "../utilities/greenButton"
interface QuickViewProps{

    product:Product|undefined
    setQuickViewProductId:Dispatch<SetStateAction<string>>
}
const QuickView:React.FC<QuickViewProps> = ({product,setQuickViewProductId})=>{
    const {createCheckout} = useContext(CheckoutContext)
  const { addItemToBasket } = useContext(BasketContext);
  const [buyLoading,setBuyLoading] = useState(false)
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const handleBuyNow =async ( )=>{
    if(quantity<= product!.numberInStock){
      try {
      setBuyLoading(true)
      const payload = {
        products:[{product:product, amount:quantity}]
      }
      
      await createCheckout(payload)


    } catch (error) {
      console.log(error)
    }
    finally{
      setBuyLoading(false)
    }
    }
    else toast.error('Items added exceed stock')
 
  }

  const handleBasketAdd = async () => {
    try {
      setLoading(true);
      const payload = {
        productId: product!._id,
        amount: quantity,
      };
      await addItemToBasket(payload);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
    return (

        <>
        { product &&
        //   <AnimatePresence>
        //   {isVisible && (
        //     <motion.div
        //       
        //     />
        //   )}
        // </AnimatePresence>
        <AnimatePresence>
        <motion.div initial={{ opacity: 0 , y:10 }} animate={{ opacity: 1,y:0 }}   exit={{ opacity: [0.5,0] }} className="bg-white items-start  hidden border-lightGray border sm:flex p-4 flex-row shadow-lg gap-4 lg:w-[40%] w-[90%] h-[60%]  absolute z-20">
            <div className="w-[40%]   ">
                <h1 className="text-[24px] font-bold mb-4">{product.name}</h1>
                <img className=" w-[300px] aspect-square rounded-md" src={product.imageConfig[0].url} alt="" />
            </div>
            <div className="w-[60%] flex flex-col gap-3">
                <div className="w-full flex justify-end">
                    <img onClick={()=>setQuickViewProductId('')} src="../assets/close.svg" className="w-[30px] h-[30px]" alt="" />
                </div>
               <p className="text-[21px] font-semibold">{`$${product.price}`}</p>
               <p>{`availablity: ${product.numberInStock}`}</p>
               <RateMeter rating={product.rating}/>
               <QuantityCounter quantity={quantity} setQuantity={setQuantity}/>
               <div className="flex flex-col gap-3 lg:flex-row items-center mt-[30px] space-x-2">
        <button onClick={()=>handleBuyNow()} className="w-[170px] p-2 items-center border-2 border-forestGreen rounded-[20px]">
        {buyLoading ? <div className="spinnerSmallBlack"></div> : <p>Buy Now</p>}
        </button>
        <button
          onClick={() => handleBasketAdd()}
          className="w-[170px] p-2 items-center border-2 bg-forestGreen text-white border-forestGreen rounded-[20px]"
        >
          {loading ? <div className="spinnerSmall"></div> : <p>Add to Basket</p>}
        </button>
      </div>
      
            </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 , y:10 }} animate={{ opacity: 1,y:0 }}   exit={{ opacity: [0.5,0] }} className="bg-white items-start  sm:hidden border-lightGray border flex p-4 flex-col shadow-lg gap-2  w-[90%] h-fit  absolute z-20">
        <div className="w-full flex justify-end">
                    <img onClick={()=>setQuickViewProductId('')} src="../assets/close.svg" className="w-[30px] h-[30px]" alt="" />
                </div>
            
            <div className="w-full flex items-center flex-col">
                <h1 className="text-[24px] font-bold mb-4">{product.name}</h1>
                <img className=" w-[300px] aspect-square rounded-md" src={product.imageConfig[0].url} alt="" />
            </div>
            <div className="w-full flex flex-col gap-2">
               
               <p className="text-[21px] font-semibold">{`$${product.price}`}</p>
               <p>{`availablity: ${product.numberInStock}`}</p>
               <RateMeter rating={product.rating}/>
               <QuantityCounter quantity={quantity} setQuantity={setQuantity}/>
               <div className="flex flex-row gap-2 justify-between w-full items-center space-x-2">
        <button onClick={()=>handleBuyNow()} className="w-[50%] mt-[20px]  p-2 items-center border-2 border-forestGreen rounded-[20px]">
        {buyLoading ? <div className="spinnerSmallBlack"></div> : <p>Buy Now</p>}
        </button>
        <div className="w-[50%]">
        <GreenButton text="Add to Basket" loading={loading} onCLick={()=>handleBasketAdd()} disabled={false}/>
        </div>
        </div>
      
            </div>
        </motion.div>


        </AnimatePresence>
        }
        </>
    )
}

export default QuickView