import { useEffect, useState } from "react";
import axios from "axios";

const Market = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    console.log("Fetching market data...");
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc")
      .then((response) => {
        console.log("Data received:", response.data); // Debugging log
        setCoins(response.data);
      })
      .catch((error) => console.error("Error fetching market data:", error));
  }, []);

  return (
    <div className="p-6 font-mono text-white bg-primary">
      <h1 className="text-3xl font-bold">Crypto Market Trends</h1>
      {coins.length === 0 ? <p>Loading data...</p> : null}
      <table className="w-full mt-4 border-collapse border border-secondary">
        <thead>
          <tr className="bg-secondary text-primary">
            <th className="border border-primary p-2">Coin</th>
            <th className="border border-primary p-2">Price</th>
            <th className="border border-primary p-2">24h Change</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr key={coin.id} className="text-center border border-secondary">
              <td className="border border-primary p-2">{coin.name} ({coin.symbol.toUpperCase()})</td>
              <td className="border border-primary p-2">${coin.current_price.toFixed(2)}</td>
              <td className={`border border-primary p-2 ${coin.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Market;
