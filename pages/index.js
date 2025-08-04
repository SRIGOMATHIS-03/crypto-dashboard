import { useEffect, useState } from 'react';
import CryptoTable from '../components/CryptoTable';

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'
        );
        const data = await res.json();
        setCoins(data);
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Top 50 Cryptocurrencies</h1>
      
      <input
        type="text"
        placeholder="Search the coin..."
        className="mb-4 px-4 py-2 w-full max-w-md border rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? <p>Loading...</p> : <CryptoTable coins={filteredCoins} />}
    </div>
  );
}
