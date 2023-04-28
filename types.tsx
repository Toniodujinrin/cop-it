export interface Product {
  _id: string;
  description: string;
  category: string;
  numberInStock: number;
  isAvailable: boolean;
  name: string;
  price: number;
  rating: number;
  imageUrl: string;
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
  email: string;
}
