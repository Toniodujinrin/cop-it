import ReviewCard from "../reviewCard";
import { ReviewContext } from "../../Contexts/ReviewContext";
import { useContext } from "react";
import { Review } from "../../types";
const Reviews = () => {
  const {reviews, refetch}= useContext(ReviewContext)
   refetch()

  return (
    <div className="lg:grid lg:grid-cols-2  flex gap-4 flex-col ">
      {
        reviews.length>0?

          reviews.map((review:Review,index:number) => (
        <ReviewCard key={index} rating={review.rating} review={review.review} email={review.userId} imageUrl={review.author.imageConfig.url} fullName={`${review.author.firstName} ${review.author.lastName} `} />
      ))
      :
      <div>
        <p>No reviews</p>
         
      </div>
      }
    
    </div>
  );
};

export default Reviews;
