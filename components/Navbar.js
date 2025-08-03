// components/Navbar.js
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="p-4 bg-black text-white flex justify-between">
      <h1 className="font-bold text-xl">CryptoTracker</h1>
      <div className="space-x-4">
        <Link href="/">Home</Link>
        <Link href="/watchlist">Watchlist</Link>
        <Link href="/about">About</Link>
      </div>
    </nav>
  )
}
