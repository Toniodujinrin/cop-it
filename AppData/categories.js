const categoryData = [
    {
      name: "Electronics",
      href: "/list?category=Electronics",
      iconUrl: "../../assets/electronicsCategory.jpg",
    },
    {
      name: "Clothing",
      href: "/list?category=Clothing",
      iconUrl: "../../assets/clothesCategory.jpg",
    },
    {
      name: "Games",
      href: "/list?category=Games",
      iconUrl: "../../assets/gamesCategory.jpg",
    },
    {
      name: "Food",
      href: "/list?category=Food",
      iconUrl: "../../assets/foodCategory.jpg",
    },
    {
      name: "Books",
      href: "/list?category=Books",
      iconUrl: "../../assets/booksCategory.jpg",
    },
    {
      name: "Shoes",
      href: "/list?category=Shoes",
      iconUrl: "../../assets/shoesCategory.jpg",
    },
    {
      name: "Stationary",
      href: "/list?category=Stationary",
      iconUrl: "../../assets/stationaryCategory.jpg",
    },
    {
      name: "Furniture",
      href: "/list?category=Furniture",
      iconUrl: "../assets/furnitureCategory.jpg",
    },
    {
      name:'Fitness',
      href:'/list?category=Fitness',
      iconUrl:'../assets/fitnessCategory.jpg'
    }
  ];


  export default function getCategories(){
    return categoryData
  }