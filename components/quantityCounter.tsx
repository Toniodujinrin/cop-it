import { SetStateAction, Dispatch } from "react";
interface QuantityCounterProps {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
}

const QuantityCounter: React.FC<QuantityCounterProps> = ({
  setQuantity,
  quantity,
}) => {
  return (
    <div className="rounded-[20px] p-2 bg-gray-300 flex flex-row items-center justify-between w-[100px]">
      <img
        className="cursor-pointer object-cover w-[24px] h-[24px]"
        onClick={() => {
          setQuantity(++quantity);
        }}
        src="../assets/addition.svg"
        alt=""
      />
      <p>{quantity}</p>
      <button
        disabled={quantity == 1}
        onClick={() => {
          setQuantity(--quantity);
        }}
      >
        <img
          className="cursor-pointer w-[24px] h-[24px]"
          src="../assets/subtraction.svg"
          alt=""
        />
      </button>
    </div>
  );
};

export default QuantityCounter;
