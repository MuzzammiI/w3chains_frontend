import { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import ButtonCard from "../../components/ButtonCard.jsx";
import ScrollToTopButton from "../../components/ScrollToTopButton.jsx";
import Modal from "../../components/Modal";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { getPlatformsChainData } from "./platfromsData.js"; // Import the centralized platforms data
import { ChevronLeft, ChevronRight } from "lucide-react";

// Platform Card - Reused for Buy/Sell and Recent Chains Platforms

const PlatformCard = ({ platform, setModalContent }) => (
  <a
    href={platform.link || "#"} // Use '#' if no link provided
    target="_blank"
    rel="noopener noreferrer"
    className="flex flex-col items-center text-center bg-purple-800 p-4 rounded-lg shadow-md hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 cursor-pointer flex-shrink-0 w-40" // Fixed width for slider
    onClick={(e) => {
      if (platform.link) {
        // Allow link to open if it exists, otherwise open modal
      } else {
        e.preventDefault(); // Prevent default link behavior for modal
      }

      setModalContent({
        title: platform.name,

        content: `Type: ${platform.type}\n\n${
          platform.description || "No description available."
        }`,

        imageUrl: platform.logo,

        socialLinks: platform.link ? { website: platform.link } : null,
      });
    }}
  >
    <img
      src={platform.logo}
      alt={`${platform.name} Logo`}
      className="w-16 h-16 rounded-full mb-3 object-cover border border-gray-600"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "https://placehold.co/60x60/4A4A4A/FFFFFF?text=P";
      }}
    />

    <h3 className="text-md font-bold font-mono text-white truncate w-full">
      {platform.name}
    </h3>

    <p className="text-xs text-gray-400">{platform.type}</p>
  </a>
);

PlatformCard.propTypes = {
  platform: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    type: PropTypes.string,
    description: PropTypes.string,
    logo: PropTypes.string,
    link: PropTypes.string,
  }).isRequired,
  setModalContent: PropTypes.func.isRequired,
};

// Generic Sliding Carousel for Platforms

const PlatformSlidingCarousel = ({
  title,
  platforms,
  setModalContent,
  itemsPerPage = 4,
}) => {
  const carouselRef = useRef(null);

  const scrollIntervalRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const [canScrollRight, setCanScrollRight] = useState(true); // Right disabled at start

  const checkScrollability = useCallback(() => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

      setCanScrollLeft(scrollLeft > 0);

      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  }, []);

  const startAutoScroll = useCallback(() => {
    if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);

    scrollIntervalRef.current = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

        const scrollAmount = clientWidth / itemsPerPage;

        if (scrollLeft + clientWidth >= scrollWidth - 1) {
          // -1 to handle floating point

          carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          carouselRef.current.scrollBy({
            left: scrollAmount,

            behavior: "smooth",
          });
        }
      }

      checkScrollability(); // Update scroll buttons after auto-scroll
    }, 3000);
  }, [itemsPerPage, checkScrollability]);

  const stopAutoScroll = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);

      scrollIntervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoScroll();

    // Re-check scrollability on mount and resize

    const observer = new ResizeObserver(checkScrollability);

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => {
      stopAutoScroll();

      if (carouselRef.current) {
        observer.unobserve(carouselRef.current);
      }
    };
  }, [startAutoScroll, checkScrollability]);

  const scrollCarousel = (direction) => {
    stopAutoScroll();

    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth / itemsPerPage;

      if (direction === "left") {
        carouselRef.current.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      } else {
        carouselRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }

    // Give a small delay before re-checking scrollability to allow smooth scroll to finish

    setTimeout(() => {
      checkScrollability();

      startAutoScroll(); // Restart auto-scroll after manual interaction
    }, 500);
  };

  return (
    <div className="bg-green-mix bg-opacity-70 p-4 rounded-lg shadow-xl relative">
      <h2 className="text-white text-lg font-bold font-mono mb-4 border-b border-gray-700 pb-2">
        {title}
      </h2>

      <div className="relative">
        <button
          onClick={() => scrollCarousel("left")}
          disabled={!canScrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-purple-900 text-white p-1 rounded-full shadow-lg z-10 hover:bg-pruple-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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

        <div
          ref={carouselRef}
          className="flex overflow-x-auto custom-scrollbar-horizontal py-2 space-x-4 scroll-smooth"
          onScroll={checkScrollability} // Update buttons on user scroll
          onMouseEnter={stopAutoScroll}
          onMouseLeave={startAutoScroll}
        >
          {platforms.map((platform) => (
            <PlatformCard
              key={platform.id}
              platform={platform}
              setModalContent={setModalContent}
            />
          ))}
        </div>

        <button
          onClick={() => scrollCarousel("right")}
          disabled={!canScrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-purple-900 text-white p-1 rounded-full shadow-lg z-10 hover:bg-purple-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
    </div>
  );
};

PlatformSlidingCarousel.propTypes = {
  title: PropTypes.string.isRequired,
  platforms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string,
      type: PropTypes.string,
      description: PropTypes.string,
      logo: PropTypes.string,
      link: PropTypes.string,
    })
  ).isRequired,
  setModalContent: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number,
};

