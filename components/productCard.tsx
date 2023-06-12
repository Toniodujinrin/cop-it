interface ProductCardProps {
  _id: string;
  image: string;
  name: string;
  price:number
  numberInStock:number
  description: string;
  setPopUpShowing: Dispatch<SetStateAction<boolean>>;
  setId: Dispatch<SetStateAction<string>>;
}
import { useRouter } from "next/router";
import { SetStateAction } from "react";
import { Dispatch } from "react";
const ProductCard: React.FC<ProductCardProps> = ({
  _id,
  image,
  name,
  description,
  price,
  numberInStock,
  setPopUpShowing,
  setId,
}) => {
  const router = useRouter();
  return (
    <div className="flex w-full p-4 h-fit rounded-lg gap-4 shadow-lg border border-lightGray flex-row">
      <div >
        <img
          onClick={() => router.push(`/details?id=${_id}`)}
          className="w-[100px] h-[70px] rounded-lg"
          src={image}
          alt=""
        />
      </div>
      <div className="w-[calc(100%-150px)]">
        <h1 className="font-semibold text-[18px] lg:text-[24px] text-darkGreen ">{`${name.slice(0,6)}...`}</h1>
        <p>{`${description.slice(0,12)}...`}</p>
        <p>{`$${price}`}</p>
        <p>{numberInStock}</p>
        <div className="flex justify-end mt-[40px] h-full flex-row space-x-3">
          <img
            onClick={() => {
              setPopUpShowing(true);
              setId(_id);
            }}
            className="w-[20px] h-[20px] cursor-pointer"
            src="../assets/trash.svg"
            alt=""
          />
          <img
            className="w-[20px] h-[20px] cursor-pointer"
            src="../assets/edit.svg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
