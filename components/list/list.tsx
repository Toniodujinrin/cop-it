import FilterPanel from "./filterPanel"
import { useContext, useEffect, useState } from "react"
import { ProductsContext } from "../../Contexts/ProductsContexts"
import { Product } from "../../types"
import ProductBox from "../productBox"
import { useRouter } from "next/router"
import QuickView from "./quickView"


const ListComp = () =>{
    const {searchedProducts}= useContext(ProductsContext)
    const [quickViewProductId, setQuickViewProductId]= useState('')
    const [quickViewProduct, setQuickViewProduct]= useState()

   
    useEffect(()=>{
      const _product =searchedProducts.find((product:Product) => product._id == quickViewProductId)
      
      setQuickViewProduct(_product)
    },[quickViewProductId])
    return(
        <div className="flex flex-col items-center p-4">
        
        <QuickView setQuickViewProductId={setQuickViewProductId} product={quickViewProduct}/>
        
        <FilterPanel/>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 w-full mt-4 justify-items-center ">
            {
              searchedProducts.map(
                (item: Product) => <ProductBox numberInStock={item.numberInStock} showQuickViewIcon={true} setQuickViewProduct={setQuickViewProductId} name={item.name} imgUrl={item.imageConfig[0].url} rating={item.rating} price={item.price} productId={item._id} href=''/>
              )
            }
          
        </div> 
        </div>
    )
}

export default ListComp