// Transaction Fees Chart

const TransactionFeesChart = ({ fees, chainName }) => {
  // Prepare data for the chart: each platform's fee

  const chartData = fees.map((f) => ({
    name: f.platform.split(" ")[0], // Use first word for brevity

    fee: f.fee,
  }));

  return (
    <div className="bg-green-mix bg-opacity-70 p-4 rounded-lg shadow-xl">
      <h2 className="text-white text-lg font-bold font-mono mb-4 border-b border-gray-700 pb-2">
        Transaction Fees on {chainName}
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />

          <XAxis dataKey="name" stroke="#CBD5E0" />

          <YAxis
            stroke="#CBD5E0"
            label={{
              value: "Fee ($)",
              angle: -90,
              position: "insideLeft",
              fill: "#CBD5E0",
            }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#2D3748",
              border: "none",
              borderRadius: "8px",
            }}
            itemStyle={{ color: "#E2E8F0" }}
            labelStyle={{ color: "#A0AEC0" }}
            formatter={(value, name) => [
              `$${value.toFixed(4)}`,
              name === "fee" ? "Fee" : name,
            ]}
          />

          <Legend wrapperStyle={{ color: "#E2E8F0", paddingTop: "10px" }} />

          <Bar dataKey="fee" fill="#82ca9d" name="Fee" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

TransactionFeesChart.propTypes = {
  fees: PropTypes.arrayOf(
    PropTypes.shape({
      platform: PropTypes.string,
      fee: PropTypes.number,
    })
  ).isRequired,
  chainName: PropTypes.string.isRequired,
};

// Recent Transactions Table (Senders/Receivers) - Reused

const RecentTransactionsTable = ({ title, transactions, currencySymbol }) => {
  const [visibleCount, setVisibleCount] = useState(5);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  const handleLoadLess = () => {
    setVisibleCount(5);
  };

  return (
    <div className="bg-green-mix bg-opacity-70 p-4 rounded-lg shadow-xl">
      <h2 className="text-white text-lg font-bold font-mono mb-4 border-b border-gray-700 pb-2">
        {title}
      </h2>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-purple-800">
            <tr>
              <th
                scope="col"
                className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Address
              </th>

              <th
                scope="col"
                className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Value ({currencySymbol})
              </th>

              <th
                scope="col"
                className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Date
              </th>
            </tr>
          </thead>

          <tbody className=" divide-y divide-gray-700">
            {transactions.slice(0, visibleCount).map((tx) => (
              <tr
                key={tx.id}
                className="hover:bg-purple-700 transition-colors duration-200"
              >
                <td className="px-4 py-3 whitespace-nowrap text-sm text-purple-400 hover:underline cursor-pointer">
                  {tx.address.substring(0, 6)}...
                  {tx.address.substring(tx.address.length - 4)}
                </td>

                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                  {tx.value} {tx.type}
                </td>

                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                  {tx.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center space-x-4 mt-4">
        {visibleCount < transactions.length && (
          <ButtonCard
            onClick={handleLoadMore}
            background="w-full px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300 flex items-center justify-center text-sm font-semibold font-mono"
            icon={ChevronRight}
            iconPosition="right"
            size="small"
            animationType="glow"
          >
            Load More
          </ButtonCard>
        )}

        {visibleCount > 5 && (
          <ButtonCard
            onClick={handleLoadLess}
            background="w-full px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300 flex items-center justify-center text-sm font-semibold font-mono"
            icon={ChevronLeft}
            iconPosition="left"
            size="small"
            animationType="glow"
          >
            Load Less
          </ButtonCard>
        )}
      </div>
    </div>
  );
};

RecentTransactionsTable.propTypes = {
  title: PropTypes.string.isRequired,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      address: PropTypes.string,
      value: PropTypes.number,
      type: PropTypes.string,
      date: PropTypes.string,
    })
  ).isRequired,
  currencySymbol: PropTypes.string.isRequired,
};

// Top Holders List - Reused

const TopHoldersList = ({ holders, setModalContent }) => {
  const [visibleCount, setVisibleCount] = useState(5);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  const handleLoadLess = () => {
    setVisibleCount(5);
  };

  return (
    <div className="bg-green-mix bg-opacity-70 p-4 rounded-lg shadow-xl h-full flex flex-col">
      <h2 className="text-white text-lg font-bold font-mono mb-4 border-b border-gray-700 pb-2">
        Top Holders
      </h2>

      <div className="flex-grow overflow-y-auto custom-scrollbar pr-2">
        <ul className="space-y-3">
          {holders.slice(0, visibleCount).map((holder) => (
            <li
              key={holder.id}
              className="flex items-center p-2 hover:bg-purple-700 rounded-md transition-colors duration-200 cursor-pointer"
              onClick={() =>
                setModalContent({
                  title: `Holder: ${holder.address.substring(0, 10)}...`,

                  content: `Address: ${holder.address}\nBalance: ${holder.balance} units\n\nThis is one of the top currency holders on this chain.`,

                  imageUrl: holder.imageUrl,
                })
              }
            >
              <img
                src={holder.imageUrl}
                alt={`Holder ${holder.id}`}
                className="w-10 h-10 rounded-full object-cover mr-3 border border-purple-600"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/40x40/4A4A4A/FFFFFF?text=H";
                }}
              />

              <div>
                <p className="text-sm font-semibold text-white truncate w-32 sm:w-auto">
                  {holder.address.substring(0, 10)}...
                </p>

                <p className="text-xs text-gray-300">
                  Balance: {holder.balance}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center space-x-4 mt-4">
        {visibleCount < holders.length && (
          <ButtonCard
            onClick={handleLoadMore}
            background="w-full px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300 flex items-center justify-center text-sm font-semibold font-mono"
            icon={ChevronRight}
            iconPosition="right"
            size="small"
            animationType="glow"
          >
            Load More
          </ButtonCard>
        )}

        {visibleCount > 5 && (
          <ButtonCard
            onClick={handleLoadLess}
            background="w-full px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300 flex items-center justify-center text-sm font-semibold font-mono"
            icon={ChevronLeft}
            iconPosition="left"
            size="small"
            animationType="glow"
          >
            Load Less
          </ButtonCard>
        )}
      </div>
    </div>
  );
};

TopHoldersList.propTypes = {
  holders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      address: PropTypes.string,
      balance: PropTypes.number,
      imageUrl: PropTypes.string,
    })
  ).isRequired,
  setModalContent: PropTypes.func.isRequired,
};

