import { useContext, createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { ProfileContext } from "./ProfileContext";
export const ReviewContext = createContext()
import { get, post } from "../api/config";
const ReviewContextProvider  =({children})=>{
    const [cookies]= useCookies()
    const [reviews,setReviews] = useState([])
    const {getEntireProfile}= useContext(ProfileContext)
    
    const { data: reviewData, refetch } = useQuery({
        queryKey: ["reviewsAboutUser"],
        queryFn: async () =>
          await get(
            `reviews/getAllReviewsAboutUser?email=${cookies.token.user}`
          ),
      });
    
    useEffect(() => {
        if (reviewData && reviewData.data && reviewData.data.data) {
            setReviews(reviewData.data.data);
         }
      }, [reviewData]);
    const postUserReview =async (payload)=>{
      payload.userId = cookies.token.user
      console.log(payload)
      try {
        await post('reviews',{headers:{token:cookies.token._id}},payload)
        toast.success('Review Posted')
        getEntireProfile(payload.sellerId)
      } catch (error) {
        console.log(error)
        toast.error('COuld not post review')
        
      }

    }
    

    return(
    <ReviewContext.Provider value={{reviews, refetch, postUserReview}}>
        {children}
    </ReviewContext.Provider>
    )

}

export default ReviewContextProvider
