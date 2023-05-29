import { createContext, useState, useEffect } from "react";
import getAllProducts from "./../DummyData/index";
import { useCookies } from "react-cookie";
import { get, post, _delete } from "../api/config";
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
  

  const { refetch:refetchFeaured} = useQuery({
    queryKey:['featuredProducts'],
    queryFn:async()=>{
      const featuredProduct = await get('products/getFeatured',{})
      if(featuredProduct && featuredProduct.data &&featuredProduct.data.data){
        setFeaturedProducts(featuredProduct.data.data)
      }
    }
  })
  

  const { data: productData, refetch } = useQuery({
    queryKey: ["productsByUser"],
    queryFn: async () =>
      await get(
        `users/getAllProductsBeingSoldByUser?email=${cookies.token.user}`
      ),
  });

  useEffect(() => {
    if (productData && productData.data && productData.data.data) {
      setProducts(productData.data.data);
    }
  }, [productData]);

  const getProduct = async (productId) => {
    console.log(productId);
    try {
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
  };

  const postProduct = async (payload) => {
    payload.email = cookies.token.user;
    try {
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
        refetch();

        router.push("/account");
      } catch (error) {
        toast.error(error.response.data.data);
      }
    } catch (err) {
      toast.error(err.response.data.data);
    }
  };
  const refreshProducts = async () => {
    refetch();
  };

  const deleteProduct = async (_id) => {
    try {
      await _delete(`products?productId=${_id}`, {});
      refetch();
    } catch (error) {
      toast.error(error.response.data.data);
    }
  };
 
  

  return (
    <ProductsContext.Provider
      value={{
        products,
        deleteProduct,
        postProduct,
        refreshProducts,
        getProduct,
        product,
        featuredProducts
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