// Trending Exchanges List - Reused

const TrendingExchangesList = ({ exchanges }) => {
  const [visibleCount, setVisibleCount] = useState(5);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  const handleLoadLess = () => {
    setVisibleCount(5);
  };

  return (
    <div className="bg-green-mix bg-opacity-70 p-4 rounded-lg shadow-xl h-full flex flex-col">
      <h2 className="text-white text-lg font-bold font-mono mb-4 border-b border-gray-700 pb-2">
        Trending Exchanges
      </h2>

      <div className="flex-grow overflow-y-auto custom-scrollbar pr-2">
        <ul className="space-y-3">
          {exchanges.slice(0, visibleCount).map((exchange) => {
            const isLoss = exchange.change && exchange.change < 0;

            const changeColor = isLoss ? "text-red-500" : "text-green-500";

            const changeIcon = isLoss ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 inline-block ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 inline-block ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            );

            return (
              <li
                key={exchange.id}
                className="flex items-center p-2 hover:bg-purple-700 rounded-md transition-colors duration-200"
              >
                <img
                  src={exchange.imageUrl}
                  alt={`${exchange.name} Logo`}
                  className="w-10 h-10 rounded-full object-cover mr-3 border border-purple-600"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/40x40/4A4A4A/FFFFFF?text=E";
                  }}
                />

                <div className="flex-grow">
                  <p className="text-sm font-semibold text-white">
                    {exchange.name}
                  </p>

                  <p className="text-xs text-gray-300">
                    Volume: {exchange.volume}
                  </p>
                </div>

                <p className={`text-sm font-bold ${changeColor}`}>
                  {(exchange.change * 100).toFixed(2)}%{changeIcon}
                </p>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex justify-center space-x-4 mt-4">
        {visibleCount < exchanges.length && (
          <ButtonCard
            onClick={handleLoadMore}
            background="w-full px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300 flex items-center justify-center text-sm font-semibold font-mono"
            icon={ChevronRight}
            iconPosition="right"
            size="small"
            animationType="glow"
          >
            Load More
          </ButtonCard>
        )}

        {visibleCount > 5 && (
          <ButtonCard
            onClick={handleLoadLess}
            background="w-full px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300 flex items-center justify-center text-sm font-semibold font-mono"
            icon={ChevronLeft}
            iconPosition="left"
            size="small"
            animationType="glow"
          >
            Load Less
          </ButtonCard>
        )}
      </div>
    </div>
  );
};

TrendingExchangesList.propTypes = {
  exchanges: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string,
      volume: PropTypes.number,
      change: PropTypes.number,
      imageUrl: PropTypes.string,
    })
  ).isRequired,
};

