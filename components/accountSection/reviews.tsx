import ReviewCard from "../utilities/reviewCard";
import { ReviewContext } from "../../Contexts/ReviewContext";
import { useContext, useEffect } from "react";
import { Review } from "../../types";
const Reviews = () => {
  const {reviews}= useContext(ReviewContext)
 

  return (
    <div className="h-full p-4 w-full">
      {

        reviews.length>0?
        <div className="lg:grid lg:grid-cols-2  flex gap-4 items-center flex-col">
          {
          
          reviews.map((review:Review,index:number) => (
        <ReviewCard datePosted={review.datePosted} deleteAction={()=>{}} key={index} rating={review.rating} review={review.review} email={review.userId} imageUrl={review.author.imageConfig.url} fullName={`${review.author.firstName} ${review.author.lastName} `} />
         
      ))
       }</div>

      :
      <div className="w-full h-full flex flex-col items-center justify-center ">
       <img className="lg:w-[200px] w-[150px] aspect-square" src="../assets/noReview.svg" alt="" />
       <p className="text-[21px]  ">No reviews</p>
         
      </div>
      }
    
    </div>
  );
};

export default Reviews;
