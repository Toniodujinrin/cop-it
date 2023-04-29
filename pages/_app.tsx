import "../styles/globals.css";
import type { AppProps } from "next/app";
import SignUpContextProvider from "../Contexts/SignUpContext";
import ProductContextProvider from "../Contexts/ProductsContexts";
import UserContextProvider from "../Contexts/UserContext";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <ProductContextProvider>
        <SignUpContextProvider>
          <Component {...pageProps} />
        </SignUpContextProvider>
      </ProductContextProvider>
    </UserContextProvider>
  );
}
