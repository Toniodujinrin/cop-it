import ReviewCard from "../reviewCard";
import { ReviewContext } from "../../Contexts/ReviewContext";
import { useContext, useEffect } from "react";
import { Review } from "../../types";
const Reviews = () => {
  const {reviews, refetch}= useContext(ReviewContext)
   useEffect(()=>{
    refetch()
   },[])
   

  return (
    <div className="h-[600px] p-4 w-full">
      {

        reviews.length>0?
        <div className="lg:grid lg:grid-cols-2  flex gap-4 flex-col">
          {
          
          reviews.map((review:Review,index:number) => (
        <ReviewCard deleteAction={()=>{}} key={index} rating={review.rating} review={review.review} email={review.userId} imageUrl={review.author.imageConfig.url} fullName={`${review.author.firstName} ${review.author.lastName} `} />
         
      ))
       }</div>

      :
      <div className="w-full h-full flex flex-col items-center justify-center ">
       <img className="w-[200px] h-[200px]" src="../assets/noReview.svg" alt="" />
       <p className="text-[21px] text-forestGreen ">You have no reviews</p>
         
      </div>
      }
    
    </div>
  );
};

export default Reviews;
