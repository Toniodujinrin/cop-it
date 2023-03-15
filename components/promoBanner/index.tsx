const HeroSection = () => {
  return (
    <div className="w-full h-[280px] shadow-lg rounded-md items-center box-border p-4 flex flex-row justify-between bg-beige">
      <div className="w-[50%] h-full space-y-[30px] flex flex-col">
        <h1 className="text-[36px] font-semibold text-darkGreen inline-block">
          This is a promotion text, Get 50% off your next order
        </h1>
        <button className="rounded-[18px] font-semibold flex justify-center items-center text-lightGreen bg-forestGreen p-2  w-[100px] h-[40px]  ">
          <p> more info</p>
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
