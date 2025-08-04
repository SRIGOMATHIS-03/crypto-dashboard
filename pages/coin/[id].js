import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

export default function CoinDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!id) return;

    const fetchCoin = async () => {
      try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
        const data = await res.json();
        setCoin(data);
      } catch (err) {
        console.error('Failed to fetch coin:', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchChart = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`
        );
        const data = await res.json();

        const formatted = data.prices.map((price) => ({
          time: new Date(price[0]).toLocaleDateString('en-IN', {
            weekday: 'short',
            day: 'numeric',
          }),
          value: price[1],
        }));

        setChartData(formatted);
      } catch (err) {
        console.error('Failed to fetch chart:', err);
      }
    };

    fetchCoin();
    fetchChart();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!coin) return <p className="p-6">Coin not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-4">
        <img src={coin.image.large} alt={coin.name} className="w-12 h-12" />
        <div>
          <h1 className="text-3xl font-bold">{coin.name}</h1>
          <p className="uppercase text-gray-500">{coin.symbol}</p>
        </div>
      </div>

      <p className="text-lg font-semibold mb-4">
        Price: ${coin.market_data.current_price.usd.toLocaleString()}
      </p>

      {/* Line Chart */}
      <div className="bg-white rounded-xl p-4 shadow mb-6">
        <h2 className="text-xl font-bold mb-2">7-Day Price Chart (USD)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="prose max-w-none">
        <h2 className="text-xl font-bold mb-2">Description</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: coin.description.en || 'No description available.',
          }}
        />
      </div>
    </div>
  );
}
