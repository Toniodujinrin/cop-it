import { createContext, useState, useEffect } from "react";
import getAllProducts from "./../DummyData/index";
import { useCookies } from "react-cookie";
import { get, post, _delete,put } from "../api/config";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "react-query";

export const ProductsContext = createContext();
const ProductsContextProvider = ({ children }) => {
  const router = useRouter();
  const [cookies, setCookies] = useCookies();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState();
  const [featuredProducts, setFeaturedProducts]= useState([])
  const [searchedProducts,setSearchedProducts]= useState([])
  const [searchLoading, setSearchLoading] = useState()
  const [productLoading, setProductLoading]= useState(false)
  const [productsProcessLoading,setProductProcessLoading]= useState(false)
  

  const { refetch:refetchFeaured} = useQuery({
    queryKey:['featuredProducts'],
    queryFn:async()=>{
      const featuredProduct = await get('products/getFeatured',{})
      if(featuredProduct && featuredProduct.data &&featuredProduct.data.data){
        setFeaturedProducts(featuredProduct.data.data)
      }
    }
  })
  

  const {refetch:refreshProducts, isLoading:productsByUserLoading, isError } = useQuery({
    queryKey: ["productsByUser"],
    queryFn: async () =>{
      if(cookies.token){
      const productData = await get(
        `users/getAllProductsBeingSoldByUser?email=${cookies.token.user}`
      )
      if (productData && productData.data && productData.data.data) {
        setProducts(productData.data.data);
      }
    }
  },
  });
  useEffect(() => {
    if(isError){
      refreshProducts()
    }
  }, [isError]);

  const getProduct = async (productId) => {
    
    try {
      setProductLoading(true)
      const product = await get(`products?productId=${productId}`);
      if (product) {
        const seller = await get(`users/getProfile?email=${product.data.data.sellerId}`, {});
        product.data.data.seller = seller.data.data
        setProduct(product.data.data);
      }
     
    } catch (error) {
      console.log(error);
      toast.error("product not found");
    }
    finally{
       setProductLoading(false)
    }
  };

  const postProduct = async (payload) => {
    payload.email = cookies.token.user;
    try {
      setProductProcessLoading(true)
      const res = await post(
        "products",
        {
          headers: { token: cookies.token._id },
        },
        payload
      );
      const _payload = {
        image: payload.file,
        productId: res.data.data.productId,
      };
      try {
        const result = await post("images/uploadProductImage", {}, _payload);
        console.log(result.data.data);
        products.push(result.data.data);
        toast.success("product uploaded successfuly ");
        

        router.push("/account");
      } catch (error) {
        toast.error('could not upload products at this time try again later');
      }
    } catch (err) {
      toast.error('could not upload products at this time try again later');
    }
    finally{
      setProductProcessLoading(false)
    }
  };
 

  const deleteProduct = async (_id) => {
    try {
      setProductProcessLoading(true)
      await _delete(`products?productId=${_id}`, {});
     
    } catch (error) {
      toast.error(error.response.data.data);
    }
    finally{
      setProductProcessLoading(false)
    }
  };

  const searchProductsByCategory = async (category)=>{
    try {
      setProductLoading(true)
      const data = await get(`products/getByCategory?category=${category}`)
      if(data){
       setSearchedProducts(data.data.data)
      }
      

    } catch (error) {
      console.log(error)
      
    }
    finally{
      setProductLoading(false)
    }

  }

  const searchProductsByName = async (name)=>{
    try {
      setProductLoading(true)
      const data = await get(`products/getByName?name=${name}`)
      if(data){
       setSearchedProducts(data.data.data)
      }
      
    } catch (error) {
      console.log(error)
      
    }
    finally{
      setProductLoading(false)

    }

  }

  const editProduct = async (payload)=>{
    try {
       
          payload.sellerId = cookies.token.user
          setProductProcessLoading(true)
          console.log(payload)
          await put('products',{headers:{token:cookies.token._id}},payload)
          router.push('/account')
          toast.success('product updted')
          
          
    } catch (error) {
      toast.error('could not edit product, try again later')
      console.log(error)
    }
    finally{
      setProductProcessLoading(false)
    }
 
  }
 
  

  return (
    <ProductsContext.Provider
      value={{
        productLoading,
        productsByUserLoading,
        products,
        deleteProduct,
        postProduct,
        refreshProducts,
        getProduct,
        product,
        searchProductsByCategory,
        searchedProducts,
        featuredProducts,
        searchProductsByName,
        productsProcessLoading, 
        editProduct
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
