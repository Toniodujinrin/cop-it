import { useContext, createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { ProfileContext } from "./ProfileContext";
export const ReviewContext = createContext()
import { get, post,_delete } from "../api/config";
import { useRouter } from "next/router";
const ReviewContextProvider  =({children})=>{
  
    const [cookies]= useCookies()
    const [postReviewLoading,setPostReviewLoading]= useState(false)
    const [reviews,setReviews] = useState([])
    const {getEntireProfile}= useContext(ProfileContext)
    const router = useRouter()
    const { refetch, isError, isLoading:reviewsByUserLoading } = useQuery({
        queryKey: ["reviewsAboutUser"],
        queryFn: async () =>{
          if(cookies.token){
           const {data:reviewData} = await get(
            `reviews/getAllReviewsAboutUser?email=${cookies.token.user}`
          )
          if (reviewData) {
            setReviews(reviewData);
           }
       }    
        }
          ,
      });
    
    useEffect(() => {
       if(isError){
        refetch()
       }
    }, [isError]);

    const postUserReview =async (payload)=>{
      if(cookies.token){
      payload.userId = cookies.token.user
      try {
        setPostReviewLoading(true)
        await post('reviews',{headers:{token:cookies.token._id}},payload)
       
        toast.success('Review Posted')
        getEntireProfile(payload.sellerId)
      } catch (error) {
        
        toast.error('Could not post review')
        
      }
      finally{
        setPostReviewLoading(false)
      }
    }
    else{
      router.push('/login')
    }

    }
    const deleteReview = async (reviewId)=>{
      try {
        await _delete(`reviews?reviewId=${reviewId}`,{headers:{token:cookies.token._id}})
        getEntireProfile(router.query.email)
        toast.success('review deleted')
      } catch (error) {
        toast.error('could not delete review')
      }
    }
    

    return(
    <ReviewContext.Provider value={{reviews, refetch, postUserReview, deleteReview, reviewsByUserLoading, postReviewLoading}}>
        {children}
    </ReviewContext.Provider>
    )

}

export default ReviewContextProvider
