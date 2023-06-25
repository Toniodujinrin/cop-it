import { useContext, useState } from "react";
import { ProfileContext } from "../../Contexts/ProfileContext";
import ReviewCard from "../utilities/reviewCard";
import { Review } from "../../types";
import WriteReview from "../writeReview/writeReview";
import GreenButton from "../utilities/greenButton";
import { ReviewContext } from "../../Contexts/ReviewContext";
const ReviewsComp = () => {
  const {reviews} = useContext(ProfileContext)
  const [reviewMode, setReviewMode] = useState(false)
  const {deleteReview} = useContext(ReviewContext)

  return (
    <div className="flex flex-col">
      {
        reviewMode?
     <WriteReview type={'user'} setReviewMode={setReviewMode}/>:

<>

     

            <div className="lg:grid w-full lg:grid-cols-2  flex gap-4 flex-col ">
              {
                reviews.length>0?
        
                  reviews.map((review:Review,index:number) => (
                <ReviewCard datePosted={review.datePosted} deleteAction={()=>deleteReview(review._id)} key={index} rating={review.rating} review={review.review} email={review.userId} imageUrl={review.author.imageConfig.url} fullName={`${review.author.firstName} ${review.author.lastName} `} />
              ))
              :
              <div>
                 
              </div>
              }
            
            </div>
          
        

      
      
      <div className="w-full flex justify-end">
     <GreenButton disabled={false} loading={false} onCLick={()=>setReviewMode(true)} text={'Write Review'}/>
      </div></>
       }
    </div>
  );
};

export default ReviewsComp;
