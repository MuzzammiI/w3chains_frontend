import React, { useState, useEffect } from 'react';

// CryptoTicker component
const CryptoTicker = () => {
  // State to hold the cryptocurrency data fetched from the API
  const [coins, setCoins] = useState([
    // Placeholder data to prevent blank state on initial load
    // These will be replaced by actual data once fetched
    { id: "btc", symbol: "BTC", current_price: 68000.00, price_change_percentage_24h: 1.5, image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400" },
    { id: "eth", symbol: "ETH", current_price: 3500.00, price_change_percentage_24h: -0.8, image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628" },
    { id: "bnb", symbol: "BNB", current_price: 600.00, price_change_percentage_24h: 0.5, image: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970" }
  ]);

  // useEffect hook to fetch cryptocurrency data when the component mounts
  // and set up an interval for periodic updates
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        // Fetch data from CoinGecko API
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false"
        );
        const data = await response.json();
        // Update the state with the fetched data
        setCoins(data);
      } catch (error) {
        // Log any errors during the fetch operation
        console.error("Error fetching data:", error);
      }
    };

    fetchCoins(); // Initial data fetch when the component mounts

    // Set up an interval to fetch data every 30 seconds (30000 milliseconds)
    const interval = setInterval(fetchCoins, 30000);

    // Cleanup function: clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Duplicate coins multiple times to create a very long, seamless loop for the animation
  // This helps prevent visible jumps when the animation resets, especially on wider screens.
  const duplicatedCoins = Array(5).fill(coins).flat(); // Duplicate 5 times for smooth continuous scroll

  return (
    <div className="w-full mt-18 text-white overflow-hidden py-2 ">
      {/* Custom CSS for the glow effect, sliding animation, and pause on hover */}
      <style>
        {`
          @keyframes slide {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); } /* Moves half the content width to loop seamlessly */
          }
          .animate-slide {
            animation: slide 120s linear infinite; /* Increased duration for much slower slide */
          }
          /* Pause animation on hover */
          .ticker-container:hover .animate-slide {
            animation-play-state: paused;
          }
        `}
      </style>

      {/* Container for the sliding animation */}
      {/* Added 'ticker-container' class for hover effect */}
      <div className="relative h-8 ticker-container">
        <div className="absolute top-0 left-0 flex h-full animate-slide">
          {/* Map over the duplicated coins to render each crypto item */}
          {duplicatedCoins.map((coin, index) => (
            <div
              key={`${coin.id}-${index}`} // Unique key using id and index for duplication
              className="flex items-center justify-center p-3 mx-2 bg-gray-700 bg-opacity-30 rounded-lg shadow-md border border-gray-600 flex-shrink-0"
              style={{ minWidth: '180px' }} // Slightly reduced min-width for compactness
            >
              {/* Crypto Image */}
              {coin.image && (
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="w-4 h-4 mr-2 rounded-full" // Added rounded-full for circular images
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/24x24/4A5568/FFFFFF?text=?' }} // Fallback for broken images
                />
              )}

              {/* Crypto Symbol */}
              <span className="text-sm font-extrabold mr-2 text-purple-600"> {/* Reduced font size */}
                {coin.symbol.toUpperCase()}
              </span>

              {/* Crypto Price */}
              <span className="text-xs font-bold font-mono mr-3 text-gray-100"> {/* Reduced font size, added font-mono */}
                ${coin.current_price ? coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A'}
              </span>

              {/* Profit/Loss Indicator */}
              <span
                className={`text-xs font-bold flex items-center px-1.5 py-0.5 rounded-full ${ /* Reduced font size */
                  coin.price_change_percentage_24h >= 0 ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                }`}
              >
                {coin.price_change_percentage_24h >= 0 ? (
                  <svg className="w-4 h-4 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                {coin.price_change_percentage_24h ? `${Math.abs(coin.price_change_percentage_24h).toFixed(2)}%` : 'N/A'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CryptoTicker;
