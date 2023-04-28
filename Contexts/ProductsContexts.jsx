import { createContext, useState, useEffect } from "react";
import getAllProducts from "./../DummyData/index";

export const ProductsContext = createContext();
const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const data = getAllProducts();
    setProducts(data);
  }, []);
  const deleteProduct = (_id) => {
    const _products = [...products];

    setProducts(_products.filter((product) => product._id !== _id));
  };

  return (
    <ProductsContext.Provider value={{ products, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
