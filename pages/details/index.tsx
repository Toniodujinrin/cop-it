import DetailsComp from "../../components/details";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import getAllProducts from "../../DummyData";
import { Product } from "../../types";
import ImageAndReviews from "../../components/imageAndReviews";
import NavBar from "../../components/navBar";
import Reviews from "../../components/reviews";
const Details = () => {
  const router = useRouter();
  const productId = router.query.id;
  const [data, setData] = useState<Product>();
  useEffect(() => {
    const newData = getAllProducts();
    if (newData) {
      console.log(router.query.id);
      const currentProduct = newData.filter(
        (data) => data.productId == productId
      )[0];
      console.log(currentProduct);

      if (currentProduct) {
        setData(currentProduct);
      } //else router.push("/404");
    }
  }, [router.query.id]);
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
      {data && (
        <div className="flex lg:flex-row flex-col lg:justify-between lg:gap-x-[10px] ">
          <div className="lg:w-[40%]">
            <ImageAndReviews
              imageUrl={data.imageUrl}
              productId={data.productId}
            />
          </div>
          <div className="lg:w-[35%]">
            <DetailsComp
              name={data.name}
              description={data.description}
              rating={data.rating}
              price={data.price}
              isAvailable={data.isAvailable}
              numberInStock={data.numberInStock}
            />
          </div>

          <div className=" lg:w-[25%] h-full   flex items-center justify-center "></div>
        </div>
      )}
    </>
  );
};

export default Details;
