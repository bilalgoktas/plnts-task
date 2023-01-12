import "../styles/globals.css";
import type { AppProps } from "next/app";
import AppContextProvider from "../context/AppContext";
import Header from "../components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <Header />
      <Component {...pageProps} />
    </AppContextProvider>
  );
}

export default MyApp;
