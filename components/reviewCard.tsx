import RateMeter from "./rateMeter";

const ReviewCard = () => {
  return (
    <div className=" flex flex-row w-full items-center gap-x-2 p-4 shadow-lg rounded-[20px] ">
      <div className="w-[40%]">
        <div className="w-[100px] rounded-full h-[100px] bg-black  overflow-hidden">
          <img
            className=" w-full object-cover h-full"
            src="../assets/hackthon_winner.png"
            alt=""
          />
        </div>
      </div>

      <div className="flex w-[60&] flex-col">
        <h1 className="font-semibold text-[21px] text-darkGreen">
          Persons Name
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto ipsam
          neque adipisci cupiditate velit eligendi ducimus esse quos quia quo.
        </p>
        <RateMeter rating={5} />
      </div>
    </div>
  );
};

export default ReviewCard;
