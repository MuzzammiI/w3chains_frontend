import { useState, useEffect } from 'react';

const trendingTopicsData = [
  {
    name: 'DeepSeek',
    backgroundImage: 'https://img.freepik.com/free-vector/wireframe-3d-wave-mountain-map_107791-30994.jpg?ga=GA1.1.1272655499.1724846198&semt=ais_hybrid',
  },
  {
    name: 'ChatGPT',
    backgroundImage: 'https://img.freepik.com/free-vector/abstract-network-communications-background-with-low-poly-design_1048-14204.jpg?ga=GA1.1.1272655499.1724846198&semt=ais_hybrid',
  },
  {
    name: 'Claude',
    backgroundImage: 'https://img.freepik.com/premium-vector/durga-puja-dhunuchi-naach-durga-puja-celebration_562076-1501.jpg?ga=GA1.1.1272655499.1724846198&semt=ais_hybrid',
  },
  {
    name: 'AI Video Generator',
    backgroundImage: 'https://img.freepik.com/premium-photo/hand-touching-abstract-network-circle-digital-design_20693-482.jpg?ga=GA1.1.1272655499.1724846198&semt=ais_hybrid',
  },
  {
    name: 'Ethereum',
    backgroundImage: 'https://img.freepik.com/premium-photo/3d-render-cryptocurrency-ethereum-eth-coins-with-technology-network-neon-laser-light-cryptocurrency-digital-currency-concept-new-virtual-money-exchange-blockchain_106651-3255.jpg?ga=GA1.1.1272655499.1724846198&semt=ais_hybrid',
  },
  {
    name: 'NFT',
    backgroundImage: 'https://img.freepik.com/free-vector/nft-nonfungible-tokens-concept-dark-blue-background_1419-2249.jpg?ga=GA1.1.1272655499.1724846198&semt=ais_hybrid',
  },
];


const TrendingTopics = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate data fetch with a delay
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setTopics(trendingTopicsData);
      } catch (error) {
        console.error('Error fetching trending topics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Trending Topics</h2>

        {/* Topics Container */}
        <div className="flex flex-col md:flex-row gap-3">
          {loading ? (
            // Loading Skeleton
            [...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg px-4 py-3 w-full sm:w-64 h-12 animate-pulse"
              >
                <div className="w-3/4 h-4 bg-gray-700 rounded blur-sm"></div>
              </div>
            ))
          ) : topics.length > 0 ? (
            // Actual Data
            topics.map((topic, index) => (
              <a
                key={index}
                href="#"
                className="relative rounded-lg px-4 py-3 text-sm sm:text-base w-full sm:w-64 h-12 flex items-center overflow-hidden"
              >
                {/* Pseudo-element for blurred background */}
                <div
                  className="absolute inset-0 bg-cover bg-center filter blur-xs"
                  style={{
                    backgroundImage: `url(${topic.backgroundImage})`,
                  }}
                ></div>
                {/* Semi-transparent overlay */}
                <div className="absolute inset-0 bg-opacity-70 rounded-lg"></div>
                {/* Topic Name */}
                <span className="relative font-bold   text-white">{topic.name}</span>
              </a>
            ))
          ) : (
            <p className="text-gray-400">No trending topics available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrendingTopics;