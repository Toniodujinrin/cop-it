import * as React from "react";
import Reviews from "./reviews";

interface ImageAndReviewsProps {
  imageUrl: string;
  productId: string;
}

const ImageAndReviews: React.FC<ImageAndReviewsProps> = ({
  imageUrl,
  productId,
}) => {
  return (
    <div className="w-full h-full lg:p-4 flex flex-col  pt-4 items-center">
      <div className="w-full lg:block flex flex-col items-center">
        <img className=" w-[90%] aspect-square" src={imageUrl} alt="" />
      </div>
    </div>
  );
};

export default ImageAndReviews;
