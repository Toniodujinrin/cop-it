import { useState, useContext, useEffect } from "react";
import { ProductsContext } from "../../Contexts/ProductsContexts";
import { Product } from "../../types";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import ProductCard from "../productCard";
import DeletePopUp from "../utilities/deletePopUp";
import Pagination from "../utilities/pagination";
import GreenButton from "../utilities/greenButton";
import ProductTable from "./productTable";

const Products = () => {
  const router = useRouter();
  const [popUpShowing, setPopUpShowing] = useState(false);
  const { products, deleteProduct} = useContext(ProductsContext);
  const [currentItems, setCurrentItems]= useState<any[]>([])
  const [_id, setId] = useState("");
  const handleDelete = () => {
    deleteProduct(_id);
  };


  return (
    <motion.div initial={{y:10, opacity:0.8}} animate={{y:0, opacity:1}} className=" h-full flex flex-col mb-4 w-full p-4 ">
      {products.length > 0 ?
        <div
          className={`  w-full  ${
            popUpShowing && "items-center flex lg:h-full h-full justify-center"
          }    `}
        >
          {popUpShowing ? (
            <DeletePopUp
              setPopUpShowing={setPopUpShowing}
              handleDelete={handleDelete}
            />
          ) : (
            <div className="flex flex-col gap-4">
              <ProductTable currentItems={currentItems} setPopUpShowing={setPopUpShowing} setId={setId}/>
          <ul className="space-y-4 lg:hidden flex flex-col justify-items-center w-full mb-4  ">
           {currentItems.map((product: Product) => (
             <li
               className="w-full h-fit flex flex-row"
               key={product._id}
             >
               <ProductCard
                 price = {product.price}
                 numberInStock = {product.numberInStock}
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
         <Pagination items={products} setCurrentItems={setCurrentItems} itemsPerPage={2}/>
         </div>
          
          
          )}
        </div>
        :
        <div className="w-full h-full flex items-center flex-col justify-center">
          <img className="w-[200px] h-[200px] " src="../assets/emptyBox.svg" alt="" />
          <p className="text-[24px] text-forestGreen ">You are not selling any products</p>

        </div>
      }
        <>
        {
          !popUpShowing &&
          <GreenButton text="Sell" disabled={false} loading={false} onCLick={() => router.push("/sell")}/>
        }
        
        </>
    </motion.div>
  );
};

export default Products;
