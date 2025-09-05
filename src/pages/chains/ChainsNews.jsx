import { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { getNewsChainData } from "./newsData"; // Import the centralized news data
import ButtonCard from "../../components/ButtonCard";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import Modal from "../../components/Modal";

// News Slider Component
const NewsSlider = ({ newsItems }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  const startAutoSlide = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
    }, 5000); // Change slide every 5 seconds
  }, [newsItems.length]);

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [startAutoSlide]);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  const handlePrev = () => {
    stopAutoSlide();
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + newsItems.length) % newsItems.length
    );
    setTimeout(startAutoSlide, 5000); // Restart auto-slide after manual interaction
  };

  const handleNext = () => {
    stopAutoSlide();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
    setTimeout(startAutoSlide, 5000); // Restart auto-slide after manual interaction
  };

  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-xl bg-purple-800">
      <div
        ref={sliderRef}
        className="flex h-full transition-transform duration-500 ease-in-out"
        onMouseEnter={stopAutoSlide}
        onMouseLeave={startAutoSlide}
      >
        {newsItems.map((item) => (
          <div
            key={item.id}
            className="w-full flex-shrink-0 h-full bg-cover bg-center relative p-6 flex flex-col justify-end"
            style={{ backgroundImage: `url(${item.imageUrl})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
            <span className="relative z-10 text-xs font-semibold text-gray-300 mb-1">
              {item.category}
            </span>
            <h3 className="relative z-10 text-2xl font-bold font-mono text-white mb-2">
              {item.title}
            </h3>
            <p className="relative z-10 text-gray-300 text-sm mb-4">
              {item.description}
            </p>
            <span className="relative z-10 text-gray-400 text-xs">
              {item.date}
            </span>
          </div>
        ))}
      </div>
      <button
        onClick={handlePrev}
        disabled={currentIndex === 0} // Disable if at the first item
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-purple-800 bg-opacity-70 text-white p-2 rounded-full shadow-lg z-10 hover:bg-purple-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={handleNext}
        disabled={currentIndex === newsItems.length - 1} // Disable if at the last item
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-purple-800 bg-opacity-70 text-white p-2 rounded-full shadow-lg z-10 hover:bg-purple-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

NewsSlider.propTypes = {
  newsItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      category: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
};

// News Card Component
const NewsCard = ({ news, onClick }) => {
  return (
    <div
      className="bg-purple-800 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 ease-in-out flex flex-col"
      onClick={() =>
        onClick({
          title: news.title,
          content: `Category: ${news.category}\nAuthor: ${
            news.author || "N/A"
          }\nDate: ${news.date}\n\n${
            news.description || "No detailed description available."
          }`,
          imageUrl: news.imageUrl,
        })
      }
    >
      <img
        src={news.imageUrl}
        alt={news.title}
        className="w-full h-32 object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/200x150/4A4A4A/FFFFFF?text=News";
        }}
      />
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <span className="text-xs font-semibold text-blue-400 uppercase">
            {news.category}
          </span>
          <h3 className="text-white text-md font-bold font-mono mt-1 mb-2 line-clamp-2">
            {news.title}
          </h3>
          {news.author && (
            <p className="text-gray-400 text-xs">By {news.author}</p>
          )}
        </div>
        <p className="text-gray-500 text-xs mt-2">{news.date}</p>
      </div>
    </div>
  );
};

NewsCard.propTypes = {
  news: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string,
    author: PropTypes.string,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

// Scrollable List Component (for Recommended and Most Read)
const ScrollableList = ({
  title,
  items,
  setModalContent,
  initialDisplayCount = 8,
  itemType = "default",
}) => {
  const [visibleCount, setVisibleCount] = useState(initialDisplayCount);
  const listRef = useRef(null);

  const handleSeeMore = () => {
    setVisibleCount((prevCount) => prevCount + initialDisplayCount);
  };

  const handleLoadLess = () => {
    setVisibleCount(initialDisplayCount);
    if (listRef.current) {
      listRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderItem = (item) => {
    if (itemType === "recommended") {
      return (
        <div
          key={item.id}
          className="flex items-center p-2 hover:bg-purple-700 rounded-md transition-colors duration-200 cursor-pointer"
          onClick={() =>
            setModalContent({
              title: item.title,
              content: `This is a recommended article about: ${item.title}`,
              imageUrl: item.imageUrl,
            })
          }
        >
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-10 h-10 rounded-md object-cover mr-3"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/40x40/4A4A4A/FFFFFF?text=R";
            }}
          />
          <span className="text-gray-300 text-sm flex-grow line-clamp-2">
            {item.title}
          </span>
        </div>
      );
    } else if (itemType === "mostRead") {
      return (
        <div
          key={item.id}
          className="flex items-start p-2 hover:bg-purple-700 rounded-md transition-colors duration-200 cursor-pointer"
          onClick={() =>
            setModalContent({
              title: item.title,
              content: `This is a most read news article: ${item.title}`,
            })
          }
        >
          <span className="text-gray-500 text-sm mr-2">{item.id}.</span>
          <span className="text-gray-300 text-sm flex-grow line-clamp-2">
            {item.title}
          </span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-purple-mix bg-opacity-70 p-4 rounded-lg shadow-xl h-full flex flex-col">
      <h2 className="text-white text-lg font-bold font-mono mb-4 border-b border-gray-700 pb-2">
        {title}
      </h2>
      <div
        ref={listRef}
        className="flex-grow overflow-y-auto custom-scrollbar pr-2"
        style={{ maxHeight: "calc(50vh - 100px)" }}
      >
        {" "}
        {/* Added max-height */}
        {items.slice(0, visibleCount).map(renderItem)}
      </div>
      <div className="flex justify-center space-x-4 mt-4">
        {visibleCount < items.length && (
          <ButtonCard
            onClick={handleSeeMore}
            background="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300 text-sm font-semibold font-mono"
            size="small"
            icon={null}
            iconPosition="right"
            animationType="fade"
          >
            See More
          </ButtonCard>
        )}
        {visibleCount > initialDisplayCount && (
          <ButtonCard
            onClick={handleLoadLess}
            background="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300 text-sm font-semibold font-mono"
            size="small"
            icon={null}
            iconPosition="right"
            animationType="fade"
          >
            Load Less
          </ButtonCard>
        )}
      </div>
    </div>
  );
};

ScrollableList.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      imageUrl: PropTypes.string,
    })
  ).isRequired,
  setModalContent: PropTypes.func.isRequired,
  initialDisplayCount: PropTypes.number,
  itemType: PropTypes.string,
};

// Main ChainsNews Component
function ChainsNews({ chainName = "Ethereum" }) {
  // Added chainName prop
  const [modalContent, setModalContent] = useState(null);
  const [visibleNewsCards, setVisibleNewsCards] = useState(6); // Show 2 rows (3 columns * 2 rows = 6 cards)
  const [currentChainData, setCurrentChainData] = useState(null); // State for chain-specific data


  // Effect to load chain data when chainName prop changes
  useEffect(() => {
    const data = getNewsChainData(chainName);
    if (data) {
      setCurrentChainData(data);
    } else {
      console.error(`No news data found for chain: ${chainName}`);
      setCurrentChainData(null);
    }
  }, [chainName]);

  const handleLoadMoreNewsCards = () => {
    if (
      currentChainData &&
      visibleNewsCards < currentChainData.newsCards.length
    ) {
      setVisibleNewsCards((prevCount) => prevCount + 6); // Load another 2 rows
    }
  };

  const handleLoadLessNewsCards = () => {
    setVisibleNewsCards(6); // Reset to initial 6
  };

  if (!currentChainData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-950 text-white text-2xl">
        Loading or news data for {chainName} not found...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-mix text-white p-4 font-sans flex flex-col">
      <header className="text-center py-6">
        <h1 className="text-4xl font-bold font-mono mb-2">
          <img
            src={currentChainData.logo}
            alt={`${currentChainData.name} Logo`}
            className="inline-block w-10 h-10 mr-3 rounded-full"
          />
          {currentChainData.name} News & Insights
        </h1>
        <p className="text-gray-400 text-lg">
          Stay updated with the latest in {currentChainData.name} blockchain and
          crypto
        </p>
      </header>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 flex-grow">
        {" "}
        {/* flex-grow to make grid take available height */}
        {/* Left Section */}
        <div className="lg:col-span-1 flex flex-col space-y-6">
          {" "}
          {/* flex-col to stack children */}
          {/* Latest News */}
          <div className="bg-purple-mix bg-opacity-70 p-4 rounded-lg shadow-xl flex-grow">
            {" "}
            {/* flex-grow to share space */}
            <h2 className="text-white text-lg font-bold font-mono mb-4 border-b border-gray-700 pb-2">
              Latest News
            </h2>
            <div
              className="overflow-y-auto custom-scrollbar pr-2"
              style={{ maxHeight: "calc(50vh - 100px)" }}
            >
              {" "}
              {/* Adjusted max-height */}
              <ul className="space-y-3">
                {currentChainData.latestNews.map((news) => (
                  <li
                    key={news.id}
                    className="cursor-pointer hover:text-purple-400 transition-colors duration-200"
                    onClick={() =>
                      setModalContent({
                        title: news.title,
                        content: `Date: ${news.date}\n\n${news.title}`,
                      })
                    }
                  >
                    <p className="text-sm font-semibold line-clamp-2">
                      {news.title}
                    </p>
                    <span className="text-xs text-gray-500">{news.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Press & Market Release */}
          <div className="bg-purple-mix bg-opacity-70 p-4 rounded-lg shadow-xl flex-grow">
            {" "}
            {/* flex-col to share space */}
            <h2 className="text-white text-lg font-bold font-mono mb-4 border-b border-gray-700 pb-2">
              Press & Market Release
            </h2>
            <div
              className="overflow-y-auto custom-scrollbar pr-2"
              style={{ maxHeight: "calc(50vh - 100px)" }}
            >
              {" "}
              {/* Adjusted max-height */}
              <ul className="space-y-3">
                {currentChainData.pressReleases.map((release) => (
                  <li
                    key={release.id}
                    className="cursor-pointer hover:text-purple-400 transition-colors duration-200"
                    onClick={() =>
                      setModalContent({
                        title: release.title,
                        content: `Date: ${release.date}\n\n${release.title}`,
                      })
                    }
                  >
                    <p className="text-sm font-semibold line-clamp-2">
                      {release.title}
                    </p>
                    <span className="text-xs text-gray-500">
                      {release.date}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* Main Container */}
        <div className="lg:col-span-2 flex flex-col space-y-6">
          {" "}
          {/* flex-col to stack children */}
          {/* News Slider */}
          <NewsSlider newsItems={currentChainData.newsSlider} />
          {/* News Cards */}
          <div className="bg-purple-mix bg-opacity-70 p-4 rounded-lg shadow-xl flex-grow">
            {" "}
            {/* flex-grow to fill remaining space */}
            <h2 className="text-white text-lg font-bold font-mono mb-4 border-b border-gray-700 pb-2">
              All News
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
              {" "}
              {/* Fixed height with scroll */}
              {currentChainData.newsCards
                .slice(0, visibleNewsCards)
                .map((news) => (
                  <NewsCard
                    key={news.id}
                    news={news}
                    onClick={setModalContent}
                  />
                ))}
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              {visibleNewsCards < currentChainData.newsCards.length && (
                <ButtonCard
                  onClick={handleLoadMoreNewsCards}
                  background="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300 text-sm font-semibold font-mono"
                  size="small"
                  icon={null}
                  iconPosition="right"
                  animationType="glow"
                >
                  See More
                </ButtonCard>
              )}
              {visibleNewsCards > 6 && ( // Only show Load Less if more than initial 6 are visible
                <ButtonCard
                  onClick={handleLoadLessNewsCards}
                  background="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300 text-sm font-semibold font-mono"
                  size="small"
                  icon={null}
                  iconPosition="right"
                  animationType="glow"
                >
                  Load Less
                </ButtonCard>
              )}
            </div>
          </div>
        </div>
        {/* Right Section */}
        <div className="lg:col-span-1 flex flex-col space-y-6">
          {" "}
          {/* flex-col to stack children */}
          {/* Chains Little Info / Calculator */}
          <div className="bg-purple-mix bg-opacity-70 p-4 rounded-lg shadow-xl">
            <h2 className="text-white text-lg font-bold font-mono mb-4 border-b border-gray-700 pb-2">
              Calculator
            </h2>
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">
                {currentChainData.chainInfo.currency}
              </p>
              <p className="text-green-400 text-3xl font-bold font-mono">
                ${currentChainData.chainInfo.bitcoinPrice}
              </p>
              <p className="text-gray-500 text-xs mt-2">BITCOIN</p>
              {currentChainData.chainInfo.networkMetrics && (
                <p className="text-gray-500 text-xs mt-1">
                  {currentChainData.chainInfo.networkMetrics}
                </p>
              )}
            </div>
          </div>
          {/* Recommended List */}
          <ScrollableList
            title="Recommended"
            items={currentChainData.recommendedList}
            setModalContent={setModalContent}
            initialDisplayCount={8}
            itemType="recommended"
          />
          {/* Most Read Section */}
          <ScrollableList
            title="Most Read"
            items={currentChainData.mostRead}
            setModalContent={setModalContent}
            initialDisplayCount={8}
            itemType="mostRead"
          />
        </div>
      </div>

      {/* Modal for pop-up content */}
      <Modal isOpen={!!modalContent} onClose={() => setModalContent(null)}>
        {modalContent && (
          <>
            <h2 className="text-3xl font-bold font-mono mb-4">
              {modalContent.title}
            </h2>
            {modalContent.imageUrl && (
              <img
                src={modalContent.imageUrl}
                alt={modalContent.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/600x400/4A4A4A/FFFFFF?text=Image+Not+Found";
                }}
              />
            )}
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {modalContent.content}
            </p>
          </>
        )}
      </Modal>
      <ScrollToTopButton />
    </div>
  );
}

ChainsNews.propTypes = {
  chainName: PropTypes.string,
};

export default ChainsNews;

// </final_file_content>

// IMPORTANT: For any future changes to this file, use the final_file_content shown above as your reference. This content reflects the current state of the file, including any auto-formatting (e.g., if you used single quotes but the formatter converted them to double quotes). Always base your SEARCH/REPLACE operations on this final version to ensure accuracy.



// New problems detected after saving the file:
// src/pages/chains/ChainsNews.jsx
// - [eslint Error] Line 321: 'chainName' is missing in props validation<environment_details>
// # VSCode Visible Files
// src/pages/chains/ChainsNews.jsx

// # VSCode Open Tabs
// src/pages/chains/allchainsData.js
// src/pages/chains/BlockchainPage.jsx
// src/pages/chains/ChainNFTsDashboard.jsx
// src/pages/chains/ChainsDapps.jsx
// src/pages/chains/dappsData.js
// src/pages/chains/ChainsNews.jsx

// # Current Time
// 7/23/2025, 7:34:09 PM (Asia/Calcutta, UTC+5.5:00)

// # Context Window Usage
// 541,458 / 1,048.576K tokens used (52%)

// # Current Mode
// ACT MODE
// </environment_details>
