/* eslint-disable react/prop-types */
import { useState, useEffect, useRef, useCallback } from "react";

// Hardcoded data to replace API calls. This is now the "source of truth"
// for the entire application.
const HARDCODED_DATA = {
  chainName: "Ethereum",
  logo: "https://placehold.co/40x40/6366f1/FFFFFF?text=E",
  chainInfo: {
    currency: "ETH",
    bitcoinPrice: (Math.random() * 70000 + 50000).toFixed(2),
    networkMetrics: "320,000 active wallets in the last 24h",
  },
  newsSlider: [
    {
      id: 1,
      category: "Market Analysis",
      title: "Ethereum's latest upgrades promise faster transactions",
      description: "A deep dive into the recent network changes and their impact on scalability and cost for users.",
      date: "August 12, 2025",
      imageUrl: "https://placehold.co/600x400/4f46e5/FFFFFF?text=Eth+Upgrade",
    },
    {
      id: 2,
      category: "Developer News",
      title: "New tools for building dApps on Ethereum are now available",
      description: "A summary of the new developer kits and frameworks released to the community to streamline development.",
      date: "August 11, 2025",
      imageUrl: "https://placehold.co/600x400/8b5cf6/FFFFFF?text=Developer+Tools",
    },
    {
      id: 3,
      category: "Community",
      title: "The Ethereum community discusses future governance proposals",
      description: "Key takeaways from the latest community meeting on the direction and future of the decentralized network.",
      date: "August 10, 2025",
      imageUrl: "https://placehold.co/600x400/c084fc/FFFFFF?text=Community+Governance",
    },
  ],
  latestNews: [
    { id: 101, title: "Rollup technology shows significant performance gains", date: "August 12, 2025", category: "Layer2" },
    { id: 102, title: "NFT sales volume on the rise, new projects launching", date: "August 11, 2025", category: "NFTs" },
    { id: 103, title: "Major corporation announces a new Web3 partnership", date: "August 11, 2025", category: "Web3" },
    { id: 104, title: "Decentralized finance (DeFi) platforms see record liquidity", date: "August 10, 2025", category: "DeFi" },
    { id: 105, title: "The Merge's long-term effects on network security", date: "August 9, 2025", category: "Ethereum" },
    { id: 106, title: "New scaling solution proposal garners community support", date: "August 8, 2025", category: "Layer2" },
    { id: 107, title: "Decentralized social media platform launches on Ethereum", date: "August 7, 2025", category: "Web3" },
    { id: 108, title: "Energy efficiency of proof-of-stake highlighted in new report", date: "August 6, 2025", category: "Mining" },
    { id: 109, title: "New wallet integration simplifies dApp access for users", date: "August 5, 2025", category: "Altcoin" },
  ],
  pressReleases: [
    { id: 201, title: "Press Release: Ethereum Foundation unveils new grants program", date: "August 12, 2025", category: "Ethereum" },
    { id: 202, title: "Press Release: Aave releases whitepaper for V3 protocol", date: "August 11, 2025", category: "DeFi" },
    { id: 203, title: "Press Release: Uniswap announces partnership with Chainlink", date: "August 10, 2025", category: "DeFi" },
    { id: 204, title: "Press Release: Optimism announces new developer tool", date: "August 9, 2025", category: "Layer2" },
    { id: 205, title: "Press Release: The Graph updates data indexing service", date: "August 8, 2025", category: "Web3" },
    { id: 206, title: "Press Release: Vitalik Buterin publishes new paper on sharding", date: "August 7, 2025", category: "Ethereum" },
    { id: 207, title: "Press Release: Polygon releases new zkEVM solution", date: "August 6, 2025", category: "Layer2" },
    { id: 208, title: "Press Release: USDC stablecoin issuer expands to more chains", date: "August 5, 2025", category: "Altcoin" },
    { id: 209, title: "Press Release: ConsenSys launches new enterprise solutions", date: "August 4, 2025", category: "Web3" },
  ],
  recommendedList: [
    { id: 301, title: "Beginner's Guide to Staking ETH", imageUrl: "https://placehold.co/40x40/4f46e5/FFFFFF?text=1", category: "Ethereum" },
    { id: 302, title: "Understanding Zero-Knowledge Proofs", imageUrl: "https://placehold.co/40x40/8b5cf6/FFFFFF?text=2", category: "Layer2" },
    { id: 303, title: "The Rise of On-Chain Governance", imageUrl: "https://placehold.co/40x40/c084fc/FFFFFF?text=3", category: "Web3" },
    { id: 304, title: "How DeFi is Changing Traditional Finance", imageUrl: "https://placehold.co/40x40/4f46e5/FFFFFF?text=4", category: "DeFi" },
    { id: 305, title: "A Look at Layer 2 Solutions", imageUrl: "https://placehold.co/40x40/8b5cf6/FFFFFF?text=5", category: "Layer2" },
    { id: 306, title: "Exploring the World of DAOs", imageUrl: "https://placehold.co/40x40/c084fc/FFFFFF?text=6", category: "Web3" },
    { id: 307, title: "The Future of Smart Contracts", imageUrl: "https://placehold.co/40x40/4f46e5/FFFFFF?text=7", category: "Ethereum" },
    { id: 308, title: "Scaling Ethereum with Sharding", imageUrl: "https://placehold.co/40x40/8b5cf6/FFFFFF?text=8", category: "Ethereum" },
  ],
  mostRead: [
    { id: 1, title: "Ethereum breaks new record for daily transaction volume", category: "Ethereum" },
    { id: 2, title: "Major investment firm adds ETH to its portfolio", category: "Bitcoin" },
    { id: 3, title: "The next big trend in DeFi is here", category: "DeFi" },
    { id: 4, title: "Analyst predicts ETH price to hit $8,000 by year-end", category: "Ethereum" },
    { id: 5, title: "Web3 gaming sees massive user growth", category: "Web3" },
    { id: 6, title: "Top 5 projects to watch in the Ethereum ecosystem", category: "Ethereum" },
    { id: 7, title: "A step-by-step guide to building your first smart contract", category: "Ethereum" },
    { id: 8, title: "How Ethereum 2.0 is changing the game", category: "Ethereum" },
    { id: 9, title: "Understanding gas fees and EIP-1559", category: "Ethereum" },
    { id: 10, title: "The rise of decentralized identity (DID)", category: "Web3" },
  ],
  newsCards: [
    {
      id: 401,
      category: "Bitcoin",
      title: "Bitcoin breaks all-time high amidst institutional adoption surge",
      description: "In a landmark week for the crypto market, Bitcoin's price soared past its previous record, fueled by a wave of institutional investments and growing confidence in digital assets. Analysts point to a maturing market and increased regulatory clarity as key drivers.",
      date: "August 12, 2025",
      author: "Jane Doe",
      imageUrl: "https://placehold.co/600x400/4f46e5/FFFFFF?text=BTC+ATH",
    },
    {
      id: 402,
      category: "Web3",
      title: "Decentralized AI project secures $50M in funding",
      description: "A new decentralized artificial intelligence platform has successfully closed a Series B funding round, raising $50 million. The project aims to create an open and fair ecosystem for AI development, challenging the dominance of tech giants.",
      date: "August 11, 2025",
      author: "John Smith",
      imageUrl: "https://placehold.co/600x400/8b5cf6/FFFFFF?text=Decentralized+AI",
    },
    {
      id: 403,
      category: "NFTs",
      title: "NFT market rebounds with new celebrity collections",
      description: "The non-fungible token (NFT) market is experiencing a significant revival, driven by high-profile celebrity partnerships and the launch of innovative new digital art collections. This resurgence is bringing renewed attention to the sector.",
      date: "August 10, 2025",
      author: "Emily White",
      imageUrl: "https://placehold.co/600x400/c084fc/FFFFFF?text=NFT+Rebound",
    },
    {
      id: 404,
      category: "Mining",
      title: "Governments around the world consider new crypto regulations",
      description: "Policy makers are actively exploring new frameworks for regulating cryptocurrencies to protect consumers and prevent illicit activities. The discussions highlight a global effort to balance innovation with security.",
      date: "August 9, 2025",
      author: "Michael Brown",
      imageUrl: "https://placehold.co/600x400/a855f7/FFFFFF?text=Crypto+Regulations",
    },
    {
      id: 405,
      category: "Web3",
      title: "Play-to-Earn gaming sector sees massive user growth",
      description: "The number of active users in the play-to-earn gaming space has surged, with millions of players engaging with blockchain-based games. The model offers new economic opportunities for gamers worldwide.",
      date: "August 8, 2025",
      author: "Sarah Jones",
      imageUrl: "https://placehold.co/600x400/6366f1/FFFFFF?text=P2E+Gaming",
    },
    {
      id: 406,
      category: "DeFi",
      title: "New DeFi protocol launches with novel lending mechanism",
      description: "A new decentralized finance protocol has entered the market, introducing a unique lending and borrowing mechanism. The platform aims to improve capital efficiency and attract new liquidity providers.",
      date: "August 7, 2025",
      author: "David Lee",
      imageUrl: "https://placehold.co/600x400/4f46e5/FFFFFF?text=DeFi+Protocol",
    },
    {
      id: 407,
      category: "Layer2",
      title: "Layer 2 solutions reach a new milestone in transaction speed",
      description: "Ethereum's layer 2 solutions are setting new benchmarks for transaction speed and cost-effectiveness. This progress is crucial for the network's scalability and its ability to handle mass adoption.",
      date: "August 6, 2025",
      author: "Anna Chen",
      imageUrl: "https://placehold.co/600x400/8b5cf6/FFFFFF?text=Layer+2+Speed",
    },
    {
      id: 408,
      category: "Ethereum",
      title: "University to offer first-of-its-kind blockchain degree program",
      description: "A leading university has announced the launch of a new degree program focused on blockchain technology, smart contracts, and decentralized systems. The curriculum is designed to prepare students for careers in the Web3 industry.",
      date: "August 5, 2025",
      author: "Alex Kim",
      imageUrl: "https://placehold.co/600x400/c084fc/FFFFFF?text=Blockchain+Degree",
    },
    {
      id: 409,
      category: "Mining",
      title: "New report on crypto carbon footprint released",
      description: "A comprehensive report on the environmental impact of cryptocurrencies has been published, offering insights into energy consumption and potential solutions for a greener blockchain future.",
      date: "August 4, 2025",
      author: "Jordan Taylor",
      imageUrl: "https://placehold.co/600x400/a855f7/FFFFFF?text=Carbon+Footprint",
    },
    {
      id: 410,
      category: "Web3",
      title: "Global hackathon attracts record number of Web3 developers",
      description: "An international hackathon focused on Web3 technologies concluded with a record-breaking number of participants, showcasing innovative projects in DeFi, gaming, and social media.",
      date: "August 3, 2025",
      author: "Maria Garcia",
      imageUrl: "https://placehold.co/600x400/6366f1/FFFFFF?text=Web3+Hackathon",
    },
    {
      id: 411,
      category: "Altcoin",
      title: "Traditional banks explore blockchain for cross-border payments",
      description: "Several major financial institutions are piloting blockchain-based solutions to streamline international payments, aiming to reduce costs and transaction times.",
      date: "August 2, 2025",
      author: "Robert Chen",
      imageUrl: "https://placehold.co/600x400/4f46e5/FFFFFF?text=Blockchain+Payments",
    },
    {
      id: 412,
      category: "Altcoin",
      title: "Stablecoins face increased scrutiny from regulators",
      description: "The stability and reserves of stablecoins are under the microscope as regulators consider new rules to ensure their reliability and protect the financial system.",
      date: "August 1, 2025",
      author: "Lisa Adams",
      imageUrl: "https://placehold.co/600x400/8b5cf6/FFFFFF?text=Stablecoin+Scrutiny",
    },
  ],
};


