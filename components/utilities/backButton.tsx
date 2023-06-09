import { useRouter } from "next/router";

const BackButton = ()=>{
    const router = useRouter()
    return(
        <button
        onClick={() => router.back()}
        className="w-[100px] lg:mt-0 mt-[40px] flex flex-row items-center px-2 justify-around   h-auto py-2 rounded-md bg-forestGreen text-white"
      >
        <img src="../assets/arrow-left.svg" alt="" />
        Back
      </button>
    )
}
export default BackButton