import "../styles/globals.css";
import type { AppProps } from "next/app";
import SignUpContextProvider from "../Contexts/SignUpContext";
import ProductContextProvider from "../Contexts/ProductsContexts";
import UserContextProvider from "../Contexts/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <ProductContextProvider>
        <SignUpContextProvider>
          <ToastContainer />
          <Component {...pageProps} />
        </SignUpContextProvider>
      </ProductContextProvider>
    </UserContextProvider>
  );
}
