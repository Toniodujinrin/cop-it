import NavBar from "../../components/navBar";
import SellComp from "../../components/sellSection/sell";
const Sell = () => {
  return (
    <div>
      <NavBar hideSearchBar={false} />
      <div className="lg:mt-0 mt-[50px] ">
      <SellComp />
      </div>
    </div>
  );
};

export default Sell;
