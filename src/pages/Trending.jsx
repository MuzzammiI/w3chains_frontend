import { useState, useEffect } from "react";
import CrptoTicker from "./CryptoTicker";
import ScrollToTopButton from '../components/ScrollToTopButton';

const Trending = () => {
  const [coins, setCoins] = useState([]);
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);

  //Stable Coins Demo Data
  const stableCoinsData = [
    { name: "Tether (USDT)", change: "+0.02%" },
    { name: "USD Coin (USDC)", change: "+0.01%" },
    { name: "Dai (DAI)", change: "+0.03%" },
    { name: "Binance USD (BUSD)", change: "+0.01%" },
    { name: "TrueUSD (TUSD)", change: "+0.02%" },
  ];

  //Upcoming Projects
  const upcomingCoinsData = [
    { name: "ProjectX (PRX)", change: "TBA" },
    { name: "MoonCoin (MOON)", change: "TBA" },
    { name: "StarToken (STAR)", change: "TBA" },
    { name: "NovaChain (NOVA)", change: "TBA" },
    { name: "FutureCoin (FUTR)", change: "TBA" },
  ];

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    )
      .then((res) => res.json())
      .then((data) => {
        setCoins(data);
        setGainers(
          [...data]
            .sort(
              (a, b) =>
                b.price_change_percentage_24h - a.price_change_percentage_24h
            )
            .slice(0, 5)
        );
        setLosers(
          [...data]
            .sort(
              (a, b) =>
                a.price_change_percentage_24h - b.price_change_percentage_24h
            )
            .slice(0, 5)
        );
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <CrptoTicker />
      <div className="container font-mono mx-auto p-6 flex flex-col text-xs md:flex-row gap-6">
        {/* Top Gainers & Losers */}
        <div className="md:w-2/3 bg-gray-900 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-yellow-400 mb-4">
            Trending Coins
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            {/* Gainers */}
            <div>
              <h3 className="text-green-400 font-semibold">Top Gainers</h3>
              {gainers.map((coin) => (
                <div
                  key={coin.id}
                  className="flex justify-between p-2 bg-gray-800 rounded-lg my-1"
                >
                  <span>{coin.name}</span>
                  <span className="text-green-400">
                    +{coin.price_change_percentage_24h.toFixed(2)}%
                  </span>
                </div>
              ))}
            </div>
            {/* Losers */}
            <div>
              <h3 className="text-red-400 font-semibold">Top Losers</h3>
              {losers.map((coin) => (
                <div
                  key={coin.id}
                  className="flex justify-between p-2 bg-gray-800 rounded-lg my-1"
                >
                  <span>{coin.name}</span>
                  <span className="text-red-400">
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </span>
                </div>
              ))}
            </div>
            {/* Stable Coins */}
            <div className="bg-gray-800 w-full text-white p-4 rounded-lg">
              {/* Title */}
              <h2 className="text-green-400 text-lg font-semibold mb-4">
                Stable Coins
              </h2>

              {/* List of Stable Coins */}
              <ul>
                {stableCoinsData.map((coin, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0"
                  >
                    <span className="text-gray-300">{coin.name}</span>
                    <span className="text-green-400">{coin.change}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Upcoming Projects */}
            <div className="bg-gray-800 text-white p-4 rounded-lg w-full">
              {/* Title */}
              <h2 className="text-green-400 text-lg font-semibold mb-4">
                Upcoming Coins
              </h2>

              {/* List of Upcoming Coins */}
              <ul>
                {upcomingCoinsData.map((coin, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0"
                  >
                    <span className="text-gray-300">{coin.name}</span>
                    <span className="text-green-400">{coin.change}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Real-Time Coin Tracking */}
        <div className="md:w-1/3 bg-gray-900 p-6 rounded-xl shadow-lg h-[500px] overflow-y-auto">
          <h2 className="text-xl font-bold text-yellow-400 mb-4">
            Real-Time Coin Prices
          </h2>
          {coins.map((coin) => (
            <div
              key={coin.id}
              className="flex justify-between p-2 bg-gray-800 rounded-lg my-1"
            >
              <div className="flex items-center gap-2">
                <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                <span>{coin.name}</span>
              </div>
              <span className="text-white">
                ${coin.current_price.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
          <ScrollToTopButton />
      
    </>
  );
};

export default Trending;
