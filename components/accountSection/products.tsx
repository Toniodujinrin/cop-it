import { useState, useContext } from "react";
import { ProductsContext } from "../../Contexts/ProductsContexts";
import { Product } from "../../types";
import { useRouter } from "next/router";

import ProductCard from "./../productCard";
import DeletePopUp from "../deletePopUp";

const Products = () => {
  const router = useRouter();
  const [popUpShowing, setPopUpShowing] = useState(false);
  const { products, deleteProduct } = useContext(ProductsContext);
  const [_id, setId] = useState("");
  const handleDelete = () => {
    deleteProduct(_id);
  };

  return (
    <div className="max-h-[800px] w-full p-4 ">
      {products.length > 0 && (
        <div
          className={` h-[600px] w-full flex ${
            popUpShowing && "items-center justify-center"
          }  overflow-y-scroll overflow-x-hidden `}
        >
          {popUpShowing ? (
            <DeletePopUp
              setPopUpShowing={setPopUpShowing}
              handleDelete={handleDelete}
            />
          ) : (
            <ul className="space-y-4 flex flex-col justify-items-center w-full lg:grid grid-cols-2 ">
              {products.map((product: Product) => (
                <li
                  className="w-full h-[150px] flex flex-row"
                  key={product._id}
                >
                  <ProductCard
                    description={product.description}
                    name={product.name}
                    _id={product._id}
                    setId={setId}
                    setPopUpShowing={setPopUpShowing}
                    image={product.imageConfig[0].url}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <div className="w-full flex items-end justify-end">
        <button
          onClick={() => router.push("/sell")}
          className={`w-[170px] p-2 mt-[20px] items-center border-2 
           
         bg-forestGreen border-forestGreen 
          
           text-white cursor-pointer  rounded-[20px]`}
        >
          <p>Sell</p>
        </button>
      </div>
    </div>
  );
};

export default Products;
