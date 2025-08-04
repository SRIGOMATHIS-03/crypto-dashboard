// pages/_app.js
import "@/styles/globals.css";
import { WatchlistContextProvider } from "@/context/WatchlistContext";

export default function App({ Component, pageProps }) {
  return (
    <WatchlistContextProvider>
      <Component {...pageProps} />
    </WatchlistContextProvider>
  );
}
