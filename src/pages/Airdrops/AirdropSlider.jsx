import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaRocket } from 'react-icons/fa';

// Sample slide data (you can add more slides as needed)
const slideData = [
  {
    title: 'AirdropSniper.io - Your Ultimate Airdrop Hunting Hub',
    description:
      'Get real-time airdrop alerts, step-by-step guides, and expert insights. Stay ahead, maximize rewards, and never miss an opportunity.',
    buttonText: 'Join Our Telegram Channel',
    buttonIcon: <FaRocket className="ml-2" />,
    image: 'https://img.freepik.com/premium-vector/free-distribution-collectible-nft-non-fungible-token-with-golden-coins-orange-parachutes-dark-red-background-nft-airdrop_337410-2066.jpg?ga=GA1.1.1272655499.1724846198&semt=ais_hybrid',
    imageAlt: 'Airdrop Sniper',
  },
  {
    title: 'Top 5 Airdrops 2025',
    description:
      'Discover the best airdrop opportunities for 2025. Join our community to get exclusive updates and tips.',
    buttonText: 'Join Our Telegram Channel',
    buttonIcon: <FaRocket className="ml-2" />,
    image: 'https://img.freepik.com/free-vector/woman-scuba-diver-finds-treasure-chest-with-gold-water-sea-ocean_107791-5372.jpg?t=st=1742985964~exp=1742989564~hmac=b612d922d6e7b036f6cf4929f2b7c652bcea1ca50ca9cdaad66799918a133e58&w=1800',
    imageAlt: 'Top 5 Airdrops',
  },
  {
    title: 'Maximize Your Airdrop Rewards',
    description:
      'Learn how to optimize your airdrop hunting strategy with our expert guides and real-time alerts.',
    buttonText: 'Join Our Telegram Channel',
    buttonIcon: <FaRocket className="ml-2" />,
    image: 'https://img.freepik.com/free-vector/vector-blockchain-poster_1441-1999.jpg?ga=GA1.1.1272655499.1724846198&semt=ais_hybrid',
    imageAlt: 'Maximize Rewards',
  },
];

const AirdropSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  // Simulate loading (e.g., fetching images or data)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (error) {
        console.error('Error loading slider data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideData.length) % slideData.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Slider Container */}
        <div className="relative overflow-hidden">
          {loading ? (
            // Loading Skeleton
            <div className="flex flex-col lg:flex-row items-center gap-6 animate-pulse">
              {/* Text Section */}
              <div className="w-full lg:w-1/2 space-y-4">
                <div className="w-3/4 h-8 bg-gray-700 rounded blur-sm"></div>
                <div className="w-full h-4 bg-gray-700 rounded blur-sm"></div>
                <div className="w-full h-4 bg-gray-700 rounded blur-sm"></div>
                <div className="w-1/2 h-10 bg-gray-700 rounded-full blur-sm"></div>
              </div>
              {/* Image Section */}
              <div className="w-full lg:w-1/2 h-48 lg:h-64 bg-gray-700 rounded-lg blur-sm"></div>
            </div>
          ) : (
            // Actual Slider Content
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slideData.map((slide, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full flex flex-col lg:flex-row items-center gap-6"
                >
                  {/* Text Section */}
                  <div className="w-full lg:w-1/2 space-y-4">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                      {slide.title}
                    </h2>
                    <p className="text-gray-300 text-sm sm:text-base">
                      {slide.description}
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center bg-white text-gray-900 px-6 py-2 rounded-full hover:bg-gray-200 transition"
                    >
                      {slide.buttonText}
                      {slide.buttonIcon}
                    </a>
                  </div>

                  {/* Image Section */}
                  <div className="w-full lg:w-1/2">
                    <img
                      src={slide.image}
                      alt={slide.imageAlt}
                      className="w-full h-48 lg:h-64 object-cover rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation Arrows */}
        {!loading && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600 transition"
            >
              <FaChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600 transition"
            >
              <FaChevronRight size={20} />
            </button>
          </>
        )}

        {/* Navigation Dots */}
        {!loading && (
          <div className="flex justify-center mt-4 space-x-2">
            {slideData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === index ? 'bg-white' : 'bg-gray-500'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AirdropSlider;