// Simple Modal component implementation to make the code self-contained
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-start p-4 z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 p-8 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform scale-95 transition-transform duration-300 relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing modal on inner click
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};


// Simple ButtonCard component implementation using standard buttons
const ButtonCard = ({ onClick, background, children }) => {
  return (
    <button
      onClick={onClick}
      className={`${background} transition-all duration-300 ease-in-out`}
    >
      {children}
    </button>
  );
};




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
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-purple-800 bg-opacity-70 text-white p-2 rounded-full shadow-lg z-10 hover:bg-purple-600 transition-colors duration-300"
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
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-purple-800 bg-opacity-70 text-white p-2 rounded-full shadow-lg z-10 hover:bg-purple-600 transition-colors duration-300"
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
    setVisibleCount((prevCount) => Math.min(prevCount + 8, items.length));
  };

  const handleLoadLess = () => {
    setVisibleCount(initialDisplayCount);
    if (listRef.current) {
      listRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderItem = (item) => {
    const handleItemClick = () => {
      setModalContent({
        title: item.title,
        content: item.description || `This is a ${itemType} article about "${item.title}".\n\nDate: ${item.date || 'N/A'}`,
        imageUrl: item.imageUrl,
      });
    };

    if (itemType === "recommended") {
      return (
        <div
          key={item.id}
          className="flex items-center p-2 hover:bg-purple-700 rounded-md transition-colors duration-200 cursor-pointer"
          onClick={handleItemClick}
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
          onClick={handleItemClick}
        >
          <span className="text-gray-500 text-sm mr-2">{item.id}.</span>
          <span className="text-gray-300 text-sm flex-grow line-clamp-2">
            {item.title}
          </span>
        </div>
      );
    } else if (itemType === "latestNews" || itemType === "pressReleases") {
      return (
        <li
          key={item.id}
          className="cursor-pointer hover:text-purple-400 transition-colors duration-200"
          onClick={handleItemClick}
        >
          <p className="text-sm font-semibold line-clamp-2">
            {item.title}
          </p>
          <span className="text-xs text-gray-500">{item.date}</span>
        </li>
      );
    }
    return null;
  };

  return (
    <div className="bg-purple-mix p-4 rounded-lg shadow-xl h-full flex flex-col">
      <h2 className="text-white text-lg font-bold font-mono mb-4 border-b border-gray-700 pb-2">
        {title}
      </h2>
      <div
        ref={listRef}
        className="flex-grow overflow-y-auto custom-scrollbar pr-2"
        style={{ height: "250px" }}
      >
        <ul className="space-y-3">
          {items.slice(0, visibleCount).map(renderItem)}
        </ul>
      </div>
      <div className="flex justify-center space-x-4 mt-4">
        {visibleCount < items.length && (
          <ButtonCard
            onClick={handleSeeMore}
            background="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300 text-sm font-semibold font-mono"
          >
            See More
          </ButtonCard>
        )}
        {visibleCount > initialDisplayCount && (
          <ButtonCard
            onClick={handleLoadLess}
            background="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300 text-sm font-semibold font-mono"
          >
            Load Less
          </ButtonCard>
        )}
      </div>
    </div>
  );
};


// Main App Component
const HomeNewsSHow = () => {
  const [modalContent, setModalContent] = useState(null);
  const [visibleNewsCards, setVisibleNewsCards] = useState(6);
  const [currentChainData] = useState(HARDCODED_DATA);
  const [activeCategory, setActiveCategory] = useState("ALL");

  const categories = ["ALL", "Bitcoin", "Ethereum", "NFTs", "Web3", "DeFi", "Layer2", "Altcoin", "Mining"];

  const handleLoadMoreNewsCards = () => {
    if (
      currentChainData &&
      visibleNewsCards < currentChainData.newsCards.length
    ) {
      setVisibleNewsCards((prevCount) => prevCount + 6);
    }
  };

  const handleLoadLessNewsCards = () => {
    setVisibleNewsCards(4);
  };

  const filteredNews = (items) => {
    if (activeCategory === "ALL") {
      return items;
    }
    return items.filter((item) => item.category === activeCategory);
  };

  return (
    <div className=" text-white p-4 font-sans gap-2 flex flex-col">
      <header className="text-start px-4  border-b-0 rounded-t-2xl bg-green-mix py-6">
        <h1 className="lg:text-4xl text-xl font-bold mb-2">
          Today News
        </h1>
        <div className="flex flex-wrap justify-start items-center px-2 gap-2 mt-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
                activeCategory === category
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-purple-500 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </header>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-2 flex-grow">
        <div className="lg:col-span-1 flex flex-col space-y-6">
          <ScrollableList
            title="Latest News"
            items={filteredNews(currentChainData.latestNews)}
            setModalContent={setModalContent}
            itemType="latestNews"
            initialDisplayCount={8}
          />
          <ScrollableList
            title="Press & Market Release"
            items={filteredNews(currentChainData.pressReleases)}
            setModalContent={setModalContent}
            itemType="pressReleases"
            initialDisplayCount={8}
          />
        </div>
        <div className="lg:col-span-2 flex flex-col space-y-6">
          <NewsSlider newsItems={filteredNews(currentChainData.newsSlider)} />
          <div className="bg-green-mix p-4 rounded-lg shadow-xl flex-grow">
            <h2 className="text-white text-lg font-bold font-mono mb-4 border-b border-gray-700 pb-2">
              All News
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
              {filteredNews(currentChainData.newsCards)
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
              {visibleNewsCards < filteredNews(currentChainData.newsCards).length && (
                <ButtonCard
                  onClick={handleLoadMoreNewsCards}
                  background="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300 text-sm font-semibold font-mono"
                >
                  See More
                </ButtonCard>
              )}
              {visibleNewsCards > 8 && (
                <ButtonCard
                  onClick={handleLoadLessNewsCards}
                  background="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300 text-sm font-semibold font-mono"
                >
                  Load Less
                </ButtonCard>
              )}
            </div>
          </div>
        </div>
        <div className="lg:col-span-1 flex flex-col space-y-6">
          <div className="bg-purple-800 p-4 rounded-lg shadow-xl">
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
          <ScrollableList
            title="Recommended"
            items={filteredNews(currentChainData.recommendedList)}
            setModalContent={setModalContent}
            itemType="recommended"
            initialDisplayCount={8}
          />
          <ScrollableList
            title="Most Read"
            items={filteredNews(currentChainData.mostRead)}
            setModalContent={setModalContent}
            itemType="mostRead"
            initialDisplayCount={8}
          />
        </div>
      </div>
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
    </div>
  );
}

export default HomeNewsSHow;
