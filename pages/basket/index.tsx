import NavBar from "../../components/navBar";
import BasketComp from "./../../components/basket";
import { useContext } from "react";
import { useQuery } from "react-query";
import { BasketContext } from "../../Contexts/BasketContext";

const Basket = () => {
  const { basket, refetchBasket } = useContext(BasketContext);
  useQuery({
    queryKey: ["refetchBasket"],
    queryFn: async () => await refetchBasket,
  });
  return (
    <div>
      <NavBar />
      {
        <div className="w-full lg:mt-0 mt-[40px] pl-4">
          <BasketComp />
        </div>
      }
    </div>
  );
};

export default Basket;
