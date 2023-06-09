import ListComp from "../../components/list";
import NavBar from "../../components/navBar";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ProductsContext } from "../../Contexts/ProductsContexts";
import ProductBoxLoader from "../../components/productBox/productBoxLoader";
const List=()=>{
  const router = useRouter()
  const {searchProductsByCategory, searchedProducts, searchProductsByName, productLoading}= useContext(ProductsContext)
  const category = router.query.category
  const name = router.query.search

  useEffect(()=>{
   
    if(category){
      searchProductsByCategory(category)
    }
 
  },[category])
  useEffect(()=>{
   
    if(name){
      searchProductsByName(name)
    }
  
  },[name])

    return(
  <>
    <NavBar/>
   
   
    {
      productLoading?
      <div className="w-full grid-cols-4 grid justify-items-center">
        {
      new Array(8).fill(0).map(
        item => <ProductBoxLoader/>
      )}
      </div>
      :
      searchedProducts.length>0?
      <ListComp/>
      :
      <div className="w-full flex flex-col h-full  items-center justify-center">
        <img className="w-[200px] h-[200px]" src="../assets/magnifyingGlass.svg" alt="" />
       <p className="text-[21px] text-forestGreen "> No products fit search</p>
        
        </div>
    }
    
  </>
    );

}
export default List