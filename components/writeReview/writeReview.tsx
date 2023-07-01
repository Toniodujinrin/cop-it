interface WriteReviewProps{
    setReviewMode:Dispatch<SetStateAction<boolean>>
    type:string
    

}
import Stars from './stars'
import { Dispatch, SetStateAction, useState , useContext} from "react"
import GreenButton from "../utilities/greenButton"
import { useRouter } from 'next/router'
import { ReviewContext } from '../../Contexts/ReviewContext'
import { AnimatePresence, motion } from 'framer-motion'
const WriteReview:React.FC<WriteReviewProps> = ({setReviewMode,type})=>{
    const [value,setValue] = useState('')
    const{postUserReview, postReviewLoading} = useContext(ReviewContext)
    const [star, setStar]= useState(0)
   
    const router = useRouter()
    const handleSubmit =()=>{
      
        if(type =='user'){
            const payload ={
                sellerId:router.query.email, 
                review:value, 
                rating: star+1,
    
               
            }

            postUserReview(payload)
        }
        
        setReviewMode(false)
        
    }
    
    return(
        <AnimatePresence>
        <motion.div initial={{ y:30, opacity: 0 }}
        animate={{ opacity: 1,y:0}} exit={{opacity:0, y:30 ,scale:10}} className=" p-4 border  border-lightGray items-center flex flex-col w-[400px] h-[400px] rounded-[18px] shadow-lg">
        <button className=" self-end" onClick={()=>setReviewMode(false)}> <img className="w-[30px] h-[30px]" src="../assets/close.svg" alt="" /></button>
         <textarea name="" onChange={(e)=>setValue(e.target.value)} placeholder={'Write a review'} maxLength={200} value={value} className=" resize-none p-3 focus:outline-none h-[200px] w-full mt-2 rounded-md" ></textarea>
        <div className='flex mt-3 flex-row items-center'>{
            
            [0,0,0,0,0].map((item, index)=>(
                <div className='w-[30px] h-[30px]' key={index} onClick={()=>{setStar(index)}}>
                     <Stars color={index<=star?'#000000':'#ffffff'}></Stars>
                </div>
               

            ))

        }

        </div>
         <GreenButton disabled={value.length<1} loading={postReviewLoading} onCLick={()=>{handleSubmit()}} text={'Submit'}/>
      </motion.div> 
      </AnimatePresence>
    )

}

export default WriteReview