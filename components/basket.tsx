import { useContext, useState } from "react";
import { BasketContext } from "../Contexts/BasketContext";
import { Product } from "../types";
import CartItem from "./cartItem";
import DeletePopUp from "./deletePopUp";
import ProductCard from "./productCard";
import QuantityCounter from "./quantityCounter";
interface Basket {
  product: Product;
  amount: number;
}
const BasketComp = () => {
  const { basket, removeItemFromBasket } = useContext(BasketContext);
  const [id, setId] = useState("");
  const [popUpShowing, setPopUpShowing] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const handleDelete = async () => {
    const payload = {
      productId: id,
    };
    await removeItemFromBasket(payload);
  };

  return (
    <div className="mx-auto  lg:w-[70%]">
      <h1 className="font-bold text-[32px] ml-2 mb-4 ">My Basket</h1>

      <div className="w-full flex items-center justify-center">
        {basket.length > 0 ? (
          popUpShowing ? (
            <DeletePopUp
              setPopUpShowing={setPopUpShowing}
              handleDelete={handleDelete}
            />
          ) : (
            <div className="flex flex-col w-full items-center ">
              {basket.map((item: Basket, index:number) => (
                
                  

                  <CartItem key={index} productId={item.product._id} name={item.product.name}
                     imageUrl={item.product.imageConfig[0].url}
                     amount={item.amount}
                     price ={item.product.price}
                     setProductId={setId}
                     setDeleteAction={setPopUpShowing}
                  />
                
              ))}
            </div>
          )
        ) : (
          <div
            className=" flex flex-col h-[600px] justify-center items-center space-y-4
          "
          >
            <img
              className="w-[200px] h-[200px]"
              src="../assets/emptyBasket.svg"
              alt=""
            />
            <h1 className="text-forestGreen text-[24px] font-semibold">
              Basket Empty
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasketComp;
