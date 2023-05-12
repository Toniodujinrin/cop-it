import { useRouter } from "next/router";
import QuantityCounter from "./quantityCounter";
import { useContext, useState } from "react";

import RateMeter from "./rateMeter";
import { ProductsContext } from "./../Contexts/ProductsContexts";
import { BasketContext } from "../Contexts/BasketContext";

const DetailsComp = () => {
  const { product } = useContext(ProductsContext);
  const { addItemToBasket } = useContext(BasketContext);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
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
        <button className="w-[170px] p-2 items-center border-2 border-forestGreen rounded-[20px]">
          <p>Buy Now</p>
        </button>
        <button
          onClick={() => handleBasketAdd()}
          className="w-[170px] p-2 items-center border-2 bg-forestGreen text-white border-forestGreen rounded-[20px]"
        >
          {loading ? <div className="spinnerSmall"></div> : <p>Add to Cart</p>}
        </button>
      </div>
    </div>
  );
};

export default DetailsComp;
