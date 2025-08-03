// pages/watchlist.js

import { useWatchlist } from '@/context/WatchlistContext'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function WatchlistPage() {
  const { watchlist } = useWatchlist()
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWatchlistCoins = async () => {
      setLoading(true)
      try {
        const promises = watchlist.map(id =>
          fetch(`https://api.coingecko.com/api/v3/coins/${id}`).then(res =>
            res.json()
          )
        )
        const results = await Promise.all(promises)
        setCoins(results)
      } catch (error) {
        console.error('Error fetching watchlist coins:', error)
      } finally {
        setLoading(false)
      }
    }

    if (watchlist.length > 0) {
      fetchWatchlistCoins()
    } else {
      setCoins([])
      setLoading(false)
    }
  }, [watchlist])

  // Show loading spinner
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-8">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-gray-600">Loading Watchlist...</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Watchlist</h1>

      {coins.length === 0 ? (
        <p className="text-gray-600">Your watchlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {coins.map((coin) => (
            <Link key={coin.id} href={`/coin/${coin.id}`}>
              <div className="p-4 border rounded hover:shadow cursor-pointer transition">
                <div className="flex items-center gap-4">
                  <img src={coin.image.small} alt={coin.name} className="w-8 h-8" />
                  <div>
                    <h2 className="font-semibold">{coin.name}</h2>
                    <p className="text-sm uppercase text-gray-500">{coin.symbol}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
