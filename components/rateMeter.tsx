interface RateMeterProps {
  rating: number;
}

const RateMeter: React.FC<RateMeterProps> = ({ rating }) => {
  return (
    <div className="flex flex-row">
      {Array.from({ length: rating }).map((item,index) => (
        <img
          key={index}
          className="w-[10px] h-[20px] "
          src="../../assets/star.svg"
          alt=""
        />
      ))}
    </div>
  );
};

export default RateMeter;
