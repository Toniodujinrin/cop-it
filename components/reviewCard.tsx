interface ReviewCardProps{
  imageUrl:string,
  fullName:string,
  email:string,
  review:string,
  rating:number
  deleteAction:any
}
import RateMeter from "./rateMeter";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

const ReviewCard:React.FC<ReviewCardProps> = ({imageUrl,fullName,email,review,rating, deleteAction}) => {
  const router = useRouter()
  const [cookie]= useCookies()
  return (
    <div className=" flex flex-row w-[350px] items-center gap-x-2 p-4 shadow-lg rounded-[20px] ">
      <div className="w-[40%]">
        <div className="w-[100px] rounded-full h-[100px] bg-black  overflow-hidden">
          <img
          onClick={()=>router.push(`/profile?email=${email}`)}
            className=" w-full object-cover h-full"
            src={imageUrl}
            alt=""
          />
        </div>
      </div>

      <div className="flex w-[60%] flex-col">
        {

         cookie.token && cookie.token.user == email&&
        <img src="../assets/trash.svg" onClick={()=>deleteAction()} className="w-[20px] h-[20px] cursor-pointer self-end" alt="" />
        }
        <h1 className="font-semibold text-[21px] text-darkGreen">
          {fullName}
        </h1>
        <p>
         {review}
        </p>
        <RateMeter rating={rating} />
      </div>
    </div>
  );
};

export default ReviewCard;
