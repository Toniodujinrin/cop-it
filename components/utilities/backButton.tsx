import { useRouter } from "next/router";

const BackButton = ()=>{
    const router = useRouter()
    return(
        <button
        onClick={() => router.back()}
        className="w-fit lg:mt-0 mt-[40px] flex flex-row items-center px-2 justify-around gap-3  h-auto py-2 rounded-md bg-forestGreen text-white"
      >
        <img src="../assets/arrow-left.svg" alt="" />
        <p className="lg:block hidden">Back</p>
        
      </button>
    )
}
export default BackButton