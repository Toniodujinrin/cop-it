import { useContext } from "react";
import { ProfileContext } from "../../Contexts/ProfileContext";
import Reviews from "../accountSection/reviews";
const ReviewsComp = () => {
  const {reviews} = useContext(ProfileContext)

  return (
    <div className="flex flex-col">
      {
        <Reviews/>

      }
      
      <div className="w-full flex justify-end">
      <button
          onClick={() =>{}}
          className={`w-[170px] p-2 mt-[20px] items-center border-2 
           
         bg-forestGreen border-forestGreen 
          
           text-white cursor-pointer  rounded-[20px]`}
        >
          <p> Write Review</p>
        </button>
      </div>
      
    </div>
  );
};

export default ReviewsComp;
