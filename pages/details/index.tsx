import DetailsComp from "../../components/details";
import { useRouter } from "next/router";
import { useContext, useEffect} from "react";

import ImageAndReviews from "../../components/imageAndReviews";
import NavBar from "../../components/navBar";
import { ProductsContext } from "./../../Contexts/ProductsContexts";
import BackButton from "../../components/backButton";


const Details = () => {
  const { getProduct, product, productLoading } = useContext(ProductsContext);
  const router = useRouter();
  const productId = router.query.id;
 

  useEffect(() => {
    try {
    
      if (productId) {
        getProduct(productId);
      }
      
    } catch (error) {}
  }, [productId]);


  return (
    <>
      <NavBar />
      <div className="pl-4">
        <BackButton/>
      </div>
   
      {productLoading ? (
        <div className="spinner"></div>
      ) : product ? (
        <div className="flex lg:flex-row flex-col lg:justify-between lg:gap-x-[10px] ">
          <div className="lg:w-[40%]">
            <ImageAndReviews />
          </div>
          <div className="lg:w-[35%]">
            <DetailsComp />
          </div>

          <div className=" lg:w-[25%] h-full   flex items-center justify-center "></div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center mb-[50px]">
          <img className=" w-[200px] h-[200px]" src="../assets/magnifyingGlass.svg" alt="" />
          <h1 className="text-[24px] text-forestGreen">Product Not Found</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
