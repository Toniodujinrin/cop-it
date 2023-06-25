interface ReviewCardProps{
  imageUrl:string,
  fullName:string,
  email:string,
  review:string,
  rating:number
  deleteAction:()=>any
  datePosted:number
}
import RateMeter from "./rateMeter";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import ProfilePic from "../profilepic";
import dayjs from "dayjs";

const ReviewCard:React.FC<ReviewCardProps> = ({imageUrl,fullName,email,review,rating, deleteAction,datePosted}) => {
  const router = useRouter()
  const [cookie]= useCookies()
  return (
    <div className=" flex flex-row w-[350px] items-center gap-x-2 p-4 shadow-lg rounded-[20px] ">
      <div className="w-[40%]">
        <div className="w-[100px] rounded-full h-[100px]   overflow-hidden">
         <ProfilePic email={email} imageUrl={imageUrl}/>
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
        <p>{dayjs(datePosted).format('YYYY-MM-DD')}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
