






import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaTwitter, FaFacebook, FaLinkedin, FaShareAlt } from 'react-icons/fa';

const newsData = [
  {
  image: 'https://crypto.news/app/uploads/2024/08/crypto-news-A-bull-a-bear-fight-option05-1380x820.webp',
    tag: 'MARKETS',
    title: 'Economist warns of a recession: Will Bitcoin and altcoins crash or rise?',
    timestamp: '3 hours ago',
    coins: ['BTC', 'PEPE', 'SHIB'],
    shareLinks: {
      twitter: '#',
      facebook: '#',
      linkedin: '#',
    },
  },
  {
    image: 'https://crypto.news/app/uploads/2025/01/crypto-news-Hyperliquid-option03-1380x820.webp',
    tag: 'NEWS',
    title: 'Hyperliquid removes JELLY amid market manipulation accusations, promises refunds',
    timestamp: '4 hours ago',
    coins: ['HYPE'],
    shareLinks: {
      twitter: '#',
      facebook: '#',
      linkedin: '#',
    },
  },
  {
    image: 'https://crypto.news/app/uploads/2024/11/crypto-news-Composability-is-the-only-way-DeFi-will-survive-and-thrive-option02-1380x820.webp',

    tag: 'NEWS',
    title: 'Telos taps Stargate, Circle and BitGo to unlock liquidity and DeFi growth',
    timestamp: '4 hours ago',
    coins: ['WBTC', 'USDC', 'USDT'],
    shareLinks: {
      twitter: '#',
      facebook: '#',
      linkedin: '#',
    },
  },
  {
    image: 'https://crypto.news/app/uploads/2024/11/crypto-news-Composability-is-the-only-way-DeFi-will-survive-and-thrive-option02-1380x820.webp',

    tag: 'NEWS',
    title: 'Revolut launches the mobile crypto app for U.K. and EEA users',
    timestamp: '4 hours ago',
    coins: [],
    shareLinks: {
      twitter: '#',
      facebook: '#',
      linkedin: '#',
    },
  },
  {
    image: 'https://crypto.news/app/uploads/2023/11/crypto-news-Polygon-matic-coin01.webp',

    tag: 'MARKETS',
    title: 'Polygon price wedge points to more gains as addresses jump',
    timestamp: '4 hours ago',
    coins: ['MATIC', 'BTC', 'SOL'],
    shareLinks: {
      twitter: '#',
      facebook: '#',
      linkedin: '#',
    },
  },
  {
    image: 'https://crypto.news/app/uploads/2024/08/crypto-news-The-centralized-cloud-option03-1380x820.webp',

    tag: 'NEWS',
    title: 'Google Cloud joins Injective as validator, expands Web3 tools',
    timestamp: '5 hours ago',
    coins: ['INJ', 'SOL', 'CELO'],
    shareLinks: {
      twitter: '#',
      facebook: '#',
      linkedin: '#',
    },
  },
  {
    image: 'https://crypto.news/app/uploads/2025/02/crypto-news-Mainnet-option09-1380x820.webp',

    tag: 'NEWS',
    title: 'DIA launches Lumina to end blind trust in oracles',
    timestamp: '6 hours ago',
    coins: [],
    shareLinks: {
      twitter: '#',
      facebook: '#',
      linkedin: '#',
    },
  },
  {
    image: 'https://crypto.news/app/uploads/2024/09/crypto-news-Pi-Network-option03-1380x820.webp',

    tag: 'MARKETS',
    title: 'Pi Network price crash intensifies: Can Pi coin rebound?',
    timestamp: '6 hours ago',
    coins: ['PI'],
    shareLinks: {
      twitter: '#',
      facebook: '#',
      linkedin: '#',
    },
  },
];

const NewsCard = ({ news }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      {/* Image */}
      <img src={news.image} alt={news.title} className="w-full h-40 object-cover" />
      {/* Content */}
      <div className="p-4">
        {/* Tag */}
        <span
          className={`inline-block text-white text-xs font-semibold px-2 py-1 rounded mb-2 ${
            news.tag === 'MARKETS' ? 'bg-green-500' : 'bg-blue-500'
          }`}
        >
          {news.tag}
        </span>
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{news.title}</h3>
        {/* Timestamp */}
        <p className="text-gray-400 text-sm mb-2">{news.timestamp}</p>
        {/* Coins and Share Links */}
        <div className="flex justify-between items-center">
          {/* Coins */}
          {news.coins.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {news.coins.map((coin, index) => (
                <span
                  key={index}
                  className="inline-flex items-center bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded"
                >
                  <span className="w-3 h-3 bg-gray-500 rounded-full mr-1"></span>
                  {coin}
                </span>
              ))}
            </div>
          ) : (
            <div></div> // Empty div to maintain flex layout
          )}
          {/* Share Links */}
          <div className="flex space-x-3">
            <a href={news.shareLinks.twitter} className="text-gray-400 hover:text-white">
              <FaTwitter className="w-5 h-5" />
            </a>
            <a href={news.shareLinks.facebook} className="text-gray-400 hover:text-white">
              <FaFacebook className="w-5 h-5" />
            </a>
            <a href={news.shareLinks.linkedin} className="text-gray-400 hover:text-white">
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaShareAlt className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

NewsCard.propTypes = {
  news: PropTypes.shape({
    image: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    coins: PropTypes.arrayOf(PropTypes.string).isRequired,
    shareLinks: PropTypes.shape({
      twitter: PropTypes.string.isRequired,
      facebook: PropTypes.string.isRequired,
      linkedin: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const SimpleNewsSection = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setNewsItems(newsData);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header: Title and More News Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Current News</h2>
          <a
            href="#"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm sm:text-base"
          >
            More News
          </a>
        </div>

        {/* News Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            // Loading Skeleton
            [...Array(8)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg animate-pulse"
              >
                <div className="w-full h-40 bg-gray-700 rounded-t-lg blur-sm"></div>
                <div className="p-4 space-y-2">
                  <div className="w-16 h-4 bg-gray-700 rounded blur-sm"></div>
                  <div className="w-3/4 h-6 bg-gray-700 rounded blur-sm"></div>
                  <div className="w-1/3 h-4 bg-gray-700 rounded blur-sm"></div>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <div className="w-12 h-4 bg-gray-700 rounded blur-sm"></div>
                      <div className="w-12 h-4 bg-gray-700 rounded blur-sm"></div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-5 h-5 bg-gray-700 rounded-full blur-sm"></div>
                      <div className="w-5 h-5 bg-gray-700 rounded-full blur-sm"></div>
                      <div className="w-5 h-5 bg-gray-700 rounded-full blur-sm"></div>
                      <div className="w-5 h-5 bg-gray-700 rounded-full blur-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : newsItems.length > 0 ? (
            // Actual Data
            newsItems.map((news, index) => <NewsCard key={index} news={news} />)
          ) : (
            <p className="text-gray-400 col-span-full">No news available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimpleNewsSection;