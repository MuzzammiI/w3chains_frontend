import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChevronDown, Minus, Plus } from 'lucide-react';
import PropTypes from 'prop-types';
import ConfirmationModal from './ConfirmationModal';
import ChildNftCard from './ChildNftCard'; // For related NFTs
import ButtonCard from '../../../ButtonCard';

import nftData from '../data/nftData.json';
import priceHistoryData from '../data/priceHistory.json';

const exchanges = priceHistoryData.exchanges;
const nftItems = priceHistoryData.nftItems;

// Helper to extract numeric price from string like "5.20 ETH"
const parsePrice = (priceString) => {
  const match = priceString ? priceString.match(/(\d+\.?\d*)/) : null;
  return match ? parseFloat(match[1]) : 0;
};

// Generates detailed price history for each NFT on each exchange
const generatePriceHistory = () => {
  const history = {};
  const now = new Date();
  nftItems.forEach(nftName => {
    history[nftName] = {};
    exchanges.forEach(exchange => {
      history[nftName][exchange.id] = [];
      let price = Math.random() * 10 + 2; // Starting price
      // Ensure the starting price is somewhat relevant to actual NFT data
      const correspondingNft = nftData.find(nft => nft.name === nftName);
      if (correspondingNft) {
        price = parsePrice(correspondingNft.floorPrice) || price;
      }

      for (let i = 90; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(now.getDate() - i);
        price += (Math.random() - 0.5) * (price * 0.1); // Fluctuate price by up to 10%
        price = Math.max(0.1, price); // Ensure price doesn't go below 0.1
        history[nftName][exchange.id].push({
          date: date.toISOString().split('T')[0],
          price: parseFloat(price.toFixed(2)),
        });
      }
    });
  });
  return history;
};

const priceData = generatePriceHistory();


