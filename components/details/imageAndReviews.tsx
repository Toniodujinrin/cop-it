import * as React from "react";
import { useContext } from "react";
import { ProductsContext } from "../../Contexts/ProductsContexts";

const ImageAndReviews = () => {
  const { product } = useContext(ProductsContext);
  return (
    <div className="w-full h-full lg:p-4 flex flex-col  pt-4 items-center">
      <div className="w-full lg:block flex flex-col items-center">
        <img
          className=" w-[90%] rounded-lg aspect-square"
          src={product.imageConfig[0].url}
          alt=""
        />
      </div>
    </div>
  );
};

export default ImageAndReviews;
