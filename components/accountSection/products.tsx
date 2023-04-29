import { useState, useContext } from "react";
import { ProductsContext } from "../../Contexts/ProductsContexts";
import { Product } from "../../types";
import { useRouter } from "next/router";

const Products = () => {
  const router = useRouter();
  const [popUpShowing, setPopUpShowing] = useState(false);
  const { products, deleteProduct } = useContext(ProductsContext);
  const [_id, setId] = useState("");
  return (
    <div className="max-h-[800px] w-full p-4 ">
      {products.length > 0 && (
        <div
          className={` h-[600px] w-full flex ${
            popUpShowing && "items-center justify-center"
          }  overflow-y-scroll overflow-x-hidden `}
        >
          {popUpShowing ? (
            <div
              className={` bg-slate-200  w-[400px] flex flex-col  items-center font-semibold text-[20px] rounded-[20px] p-4 h-[300px]`}
            >
              <h1 className=" mt-6 ">
                Are you sure you want to delete this product from market.This
                action is irreversible.
              </h1>
              <div className="flex space-x-4 mt-[70px] flex-row">
                <button
                  onClick={() => setPopUpShowing(false)}
                  className="rounded-[20px] bg-forestGreen p-2 flex items-center justify-center  text-white w-[100px]"
                >
                  <p>Cancel</p>
                </button>
                <button
                  onClick={() => {
                    setPopUpShowing(false);
                    deleteProduct(_id);
                  }}
                  className="rounded-[20px] bg-red-600 p-2 flex items-center justify-center  text-white w-[100px]"
                >
                  <p>Delete</p>
                </button>
              </div>
            </div>
          ) : (
            <ul className="space-y-4 z-10 flex flex-col w-full lg:grid grid-cols-2 ">
              {products.map((product: Product) => (
                <li
                  className="w-full h-[150px] flex flex-row"
                  key={product._id}
                >
                  <div className="mr-4">
                    <img
                      className="w-[150px] h-full"
                      src={product.imageUrl}
                      alt=""
                    />
                  </div>
                  <div>
                    <h1 className="font-semibold text-[24px] text-darkGreen ">
                      {product.name}
                    </h1>
                    <p>{product.description}</p>
                    <div className="flex justify-end mt-[40px] h-full flex-row space-x-3">
                      <img
                        onClick={() => {
                          setPopUpShowing(true);
                          setId(product._id);
                        }}
                        className="w-[20px] h-[20px] cursor-pointer"
                        src="../assets/trash.svg"
                        alt=""
                      />
                      <img
                        className="w-[20px] h-[20px] cursor-pointer"
                        src="../assets/edit.svg"
                        alt=""
                      />
                    </div>
                  </div>
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
