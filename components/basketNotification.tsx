import { useContext } from "react";
import { BasketContext } from "./../Contexts/BasketContext";

const BasketNotification = () => {
  const { amountInBasket } = useContext(BasketContext);
  return (
    <>
      {amountInBasket > 0 && (
        <div className="bg-forestGreen text-white rounded-[20px] w-[30px] flex items-center font-bold justify-center ">
          <p>{amountInBasket}</p>
        </div>
      )}
    </>
  );
};

export default BasketNotification;
