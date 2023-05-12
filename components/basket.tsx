import { useContext, useState } from "react";
import { BasketContext } from "../Contexts/BasketContext";
import { Product } from "../types";
import ProductCard from "./productCard";
interface Basket {
  product: Product;
  amount: number;
}
const BasketComp = () => {
  const { basket } = useContext(BasketContext);
  const [id, setId] = useState("");
  const [popUpShowing, setPopUpShowing] = useState(false);

  return (
    <div className="mx-auto lg:w-[70px] w-full">
      <h1 className="font-bold text-[32px] ">My Basket</h1>
      {basket.length > 0 ? (
        basket.map((item: Basket) => (
          <ProductCard
            _id={item.product._id}
            setPopUpShowing={setPopUpShowing}
            setId={setId}
            name={item.product.name}
            image={item.product.imageConfig[0]}
            description={item.product.description}
          />
        ))
      ) : (
        <h1>No Items in basket</h1>
      )}
    </div>
  );
};

export default BasketComp;
