import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaTwitter, FaFacebook, FaLinkedin, FaShareAlt } from 'react-icons/fa';
import ScrollToTopButton from '../../components/ScrollToTopButton';


const newsData = [
  {
    image: 'https://crypto.news/app/uploads/2025/02/crypto-news-Capitol-USA-AI-option01-1380x820.webp',
    tag: 'NEWS',
    title: "'Confusion and ambiguity': 30 crypto firms call on Congress for clarity on money transmitter rules",
    timestamp: '1 minute ago',
    admin: 'John Doe',
    date: 'March 26, 2025',
    shareLinks: {
      twitter: '#',
      facebook: '#',
      linkedin: '#',
    },
  },
  {
    image: 'https://crypto.news/app/uploads/2025/02/crypto-news-Trumps-trade-war-option04-1380x820.webp',
    tag: 'NEWS',
    title: "Trump's USD1 play is 'dollar expansion, not love for blockchain,' Ari10 CEO says",
    timestamp: '27 minutes ago',
    admin: 'Jane Smith',
    date: 'March 26, 2025',
    shareLinks: {
      twitter: '#',
      facebook: '#',
      linkedin: '#',
    },
  },
  {
    image: 'https://crypto.news/app/uploads/2025/02/crypto-news-The-US-Securities-and-Exchange-Commission-SEC-option06-1380x820.webp',
    tag: 'FOLLOW-UP',
    title: 'Avid crypto advocate and investor Paul Atkins will soon become the SEC chair: What to expect?',
    timestamp: '1 hour ago',
    admin: 'Alex Brown',
    date: 'March 26, 2025',
    shareLinks: {
      twitter: '#',
      facebook: '#',
      linkedin: '#',
    },
  },
];

const NewsCard = ({ news }) => {
  return (
    <div className="bg-white rounded-lg  overflow-hidden shadow-lg">
      {/* Image */}
      <img src={news.image} alt={news.title} className="w-full h-40 object-cover" />
      {/* Content */}
      <div className="p-4">
        {/* Tag */}
        <span className="inline-block bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded mb-2">
          {news.tag}
        </span>
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-semibold text-black mb-2">{news.title}</h3>
        {/* Admin and Date */}
        <p className="text-gray-400 text-sm mb-1">
          By <span className="font-semibold">{news.admin}</span> on {news.date}
        </p>
        {/* Timestamp */}
        <p className="text-gray-400 text-sm mb-2">{news.timestamp}</p>
        {/* Share Links */}
        <div className="flex justify-end space-x-3">
          <a href={news.shareLinks.twitter} className="text-gray-400 hover:text-black">
            <FaTwitter className="w-5 h-5" />
          </a>
          <a href={news.shareLinks.facebook} className="text-gray-400 hover:text-black">
            <FaFacebook className="w-5 h-5" />
          </a>
          <a href={news.shareLinks.linkedin} className="text-gray-400 hover:text-black">
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a href="#" className="text-gray-400 hover:text-black">
            <FaShareAlt className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

// Define PropTypes for NewsCard
NewsCard.propTypes = {
  news: PropTypes.shape({
    image: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    admin: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    shareLinks: PropTypes.shape({
      twitter: PropTypes.string.isRequired,
      facebook: PropTypes.string.isRequired,
      linkedin: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const NewsSection = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate data fetch with a delay
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        // Simulate API delay
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
    <>

    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-[#f3f4f6] text-black ">
      <div className="max-w-7xl mx-auto ">
        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Cryptocurrency News</h2>

        {/* News Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            // Loading Skeleton
            [...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg animate-pulse"
              >
                <div className="w-full h-40 bg-gray-700 rounded-t-lg blur-sm"></div>
                <div className="p-4 space-y-2">
                  <div className="w-16 h-4 bg-gray-700 rounded blur-sm"></div>
                  <div className="w-3/4 h-6 bg-gray-700 rounded blur-sm"></div>
                  <div className="w-1/2 h-4 bg-gray-700 rounded blur-sm"></div>
                  <div className="w-1/3 h-4 bg-gray-700 rounded blur-sm"></div>
                  <div className="flex justify-end space-x-2">
                    <div className="w-5 h-5 bg-gray-700 rounded-full blur-sm"></div>
                    <div className="w-5 h-5 bg-gray-700 rounded-full blur-sm"></div>
                    <div className="w-5 h-5 bg-gray-700 rounded-full blur-sm"></div>
                    <div className="w-5 h-5 bg-gray-700 rounded-full blur-sm"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Actual Data
            newsItems.map((news, index) => <NewsCard key={index} news={news} />)
          )}
        </div>
      </div>
    </div>
    <ScrollToTopButton />

    </>
  );
};

export default NewsSection;