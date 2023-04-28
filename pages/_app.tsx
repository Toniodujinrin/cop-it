import "../styles/globals.css";
import type { AppProps } from "next/app";
import SignUpContextProvider from "../Contexts/SignUpContext";
import ProductContextProvider from "../Contexts/ProductsContexts";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProductContextProvider>
      <SignUpContextProvider>
        <Component {...pageProps} />
      </SignUpContextProvider>
    </ProductContextProvider>
  );
}
