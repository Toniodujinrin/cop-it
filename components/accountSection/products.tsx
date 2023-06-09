import { useState, useContext, useEffect } from "react";
import { ProductsContext } from "../../Contexts/ProductsContexts";
import { Product } from "../../types";
import { useRouter } from "next/router";

import ProductCard from "../productCard";
import DeletePopUp from "../utilities/deletePopUp";

const Products = () => {
  const router = useRouter();
  const [popUpShowing, setPopUpShowing] = useState(false);
  const { products, deleteProduct} = useContext(ProductsContext);
  const [_id, setId] = useState("");
  const handleDelete = () => {
    deleteProduct(_id);
  };


  return (
    <div className="h-[600px] mb-4 w-full p-4 ">
      {products.length > 0 ?
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
            <>
            <table className="table-auto lg:table  hidden h-fit rounded-t-lg bg-lightGray rounded-lg  w-full ">
              <thead className=" h-[100px] rounded-lg ">
                <tr className="text-[21px] text-white h-[100px]  ">
                  <td className="rounded-tl-lg bg-forestGreen"></td>
                  <td className=" bg-forestGreen">Name</td>
                  <td className="bg-forestGreen">Price</td>
                  <td className=" bg-forestGreen">Number In Stock</td>
                  <td className=" bg-forestGreen"></td>
                  <td className="rounded-tr-lg bg-forestGreen"></td>
                </tr>
              </thead>
              <tbody>
              {products.map((product: Product) => (
              <tr className="h-[150px]">
                <td className=''><img onClick={() => router.push(`/details?id=${product._id}`)} className="w-[100px] m-auto rounded-md aspect-square" src={product.imageConfig[0].url} alt="" /></td>
               <td><div><p className="font-bold text-[18px]">{product.name}</p><p className="text-[12px]">{product.description}</p></div></td>
               <td className="font-semibold">{`$${product.price}`}</td>
               <td>{product.numberInStock}</td>
               <td ><img    onClick={() => {
              setPopUpShowing(true);
              setId(product._id);
            }} className="w-[30px] h-[30px]" src="../assets/trash.svg" alt="" /></td>
            <td><img className="w-[30px] h-[30px]" src="../assets/edit.svg" alt="" /></td>
               </tr>
               
              ))}
              </tbody>

            </table>

           <ul className="space-y-4 lg:hidden flex flex-col justify-items-center w-full  ">
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
         </>
          )}
        </div>
        :
        <div className="w-full h-full flex items-center flex-col justify-center">
          <img className="w-[200px] h-[200px] " src="../assets/emptyBox.svg" alt="" />
          <p className="text-[24px] text-forestGreen ">You are not selling any products</p>

        </div>
      }
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
