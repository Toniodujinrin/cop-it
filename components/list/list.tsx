import FilterPanel from "./filterPanel"
import { useContext, useEffect, useState } from "react"
import { ProductsContext } from "../../Contexts/ProductsContexts"
import { Product } from "../../types"
import ProductBox from "../productBox"
import { useRouter } from "next/router"
import QuickView from "./quickView"
import { motion } from "framer-motion"

const ListComp = () =>{
    const [filter,setFilter]= useState('low')
    const {searchedProducts}= useContext(ProductsContext)
    const [filteredProducts,setFilteredProducts]= useState<any[]>([])
    const [quickViewProductId, setQuickViewProductId]= useState('')
    const [quickViewProduct, setQuickViewProduct]= useState()
    useEffect(()=>{
      const _filtered = [...searchedProducts]
      if(filter == 'low'){
        
        _filtered.sort((a:Product,b:Product)=> a.price-b.price)
        
      }
      else if(filter =='high'){
        _filtered.sort((a:Product,b:Product)=> b.price-a.price)
      }
      else if( filter == 'high stock'){
        _filtered.sort((a:Product,b:Product)=> b.numberInStock-a.numberInStock)
      }
      else if(filter == 'low stock'){
        _filtered.sort((a:Product,b:Product)=> a.numberInStock-b.numberInStock)
      }
      
      setFilteredProducts(_filtered)
    },[filter])
    
   
    
    
   
    useEffect(()=>{
      const _product =searchedProducts.find((product:Product) => product._id == quickViewProductId)
      
      setQuickViewProduct(_product)
    },[quickViewProductId])
    return(
        <motion.div initial={{ y:30, opacity: 0 }}
        animate={{ opacity: 1,y:0}} exit={{opacity:0, y:30 ,scale:10}}  className="flex flex-col items-center p-4">
        
        <QuickView setQuickViewProductId={setQuickViewProductId} product={quickViewProduct}/>
        
        <FilterPanel setFilter={setFilter}/>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 w-full mt-4 justify-items-center ">
            {
              filteredProducts.map(
                (item: Product, index:number) => <ProductBox key={index} numberInStock={item.numberInStock} showQuickViewIcon={true} setQuickViewProduct={setQuickViewProductId} name={item.name} imgUrl={item.imageConfig[0].url} rating={item.rating} price={item.price} productId={item._id} href=''/>
              )
            }
          
        </div> 
        </motion.div>
    )
}

export default ListComp