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

export interface Review {
 _id:string
 review:string
 userId:string
 rating:number
 author:{
  firstName:string
  lastName:string
  imageConfig:{
    url:string,
    publicId:string
  }
 }
 datePosted:number
 seller:string
}

export interface User {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  _id: string;
  address: string;
}

export interface Basket {
  product: Product;
  amount: number;
}
