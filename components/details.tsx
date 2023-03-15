import getAllProducts from "./../DummyData/index";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import QuantityCounter from "./quantityCounter";

interface ProductDetails {
  name: string;
  description: string;
  rating: number;
  price: number;
  isAvailable: boolean;
  numberInStock: number;
}
import { Product } from "../types";
import RateMeter from "./rateMeter";

const DetailsComp: React.FC<ProductDetails> = ({
  name,
  description,
  numberInStock,
  price,
  isAvailable,
  rating,
}) => {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="lg:p-0 p-4 w-full">
      <h1 className="text-[32px] font-bold text-darkGreen">{name}</h1>
      <p>{description}</p>
      <RateMeter rating={rating} />

      <h1 className="mt-[20px] text-darkGreen text-[24px] font-semibold">{`$${price}`}</h1>
      <div className="mt-[20px] space-x-2 flex flex-row items-center">
        <QuantityCounter quantity={quantity} setQuantity={setQuantity} />
        {numberInStock < 20 && (
          <small className="font-semibold text-forestGreen">{`Only ${numberInStock} left in stock. Hurry!`}</small>
        )}
      </div>
      <div className="flex flex-row items-center mt-[30px] space-x-2">
        <button className="w-[170px] p-2 items-center border-2 border-forestGreen rounded-[20px]">
          <p>Buy Now</p>
        </button>
        <button className="w-[170px] p-2 items-center border-2 bg-forestGreen text-white border-forestGreen rounded-[20px]">
          <p>Add to Cart</p>
        </button>
      </div>
    </div>
  );
};

export default DetailsComp;
