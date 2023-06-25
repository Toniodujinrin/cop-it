interface UserCardProps{
    imageUrl:string,
    fullName:string,
    email:string,
 
  }
 
  import { useRouter } from "next/router";
import ProfilePic from "../profilepic";

  
  const UserCard:React.FC<UserCardProps> = ({imageUrl,fullName,email}) => {
    const router = useRouter()
    
    return (
      <div  onClick={()=>router.push(`/profile?email=${email}`)} className=" flex border border-lightGreen cursor-pointer flex-row w-[350px] items-center gap-x-2 p-4 shadow-lg rounded-[20px] ">
        <div className="w-[40%]">
          <div className="w-[100px] rounded-full h-[100px]   overflow-hidden">
            <ProfilePic email={email} imageUrl={imageUrl}/>
          </div>
        </div>
  
        <div className="flex w-[60%] flex-col">
       
          <h1 className="font-semibold text-[21px] text-darkGreen">
            {fullName}
          </h1>
          </div>
      </div>
    );
  };
  
  export default UserCard;