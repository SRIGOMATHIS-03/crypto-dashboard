import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useWatchlist } from '../../context/WatchlistContext'

export default function CoinDetail() {
  const router = useRouter()
  const { id } = router.query

  const context = useWatchlist()

  if (!context) {
    // This prevents build-time crash
    return null
  }

  const { watchlist, addToWatchlist, removeFromWatchlist } = context

  const [coinData, setCoinData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    const fetchCoin = async () => {
      setLoading(true)
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
      const data = await res.json()
      setCoinData(data)
      setLoading(false)
    }
    fetchCoin()
  }, [id])

  if (loading) return <p>Loading...</p>
  if (!coinData) return <p>Coin not found</p>

  const isInWatchlist = watchlist.includes(id)

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{coinData.name}</h1>
      <p>Symbol: {coinData.symbol.toUpperCase()}</p>
      <p>Current Price: ${coinData.market_data.current_price.usd}</p>

      <button
        className="mt-4 px-4 py-2 rounded bg-blue-500 text-white"
        onClick={() =>
          isInWatchlist ? removeFromWatchlist(id) : addToWatchlist(id)
        }
      >
        {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
      </button>
    </div>
  )
}
