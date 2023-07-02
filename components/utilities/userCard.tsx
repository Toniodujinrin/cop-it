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
      <div  onClick={()=>router.push(`/profile?email=${email}`)} className=" flex border  cursor-pointer flex-row w-[350px] items-center gap-x-2 p-4 shadow-lg rounded-[20px] ">
        <div className="">
          <div className="w-[50px] border-2 border-black border-solid rounded-full h-[50px]   overflow-hidden">
            <ProfilePic email={email} imageUrl={imageUrl}/>
          </div>
        </div>
  
        <div className="flex  flex-col">
       
          <h1 className="font-bold lg:text-[21px] text-[18px] text-darkGreen">
            {fullName}
          </h1>
          </div>
      </div>
    );
  };
  
  export default UserCard;