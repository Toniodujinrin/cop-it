import "../styles/globals.css";
import type { AppProps } from "next/app";
import SignUpContextProvider from "../Contexts/SignUpContext";
import ProductContextProvider from "../Contexts/ProductsContexts";
import UserContextProvider from "../Contexts/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";
import BasketContextProvider from "../Contexts/BasketContext";
export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <ProductContextProvider>
          <SignUpContextProvider>
            <BasketContextProvider>
              <ToastContainer />
              <Component {...pageProps} />
            </BasketContextProvider>
          </SignUpContextProvider>
        </ProductContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
}
