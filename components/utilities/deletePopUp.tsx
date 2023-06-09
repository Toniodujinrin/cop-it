import { Dispatch, SetStateAction } from "react";
interface DeletePopUpProps {
  setPopUpShowing: Dispatch<SetStateAction<boolean>>;
  handleDelete: any;
}

const DeletePopUp: React.FC<DeletePopUpProps> = ({
  setPopUpShowing,
  handleDelete,
}) => {
  return (
    <div
      className={` bg-lightGray  w-[400px] flex flex-col  items-center font-semibold text-[20px] rounded-[20px] p-4 h-[300px]`}
    >
      <h1 className=" mt-6 ">
        Are you sure you want to delete this product from market.This action is
        irreversible.
      </h1>
      <div className="flex space-x-4 mt-[70px] flex-row">
        <button
          onClick={() => setPopUpShowing(false)}
          className="rounded-[20px] bg-forestGreen p-2 flex items-center justify-center  text-white w-[100px]"
        >
          <p>Cancel</p>
        </button>
        <button
          onClick={() => {
            setPopUpShowing(false);
            handleDelete();
          }}
          className="rounded-[20px] bg-red-600 p-2 flex items-center justify-center  text-white w-[100px]"
        >
          <p>Delete</p>
        </button>
      </div>
    </div>
  );
};

export default DeletePopUp;
