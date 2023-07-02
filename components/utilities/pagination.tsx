import { Dispatch, SetStateAction, useEffect, useState } from "react"

interface PaginationProps{
   
    itemsPerPage:number
    items:any[]
    setCurrentItems:Dispatch<SetStateAction<any[]>>
}
const Pagination:React.FC<PaginationProps> = ({itemsPerPage, items, setCurrentItems})=>{
    const pageNUmbers = []
    for(let i = 1; i<= Math.ceil(items.length/itemsPerPage); i++){
        pageNUmbers.push(i)
    }
    const [currentPage, setCurrentPage]= useState(1)
    useEffect(()=>{
        const indexofLastPost = currentPage * itemsPerPage
        const indexofFirstPost = indexofLastPost - itemsPerPage
        const currentItems = items.slice(indexofFirstPost,indexofLastPost)
        setCurrentItems(currentItems)
    },[currentPage])
    

   
   
    
    return(
        <div className="w-full flex items-center mb-4 justify-center">
            <ul className=" flex flex-row gap-4 ">
                {
                   pageNUmbers.map((index)=>(
                    <li  className={`border-2 ${index == currentPage? 'bg-forestGreen text-white':'text-forestGreen'} border-forestGreen w-[40px] aspect-square flex items-center justify-center rounded-[10px] `} onClick={()=>setCurrentPage(index)} key={index}>
                        <p>{index}</p>
                    </li>
                   ))
                }
            </ul>

        </div>
    )

}

export default Pagination