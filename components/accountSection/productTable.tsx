import { Product } from "../../types"
import { useRouter } from "next/router"
import { Dispatch, SetStateAction } from "react"
interface ProductTableProps{
    currentItems: Product[]
    setPopUpShowing:Dispatch<SetStateAction<boolean>>
    setId:Dispatch<SetStateAction<string>>

}

const ProductTable:React.FC<ProductTableProps> = ({currentItems,setPopUpShowing,setId})=>{
  const router = useRouter()
    return(
        <table className="table-auto lg:table  hidden h-fit rounded-t-lg bg-lightGray rounded-lg  w-full ">
              <thead className=" h-[100px] rounded-lg ">
                <tr className="text-[21px] text-white h-[100px]  ">
                  <td className="rounded-tl-lg bg-forestGreen"></td>
                  <td className=" bg-forestGreen">Name</td>
                  <td className="bg-forestGreen">Price</td>
                  <td className=" bg-forestGreen">Number In Stock</td>
                  <td className=" bg-forestGreen"></td>
                  <td className="rounded-tr-lg bg-forestGreen"></td>
                </tr>
              </thead>
              <tbody>
              {currentItems.map((product: Product, index) => (
              <tr key={index} className="h-[150px]">
                <td className=''><img onClick={() => router.push(`/details?id=${product._id}`)} className="w-[100px] m-auto rounded-md aspect-square" src={product.imageConfig[0].url} alt="" /></td>
               <td><div><p className="font-bold text-[18px]">{product.name}</p><p className="text-[12px]">{product.description}</p></div></td>
               <td className="font-semibold">{`$${product.price}`}</td>
               <td>{product.numberInStock}</td>
               <td ><img    onClick={() => {
              setPopUpShowing(true);
              setId(product._id);
            }} className="w-[30px] h-[30px]" src="../assets/trash.svg" alt="" /></td>
            <td><img onClick={()=>{router.push(`/sell?productId=${product._id}`)}} className="w-[30px] h-[30px]" src="../assets/edit.svg" alt="" /></td>
               </tr>
               
              ))}
              </tbody>

            </table>


    )
}

export default ProductTable