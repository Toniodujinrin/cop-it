import "../styles/globals.css";
import type { AppProps } from "next/app";
import SignUpContextProvider from "../Contexts/SignUpContext";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <SignUpContextProvider>
      <Component {...pageProps} />
    </SignUpContextProvider>
  );
}
