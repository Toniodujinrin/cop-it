export interface Product {
  productId: string;
  description: string;
  category: string;
  numberInStock: number;
  isAvailable: boolean;
  name: string;
  price: number;
  rating: number;
  imageUrl: string;
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
