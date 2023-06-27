import { useState } from "react";
import { useEffect } from "react";
import ProductBox from "../productBox";
import { useContext } from "react";
import { ProductsContext } from "../../Contexts/ProductsContexts";
import { Product } from "../../types";
import ProductBoxLoader from "../productBox/productBoxLoader";


const FeaturedSection = () => {
  const {featuredProducts}= useContext(ProductsContext)
  const [quickViewProduct,setQuickViewProduct]= useState('')
  
  return (
    <div className="flex flex-col pb-[50px]">
      <h1 className="text-darkGreen text-[32px] mb-[30px] mt-[30px] font-semibold ">
        Featured Items
      </h1>
<div className="grid lg:grid-cols-4 gap-x-4 gap-y-4  justify-items-center grid-cols-2 ">
{

featuredProducts.length >0?

        

 
  featuredProducts.map((item:Product, index:number) => (
  <ProductBox
   key={index}
    numberInStock={item.numberInStock}
    showQuickViewIcon={false}
    setQuickViewProduct={setQuickViewProduct}
    productId={item._id}
    name={item.name}
    price={item.price}
    rating={item.rating}
    imgUrl={item.imageConfig[0].url}
    href=""
  />
))


:
  new Array(8).fill(0).map((item,index)=>
  <ProductBoxLoader key={index}/>
   )
  }
  </div>
 
    </div>
  );
};

export default FeaturedSection;