const NFTPriceComparator = ({ onNftClick, onCollectionClick, initialSelectedNftName }) => {
  const [selectedNft, setSelectedNft] = useState(initialSelectedNftName || nftItems[0]);
  const [timeRange, setTimeRange] = useState(30); // 30 days
  const [activeExchanges, setActiveExchanges] = useState(() => {
    const initialState = {};
    exchanges.forEach(ex => initialState[ex.id] = true);
    return initialState;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});

  useEffect(() => {
    if (initialSelectedNftName && initialSelectedNftName !== selectedNft) {
      setSelectedNft(initialSelectedNftName);
    }
  }, [initialSelectedNftName, selectedNft]); // Added selectedNft to dependency array

  const filteredData = useMemo(() => {
    if (!selectedNft) return [];

    const nftPriceHistory = priceData[selectedNft];
    let masterData = [];

    const now = new Date();
    const pastDate = new Date();
    if (timeRange !== 'all') {
      pastDate.setDate(now.getDate() - timeRange);
    }

    const dateSet = new Set();
    Object.values(nftPriceHistory).forEach(history => {
      history.forEach(record => {
        const recordDate = new Date(record.date);
        if (timeRange === 'all' || recordDate >= pastDate) {
          dateSet.add(record.date);
        }
      });
    });

    const sortedDates = Array.from(dateSet).sort((a, b) => new Date(a) - new Date(b));

    return sortedDates.map(date => {
      const entry = { date };
      exchanges.forEach(exchange => {
        if (activeExchanges[exchange.id]) {
          const priceRecord = nftPriceHistory[exchange.id].find(r => r.date === date);
          entry[exchange.id] = priceRecord ? priceRecord.price : null;
        }
      });
      return entry;
    });
  }, [selectedNft, timeRange, activeExchanges]);

  const summaryStats = useMemo(() => {
    const allPrices = [];
    filteredData.forEach(day => {
      Object.keys(day).forEach(key => {
        if (key !== 'date' && day[key] !== null) {
          allPrices.push(day[key]);
        }
      });
    });
    if (allPrices.length === 0) return { avg: 'N/A', high: 'N/A', low: 'N/A' };

    const sum = allPrices.reduce((a, b) => a + b, 0);
    return {
      avg: (sum / allPrices.length).toFixed(2),
      high: Math.max(...allPrices).toFixed(2),
      low: Math.min(...allPrices).toFixed(2),
    };
  }, [filteredData]);

  const toggleExchange = (exchangeId) => {
    setActiveExchanges(prev => ({ ...prev, [exchangeId]: !prev[exchangeId] }));
  };

  const handleBuySellClick = (actionType, exchangeId) => {
    const exchange = exchanges.find(ex => ex.id === exchangeId);
    if (!exchange) return;

    // Find the actual NFT object from nftData to get its floor price
    const currentNftObject = nftData.find(nft => nft.name === selectedNft);
    const nftBasePrice = currentNftObject ? parsePrice(currentNftObject.floorPrice) : 0;
    const estimatedFee = (nftBasePrice * exchange.fee).toFixed(2);

    setModalContent({
      title: `${actionType} NFT on ${exchange.name}`,
      message: `You are about to ${actionType.toLowerCase()} "${selectedNft}" on ${exchange.name}. Estimated transaction fee: ${estimatedFee} ETH (${(exchange.fee * 100).toFixed(2)}%). Do you want to proceed?`,
      onConfirm: () => {
        console.log(`${actionType} action confirmed for ${selectedNft} on ${exchange.name}. Fee: ${estimatedFee} ETH`);
        setIsModalOpen(false);
        // In a real application, you would integrate with a wallet here
        // Example: initiateBlockchainTransaction(selectedNft, actionType, exchangeId, nftBasePrice);
      }
    });
    setIsModalOpen(true);
  };

  // Filter related NFTs (excluding main type and the current selected one for comparison)
  const relatedNfts = useMemo(() => {
    return nftData.filter(nft =>
      nft.type === 'child' && nft.name !== selectedNft && nftItems.includes(nft.name)
    ).slice(0, 3); // Get up to 3 related NFTs
  }, [selectedNft]);


  // Prepare data for the transaction fees table, sorted by fee
  const transactionFeeExchanges = useMemo(() => {
    return [...exchanges].sort((a, b) => a.fee - b.fee).map(exchange => {
      const currentNftObject = nftData.find(nft => nft.name === selectedNft);
      const nftBasePrice = currentNftObject ? parsePrice(currentNftObject.floorPrice) : 0;
      const estimatedFee = (nftBasePrice * exchange.fee).toFixed(2);
      return { ...exchange, estimatedFee };
    });
  }, [selectedNft]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-purple-900 text-white font-sans p-4 sm:p-6 lg:p-8">
      {/* <style global>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.3s ease-out forwards; }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
      `}</style> */}

      <div className="max-w-7xl mx-auto animate-fade-in">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-start">NFT Price Comparison</h1>
          <p className="text-gray-400 mt-2 text-start">Compare price history for specific NFTs across major exchanges.</p>
        </header>

        {/* --- Filter Controls --- */}
        <div className="bg-purple-500 p-4 rounded-xl mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="w-full md:w-auto relative flex-grow">
            <select
              value={selectedNft}
              onChange={(e) => setSelectedNft(e.target.value)}
              className="w-full bg-purple-900 cursor-pointer text-white border border-gray-600 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-600 appearance-none"
            >
              {nftItems.map(name => <option key={name} value={name}>{name}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
          </div>
          <div className="flex gap-2 bg-purple-900 p-1 rounded-lg">
            {[{ label: '24H', value: 1 }, { label: '7D', value: 7 }, { label: '30D', value: 30 }, { label: 'All Time', value: 'all' }].map(range => (
              <button
                key={range.value}
                onClick={() => setTimeRange(range.value)}
                className={`px-3 py-1 rounded-md cursor-pointer text-sm font-semibold transition-colors ${timeRange === range.value ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-purple-600'}`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* --- Main Chart and Info --- */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 bg-purple-900 p-6 rounded-xl animate-fade-in-up">
            <h2 className="text-xl font-bold mb-4">Price History (ETH)</h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={filteredData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" />
                <XAxis dataKey="date" stroke="#888" fontSize={12} tick={{ fill: '#ffffff' }} />
                <YAxis stroke="#888" fontSize={12} tick={{ fill: '#ffffff' }} />
                <Tooltip contentStyle={{ backgroundColor: 'purple', border: '1px', borderRadius: '0.5rem' }} />
                <Legend />
                {exchanges.map(exchange => (
                  activeExchanges[exchange.id] && <Line key={exchange.id} type="monotone" dataKey={exchange.id} name={exchange.name} stroke={exchange.color} strokeWidth={2} dot={false} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="lg:col-span-1 bg-purple-900 p-6 rounded-xl flex flex-col animate-fade-in-up">
            <h2 className="text-xl font-bold mb-4">Marketplaces</h2>
            <div className="space-y-3 flex-grow">
              {exchanges.map(exchange => (
                <label key={exchange.id} className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" checked={activeExchanges[exchange.id]} onChange={() => toggleExchange(exchange.id)} className="h-5 w-5 rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-600" />
                  <span className="w-4 h-4 rounded-full" style={{ backgroundColor: exchange.color }}></span>
                  <span className="text-white">{exchange.name} ({`${(exchange.fee * 100).toFixed(1)}% fee`})</span>
                </label>
              ))}
            </div>
            <div className="mt-6 border-t border-gray-700 pt-4">
              <h3 className="text-lg font-bold mb-3">Summary ({timeRange === 'all' ? 'All Time' : `${timeRange}D`})</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-400">Avg. Price:</span> <span className="font-bold text-white">{summaryStats.avg} ETH</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Highest Price:</span> <span className="font-bold text-green-400">{summaryStats.high} ETH</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Lowest Price:</span> <span className="font-bold text-red-400">{summaryStats.low} ETH</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Transaction Fees Table (New Section) --- */}
        <section className="mt-12  p-6 rounded-xl animate-fade-in-up">
          <h2 className="text-3xl font-bold text-white mb-6">Transaction Fees for {selectedNft}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-purple-900">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Exchange
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Base Fee
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Estimated Fee ({nftData.find(nft => nft.name === selectedNft)?.floorPrice || 'N/A'})
                  </th>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="  divide-y divide-gray-700">
                {transactionFeeExchanges.map(exchange => (
                  <tr key={exchange.id} className=" transition-colors duration-200">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-white">
                      <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: exchange.color }}></span>
                        {exchange.name}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-200">
                      {(exchange.fee * 100).toFixed(1)}%
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-200">
                      {exchange.estimatedFee} ETH
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm">
                      <div className="flex justify-center  space-x-2">
                        


                        <ButtonCard
                        onClick={()=>handleBuySellClick('Buy',exchange.id)}
                        background='bg-purple-900'
                        icon={Plus}

                        size='small'
                        animationType='glow'
                        >
                        Buy

                        </ButtonCard>
                        <ButtonCard
                        onClick={()=>handleBuySellClick('Sell',exchange.id)}
                        background='bg-purple-900'
                        icon={Minus}
                        size='small'
                        animationType='glow'
                        >
                        Sell

                        </ButtonCard>

                        




                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>


        {/* Related NFTs Section */}
        {relatedNfts.length > 0 && (
          <section className="mt-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-white mb-6">Related NFTs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedNfts.map(nft => (
                <ChildNftCard
                  key={nft.id}
                  nft={nft}
                  onClick={onNftClick}
                  onCollectionClick={onCollectionClick}
                />
              ))}
            </div>
          </section>
        )}
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalContent.title || ''}
        message={modalContent.message || ''}
        onConfirm={modalContent.onConfirm || (() => { })}
      />
    </div>
  );
};

NFTPriceComparator.propTypes = {
  onNftClick: PropTypes.func.isRequired,
  onCollectionClick: PropTypes.func.isRequired,
  initialSelectedNftName: PropTypes.string,
};


export default NFTPriceComparator;