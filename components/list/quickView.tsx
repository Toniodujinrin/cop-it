import { Dispatch, SetStateAction, useState, useContext } from "react"
import { Product } from "../../types"
import QuantityCounter from "../utilities/quantityCounter"
import RateMeter from "../utilities/rateMeter"
import {toast} from 'react-toastify'
import { CheckoutContext } from "../../Contexts/CheckoutContext"
import { BasketContext } from "../../Contexts/BasketContext"

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
        <div className="bg-white items-start border-lightGray border flex p-4 flex-row shadow-lg gap-4 w-[40%] h-[60%]  absolute z-20">
            <div className="w-[40%]">
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
               <div className="flex flex-row items-center mt-[30px] space-x-2">
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
        </div>
        }
        </>
    )
}

export default QuickView