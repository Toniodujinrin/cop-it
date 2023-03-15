import FeaturedSection from "../components/featuredSection";
import HeroSection from "../components/home_sections/Hero";
import NavBar from "./../components/navBar/index";
import Categories from "../components/categorySection";
import Footer from "./../components/footer/index";
const Home = () => {
  return (
    <div>
      <div className="lg:pb-0 pb-[30px]">
        <NavBar />
      </div>
      <div className="w-full  mt-[30px]">
        <HeroSection />
      </div>
      <div className="my-[50px] px-4">
        <Categories />
      </div>
      <div className="mt-[30px] bg-alabaster px-4">
        <FeaturedSection />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
