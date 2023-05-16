import DetailsComp from "../../components/details";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import ImageAndReviews from "../../components/imageAndReviews";
import NavBar from "../../components/navBar";
import { ProductsContext } from "./../../Contexts/ProductsContexts";
import { useQuery } from "react-query";

const Details = () => {
  const { getProduct, product } = useContext(ProductsContext);
  const router = useRouter();
  const productId = router.query.id;
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      if (productId) {
        getProduct(productId);
      }
      setLoading(false);
    } catch (error) {}
  }, [productId]);

  return (
    <>
      <NavBar />
      <button
        onClick={() => router.back()}
        className="w-[100px] lg:mt-0 mt-[40px] flex flex-row items-center px-2 justify-around  ml-4 h-auto py-2 rounded-md bg-forestGreen text-white"
      >
        <img src="../assets/arrow-left.svg" alt="" />
        Back
      </button>
      {isLoading ? (
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
        <div></div>
      )}
    </>
  );
};

export default Details;
