import { useRouter } from "next/router";
import RateMeter from "../rateMeter";
interface ProductBoxProps {
  name: string;
  rating: number;
  price: number;
  href: string;
  imgUrl: string;

  productId: string;
}

const ProductBox: React.FC<ProductBoxProps> = ({
  name,
  rating,
  price,
  href,
  imgUrl,
  productId,
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push({ pathname: "/details", query: { id: productId } });
      }}
      className="lg:w-[250px] sm:w-[225px] w-[175px] p-2 bg-white

   sm:min-h-[300px] h-[200px]  flex flex-col items-center rounded-[18px] shadow-lg"
    >
      <div className="w-full object-cover overflow-hidden sm:h-[200px] h-[120px]">
        <img
          className=" rounded-[18px] z-10 sm:h-[170px] h-[120px] w-full "
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
          <button className=" border-forestGreen flex justify-center items-center border-2 sm:p-1 sm:w-fit sm:h-[35px] w-[20px] h-[20px] font-bold rounded-[18px] text-darkGreen">
            <p className="m-0 lg:block hidden p-0"> Add to cart</p>
            <img
              className="lg:hidden sm:w-[20px] sm:h-[20px] w-[10px] h-[20px]"
              src="../../assets/cartIcon.svg"
              alt=""
            />
          </button>
          <button className=" border-forestGreen flex justify-center items-center border-2 sm:w-[35px] sm:h-[35px] w-[20px] h-[20px] font-bold rounded-full text-darkGreen">
            <img
              src="../../assets/heartIcon.svg"
              className="sm:w-[20px] sm:h-[20px] w-[10px] h-[20px]"
              alt=""
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductBox;
