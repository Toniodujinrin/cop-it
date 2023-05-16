import { Provider, useContext } from "react";
import { ProfileContext } from "../../Contexts/ProfileContext";
import { Product } from "../../types";
import ProductBox from "../productBox";
const Products = () => {
  const { products } = useContext(ProfileContext);
  return (
    <div className="grid lg:grid-cols-4 gap-x-4 gap-y-4 justify-items-center grid-cols-2 ">
      {products.map((item: Product) => (
        <ProductBox
          productId={item._id}
          name={item.name}
          price={item.price}
          rating={item.rating}
          imgUrl={item.imageConfig[0].url}
          href=""
        />
      ))}
    </div>
  );
};

export default Products;
