import { useRouter } from "next/router";
import QuantityCounter from "../utilities/quantityCounter";
import { useContext, useState } from "react";

import RateMeter from "../utilities/rateMeter";
import { ProductsContext } from "../../Contexts/ProductsContexts";
import { BasketContext } from "../../Contexts/BasketContext";
import UserCard from "../utilities/userCard";
import { CheckoutContext } from "../../Contexts/CheckoutContext";
import { toast } from "react-toastify";

const DetailsComp = () => {
  const { product } = useContext(ProductsContext);
  const {createCheckout} = useContext(CheckoutContext)
  const { addItemToBasket } = useContext(BasketContext);
  const [buyLoading,setBuyLoading] = useState(false)
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const handleBuyNow =async ( )=>{
    if(quantity<= product.numberInStock){
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
        productId: product._id,
        amount: quantity,
      };
      await addItemToBasket(payload);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:p-0 p-4 w-full">
      <h1 className="text-[32px] font-bold text-darkGreen">{product.name}</h1>
      <p>{product.description}</p>
      <RateMeter rating={product.rating} />

      <h1 className="mt-[20px] text-darkGreen text-[24px] font-semibold">{`$${product.price}`}</h1>
      <div className="mt-[20px] space-x-2 flex flex-row items-center">
        <QuantityCounter quantity={quantity} setQuantity={setQuantity} />
        {product.numberInStock < 20 && (
          <small className="font-semibold text-forestGreen">{`Only ${product.numberInStock} left in stock. Hurry!`}</small>
        )}
      </div>
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
      <div className="mt-[50px]">
        <h1 className="text-darkGreen font-semibold text-[24px] mb-[30px]">Sold By:</h1>
         <UserCard email={product.sellerId} fullName={`${product.seller.firstName} ${product.seller.lastName}`} imageUrl={product.seller.imageConfig.url}/>
      </div>
    </div>
  );
};

export default DetailsComp;