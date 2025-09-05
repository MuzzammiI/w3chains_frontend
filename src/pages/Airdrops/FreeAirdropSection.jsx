import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { FaCube, FaUsers, FaWallet, FaMagic, FaFire, FaCogs } from 'react-icons/fa';

const freeAirdropData = [
  {
    title: 'Monad',
    description: '$244M investment by TOP VCs',
    hotCount: 5730,
    icon: <FaCube className="text-purple-500" />,
    hasVideo: true,
  },
  {
    title: 'Honeygain',
    description: '온라인 지구 무제한 수령',
    hotCount: 5688,
    icon: <FaCube className="text-yellow-500" />,
    hasVideo: true,
  },
  {
    title: 'Human Protocol',
    description: 'Click on daily reward button (free)',
    hotCount: 5630,
    icon: <FaUsers className="text-orange-500" />,
    hasVideo: true,
  },
  {
    title: 'Bluwhale',
    description: 'Click on daily check in (easy)',
    hotCount: 5527,
    icon: <FaWallet className="text-blue-500" />,
    hasVideo: true,
  },
  {
    title: 'Magic Newton',
    description: '4M users already',
    hotCount: 5527,
    icon: <FaMagic className="text-gray-500" />,
    hasVideo: true,
  },
  {
    title: '0G Labs',
    description: 'Backed by $325M from top VCs',
    hotCount: 4530,
    icon: <FaCogs className="text-pink-500" />,
    hasVideo: true,
  },
];

const FreeAirdropsSection = ({ searchQuery }) => {
  const [airdrops, setAirdrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAirdrops = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setAirdrops(freeAirdropData);
      } catch (error) {
        console.error('Error fetching airdrops:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAirdrops();
  }, []);

  const filteredAirdrops = airdrops.filter(
    (airdrop) =>
      airdrop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      airdrop.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Free Airdrops</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            [...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg p-4 flex items-center space-x-4 animate-pulse"
              >
                <div className="w-12 h-12 bg-gray-700 rounded-full blur-sm"></div>
                <div className="flex-1 space-y-2">
                  <div className="w-1/2 h-4 bg-gray-700 rounded blur-sm"></div>
                  <div className="w-3/4 h-4 bg-gray-700 rounded blur-sm"></div>
                  <div className="w-1/4 h-4 bg-gray-700 rounded blur-sm"></div>
                </div>
              </div>
            ))
          ) : filteredAirdrops.length > 0 ? (
            filteredAirdrops.map((airdrop, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg p-4 flex items-center space-x-4"
              >
                <div className="text-4xl">{airdrop.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{airdrop.title}</h3>
                    <div className="flex items-center text-orange-500 text-sm">
                      {airdrop.hotCount}
                      <FaFire className="ml-1" />
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">{airdrop.description}</p>
                  {airdrop.hasVideo && (
                    <span className="inline-flex items-center text-red-500 text-xs mt-1">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      Video
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 col-span-full">No airdrops found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Define PropTypes for the component
FreeAirdropsSection.propTypes = {
  searchQuery: PropTypes.string.isRequired, // searchQuery is a required string
};

export default FreeAirdropsSection;