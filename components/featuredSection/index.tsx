import { useState } from "react";
import { useEffect } from "react";
import getAllProducts from "./../../DummyData/index";
import ProductBox from "../productBox";

type Product = {
  name: string;
  price: number;
  imageUrl: string;
  rating: number;
  _id: string;
};
const FeaturedSection = () => {
  const [data, setData] = useState<Product[]>([]);
  useEffect(() => {
    const data = getAllProducts();
    setData(data);
  });
  return (
    <div className="flex flex-col pb-[50px]">
      <h1 className="text-darkGreen text-[32px] mb-[30px] mt-[30px] font-semibold ">
        Featured Items
      </h1>
      <div className="grid lg:grid-cols-4 gap-y-8 justify-items-center grid-cols-2 ">
        {data.map((item) => (
          <ProductBox
            productId={item._id}
            name={item.name}
            price={item.price}
            rating={item.rating}
            imgUrl={item.imageUrl}
            href=""
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedSection;
