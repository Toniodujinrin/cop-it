import { useEffect } from "react";
import { useState } from "react";
import { ReviewObject } from "../types";
import getAllReviews from "./../DummyData/reviews";

interface ReviewsProps {
  productId: string;
}
const Reviews: React.FC<ReviewsProps> = ({ productId }) => {
  const [review, setReviews] = useState<ReviewObject | undefined>();
  useEffect(() => {
    const reviews = getAllReviews();
    const _review = reviews.filter(
      (review) => review?.productId == productId
    )[0];
    setReviews(_review);
  });
  return (
    <div className=" bg-slate-100 h-[300px] scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-thumb-black scrollbar-thin p-4 overflow-y-scroll    rounded-[18px]  ">
      <h1 className="font-bold text-[21px]  ">Reviews</h1>
      {review?.reviews.map((review) => (
        <div className="py-2">
          <p className="text-[12px]">{review.review}</p>
          <p className="text-darkGreen text-[14px] font-semibold">
            {review.author}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
