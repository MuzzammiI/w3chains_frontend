import { useState, useEffect } from 'react';
import { FaShip, FaFire, FaAtom, FaPalette, FaCogs, FaCube } from 'react-icons/fa';

const airdropData = [
  {
    title: 'OpenSea',
    description: 'Airdrop from the leading NFT marketplace',
    hotCount: 5271,
    icon: <FaShip className="text-blue-500" />,
    hasVideo: true,
  },
  {
    title: 'Fragmetric',
    description: 'Dominant Solana restaking',
    hotCount: 5188,
    icon: <FaFire className="text-orange-500" />,
    hasVideo: true,
  },
  {
    title: 'Cytonic',
    description: 'L1 project supported by Arthur Hayes',
    hotCount: 3730,
    icon: <FaCube className="text-orange-600" />,
    hasVideo: false,
  },
  {
    title: 'Chaos Lab',
    description: 'Sign up with Google account and link Metamask wallet',
    hotCount: 3388,
    icon: <FaAtom className="text-blue-500" />,
    hasVideo: true,
  },
  {
    title: 'Sogni',
    description: 'Sign up and generate AI images',
    hotCount: 3358,
    icon: <FaPalette className="text-purple-500" />,
    hasVideo: true,
  },
  {
    title: '3DOS',
    description: 'Download Google extension and let it farm',
    hotCount: 3354,
    icon: <FaCogs className="text-blue-600" />,
    hasVideo: false,
  },
];

const NewAirdropsSection = () => {
  const [airdrops, setAirdrops] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate data fetch with a delay
  useEffect(() => {
    const fetchAirdrops = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setAirdrops(airdropData);
      } catch (error) {
        console.error('Error fetching airdrops:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAirdrops();
  }, []);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">New Airdrops</h2>

        {/* Airdrop Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            // Loading Skeleton
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
          ) : (
            // Actual Data
            airdrops.map((airdrop, index) => (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default NewAirdropsSection;