export interface Product {
  _id: string;
  description: string;
  category: string;
  numberInStock: number;
  isAvailable: boolean;
  name: string;
  price: number;
  rating: number;
  imageConfig: {
    publicId: string;
    url: string;
  }[];
  seller: string;
}

export interface ReviewObject {
  productId: string;
  reviews: Review[];
}

interface Review {
  reviewId: string;
  review: string;
  author: string;
  datePosted: string;
}

export interface User {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  _id: string;
  address: string;
}
