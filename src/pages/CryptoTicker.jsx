import { useRef } from 'react';

// Sample cryptocurrency data
const cryptoData = [
  { symbol: 'BTC', price: '$88,400.00', change: '0.13%' },
  { symbol: 'ETH', price: '$2,094.73', change: '0.40%' },
  { symbol: 'LTC', price: '$94.77', change: '0.46%' },
  { symbol: 'ADA', price: '$0.74', change: '0.49%' },
  { symbol: 'BNB', price: '$637.03', change: '0.18%' },
  { symbol: 'DOGE', price: '$0.19', change: '1.61%' },
  { symbol: 'LINK', price: '$15.19', change: '0.60%' },
  { symbol: 'SOL', price: '$142.38', change: '0.38%' },
];

const CryptoTicker = () => {
  const tickerRef = useRef(null);

  // Duplicate the data to create a seamless loop
  const duplicatedData = [...cryptoData, ...cryptoData];

  return (
    <div className="bg-gray-900 text-xs font-mono text-white py-2 overflow-hidden">
      <div
        ref={tickerRef}
        className="flex animate-marquee whitespace-nowrap"
      >
        {duplicatedData.map((crypto, index) => (
          <div
            key={`${crypto.symbol}-${index}`}
            className="flex items-center mx-4"
          >
            <span className="font-semibold">{crypto.symbol}</span>
            <span className="mx-2">{crypto.price}</span>
            <span
              className={`${
                crypto.change.startsWith('-') ? 'text-red-500' : 'text-green-500'
              }`}
            >
              {crypto.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoTicker;