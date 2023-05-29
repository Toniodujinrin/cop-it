import { useState } from "react";
import { useEffect } from "react";
import getAllProducts from "./../../DummyData/index";
import ProductBox from "../productBox";
import { useContext } from "react";
import { ProductsContext } from "../../Contexts/ProductsContexts";
import { Product } from "../../types";


const FeaturedSection = () => {
  const {featuredProducts}= useContext(ProductsContext)
 
  
  return (
    <div className="flex flex-col pb-[50px]">
      <h1 className="text-darkGreen text-[32px] mb-[30px] mt-[30px] font-semibold ">
        Featured Items
      </h1>
      {
featuredProducts?
<div className="grid lg:grid-cols-4 gap-x-4 gap-y-4 justify-items-center grid-cols-2 ">
        
{featuredProducts.map((item:Product) => (
  <ProductBox
    productId={item._id}
    name={item.name}
    price={item.price}
    rating={item.rating}
    imgUrl={item.imageConfig[0].url}
    href=""
  />
))}
</div>
:
<div>
  No featured Products
</div>
      }
 
    </div>
  );
};

export default FeaturedSection;