// Volume Chart - Reused

const VolumeChart = ({ data, chainName }) => {
  const chartKeys =
    data.length > 0 ? Object.keys(data[0]).filter((key) => key !== "name") : [];

  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7300",
    "#00bcd4",
    "#ff4081",
  ]; // More colors for multiple bars

  return (
    <div className="bg-green-mix bg-opacity-70 p-4 rounded-lg shadow-xl">
      <h2 className="text-white text-lg font-bold font-mono mb-4 border-b border-gray-700 pb-2">
        Exchange Volume Trends on {chainName}
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />

          <XAxis dataKey="name" stroke="#CBD5E0" />

          <YAxis stroke="#CBD5E0" />

          <Tooltip
            contentStyle={{
              backgroundColor: "#2D3748",
              border: "none",
              borderRadius: "8px",
            }}
            itemStyle={{ color: "#E2E8F0" }}
            labelStyle={{ color: "#A0AEC0" }}
            formatter={(value, name) => [`${value.toLocaleString()} USD`, name]}
          />

          <Legend wrapperStyle={{ color: "#E2E8F0", paddingTop: "10px" }} />

          {chartKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              fill={colors[index % colors.length]}
              name={key}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

VolumeChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  chainName: PropTypes.string.isRequired,
};

// Main PlatformsDashboard Component

export default function PlatformsDashboard({ chainName = "Ethereum" }) {
  const [modalContent, setModalContent] = useState(null);

  const [currentChainData, setCurrentChainData] = useState(null);

  // Effect to load chain data when chainName prop changes

  useEffect(() => {
    const data = getPlatformsChainData(chainName);

    if (data) {
      setCurrentChainData(data);
    } else {
      console.error(`No platform data found for chain: ${chainName}`);

      setCurrentChainData(null);
    }
  }, [chainName]);

  if (!currentChainData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white text-2xl">
        Loading or platform data for {chainName} not found...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen font-sans bg-cover bg-fixed bg-center text-white"
      style={{
        backgroundImage: `url(${currentChainData.backgroundImage})`,

        backgroundColor: "#393939",

        backgroundBlendMode: "overlay",

        backgroundOpacity: "0.4",

        backgroundSize: "cover",

        backgroundPosition: "center",

        backdropFilter: "blur(8px)", // Apply blur to the background image

        WebkitBackdropFilter: "blur(8px)", // For Safari compatibility
      }}
    >
      <div className="bg-opacity-90 min-h-screen p-4">
        {" "}
        {/* Overlay for content readability */}
        <header className="text-center py-6">
          <h1 className="text-4xl font-bold font-mono mb-2">
            <img
              src={currentChainData.logo}
              alt={`${currentChainData.name} Logo`}
              className="inline-block w-10 h-10 mr-3 rounded-full"
            />
            {currentChainData.name} Platforms Dashboard
          </h1>

          <p className="text-gray-400 text-lg">
            Manage & Analyze Your {currentChainData.name} Assets
          </p>
        </header>
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Buy/Sell Platforms - Now a Slider */}

          <div className="lg:col-span-3">
            <PlatformSlidingCarousel
              title={`Buy/Sell ${currentChainData.name}`}
              platforms={currentChainData.buySellPlatforms}
              setModalContent={setModalContent}
              itemsPerPage={2} // Show 2 platforms at a time in the slider
            />
          </div>

          {/* Transaction Fees Comparison - Now a Chart */}

          <div className="lg:col-span-3">
            <TransactionFeesChart
              fees={currentChainData.transactionFees}
              chainName={currentChainData.name}
            />
          </div>

          {/* Recent Senders */}

          <div className="lg:col-span-2">
            <RecentTransactionsTable
              title={`Recent ${currentChainData.symbol} Senders`}
              transactions={currentChainData.recentTransactions.senders}
              currencySymbol={currentChainData.symbol}
            />
          </div>

          {/* Recent Receivers */}

          <div className="lg:col-span-1">
            <RecentTransactionsTable
              title={`Recent ${currentChainData.symbol} Receivers`}
              transactions={currentChainData.recentTransactions.receivers}
              currencySymbol={currentChainData.symbol}
            />
          </div>

          {/* Top Holders */}

          <div className="lg:col-span-1">
            <TopHoldersList
              holders={currentChainData.topHolders}
              setModalContent={setModalContent}
            />
          </div>

          {/* Trending Exchanges */}

          <div className="lg:col-span-2">
            <TrendingExchangesList
              exchanges={currentChainData.trendingExchanges}
            />
          </div>

          {/* Volume Chart */}

          <div className="lg:col-span-3">
            <VolumeChart
              data={currentChainData.volumeChartData}
              chainName={currentChainData.name}
            />
          </div>

          {/* New: Recent Chains Platform Section (Slider) */}

          <div className="lg:col-span-3">
            <PlatformSlidingCarousel
              title="Recent Chains Platforms"
              platforms={currentChainData.recentChainsPlatforms}
              setModalContent={setModalContent}
              itemsPerPage={4} // Show 4 platforms at a time in this slider
            />
          </div>
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

            {modalContent.socialLinks && modalContent.socialLinks.website && (
              <a
                href={modalContent.socialLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
              >
                Visit Website
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            )}
          </>
        )}
      </Modal>
      <ScrollToTopButton />
    </div>
  );
}

PlatformsDashboard.propTypes = {
  chainName: PropTypes.string,
};
