import { useRouter } from "next/router";

const HeroSection = () => {
  const router = useRouter()
  return (
    <div className="w-full h-auto  items-center box-border p-4 flex flex-row justify-between bg-beige">
      <div className="w-[50%] h-full space-y-[30px] flex flex-col">
        <div className="font-semibold text-darkGreen">
          <h1 className="lg:text-[40px] text-[21px] font-bold  inline-block">
            Create an account with us to buy and sell products with friends
          </h1>
          <p className="lg:text-[21px] text-[12px]">
            Buy and sell products independently without any fees!
          </p>
        </div>
        <button className="rounded-[18px] font-semibold flex justify-center items-center text-lightGreen bg-forestGreen  w-[100px]   ">
          <p onClick={()=>{router.push('/signup')}} className="m-0 p-2">get started</p>
        </button>
      </div>
      <div className="w-[50%] flex justify-center">
        <img
          className="w-[250px] h-[250px]"
          src="../../assets/hero-image.svg"
          alt=""
        />
      </div>
    </div>
  );
};

export default HeroSection;
