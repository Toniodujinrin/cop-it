const productData = [
  {
    _id: "dff7fge78eeg7",
    name: "Xbox 360",
    price: 50,
    description: " Beats by dre earbuds. Full noise cancelation",
    numberInStock: 17,
    isAvailable: true,
    category: "electronics",
    rating: 4,
    imageUrl: "../assets/xbox-product.jpg",
    seller: "todujinrin@gmail.com",
  },
  {
    _id: "8yefgy78efg78",
    name: "Air pods pro",
    price: 30,
    rating: 5,
    category: "electronics",
    description: " Beats by dre earbuds. Full noise cancelation",
    numberInStock: 17,
    isAvailable: true,
    imageUrl: "../assets/airpods-product.jpg",
    seller: "todujinrin@gmail.com",
  },
  {
    _id: "fewyh98yfe8ye",
    name: "Jeans",
    category: "clothing",
    price: 50,
    description: " Beats by dre earbuds. Full noise cancelation",
    numberInStock: 17,
    isAvailable: true,
    rating: 3,
    imageUrl: "../assets/jeans-product.jpg",
    seller: "todujinrin@gmail.com",
  },
  {
    _id: "fewy9y8ewyfey",
    name: "Cacio calculator",
    category: "electronics",
    price: 70,
    description: " Beats by dre earbuds. Full noise cancelation",
    numberInStock: 17,
    isAvailable: true,
    rating: 4,
    imageUrl: "../assets/cacio-product.jpg",
    seller: "todujinrin@gmail.com",
  },
  {
    _id: "yfd9uydsy9yyfd8s",
    name: "Ipad pro",
    category: "electronics",
    price: 40,
    description: " Beats by dre earbuds. Full noise cancelation",
    numberInStock: 17,
    isAvailable: true,
    rating: 4,
    imageUrl: "https://source.unsplash.com/random/?ipad/",
    seller: "todujinrin@gmail.com",
  },
  {
    _id: "8y98vfy89yd9s8",
    name: "HP pavilion 360 laptop",
    description: " Beats by dre earbuds. Full noise cancelation",
    numberInStock: 17,
    category: "electronics",
    isAvailable: true,
    price: 20,
    rating: 1,
    imageUrl: "../assets/hp-product.jpg",
    seller: "todujinrin@gmail.com",
  },
  {
    _id: "dsh8h89dy9yd8s98",
    name: "Beats pro",
    category: "electronics",
    description: " Beats by dre earbuds. Full noise cancelation",
    numberInStock: 17,
    isAvailable: true,

    price: 89,
    rating: 5,
    imageUrl: "../assets/beats-product.jpg",
    seller: "todujinrin@gmail.com",
  },
];

export default function getAllProducts() {
  return productData;
}