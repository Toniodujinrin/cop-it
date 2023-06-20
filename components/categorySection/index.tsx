import { CCarousel, CCarouselItem } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Categories = () => {
  const router = useRouter()
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
      iconUrl: "../../assets/furnitureCategory.jpg",
    },
  ];
  const [windowLength, setWindowLength] = useState(1200);
  useEffect(() => {
    if (window !== undefined) {
      setWindowLength(window.innerWidth);
    }
  }, []);

  const getNumberOfCategories = (categorySize: number) => {
    const divisor = categorySize + 50;
    const numberOfCategories = Math.floor(windowLength / divisor);
    if (numberOfCategories < 1) {
      return 1;
    } else return numberOfCategories;
  };
  const getNumberOfCarousels = () => {
    const numberOfCategoriesPerPage = getNumberOfCategories(300);
    const numberOfCarousels = Math.round(
      categoryData.length / numberOfCategoriesPerPage
    );
    return new Array(numberOfCarousels).fill(0);
  };
  console.log(getNumberOfCategories(300), getNumberOfCarousels());
  return (
    <div>
      <h1 className="text-darkGreen text-[32px] font-semibold mb-[14px]">
        Shop by Category
      </h1>

      <CCarousel className="w-full">
        {getNumberOfCarousels().map((item, carouselIndex) => (
          <CCarouselItem className="h-[150px] w-[330px]">
            <ul className="flex flex-row  py-4  space-x-4">
              {categoryData.map(
                (item, index) =>
                  index <= (carouselIndex + 1) * getNumberOfCategories(300) &&
                  index >= carouselIndex * getNumberOfCategories(300) && (
                    <div onClick={()=>router.push(item.href)} className="w-[300px]  h-[100px] cursor-pointer justify-between rounded-[18px] overflow-hidden flex items-center px-2  shadow-md">
                      <h1 className=" lg:text-[24px] w-[50%] text-[14px] p-2 text-darkGreen">
                        {item.name}
                      </h1>

                      <img
                        className=" h-[80%]  rounded-[18px] w-[50%] my-auto  "
                        src={item.iconUrl}
                        alt=""
                      />
                    </div>
                  )
              )}
            </ul>
          </CCarouselItem>
        ))}
      </CCarousel>
    </div>
  );
};

export default Categories;
