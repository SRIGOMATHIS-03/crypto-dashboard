import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useWatchlist } from '@/context/WatchlistContext'

export default function CoinDetails() {
  const router = useRouter()
  const { id } = router.query

  const [coin, setCoin] = useState(null)
  const [loading, setLoading] = useState(true)
  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist()

  useEffect(() => {
    if (!id) return

    const fetchCoin = async () => {
      setLoading(true)
      try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
        const data = await res.json()
        setCoin(data)
      } catch (error) {
        console.error('Failed to fetch coin data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCoin()
  }, [id])

  const isInWatchlist = coin && watchlist.includes(coin.id)

  if (loading) return <p className="p-4 text-gray-600">Loading...</p>
  if (!coin) return <p className="p-4 text-red-600">Coin not found.</p>

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-4">
        <img src={coin.image.large} alt={coin.name} className="w-16 h-16" />
        <div>
          <h1 className="text-3xl font-bold">{coin.name}</h1>
          <p className="text-gray-500 text-lg uppercase">{coin.symbol}</p>
        </div>
      </div>

      <p
        className="text-gray-800 leading-relaxed mb-6"
        dangerouslySetInnerHTML={{
          __html: coin.description.en
            ? coin.description.en.split('. ')[0] + '.'
            : 'No description available.',
        }}
      ></p>

      <button
        onClick={() =>
          isInWatchlist
            ? removeFromWatchlist(coin.id)
            : addToWatchlist(coin.id)
        }
        className={`px-5 py-2 rounded text-white ${
          isInWatchlist ? 'bg-red-500' : 'bg-blue-600'
        }`}
      >
        {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
      </button>
    </div>
  )
}
