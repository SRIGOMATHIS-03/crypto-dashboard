# 🚀 Crypto Dashboard

A responsive cryptocurrency dashboard built with **Next.js** and **Tailwind CSS**, fetching live market data from the **CoinGecko API**. Built as part of the **Frontend Engineer Intern Task - MacV AI**.

## 🔧 Features
- 📈 **Live Market Prices**: View top coins with current price, market cap, and 24h change.
- 🔍 **Coin Detail Page**: Click any coin to see:
  - Coin description
  - Price chart
  - Real-time market data
- ⭐ **Watchlist (Optional)**: Store your favorite coins using `localStorage`.
- 🧩 **Reusable Components**: Like `CryptoTable.js` for dynamic coin listings.

## 🛠️ Tech Stack
- **Next.js**
- **Tailwind CSS**
- **CoinGecko API**
- **JavaScript (ES6+)**

## 📁 Folder Structure

<pre>
components/
  └── CryptoTable.js

pages/
  ├── index.js         # Homepage with crypto listings
  ├── coin/[id].js     # Dynamic coin detail page
  └── _app.js          # App layout and global styles
</pre>


Clone and run it locally:

```bash
git clone https://github.com/SRIGOMATHIS-03/crypto-dashboard.git
cd crypto-dashboard
npm install
npm run dev
