import { createContext, useState, useEffect } from "react";
import getAllProducts from "./../DummyData/index";
import { useCookies } from "react-cookie";
import { post } from "../api/config";

export const ProductsContext = createContext();
const ProductsContextProvider = ({ children }) => {
  const [cookies, setCookies] = useCookies();
  const [products, setProducts] = useState([]);
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
      console.log(res);
      for (let i = 0; i <= payload.files.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(payload.files[i]);
        reader.onloadend = async () => {
          const _payload = {
            image: reader.result,
            productId: res.data.data.productId,
          };
          try {
            const result = await post(
              "images/uploadProductImage",
              {},
              _payload
            );
            console.log(result);
          } catch (error) {
            console.log(error);
          }
        };
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const data = getAllProducts();
    setProducts(data);
  }, []);
  const deleteProduct = (_id) => {
    const _products = [...products];

    setProducts(_products.filter((product) => product._id !== _id));
  };

  return (
    <ProductsContext.Provider value={{ products, deleteProduct, postProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
