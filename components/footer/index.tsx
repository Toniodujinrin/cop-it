const Footer = () => {
  const handleUpScroll = () => {
    if (window) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return (
    <div className="h-auto w-full">
      <div
        onClick={() => {
          handleUpScroll();
        }}
        className="w-full cursor-pointer h-[50px] flex flex-row space-x-2 justify-center items-center bg-lightGreen p-4"
      >
        <img className="rotate-180" src="../assets/chevron-up.svg" alt="" />
        <h1 className="text-darkGreen font-semibold text-[18px]">
          Back to top
        </h1>
        <img className=" rotate-180" src="../assets/chevron-up.svg" alt="" />
      </div>
    </div>
  );
};

export default Footer;
