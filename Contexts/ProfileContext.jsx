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
      const userProfile = await get(`users/getProfile?email=${email}`, {});
      const userProducts = await get(
        `users/getAllProductsBeingSoldByUser?email=${email}`,
        {}
      );
      const userReviews = await get(
        `reviews/getAllReviewsAboutUser?email=${email}`,
        {}
      );
      if ((userReviews, userProducts, userProfile)) {
        setProfile(userProfile.data.data);
        setProducts(userProducts.data.data);
        setReviews(userReviews.data.data);
      } else toast.error("could not get user info");
    } catch (error) {
      console.log(error);
      toast.error("could not get user info");
    }
  };
  useEffect(() => {
    console.log(products, profile, reviews);
  }, [profile, products, reviews]);
  return (
    <ProfileContext.Provider
      value={{ getEntireProfile, profile, products, reviews }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContextProvider;
