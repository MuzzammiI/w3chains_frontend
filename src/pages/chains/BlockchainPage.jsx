import { useState, useEffect, useRef, useCallback } from "react";
import { getChainData } from "./allchainsData"; // Import the centralized data
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import ButtonCard from "../../components/ButtonCard";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import Modal from "../../components/Modal";

// Header Component with Pricing - Now takes chainData as prop
const Header = ({ chainData }) => {
  if (!chainData) return null; // Defensive check

  return (
    <header className=" p-4 text-white shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <img
            src={`https://placehold.co/40x40/4A4A4A/FFFFFF?text=${chainData.symbol}`} // Dynamic logo based on symbol
            alt={`${chainData.name} Logo`}
            className="rounded-full"
          />
          <span className="text-lg font-bold font-mono">{chainData.name}</span>
        </div>
        <div className="flex flex-wrap justify-start md:justify-end gap-x-3 gap-y-1 text-sm">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-400 text-sm">Price</span>
            <span className="font-semibold font-mono text-green-400">
              $
              {chainData.price.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2 11a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1v-2z" />
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm5 1a1 1 0 100 2h2a1 1 0 100-2H9z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-400 text-sm">Market Cap</span>
            <span className="font-semibold font-mono">
              $
              {chainData.marketCap.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              B
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-400 text-sm">Rank</span>
            <span className="font-semibold font-mono">#{chainData.rank}</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 6a3 3 0 013-3h10a2 2 0 012 2v8a2 2 0 01-2 2H6.55a.5.5 0 00-.27.139l-2 2.001-.01.01a.5.5 0 01-.707.002L3 16.99l-.001-.001a.5.5 0 01.002-.707A.5.5 0 003 16V6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-400 text-sm">Volume (24h)</span>
            <span className="font-semibold font-mono">
              $
              {chainData.volume24h.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              B
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M11 3a1 1 0 100 2h2a1 1 0 100-2h-2z" />
              <path
                fillRule="evenodd"
                d="M4 6a2 2 0 012-2h4a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm3 1a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h.01a1 1 0 100-2H10zm3 0a1 1 0 000 2h.01a1 1 0 100-2H13z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M4 12a2 2 0 012-2h4a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm3 1a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h.01a1 1 0 100-2H10zm3 0a1 1 0 000 2h.01a1 1 0 100-2H13z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-400 text-sm">Supply</span>
            <span className="font-semibold font-mono">
              {chainData.supply.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              M
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  chainData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    marketCap: PropTypes.number.isRequired,
    rank: PropTypes.number.isRequired,
    volume24h: PropTypes.number.isRequired,
    supply: PropTypes.number.isRequired,
  }).isRequired,
};

const Navbar = ({
  activeItem,
  setActiveItem,
  setModalContent,
  sectionRefs,
}) => {
  const navigate = useNavigate();

  const navItems = [
    { name: "Overview", ref: sectionRefs.overviewRef },
    { name: "News", to: "news" },
    { name: "NFTs", to: "nft" },
    { name: "Exchange/Platforms", to: "platforms" },
    { name: "Founders", ref: sectionRefs.foundersRef },
    { name: "FAQs", ref: sectionRefs.faqsRef },
    { name: "Related Chains", ref: sectionRefs.relatedChainsRef },
    { name: "Dapps/Projects", to: "dapps" },
    { name: "Press & Market Release", to: "press&market" },
    { name: "All Reports", to: "reports" },
    { name: "Learn", to: "learn" },
    { name: "Community", to: "community" },
  ];

  const handleNavClick = (item) => {
    setActiveItem(item.name);
    setModalContent(null); // Clear any open modal

    if (item.ref && item.ref.current) {
      item.ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (item.to) {
      navigate(item.to);
    } else {
      console.log(`Navigating to ${item.name} (no direct scroll target)`);
    }
  };

  return (
    <nav className="sticky top-[30px] z-50  p-4 shadow-lg border-t border-purple-500  rounded-b-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <ul className="flex flex-wrap justify-left md:justify-start space-x-4 space-y-2 md:space-x-6 w-full">
          {navItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => handleNavClick(item)}
                className={`text-white text-sm  font-mono cursor-pointer border  border-purple-700  px-4 py-2 rounded-md transition-all duration-300 ease-in-out
                  ${
                    activeItem === item.name
                      ? "bg-purple-600 shadow-md transform scale-105"
                      : "hover:text-purple-300"
                  }`}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  activeItem: PropTypes.string.isRequired,
  setActiveItem: PropTypes.func.isRequired,
  setModalContent: PropTypes.func.isRequired,
  sectionRefs: PropTypes.object.isRequired,
};

// News Card Component - Generic
const NewsCard = ({ news, onClick }) => {
  return (
    <div
      className="border border-purple-500 rounded-lg p-4 m-1 mb-4 cursor-pointer shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 ease-in-out"
      onClick={() =>
        onClick({
          title: news.title,
          content: news.content,
          imageUrl: news.imageUrl,
          tags: news.tags,
        })
      }
    >
      <div className="flex items-center space-x-4">
        <img
          src={news.imageUrl}
          alt={news.title}
          className="w-16 h-16 rounded-md object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/100x60/4A4A4A/FFFFFF?text=News";
          }}
        />
        <div>
          <h3 className="text-white text-sm font-semibold font-mono mb-1">
            {news.title}
          </h3>
          <div className="flex flex-wrap gap-2 mt-1">
            {news.tags &&
              news.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-purple-600 text-gray-300 text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

NewsCard.propTypes = {
  news: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

// FAQ Item Component - Generic
const FAQItem = ({ faq, isOpen, toggleFAQ }) => {
  return (
    <div className="mb-4 border border-purple-500 rounded-lg shadow-md overflow-hidden">
      <button
        className="w-full text-left cursor-pointer p-4 flex justify-between items-center text-white font-semibold font-mono text-sm hover:bg-purple-600 transition-colors duration-300"
        onClick={() => toggleFAQ(faq.id)}
      >
        {faq.question}
        <span className="transform transition-transform duration-300">
          {isOpen ? (
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
                d="M5 15l7-7 7 7"
              />
            </svg>
          ) : (
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
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 p-4 pt-0" : "max-h-0 opacity-0"
        }`}
      >
        <div className="h-full overflow-y-auto custom-scrollbar pr-2">
          <p className="text-gray-300">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
};

FAQItem.propTypes = {
  faq: PropTypes.shape({
    id: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleFAQ: PropTypes.func.isRequired,
};

// Simple Chart Component (Placeholder) - Now takes chainName for dynamic title
const PriceChart = ({ chainName }) => {
  const [timeframe, setTimeframe] = useState("1w"); // Default to 1 week
  const [chartData, setChartData] = useState([]);

  // Mock data for different timeframes
  const generateMockChartData = useCallback((tf) => {
    // This could be dynamic based on chainName as well if you had specific chart data per chain
    switch (tf) {
      case "24hr":
        return [
          { x: 0, y: 40 },
          { x: 20, y: 38 },
          { x: 40, y: 42 },
          { x: 60, y: 39 },
          { x: 80, y: 41 },
          { x: 100, y: 40 },
        ];
      case "1d":
        return [
          { x: 0, y: 40 },
          { x: 20, y: 38 },
          { x: 40, y: 42 },
          { x: 60, y: 39 },
          { x: 80, y: 41 },
          { x: 100, y: 40 },
        ];
      case "1w":
        return [
          { x: 0, y: 35 },
          { x: 20, y: 25 },
          { x: 40, y: 30 },
          { x: 60, y: 20 },
          { x: 80, y: 28 },
          { x: 100, y: 18 },
        ];
      case "1y":
        return [
          { x: 0, y: 10 },
          { x: 20, y: 20 },
          { x: 40, y: 15 },
          { x: 60, y: 30 },
          { x: 80, y: 25 },
          { x: 100, y: 35 },
        ];
      default:
        return [
          { x: 0, y: 35 },
          { x: 20, y: 25 },
          { x: 40, y: 30 },
          { x: 60, y: 20 },
          { x: 80, y: 28 },
          { x: 100, y: 18 },
        ];
    }
  }, []);

  useEffect(() => {
    setChartData(generateMockChartData(timeframe));
  }, [timeframe, generateMockChartData]);

  if (chartData.length === 0) {
    return (
      <div className="border border-purple-500 rounded-lg p-4 mb-6 shadow-md h-64 flex items-center justify-center">
        <p className="text-white">Loading chart data...</p>
      </div>
    );
  }

  const points = chartData.map((p) => `${p.x},${p.y}`).join(" ");
  const areaPath = `M${chartData[0].x},${chartData[0].y} L${points} L${
    chartData[chartData.length - 1].x
  },50 L${chartData[0].x},50 Z`;

  return (
    <div className="border border-purple-500 rounded-lg p-4 mb-6 shadow-md">
      <h3 className="text-white text-xl font-semibold font-mono mb-4">
        {chainName} Price Chart
      </h3>
      <div className="flex justify-center mb-4 space-x-2">
        {["24hr", "1d", "1w", "1y"].map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            className={`px-4 py-2 rounded-md text-sm font-medium font mono transition-colors duration-200
              ${
                timeframe === tf
                  ? "bg-purple-600 text-white"
                  : "bg-purple-600 text-gray-300 hover:bg-purple-500"
              }`}
          >
            {tf}
          </button>
        ))}
      </div>
      <div className="w-full h-64 bg-purple-800 rounded-md flex items-center justify-center">
        <svg viewBox="0 0 100 50" className="w-full h-full">
          {/* Grid lines */}
          <line
            x1="10"
            y1="40"
            x2="90"
            y2="40"
            stroke="#555"
            strokeWidth="0.2"
          />
          <line
            x1="10"
            y1="30"
            x2="90"
            y2="30"
            stroke="#555"
            strokeWidth="0.2"
          />
          <line
            x1="10"
            y1="20"
            x2="90"
            y2="20"
            stroke="#555"
            strokeWidth="0.2"
          />
          <line
            x1="10"
            y1="10"
            x2="90"
            y2="10"
            stroke="#555"
            strokeWidth="0.2"
          />

          {/* Data path */}
          <polyline
            fill="none"
            stroke={chainName === "Ethereum" ? "#4CAF50" : "#F3BA2F"} // Dynamic color based on chain
            strokeWidth="0.8"
            points={points}
          />
          {/* Area under the curve */}
          <path
            fill={chainName === "Ethereum" ? "#4CAF50" : "#F3BA2F"}
            fillOpacity="0.3"
            d={areaPath}
          />
        </svg>
      </div>
      <div className="flex justify-between text-gray-400 text-sm mt-2">
        <span>Start</span>
        <span>End</span>
      </div>
    </div>
  );
};

PriceChart.propTypes = {
  chainName: PropTypes.string.isRequired, // Chain name for dynamic title
};

// Founder Card Component - Generic
const FounderCard = ({ founder, onClick }) => {
  return (
    <div
      className="border border-purple-500 rounded-lg p-4 text-white text-center shadow-md flex flex-col items-center cursor-pointer hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 ease-in-out"
      onClick={() =>
        onClick({
          title: founder.name,
          content: founder.bio,
          imageUrl: founder.imageUrl,
          socialLinks: founder.socialLinks,
        })
      }
    >
      <img
        src={founder.imageUrl}
        alt={founder.name}
        className="w-20 h-20 rounded-full object-cover mb-3"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://placehold.co/80x80/4A4A4A/FFFFFF?text=Founder";
        }}
      />
      <h4 className="text-sm font-semibold font-mono">{founder.name}</h4>
      <p className="text-gray-300 text-sm">{founder.role}</p>
      <div className="flex justify-center space-x-3 mt-3">
        {founder.socialLinks.twitter && (
          <a
            href={founder.socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.262-.9-.964-2.174-1.568-3.593-1.568-3.407 0-6.167 2.76-6.167 6.169 0 .484.054.955.145 1.404-5.14-.259-9.695-2.723-12.742-6.463-.531.91-.837 1.97-.837 3.109 0 2.144 1.096 4.04 2.766 5.148-.203-.006-.39-.015-.583-.16v.072c0 2.984 2.127 5.474 4.939 6.04-.412.112-.843.179-1.289.179-.314 0-.615-.03-.916-.084.782 2.443 3.06 4.234 5.766 4.283-2.091 1.64-4.743 2.62-7.61 2.62-.495 0-.98-.029-1.458-.084 2.704 1.735 5.93 2.75 9.387 2.75 11.262 0 17.413-9.314 17.413-17.417 0-.266-.007-.53-.02-.795z" />
            </svg>
          </a>
        )}
        {founder.socialLinks.github && (
          <a
            href={founder.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.08-.731.084-.716.084-.716 1.192.085 1.815 1.229 1.815 1.229 1.062 1.814 2.784 1.299 3.465.996.108-.775.418-1.291.762-1.591-2.652-.299-5.433-1.326-5.433-5.932 0-1.311.465-2.381 1.235-3.221-.124-.3-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.003.404 2.293-1.552 3.3-.928 3.3-.928.653 1.653.242 2.876.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.618-2.783 5.625-5.446 5.922.429.369.816 1.096.816 2.209v3.293c0 .319.192.694.801.576c4.765-1.589 8.197-6.095 8.197-11.389 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        )}
        {founder.socialLinks.website && (
          <a
            href={founder.socialLinks.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300"
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
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
};

FounderCard.propTypes = {
  founder: PropTypes.shape({
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    socialLinks: PropTypes.shape({
      twitter: PropTypes.string,
      github: PropTypes.string,
      website: PropTypes.string,
    }),
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

// Related Chain Card Component - Generic, now looks up full data
const RelatedChainCard = ({ chain, onClick }) => {
  // Find the full chain data from the global chainsData array
  const fullChainData = getChainData(chain.name);

  if (!fullChainData) return null; // Should not happen if data is consistent

  const isLoss = chain.change < 0;
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

  // Conditional rendering for the mini-chart
  const hasChartData =
    fullChainData.chartData && fullChainData.chartData.length > 0;
  let points = "";
  let areaPath = "";

  if (hasChartData) {
    points = fullChainData.chartData.map((p) => `${p.x},${p.y}`).join(" ");
    areaPath = `M${fullChainData.chartData[0].x},${
      fullChainData.chartData[0].y
    } L${points} L${
      fullChainData.chartData[fullChainData.chartData.length - 1].x
    },30 L${fullChainData.chartData[0].x},30 Z`;
  }

  return (
    <div
      className="border border-purple-500 rounded-lg p-4 flex flex-col items-center text-center shadow-md min-w-auto flex-shrink-0 cursor-pointer hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 ease-in-out"
      onClick={() =>
        onClick({
          title: fullChainData.name,
          // Updated content to include more details for the modal
          content: (
            <>
              <p className="text-lg leading-relaxed mb-2">
                Symbol: {fullChainData.symbol}, Price: $
                {fullChainData.price.toFixed(2)}, Rank: {fullChainData.rank}
              </p>
              {fullChainData.about && ( // Using 'about' for full description in modal
                <p className="text-base leading-relaxed mb-2">
                  {fullChainData.about}
                </p>
              )}
              {fullChainData.info?.website && (
                <p className="text-base leading-relaxed">
                  Website:{" "}
                  <a
                    href={fullChainData.info.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:underline"
                  >
                    {fullChainData.info.website}
                  </a>
                </p>
              )}
              {/* Add more details here if needed from fullChainData */}
            </>
          ),
          imageUrl: `https://placehold.co/40x40/4A4A4A/FFFFFF?text=${fullChainData.symbol}`, // Use symbol for placeholder
        })
      }
    >
      <img
        src={`https://placehold.co/40x40/4A4A4A/FFFFFF?text=${fullChainData.symbol}`} // Dynamic logo based on symbol
        alt={fullChainData.name}
        className="w-12 h-12 rounded-full object-cover mb-2"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/40x40/4A4A4A/FFFFFF?text=Chain";
        }}
      />
      <h4 className="text-white text-sm font-semibold font-mono">
        {fullChainData.name}
      </h4>
      <p className="text-gray-400 text-sm">{fullChainData.symbol}</p>
      <p className="text-white text-sm font-bold font-mono mt-2">
        ${fullChainData.price.toFixed(2)}
      </p>
      <p className={`text-sm ${changeColor}`}>
        {isLoss ? "-" : "+"}
        {(Math.abs(chain.change) * 100).toFixed(2)}%{changeIcon}{" "}
        {/* Use passed 'change' prop for related chains */}
      </p>
      <p className="text-gray-400 text-xs mt-1">Rank: {fullChainData.rank}</p>
      {/* Display a truncated about section on the card itself */}
      {fullChainData.about && (
        <p className="text-gray-300 text-xs mt-2 overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
          {fullChainData.about.substring(0, 50)}...
        </p>
      )}

      {/* Mini Chart for Related Chain */}
      <div className="w-full h-5 mt-2  bg-purple-900">
        {hasChartData ? (
          <svg viewBox="0 0 100 30" className="w-full h-full">
            <polyline
              fill="none"
              stroke={fullChainData.name === "Ethereum" ? "#4CAF50" : "#F3BA2F"} // Dynamic color based on chain
              strokeWidth="0.5"
              points={points}
            />
            <path
              fill={fullChainData.name === "Ethereum" ? "#4CAF50" : "#F3BA2F"}
              fillOpacity="0.2"
              d={areaPath}
            />
          </svg>
        ) : (
          <div className="text-gray-400 text-xs flex items-center justify-center h-full">
            No chart data
          </div>
        )}
      </div>
    </div>
  );
};

RelatedChainCard.propTypes = {
  chain: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

// Price Converter - Now takes chainData as prop
const PriceConverter = ({ chainData }) => {
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(chainData.price);

  useEffect(() => {
    // Reset converted amount when chainData changes
    setConvertedAmount(amount * chainData.price);
  }, [chainData, amount]);

  const handleAmountChange = (e) => {
    const val = parseFloat(e.target.value);
    setAmount(val);
    setConvertedAmount(isNaN(val) ? 0 : val * chainData.price);
  };

  const handleConvertedAmountChange = (e) => {
    const val = parseFloat(e.target.value);
    setConvertedAmount(val);
    setAmount(isNaN(val) ? 0 : val / chainData.price);
  };

  return (
    <div className="border border-purple-500 rounded-lg p-4 shadow-md mb-6">
      <h3 className="text-white text-xl font-semibold font-mono mb-4">
        {chainData.name} Price Converter
      </h3>
      <div className="flex flex-col space-y-4">
        <div>
          <label
            htmlFor="chain-input"
            className="block text-gray-300 text-sm font-bold font-mono mb-2"
          >
            {chainData.symbol}
          </label>
          <input
            type="number"
            id="chain-input"
            value={amount.toFixed(4)}
            onChange={handleAmountChange}
            className="shadow appearance-none border border-purple-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-purple-200"
            step="0.0001"
          />
        </div>
        <div>
          <label
            htmlFor="usd-input"
            className="block text-gray-300 text-sm font-bold font-mono mb-2"
          >
            USD
          </label>
          <input
            type="number"
            id="usd-input"
            value={convertedAmount.toFixed(2)}
            onChange={handleConvertedAmountChange}
            className="shadow appearance-none border border-purple-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-purple-200"
            step="0.01"
          />
        </div>
      </div>
    </div>
  );
};

PriceConverter.propTypes = {
  chainData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

// Main Content Section - Now takes chainData as prop
const MainContent = ({ chainData, setModalContent, sectionRefs }) => {
  const [openFAQId, setOpenFAQId] = useState(chainData.faqs[0]?.id || null); // Open first FAQ by default
  const relatedChainsSliderRef = useRef(null);
  const scrollIntervalRef = useRef(null);

  const toggleFAQ = (id) => {
    setOpenFAQId(openFAQId === id ? null : id);
  };

  const startAutoScroll = useCallback(() => {
    if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
    scrollIntervalRef.current = setInterval(() => {
      if (relatedChainsSliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          relatedChainsSliderRef.current;
        const scrollAmount = 200; // Pixels to scroll

        if (scrollLeft + clientWidth >= scrollWidth) {
          // Reached end, loop back to start
          relatedChainsSliderRef.current.scrollTo({
            left: 0,
            behavior: "smooth",
          });
        } else {
          relatedChainsSliderRef.current.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
          });
        }
      }
    }, 3000); // Scroll every 3 seconds
  }, []);

  const stopAutoScroll = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll(); // Clear interval on unmount
  }, [startAutoScroll]);

  const scrollRelatedChains = (direction) => {
    stopAutoScroll(); // Stop auto-scroll on manual interaction
    if (relatedChainsSliderRef.current) {
      const scrollAmount = 200;
      if (direction === "left") {
        relatedChainsSliderRef.current.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      } else {
        relatedChainsSliderRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
    // Optionally restart auto-scroll after a delay
    setTimeout(startAutoScroll, 5000);
  };

  const handleViewAllNews = () => {
    setModalContent({
      title: `All ${chainData.name} News`,
      content: (
        <div className="space-y-4 ">
          {chainData.news.map((news) => (
            <div key={news.id} className="bg-purple-800 rounded-lg p-4">
              <h3 className="text-white text-xl font-semibold font-mono mb-2">
                {news.title}
              </h3>
              <p className="text-gray-300 text-base">{news.content}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {news.tags &&
                  news.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-purple-500 text-gray-400 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>
      ),
    });
  };

  return (
    <div className="container mx-auto p-4  grid grid-cols-1 lg:grid-cols-3 gap-3">
      {/* Left Column */}
      <div className="flex flex-col gap-3 lg:col-span-1">
        <div ref={sectionRefs.priceConverterRef}>
          <PriceConverter chainData={chainData} /> {/* Pass chainData */}
        </div>

        <div
          ref={sectionRefs.infoRef}
          className=" p-6 rounded-lg shadow-xl flex-grow"
        >
          <h2 className="text-white text-lg font-bold font-mono mb-6 border-b border-purple-700 pb-3">
            {chainData.name} Information
          </h2>
          <p className="text-gray-300 text-base leading-relaxed">
            {chainData.about.substring(0, 250)}... {/* Truncate for info box */}
          </p>
          <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
            {chainData.info?.website && (
              <li>
                <a
                  href={chainData.info.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:underline"
                >
                  Official Website
                </a>
              </li>
            )}
            {chainData.info?.whitepaper && (
              <li>
                <a
                  href={chainData.info.whitepaper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:underline"
                >
                  Whitepaper
                </a>
              </li>
            )}
            {chainData.info?.blockExplorers &&
              chainData.info.blockExplorers.map((explorer, index) => (
                <li key={index}>
                  <a
                    href={explorer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:underline"
                  >
                    Block Explorer {index > 0 ? `(${index + 1})` : ""}
                  </a>
                </li>
              ))}
            {chainData.info?.github && (
              <li>
                <a
                  href={chainData.info.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:underline"
                >
                  GitHub
                </a>
              </li>
            )}
          </ul>
        </div>

        <div
          ref={sectionRefs.foundersRef}
          className=" p-6 rounded-lg shadow-xl flex-grow"
        >
          <h2 className="text-white text-lg font-bold font-mono mb-6 border-b border-purple-700 pb-3">
            {chainData.name} Founders
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {chainData.founders.map((founder) => (
              <FounderCard
                key={founder.id}
                founder={founder}
                onClick={setModalContent}
              />
            ))}
          </div>
        </div>

        <div
          ref={sectionRefs.newsRef}
          className=" lg:p-6 md:4 rounded-lg shadow-xl flex-grow"
        >
          <h2 className="text-white text-lg font-bold font-mono mb-6 border-b border-purple-700 pb-3">
            Latest {chainData.name} News
          </h2>
          <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar mb-4">
            {chainData.news.map((news) => (
              <NewsCard key={news.id} news={news} onClick={setModalContent} />
            ))}
          </div>

          <ButtonCard
            onClick={handleViewAllNews}
            background="w-full px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300 flex items-center justify-center text-sm font-semibold font-mono"
            size="medium"
            animationType="glow"
            icon={null}
            iconPosition="right"
          >
            View All
          </ButtonCard>
        </div>
      </div>

      {/* Right Column (Chart, About, FAQs) */}
      <div className="flex flex-col gap-3 lg:col-span-2">
        <div ref={sectionRefs.chartRef}>
          <PriceChart chainName={chainData.name} /> {/* Pass chainName */}
        </div>

        <div
          ref={sectionRefs.aboutRef}
          className=" p-6 rounded-lg h-auto shadow-xl flex-grow"
        >
          <h2 className="text-white text-lg font-bold font-mono mb-6 border-b border-purple-700 pb-3">
            About {chainData.name}
          </h2>
          <p className="text-gray-300 text-base leading-relaxed mb-4">
            {chainData.about}
          </p>
        </div>

        <div
          ref={sectionRefs.faqsRef}
          className=" p-6 rounded-lg shadow-xl flex-grow"
        >
          <h2 className="text-white text-lg font-bold font-mono mb-6 border-b border-purple-700 pb-3">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {chainData.faqs.map((faq) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openFAQId === faq.id}
                toggleFAQ={toggleFAQ}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Related Chains Slider (Full Width) */}
      <div
        ref={sectionRefs.relatedChainsRef}
        className="lg:col-span-3  p-6 rounded-lg shadow-xl"
      >
        <h2 className="text-white text-lg font-bold font-mono mb-6 border-b border-purple-700 pb-3">
          Related Chains
        </h2>
        <div className="relative">
          <button
            onClick={() => scrollRelatedChains("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-purple-800 text-white p-2 rounded-full shadow-lg z-10 hover:bg-purple-600 transition-colors duration-300"
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
          <div
            ref={relatedChainsSliderRef}
            className="flex overflow-x-auto custom-scrollbar-horizontal py-2 space-x-4"
            onMouseEnter={stopAutoScroll}
            onMouseLeave={startAutoScroll}
          >
            {chainData.relatedChains.map(
              (
                chain // Using the specific chain's relatedChains
              ) => (
                <RelatedChainCard
                  key={chain.name} // Use name as key for related chains
                  chain={chain} // Pass the related chain object (which has name and change)
                  onClick={setModalContent}
                />
              )
            )}
          </div>
          <button
            onClick={() => scrollRelatedChains("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-purple-800 text-white p-2 rounded-full shadow-lg z-10 hover:bg-purple-600 transition-colors duration-300"
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
      </div>
    </div>
  );
};

MainContent.propTypes = {
  chainData: PropTypes.object.isRequired,
  setModalContent: PropTypes.func.isRequired,
  sectionRefs: PropTypes.object.isRequired,
};

// Main App Component (now renamed to BlockchainPage and accepts chainName prop)
export default function BlockchainPage({ chainName }) {
  // Default to Ethereum
  const [activeNavItem, setActiveNavItem] = useState("Overview");
  const [modalContent, setModalContent] = useState(null);
  const [currentChainData, setCurrentChainData] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState("");

  // Refs for sections (passed to Navbar and MainContent)
  const overviewRef = useRef(null);
  const priceConverterRef = useRef(null);
  const infoRef = useRef(null);
  const foundersRef = useRef(null);
  const newsRef = useRef(null);
  const chartRef = useRef(null);
  const aboutRef = useRef(null);
  const faqsRef = useRef(null);
  const relatedChainsRef = useRef(null);

  const sectionRefs = {
    overviewRef,
    priceConverterRef,
    infoRef,
    foundersRef,
    newsRef,
    chartRef,
    aboutRef,
    faqsRef,
    relatedChainsRef,
  };

  // Effect to load chain data when chainName prop changes
  useEffect(() => {
    const data = getChainData(chainName);
    if (data) {
      setCurrentChainData(data);
      const randomIndex = Math.floor(
        Math.random() * data.backgroundImages.length
      );
      setBackgroundImage(data.backgroundImages[randomIndex]);
    } else {
      console.error(`No data found for chain: ${chainName}`);
      setCurrentChainData(null); // Clear data if not found
      setBackgroundImage(""); // Clear background if not found
    }
    // Reset active nav item when chain changes
    setActiveNavItem("Overview");
  }, [chainName]); // Rerun this effect when chainName prop changes

  if (!currentChainData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-900 text-white text-2xl">
        Loading or Chain Not Found...
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen mt-5 font-sans text-white"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Background overlay with blur and no-repeat */}
      <div className="absolute inset-0 bg-purple-mix bg-cover bg-center bg-no-repeat bg-fixed backdrop-blur-xs z-0" />

      {/* Foreground content */}
      <div className="relative z-10 min-h-screen">
        <Header chainData={currentChainData} />

        <Navbar
          activeItem={activeNavItem}
          setActiveItem={setActiveNavItem}
          setModalContent={setModalContent}
          sectionRefs={sectionRefs}
        />

        <MainContent
          chainData={currentChainData}
          setModalContent={setModalContent}
          sectionRefs={sectionRefs}
        />

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
              <div className="text-sm leading-relaxed whitespace-pre-wrap">
                {modalContent.content}
              </div>
            </>
          )}
        </Modal>
        <ScrollToTopButton />
      </div>
    </div>
  );
}

BlockchainPage.propTypes = {
  chainName: PropTypes.string, // Accepts a chain name to display its dashboard
};
