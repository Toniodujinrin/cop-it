import NavBar from "../../components/navBar";
import BasketComp from "../../components/basketSection/basket";
import { useContext } from "react";
import { useQuery } from "react-query";
import { BasketContext } from "../../Contexts/BasketContext";

const Basket = () => {
  const { basket, refetchBasket } = useContext(BasketContext);
  const { isLoading } = useQuery({
    queryKey: ["refetchBasket"],
    queryFn: async () => await refetchBasket,
  });
  return (
    <div>
      <NavBar />
      {isLoading ? (
        <div className="spinner"></div>
      ) : (
        <div className="w-full lg:mt-0 mt-[40px] ">
          <BasketComp />
        </div>
      )}
    </div>
  );
};

export default Basket;
