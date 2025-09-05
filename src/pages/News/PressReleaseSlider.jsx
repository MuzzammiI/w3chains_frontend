import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const pressReleaseData = [
  {
    image: 'https://crypto.news/app/uploads/2024/05/crypto-news-Japan-Blockchain-Week-2024-option02.webp',
    title: 'TEAMZ SUMMIT 2025 official agenda announced: Key sessions on the future of web3, AI confirmed',
  },
  {
    image: 'https://crypto.news/app/uploads/2024/12/crypto-news-Russia-option04-1380x820.webp',
    title: 'Crypto event of the year in Russia: Crypto Summit 2025 takes place in Moscow',
  },
  {
    image: 'https://crypto.news/app/uploads/2025/01/crypto-news-XRP-bull-option03-1380x820.webp',
    title: 'XRP whales flock to XRP Turbo presale, nearly 200,000 XRP raised with only 4 days left',
  },
  {
    image: 'https://crypto.news/app/uploads/2024/01/crypto-news-Bitcoin-mining-equipment-option03.webp',
    title: 'Bitcoin mining in 2025: How to maximize profits with cost-effective cloud mining',
  },
  {
    image: 'https://crypto.news/app/uploads/2024/02/crypto-news-artificial-intelligence-blockchain-option01.webp',
    title: 'Arcium joins NVIDIA’s Inception Program to advance private AI adoption',
  },
  {
    image: 'https://crypto.news/app/uploads/2024/02/crypto-news-Crypto-whale-buys-nearly02-1.webp',
    title: 'Solana whales flock to Bitcoin Pepe: PEP-20 taking over',
  },
];

const PressReleaseCard = ({ pressRelease }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer shadow-lg flex-shrink-0 w-64 h-full sm:w-72 lg:w-80">
      {/* Image */}
      <img src={pressRelease.image} alt={pressRelease.title} className="w-full h-40 object-cover" />
      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-base sm:text-lg font-semibold text-white">{pressRelease.title}</h3>
      </div>
    </div>
  );
};

PressReleaseCard.propTypes = {
  pressRelease: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

const PressReleaseSlider = () => {
  const [pressReleases, setPressReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  // Simulate data fetch with a delay
  useEffect(() => {
    const fetchPressReleases = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setPressReleases(pressReleaseData);
      } catch (error) {
        console.error('Error fetching press releases:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPressReleases();
  }, []);

  // Calculate the number of visible cards based on screen size
  const getVisibleCards = () => {
    if (window.innerWidth >= 1024) return 4; // lg: 4 cards
    if (window.innerWidth >= 640) return 2; // sm: 2 cards
    return 1; // default: 1 card
  };

  // Handle sliding
  const handleNext = () => {
    const visibleCards = getVisibleCards();
    if (currentIndex < pressReleases.length - visibleCards) {
      setCurrentIndex(currentIndex + 1);
      sliderRef.current.scrollTo({
        left: (currentIndex + 1) * (sliderRef.current.offsetWidth / visibleCards),
        behavior: 'smooth',
      });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      sliderRef.current.scrollTo({
        left: (currentIndex - 1) * (sliderRef.current.offsetWidth / getVisibleCards()),
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header: Title and View All Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Press Releases</h2>
          <a
            href="#"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm sm:text-base"
          >
            View All
          </a>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className={`absolute left-0 top-1/2 cursor-pointer transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition ${
              currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={currentIndex === 0}
          >
            <FaChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className={`absolute right-0 top-1/2 cursor-pointer transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition ${
              currentIndex >= pressReleases.length - getVisibleCards()
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
            disabled={currentIndex >= pressReleases.length - getVisibleCards()}
          >
            <FaChevronRight className="w-5 h-5" />
          </button>

          {/* Slider Content */}
          <div
            ref={sliderRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide space-x-4"
          >
            {loading ? (
              // Loading Skeleton
              [...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-lg flex-shrink-0 w-64 sm:w-72 lg:w-80 animate-pulse"
                >
                  <div className="w-full h-40 bg-gray-700 rounded-t-lg blur-sm"></div>
                  <div className="p-4 space-y-2">
                    <div className="w-3/4 h-6 bg-gray-700 rounded blur-sm"></div>
                    <div className="w-1/2 h-4 bg-gray-700 rounded blur-sm"></div>
                  </div>
                </div>
              ))
            ) : pressReleases.length > 0 ? (
              // Actual Data
              pressReleases.map((pressRelease, index) => (
                <div key={index} className="snap-start">
                  <PressReleaseCard pressRelease={pressRelease} />
                </div>
              ))
            ) : (
              <p className="text-gray-400">No press releases available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PressReleaseSlider;