import { useState, useEffect } from 'react';
import { FaWallet, FaEthereum, FaMoneyBill } from 'react-icons/fa';

const featuredData = [
  {
    title: 'Honeygain',
    description: '온라인 지구 무제한 수령',
    image: 'https://framerusercontent.com/images/9JlNHxYxWH4yfeLC6UpijjmX9Gg.png?scale-down-to=512',
    alt: 'Honeygain',
    icon: <FaWallet className="text-yellow-500" />,
  },
  {
    title: 'Bluwhale',
    description: 'Click on daily check in (easy)',
    image: 'https://framerusercontent.com/images/tEgTRNKQGomMOGUM8nl5E.png?scale-down-to=512',
    alt: 'Bluwhale',
    icon: <FaWallet className="text-blue-500" />,
  },
  {
    title: 'Ethereum',
    description: 'Deposit as much USDE as possible',
    image: 'https://framerusercontent.com/images/gELhtu2hCCwuekxpMhWNaF55lY.png?scale-down-to=512',
    alt: 'Ethereum',
    icon: <FaEthereum className="text-purple-500" />,
  },
  // Adding a new item to demonstrate the fallback icon
  {
    title: 'Baht Rewards',
    description: 'Earn rewards in Baht',
    image: 'https://i.ytimg.com/vi_webp/BxX4r9CgIUs/maxresdefault.webp',
    alt: 'Baht Rewards',
    icon: <FaMoneyBill className="text-green-500" />, // Fallback icon
  },
];

const FeaturedSection = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate data fetch with a delay
  useEffect(() => {
    const fetchFeaturedItems = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setFeaturedItems(featuredData);
      } catch (error) {
        console.error('Error fetching featured items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedItems();
  }, []);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center">
          Featured
          <span className="ml-2 text-pink-500">🎯</span>
        </h2>

        {/* Featured Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            // Loading Skeleton
            [...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg animate-pulse"
              >
                <div className="w-full h-40 bg-gray-700 rounded-t-lg blur-sm"></div>
                <div className="p-4 space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-700 rounded-full blur-sm"></div>
                    <div className="w-1/2 h-4 bg-gray-700 rounded blur-sm"></div>
                  </div>
                  <div className="w-3/4 h-4 bg-gray-700 rounded blur-sm"></div>
                </div>
              </div>
            ))
          ) : (
            // Actual Data
            featuredItems.map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{item.icon}</span>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                  </div>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;