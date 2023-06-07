import "../styles/globals.css";
// import type { AppProps } from "next/app";
import SignUpContextProvider from "../Contexts/SignUpContext";
import ProductContextProvider from "../Contexts/ProductsContexts";
import UserContextProvider from "../Contexts/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";
import BasketContextProvider from "../Contexts/BasketContext";
import NavContextProvider from "../Contexts/NavBarContext";
import ProfileContextProvider from "../Contexts/ProfileContext";
import { SessionProvider } from "next-auth/react";
import CheckoutContextProvider from '../Contexts/CheckoutContext'
import ReviewContextProvider from '../Contexts/ReviewContext'
export default function App({ Component, pageProps,session }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session ={session}>
      <UserContextProvider>
        <ProductContextProvider>
          
          <ProfileContextProvider>
            <ReviewContextProvider>
            <SignUpContextProvider>
          
              <BasketContextProvider>
                <CheckoutContextProvider>
                <NavContextProvider>
                  <ToastContainer />
                  <Component {...pageProps} />
                </NavContextProvider>
                </CheckoutContextProvider>
              </BasketContextProvider>
             
            </SignUpContextProvider>
          </ReviewContextProvider>
          </ProfileContextProvider>
          
        </ProductContextProvider>
      </UserContextProvider> 
      </SessionProvider>
    </QueryClientProvider>
  );
}
