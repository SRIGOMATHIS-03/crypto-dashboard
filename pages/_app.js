// pages/_app.js
import Navbar from '../components/Navbar'
import '../styles/globals.css'
import { WatchlistProvider } from '../context/WatchlistContext'

export default function App({ Component, pageProps }) {
  return (
    <WatchlistProvider>
      <Navbar />
      <Component {...pageProps} />
    </WatchlistProvider>
  )
}
