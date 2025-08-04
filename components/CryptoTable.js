import React from 'react';
import Link from 'next/link';

const CryptoTable = ({ coins }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left bg-white border border-gray-200">
        <thead className="bg-gray-100 text-gray-700 uppercase">
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Coin</th>
            <th className="px-4 py-2 text-right">Price</th>
            <th className="px-4 py-2 text-right">24h %</th>
            <th className="px-4 py-2 text-right">Market Cap</th>
            <th className="px-4 py-2 text-right">24h Volume</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr key={coin.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{coin.market_cap_rank}</td>
              <td className="px-4 py-2">
                <Link href={`/coin/${coin.id}`} className="flex items-center gap-2 hover:underline">
                  <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                  <span>{coin.name} ({coin.symbol.toUpperCase()})</span>
                </Link>
              </td>
              <td className="px-4 py-2 text-right">${coin.current_price.toLocaleString()}</td>
              <td
                className={`px-4 py-2 text-right ${
                  coin.price_change_percentage_24h >= 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </td>
              <td className="px-4 py-2 text-right">${coin.market_cap.toLocaleString()}</td>
              <td className="px-4 py-2 text-right">${coin.total_volume.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
