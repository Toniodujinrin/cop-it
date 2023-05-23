interface WriteReviewProps{
    setReviewMode:Dispatch<SetStateAction<boolean>>
    type:string
    

}
import Stars from './stars'
import { Dispatch, SetStateAction, useState , useContext} from "react"
import GreenButton from "../greenButton"
import { useRouter } from 'next/router'
import { ReviewContext } from '../../Contexts/ReviewContext'
const WriteReview:React.FC<WriteReviewProps> = ({setReviewMode,type})=>{
    const [value,setValue] = useState('')
    const{postUserReview} = useContext(ReviewContext)
    const [star, setStar]= useState(0)
    const [loading, setLoading]= useState(false)
    const router = useRouter()
    const handleSubmit =()=>{
        setLoading(true)
        if(type =='user'){
            const payload ={
                sellerId:router.query.email, 
                review:value, 
                rating: star+1,
    
               
            }

            postUserReview(payload)
        }
        setLoading(false)
        setReviewMode(false)
        
    }
    
    return(
        <div className=" p-4 border border-darkGreen items-center flex flex-col w-[300px] h-[400px] rounded-md shadow-lg">
        <button className=" self-end" onClick={()=>setReviewMode(false)}> <img className="w-[30px] h-[30px]" src="../assets/close.svg" alt="" /></button>
         <textarea name="" onChange={(e)=>setValue(e.target.value)} value={value} className=" resize-none bg-slate-100 p-3 focus:outline-none h-[200px] w-full mt-2 rounded-md" ></textarea>
        <div className='flex mt-3 flex-row items-center'>{
            
            [0,0,0,0,0].map((item, index)=>(
                <div className='w-[30px] h-[30px]' key={index} onClick={()=>{setStar(index)}}>
                     <Stars color={index<=star?'#000000':'#ffffff'}></Stars>
                </div>
               

            ))

        }

        </div>
         <GreenButton loading={loading} onCLick={()=>{handleSubmit()}} text={'Submit'}/>
      </div> 
    )

}

export default WriteReview