import ReviewCard from "../reviewCard";

const Reviews = () => {
  const dummyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="lg:grid lg:grid-cols-2  flex gap-4 flex-col ">
      {dummyArray.map((number) => (
        <ReviewCard key={number} />
      ))}
    </div>
  );
};

export default Reviews;
