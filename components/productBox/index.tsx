import { useRouter } from "next/router";
import RateMeter from "../utilities/rateMeter";
import { Dispatch, SetStateAction, useState } from "react";
import { useContext } from "react";
import { BasketContext } from "../../Contexts/BasketContext";
interface ProductBoxProps {
  name: string;
  rating: number;
  price: number;
  href: string;
  imgUrl: string;
  setQuickViewProduct : Dispatch<SetStateAction<string>>
  showQuickViewIcon: boolean

  productId: string;
}

const ProductBox: React.FC<ProductBoxProps> = ({
  name,
  rating,
  price,
  href,
  imgUrl,
  productId,
  setQuickViewProduct,
  showQuickViewIcon
}) => {
  const router = useRouter();
  const { addItemToBasket, basketProcessLoading } = useContext(BasketContext);

  const handleBasketAdd = async () => {
    try {
      
      const payload = {
        productId: productId,
        amount: 1,
      };
      addItemToBasket(payload);
    } catch (error) {
    };
  }

  return (
    <div
      className="lg:w-[250px] sm:w-[225px] w-full p-2 bg-white

   sm:min-h-[300px] h-[200px]  flex flex-col items-center rounded-[18px] shadow-lg"
    >
      <div className="w-full object-cover rounded-[18px] overflow-hidden sm:h-[200px] h-[120px]">

        <img
          onClick={() => {
            router.push({ pathname: "/details", query: { id: productId } });
          }}
          className="  z-10 hover:scale-150  transition-[1000ms] w-full "
          src={imgUrl}
          alt=""
        />
      </div>

      <div className="w-full mt-1 flex flex-row justify-between sm:h-auto h-[40px] p-o  items-center ">
        <p className="font-semibold text-darkGreen text-[16px] sm:text-[21px]">
          {name.split(" ").slice(0, 2).join(" ")}...
        </p>
        <p className="text-forestGreen font-bold text-[16px] sm:text-[24px]">{`$${price}`}</p>
      </div>

      <div className="w-full flex flex-row justify-between sm:mt-[20px]">
        <RateMeter rating={rating} />
        <div className="flex flex-row items-center space-x-2">
          <button
            onClick={() => {
              handleBasketAdd();
            }}
            className=" border-forestGreen flex justify-center items-center border-2 sm:p-1 sm:w-fit sm:h-[35px] w-[20px] h-[20px] font-bold rounded-[18px] text-darkGreen"
          >
            {basketProcessLoading ? (
              <div className="spinnerSmallBlack"></div>
            ) : (
              <>
                <p className="m-0 lg:block hidden p-0"> Add to Basket</p>
                <img
                  className="lg:hidden sm:w-[20px] sm:h-[20px] w-[10px] h-[20px]"
                  src="../../assets/cartIcon.svg"
                  alt=""
                />{" "}
              </>
            )}
          </button>
          {showQuickViewIcon&&
          <button onClick={()=>setQuickViewProduct(productId)} className=" border-forestGreen flex justify-center items-center border-2 sm:w-[35px] sm:h-[35px] w-[20px] h-[20px] font-bold rounded-full text-darkGreen">
            <img
              src="../../assets/previewIcon.svg"
              className="sm:w-[20px] sm:h-[20px] w-[10px] h-[20px]"
              alt=""
            />
          </button>
}
        </div>
      </div>
    </div>
  );
};

export default ProductBox;
