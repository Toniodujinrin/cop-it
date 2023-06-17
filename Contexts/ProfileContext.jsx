import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { get } from "../api/config";
import { toast } from "react-toastify";

export const ProfileContext = createContext();
const ProfileContextProvider = ({ children }) => {
  const [profile, setProfile] = useState({});
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
   

  const getEntireProfile = async (email) => {
    try {
      const {data:userProfile} = await get(`users/getProfile?email=${email}`, {});
      const {data:userProducts}= await get(
        `users/getAllProductsBeingSoldByUser?email=${email}`,
        {}
      );
      const {data:userReviews} = await get(
        `reviews/getAllReviewsAboutUser?email=${email}`,
        {}
      );
     
      if ((userReviews, userProducts, userProfile)) {
        setProfile(userProfile);
        setProducts(userProducts);
        setReviews(userReviews);
      } else toast.error("could not get user info");
    } catch (error) {
    
      toast.error("could not get user info");
    }
  };
 
  return (
    <ProfileContext.Provider
      value={{ getEntireProfile, profile, products, reviews }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContextProvider;
