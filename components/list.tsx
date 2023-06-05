import FilterPanel from "./filterPanel"
import { useContext } from "react"
import { ProductsContext } from "../Contexts/ProductsContexts"
import { Product } from "../types"
import ProductBox from "./productBox"
import { useRouter } from "next/router"

const ListComp = () =>{
    const {searchedProducts}= useContext(ProductsContext)
    const router = useRouter()
    const category = router.query.category
    const name = router.query.search
    return(
        <div className="flex flex-col items-center p-4">
          
        
        <FilterPanel/>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 w-full mt-4 justify-items-center ">
            {
              searchedProducts.map(
                (item: Product) => <ProductBox name={item.name} imgUrl={item.imageConfig[0].url} rating={item.rating} price={item.price} productId={item._id} href=''/>
              )
            }
          
        </div> 
        </div>
    )
}

export default ListComp