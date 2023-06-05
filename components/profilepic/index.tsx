import { useRouter } from "next/router"
interface ProfilePicProps{
 imageUrl:string|undefined 
 email:string
}
const ProfilePic:React.FC<ProfilePicProps> = ({imageUrl, email})=>{
    const router = useRouter()
    return(
        <div className="w-full h-full flex items-center justify-center">
          <img
        onClick={()=>email.length>0&&router.push(`/profile?email=${email}`)}
          className={` ${imageUrl?'w-full object-cover h-full': 'w-[80%] h-[80%]'} `}
          src={imageUrl?imageUrl:'../assets/profilePic.svg'}
          alt=""
        />
        </div>
    )
}

export default ProfilePic