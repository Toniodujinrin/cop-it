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
export interface Orders{
  total:number
  orderId:string
  timeOrdered:number
  products:Basket[]
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

export interface FullUser{
  _id:string
  email:string
  password:string
  emailVerified:boolean
  accountVerified:boolean
  timeCreated:number
  address:string
  firstName:string
  lastName:string
  phone:string
  imageConfig:{
    url:string,
    publicId:string
  }

}

export interface Basket {
  productId:string
  product: Product
  amount: number;
}
