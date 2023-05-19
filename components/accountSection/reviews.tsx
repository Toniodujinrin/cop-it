import ReviewCard from "../reviewCard";
import { ProfileContext } from "../../Contexts/ProfileContext";
import { useContext } from "react";
import { Review } from "../../types";
const Reviews = () => {
  const {reviews}= useContext(ProfileContext)

  return (
    <div className="lg:grid lg:grid-cols-2  flex gap-4 flex-col ">
      {
        reviews.length>0?

          reviews.map((review:Review,index:number) => (
        <ReviewCard key={index} rating={review.rating} review={review.review} email={review.userId} imageUrl={review.author.imageConfig.url} fullName={`${review.author.firstName} ${review.author.lastName} `} />
      ))
      :
      <div>
         
      </div>
      }
    
    </div>
  );
};

export default Reviews;
