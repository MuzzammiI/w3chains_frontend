import { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
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
import { getNftChainData } from "./nftData"; // Import the centralized NFT data
import ButtonCard from "../../components/ButtonCard";
import { ChevronRight } from "lucide-react";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import Modal from "../../components/Modal";



// Top Holders Carousel Component
const TopHoldersCarousel = ({ holders, setModalContent }) => {
  const carouselRef = useRef(null);
  const scrollIntervalRef = useRef(null);

  const startAutoScroll = useCallback(() => {
    if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
    scrollIntervalRef.current = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        const scrollAmount = 100; // Pixels to scroll

        if (scrollLeft + clientWidth >= scrollWidth) {
          carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          carouselRef.current.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
          });
        }
      }
    }, 3000);
  }, []);

  const stopAutoScroll = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [startAutoScroll]);

  const scrollCarousel = (direction) => {
    stopAutoScroll();
    if (carouselRef.current) {
      const scrollAmount = 200;
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
    setTimeout(startAutoScroll, 5000);
  };

  return (
    <div className="bg-green-mix bg-opacity-70 p-4 rounded-lg shadow-xl relative">
      <h2 className="text-white text-lg font-bold font-mono mb-4 border-b border-gray-700 pb-2">
        Top 10 Ethereum holders
      </h2>
      <div className="relative">
        <button
          onClick={() => scrollCarousel("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-purple-800 text-white p-1 rounded-full shadow-lg z-10 hover:bg-purple-600 transition-colors duration-300"
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
          onMouseEnter={stopAutoScroll}
          onMouseLeave={startAutoScroll}
        >
          {holders.map((holder) => (
            <div
              key={holder.id}
              className="flex flex-col items-center flex-shrink-0 w-24 text-center cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() =>
                setModalContent({
                  title: holder.name,
                  content: `Address: ${holder.address}\n\nThis is a top holder on Ethereum.`,
                  imageUrl: holder.imageUrl,
                })
              }
            >
              <img
                src={holder.imageUrl}
                alt={holder.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-green-500 mb-2"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/60x60/4A4A4A/FFFFFF?text=H";
                }}
              />
              <p className="text-white text-xs font-semibold truncate w-full">
                {holder.name}
              </p>
              <p className="text-gray-400 text-xs truncate w-full">
                {holder.address.substring(0, 6)}...
              </p>
            </div>
          ))}
        </div>
        <button
          onClick={() => scrollCarousel("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-purple-800 text-white p-1 rounded-full shadow-lg z-10 hover:bg-purple-600 transition-colors duration-300"
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

TopHoldersCarousel.propTypes = {
  holders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
  setModalContent: PropTypes.func.isRequired,
};

// Featured NFT Display Component
const FeaturedNftDisplay = ({ nfts, setModalContent }) => {
  // Changed prop to 'nfts' (array)
  const [currentNftIndex, setCurrentNftIndex] = useState(0);

  const handleNext = () => {
    setCurrentNftIndex((prevIndex) => (prevIndex + 1) % nfts.length);
  };

  const handlePrev = () => {
    setCurrentNftIndex(
      (prevIndex) => (prevIndex - 1 + nfts.length) % nfts.length
    );
  };

  const currentDisplayNft = nfts[currentNftIndex];

  if (!currentDisplayNft) return null;

  return (
    <div className="bg-green-mix bg-opacity-70 p-4 rounded-lg shadow-xl relative overflow-hidden">
      <h2 className="text-white text-lg font-bold font-mono mb-4 border-b border-gray-700 pb-2">
        Top 10 Ethereum NFTs and holders details
      </h2>
      <div className="relative w-full h-96 rounded-lg overflow-hidden mb-4">
        <img
          src={currentDisplayNft.imageUrl}
          alt={currentDisplayNft.name}
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/600x400/4A4A4A/FFFFFF?text=Featured+NFT";
          }}
        />
        <div className="absolute inset-0 bg-purple-mix opacity-60"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold font-mono">
            {currentDisplayNft.name}
          </h3>
          <p className="text-gray-300 text-sm">By {currentDisplayNft.artist}</p>
          <div className="flex items-center space-x-4 mt-2">
            <p className="text-lg font-semibold">
              Bid: {currentDisplayNft.currentBid} ETH
            </p>
            <p className="text-lg font-semibold">
              Floor: {currentDisplayNft.floorPrice} ETH
            </p>
            <p className="text-lg font-semibold">
              Vol: {currentDisplayNft.volume}M
            </p>
          </div>
        </div>
        <div className="absolute top-4 right-4 flex space-x-2">
          {currentDisplayNft.statusIndicators &&
            currentDisplayNft.statusIndicators.map((indicator) => (
              <div
                key={indicator.id}
                className="circular-progress"
                style={{
                  "--progress-value": indicator.value,
                  "--progress-color": indicator.color,
                }}
                title={`${indicator.label}: ${indicator.value}%`}
              >
                {indicator.value}%
              </div>
            ))}
        </div>
        {nfts.length > 1 && ( // Only show buttons if there's more than one NFT
          <>
            <button
              onClick={handlePrev}
              className="absolute cursor-pointer left-2 top-1/2 -translate-y-1/2 bg-purple-800 text-white p-2 rounded-full shadow-lg hover:bg-purple-600 transition-colors duration-300"
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
              className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 bg-purple-800 text-white p-2 rounded-full shadow-lg hover:bg-purple-600 transition-colors duration-300"
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
          </>
        )}
      </div>

      <ButtonCard
        onClick={() =>
          setModalContent({
            title: currentDisplayNft.name,
            content: `Artist: ${currentDisplayNft.artist}\n\nCurrent Bid: ${currentDisplayNft.currentBid} ETH\nFloor Price: ${currentDisplayNft.floorPrice} ETH\nVolume: ${currentDisplayNft.volume}M\n\nThis is a featured NFT showcasing key details.`,
            imageUrl: currentDisplayNft.imageUrl,
          })
        }
        background="w-full px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300 flex items-center justify-center text-sm font-semibold font-mono"
        size="small"
        animationType="glow"
        icon={ChevronRight}
        iconPosition="right"
      >
        View Details
      </ButtonCard>
    </div>
  );
};

FeaturedNftDisplay.propTypes = {
  nfts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      currentBid: PropTypes.string.isRequired,
      floorPrice: PropTypes.string.isRequired,
      volume: PropTypes.string.isRequired,
      statusIndicators: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          color: PropTypes.string.isRequired,
          value: PropTypes.number.isRequired,
          label: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
  setModalContent: PropTypes.func.isRequired,
};

// NFT Card Component - Adapted for different styles
const NftCard = ({ nft, onClick, type = "default" }) => {
  const isLoss = nft.change && nft.change < 0;
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

  const renderContent = () => {
    switch (type) {
      case "featuredCollection":
        return (
          <>
            <img
              src={nft.imageUrl}
              alt={nft.name}
              className="w-20 h-20 rounded-lg object-cover mb-2 border border-gray-600"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/80x80/4A4A4A/FFFFFF?text=FC";
              }}
            />
            <h4 className="text-white text-sm font-semibold font-mono truncate w-full">
              {nft.name}
            </h4>
            <p className="text-gray-400 text-xs">Floor: ${nft.floorPrice}</p>
            <p className="text-gray-400 text-xs">Vol: ${nft.volume}</p>
          </>
        );
      case "trendingToken":
      case "relatedChain": // Use same rendering for related chains
        return (
          <>
            <img
              src={nft.imageUrl}
              alt={nft.name}
              className="w-10 h-10 rounded-full object-cover mr-2"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/40x40/4A4A4A/FFFFFF?text=T";
              }}
            />
            <div className="flex-grow">
              <h4 className="text-white text-sm font-semibold font-mono">
                {nft.name}
              </h4>
              <p className="text-gray-400 text-xs">{nft.symbol}</p>
            </div>
            <div className="text-right">
              <p className="text-white text-sm font-bold">${nft.price}</p>
              <p className={`text-xs ${changeColor}`}>
                {nft.change > 0 ? "+" : ""}
                {(nft.change * 100).toFixed(2)}%{changeIcon}
              </p>
            </div>
            {nft.chartData && (
              <div className="w-full h-8 mt-2">
                <svg viewBox="0 0 100 30" className="w-full h-full">
                  <polyline
                    fill="none"
                    stroke={isLoss ? "#EF4444" : "#4CAF50"}
                    strokeWidth="0.5"
                    points={nft.chartData.map((p) => `${p.x},${p.y}`).join(" ")}
                  />
                </svg>
              </div>
            )}
          </>
        );
      case "topMover":
        return (
          <>
            <img
              src={nft.imageUrl}
              alt={nft.name}
              className="w-full h-32 object-cover rounded-lg mb-2 border border-gray-600"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/150x150/4A4A4A/FFFFFF?text=Mover";
              }}
            />
            <h4 className="text-white text-base font-semibold font-mono truncate w-full">
              {nft.name}
            </h4>
            <p className="text-gray-400 text-sm truncate w-full">
              {nft.collection}
            </p>
            <p className="text-gray-400 text-xs">Floor: ${nft.floorPrice}</p>
            <p className={`text-sm ${changeColor}`}>
              {nft.change > 0 ? "+" : ""}
              {(nft.change * 100).toFixed(2)}%{changeIcon}
            </p>
          </>
        );
      case "highestSale":
        return (
          <>
            <img
              src={nft.imageUrl}
              alt={nft.name}
              className="w-full h-40 object-cover rounded-lg mb-2 border border-gray-600"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/200x200/4A4A4A/FFFFFF?text=Sale";
              }}
            />
            <h4 className="text-white text-base font-semibold font-mono truncate w-full">
              {nft.name}
            </h4>
            <p className="text-gray-400 text-sm truncate w-full">
              {nft.collection}
            </p>
            <p className="text-green-400 text-lg font-bold mt-2">
              Sold: ${nft.salePrice}
            </p>
          </>
        );
      default: // For Top 50 NFTs, Top Mints
        return (
          <>
            <img
              src={nft.imageUrl}
              alt={nft.name}
              className="w-32 h-32 rounded-lg object-cover mb-3 border border-gray-600"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/150x150/4A4A4A/FFFFFF?text=NFT";
              }}
            />
            <h4 className="text-white text-base font-semibold font-mono mb-1 truncate w-full">
              {nft.name}
            </h4>
            <p className="text-gray-400 text-sm truncate w-full">
              {nft.collection}
            </p>
            {nft.floorPrice && (
              <p className="text-green-400 text-sm mt-2">
                Floor: ${nft.floorPrice}
              </p>
            )}
            {nft.mintPrice && (
              <p className="text-blue-400 text-sm mt-2">
                Mint: {nft.mintPrice} ETH
              </p>
            )}
          </>
        );
    }
  };

  const handleClick = () => {
    let modalContentDetails = {};
    switch (type) {
      case "featuredCollection":
        modalContentDetails = {
          title: nft.name,
          content: `Collection: ${nft.name}\nFloor Price: $${nft.floorPrice}\nVolume: $${nft.volume}\nItems: ${nft.items}\nOwners: ${nft.owners}\n\n${nft.description}`,
          imageUrl: nft.imageUrl,
        };
        break;
      case "trendingToken":
      case "relatedChain": // Use same modal content for related chains
        modalContentDetails = {
          title: nft.name,
          content: `Symbol: ${nft.symbol}\nPrice: $${nft.price}\nChange: ${(
            nft.change * 100
          ).toFixed(2)}%\n\nThis token is currently trending.`,
          imageUrl: nft.imageUrl,
        };
        break;
      case "topMover":
        modalContentDetails = {
          title: nft.name,
          content: `Collection: ${nft.collection}\nFloor Price: $${
            nft.floorPrice
          }\nChange (24h): ${(nft.change * 100).toFixed(2)}%\n\n${
            nft.description
          }`,
          imageUrl: nft.imageUrl,
        };
        break;
      case "highestSale":
        modalContentDetails = {
          title: nft.name,
          content: `Collection: ${nft.collection}\nSale Price: $${nft.salePrice}\nBuyer: ${nft.buyer}\n\n${nft.description}`,
          imageUrl: nft.imageUrl,
        };
        break;
      default:
        modalContentDetails = {
          title: nft.name,
          content: (
            <>
              <p className="text-gray-300 text-base mb-2">
                Collection: {nft.collection}
              </p>
              {nft.floorPrice && (
                <p className="text-white text-lg font-bold mb-1">
                  Floor Price: ${nft.floorPrice}
                </p>
              )}
              {nft.volume && (
                <p className="text-gray-300 text-sm mb-1">
                  Volume: ${nft.volume}
                </p>
              )}
              {nft.owners && (
                <p className="text-gray-300 text-sm mb-1">
                  Owners: {nft.owners}
                </p>
              )}
              {nft.lastSale && (
                <p className="text-gray-300 text-sm mb-1">
                  Last Sale: ${nft.lastSale}
                </p>
              )}
              {nft.listed && (
                <p className="text-gray-300 text-sm mb-1">
                  Listed: {nft.listed}
                </p>
              )}
              {nft.mintPrice && (
                <p className="text-white text-lg font-bold mb-1">
                  Mint Price: {nft.mintPrice} ETH
                </p>
              )}
              {nft.totalMinted && (
                <p className="text-gray-300 text-sm mb-1">
                  Total Minted: {nft.totalMinted}
                </p>
              )}
              {nft.mintDate && (
                <p className="text-gray-300 text-sm mt-3">{nft.description}</p>
              )}
            </>
          ),
          imageUrl: nft.imageUrl,
        };
        break;
    }
    onClick(modalContentDetails);
  };

  return (
    <div
      className={`border border-gray-700 rounded-lg p-3 shadow-md cursor-pointer hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 ease-in-out bg-purple-800 bg-opacity-70
        ${
          type === "featuredCollection"
            ? "min-w-[160px] flex-shrink-0 flex flex-col items-center text-center"
            : ""
        }
        ${
          type === "trendingToken" || type === "relatedChain"
            ? "min-w-[200px] flex-shrink-0 flex items-center justify-between p-2"
            : ""
        }
        ${
          type === "topMover"
            ? "min-w-[200px] flex-shrink-0 flex flex-col items-center text-center"
            : ""
        }
        ${
          type === "highestSale"
            ? "min-w-[220px] flex-shrink-0 flex flex-col items-center text-center"
            : ""
        }
        ${
          type === "default"
            ? "min-w-[200px] flex-shrink-0 flex flex-col items-center text-center"
            : ""
        }
      `}
      onClick={handleClick}
    >
      {renderContent()}
    </div>
  );
};

NftCard.propTypes = {
  nft: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
};

// Sliding Carousel Component - Generic for various NFT types
const SlidingCarousel = ({
  title,
  nfts,
  setModalContent,
  itemsPerPage = 4,
  cardType = "default",
}) => {
  const carouselRef = useRef(null);
  const scrollIntervalRef = useRef(null);

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
    }, 3000);
  }, [itemsPerPage]);

  const stopAutoScroll = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [startAutoScroll]);

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
    setTimeout(startAutoScroll, 5000);
  };

  const handleViewAll = () => {
    setModalContent({
      title: `All ${title}`,
      content: (
        <PaginatedNftList
          nfts={nfts}
          setModalContent={setModalContent}
          cardType={cardType}
        />
      ),
    });
  };

  return (
    <div className="bg-green-mix bg-opacity-70 p-4 rounded-lg shadow-xl">
      <h2 className="text-white text-lg font-bold font-mono mb-4 border-b border-gray-700 pb-2">
        {title}
      </h2>
      <div className="relative">
        <button
          onClick={() => scrollCarousel("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-purple-800 text-white p-1 rounded-full shadow-lg z-10 hover:bg-purple-600 transition-colors duration-300"
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
          onMouseEnter={stopAutoScroll}
          onMouseLeave={startAutoScroll}
        >
          {nfts.map((nft) => (
            <NftCard
              key={nft.id}
              nft={nft}
              onClick={setModalContent}
              type={cardType}
            />
          ))}
        </div>
        <button
          onClick={() => scrollCarousel("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-purple-800 text-white p-1 rounded-full shadow-lg z-10 hover:bg-purple-600 transition-colors duration-300"
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
      {nfts.length > itemsPerPage && (
        <ButtonCard
          onClick={handleViewAll}
          background="w-full px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300 flex items-center justify-center text-sm font-semibold font-mono mt-4"
          icon={ChevronRight}
          iconPosition="right"
          size="small"
          animationType="glow"
        >
          View All {title}
        </ButtonCard>
      )}
    </div>
  );
};

SlidingCarousel.propTypes = {
  title: PropTypes.string.isRequired,
  nfts: PropTypes.arrayOf(PropTypes.object).isRequired,
  setModalContent: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number,
  cardType: PropTypes.string,
};

// Paginated List Component (for "View All" modals)
const PaginatedNftList = ({
  nfts,
  setModalContent,
  itemsPerPage = 5,
  cardType = "default",
}) => {
  const [visibleCount, setVisibleCount] = useState(itemsPerPage);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + itemsPerPage);
  };

  const handleLoadLess = () => {
    setVisibleCount(itemsPerPage);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {nfts.slice(0, visibleCount).map((nft) => (
          <NftCard
            key={nft.id}
            nft={nft}
            onClick={setModalContent}
            type={cardType}
          />
        ))}
      </div>
      <div className="flex justify-center space-x-4 mt-4">
        {visibleCount < nfts.length && (
          <ButtonCard
            onClick={handleLoadMore}
            background="w-full px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-900 transition-colors duration-300 flex items-center justify-center text-sm font-semibold font-mono mt-4"
            icon={ChevronRight}
            iconPosition="right"
            size="small"
            animationType="glow"
          >
            Load More
          </ButtonCard>
        )}
        {visibleCount > itemsPerPage && (
          <ButtonCard
            onClick={handleLoadLess}
            background="w-full px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300 flex items-center justify-center text-sm font-semibold font-mono"
            icon={ChevronRight}
            iconPosition="right"
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

PaginatedNftList.propTypes = {
  nfts: PropTypes.arrayOf(PropTypes.object).isRequired,
  setModalContent: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number,
  cardType: PropTypes.string,
};

// Transaction Details Table Component
const TransactionTable = ({ title, transactions }) => {
  const [visibleCount, setVisibleCount] = useState(5);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  const handleLoadLess = () => {
    setVisibleCount(5); // Reset to initial 5
  };

  return (
    <div className="bg-green-mix bg-opacity-70 p-4 rounded-lg shadow-xl">
      <h2 className="text-white text-lg font-bold font-mono mb-4 border-b border-gray-700 pb-2">
        {title}
      </h2>
      <div className="overflow-x-auto custom-scrollbar">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-purple-900">
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
                NFTs Count
              </th>
              <th
                scope="col"
                className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Total Value ($)
              </th>
              <th
                scope="col"
                className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Last Activity
              </th>
            </tr>
          </thead>
          <tbody className=" divide-y divide-gray-700">
            {transactions.slice(0, visibleCount).map((tx) => (
              <tr
                key={tx.id}
                className="hover:bg-purple-700 transition-colors duration-200"
              >
                <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-400 hover:underline cursor-pointer">
                  {tx.address.substring(0, 6)}...
                  {tx.address.substring(tx.address.length - 4)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                  {tx.totalNftsSent || tx.totalNftsReceived}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                  $
                  {(
                    tx.totalValueSent || tx.totalValueReceived
                  ).toLocaleString()}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                  {tx.lastActivity}
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
            background="w-full px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-900 transition-colors duration-300 flex items-center justify-center text-sm font-semibold font-mono"
            icon={ChevronRight}
            iconPosition="right"
            size="small"
            animationType="glow"
          >
            Load More
          </ButtonCard>
        )}
        {visibleCount > 5 && ( // Only show Load Less if more than initial 5 are visible
          <ButtonCard
            onClick={handleLoadLess}
            background="w-full px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300 flex items-center justify-center text-sm font-semibold font-mono"
            icon={ChevronRight}
            iconPosition="right"
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

TransactionTable.propTypes = {
  title: PropTypes.string.isRequired,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      address: PropTypes.string.isRequired,
      totalNftsSent: PropTypes.number,
      totalNftsReceived: PropTypes.number,
      totalValueSent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      totalValueReceived: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      lastActivity: PropTypes.string.isRequired,
    })
  ).isRequired,
};

// NFT Comparison Chart
const NftComparisonChart = ({ data, chainName }) => {
  return (
    <div className="bg-green-mix bg-opacity-70 p-4 rounded-lg shadow-xl">
      <h2 className="text-white text-lg font-bold font-mono mb-4 border-b border-gray-700 pb-2">
        NFT Comparison on {chainName} Exchanges
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
            formatter={(value, name) => [`${value.toLocaleString()}`, name]}
          />
          <Legend wrapperStyle={{ color: "#E2E8F0", paddingTop: "10px" }} />
          <Bar dataKey="price" fill="#8884d8" name="Average Price" />
          <Bar dataKey="volume" fill="#82ca9d" name="24h Volume" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

NftComparisonChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  chainName: PropTypes.string.isRequired,
};

// Low Transaction Fees Table
const LowTransactionFeesTable = ({ data, chainName }) => {
  return (
    <div className="bg-green-mix bg-opacity-70 p-4 rounded-lg shadow-xl">
      <h2 className="text-white text-lg font-bold font-mono mb-4 border-b border-gray-700 pb-2">
        NFT Transaction Fees on {chainName}
      </h2>
      <div className="overflow-x-auto custom-scrollbar">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-purple-900">
            <tr>
              <th
                scope="col"
                className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Exchange/Network
              </th>
              <th
                scope="col"
                className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Fee ($)
              </th>
              <th
                scope="col"
                className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Type
              </th>
            </tr>
          </thead>
          <tbody className=" divide-y divide-gray-700">
            {data.map((fee, index) => (
              <tr
                key={index}
                className="hover:bg-purple-700 transition-colors duration-200"
              >
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                  {fee.exchange}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-green-400">
                  ${fee.fee.toFixed(2)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                  {fee.type}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

LowTransactionFeesTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      exchange: PropTypes.string.isRequired,
      fee: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
  chainName: PropTypes.string.isRequired,
};

// Mint Section Component with Search and Pagination
const MintSection = ({ mints, setModalContent, itemsPerPage = 10 }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredMints = mints.filter(
    (mint) =>
      mint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mint.collection.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMints.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMints = filteredMints.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-green-mix bg-opacity-70 p-4 rounded-lg shadow-xl">
      <h2 className="text-white text-lg font-bold font-mono mb-4 border-b border-gray-700 pb-2">
        Top 10 NFT Mints
      </h2>
      <input
        type="text"
        placeholder="Search mints..."
        className="w-full p-2 rounded-md bg-purple-900 text-white border border-gray-600 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1); // Reset to first page on search
        }}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {currentMints.map((mint) => (
          <NftCard
            key={mint.id}
            nft={mint}
            onClick={setModalContent}
            type="default"
          />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-6">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 cursor-pointer bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 cursor-pointer rounded-md ${
                currentPage === i + 1
                  ? "bg-purple-800 text-white"
                  : "bg-purple-700 text-gray-300 hover:bg-purple-600"
              } transition-colors duration-300`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 cursor-pointer bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

MintSection.propTypes = {
  mints: PropTypes.arrayOf(PropTypes.object).isRequired,
  setModalContent: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number,
};

// Main NftDashboard Component
export default function NftDashboard({ chainName = "Ethereum" }) {
  const [modalContent, setModalContent] = useState(null);
  const [currentChainData, setCurrentChainData] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState("");

  // useEffect(() => {
  //   // Apply global styles
  //   const styleTag = document.createElement("style");
  //   styleTag.innerHTML = globalStyles;
  //   document.head.appendChild(styleTag);

  //   return () => {
  //     document.head.removeChild(styleTag);
  //   };
  // }, []);

  // Effect to load chain data when chainName prop changes
  useEffect(() => {
    const data = getNftChainData(chainName);
    if (data) {
      setCurrentChainData(data);
      const randomIndex = Math.floor(
        Math.random() * data.backgroundImages.length
      );
      setBackgroundImage(data.backgroundImages[randomIndex]);
    } else {
      console.error(`No NFT data found for chain: ${chainName}`);
      setCurrentChainData(null);
      setBackgroundImage("");
    }
  }, [chainName]);

  if (!currentChainData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-mix text-white text-2xl">
        Loading or NFT data for {chainName} not found...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen font-sans bg-cover bg-fixed bg-center text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
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
            {currentChainData.name} NFT Dashboard
          </h1>
          <p className="text-gray-400 text-lg">
            Explore the world of NFTs on {currentChainData.name}
          </p>
        </header>
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Top 10 Ethereum holders */}
          <div className="lg:col-span-3">
            <TopHoldersCarousel
              holders={currentChainData.topHolders}
              setModalContent={setModalContent}
            />
          </div>

          {/* Top 10 Ethereum NFTs and holders details (Featured NFT) */}
          <div className="lg:col-span-3">
            <FeaturedNftDisplay
              nfts={currentChainData.featuredNfts} // Pass the array of featured NFTs
              setModalContent={setModalContent}
            />
          </div>

          {/* Featured Collections */}
          <div className="lg:col-span-3">
            <SlidingCarousel
              title="Featured Collections"
              nfts={currentChainData.featuredCollections}
              setModalContent={setModalContent}
              itemsPerPage={5} // Show 5 items at a time
              cardType="featuredCollection"
            />
          </div>

          {/* Trending Tokens (interpreted as Trending NFT Collections/Tokens with mini-charts) */}
          <div className="lg:col-span-3">
            <SlidingCarousel
              title="Trending Tokens"
              nfts={currentChainData.trendingTokens}
              setModalContent={setModalContent}
              itemsPerPage={4} // Show 4 items at a time
              cardType="trendingToken"
            />
          </div>

          {/* Top Movers Today */}
          <div className="lg:col-span-3">
            <SlidingCarousel
              title="Top Movers Today"
              nfts={currentChainData.topMoversToday}
              setModalContent={setModalContent}
              itemsPerPage={4} // Show 4 items at a time
              cardType="topMover"
            />
          </div>

          {/* Highest Weekly Sales */}
          <div className="lg:col-span-3">
            <SlidingCarousel
              title="Highest Weekly Sales"
              nfts={currentChainData.highestWeeklySales}
              setModalContent={setModalContent}
              itemsPerPage={4} // Show 4 items at a time
              cardType="highestSale"
            />
          </div>

          {/* Top 10 NFTs Mints - Now uses MintSection component */}
          <div className="lg:col-span-3">
            <MintSection
              mints={currentChainData.topMints}
              setModalContent={setModalContent}
              itemsPerPage={10} // Show 10 mints per page
            />
          </div>

          {/* Top 10 NFT Senders */}
          <div className="lg:col-span-2">
            <TransactionTable
              title="Top 10 NFT Senders"
              transactions={currentChainData.topSenders}
            />
          </div>

          {/* Top 10 NFT Receivers */}
          <div className="lg:col-span-1">
            {" "}
            {/* Adjusted column span for better layout */}
            <TransactionTable
              title="Top 10 NFT Receivers"
              transactions={currentChainData.topReceivers}
            />
          </div>

          {/* NFT Comparison between multiple exchanges */}
          <div className="lg:col-span-3">
            <NftComparisonChart
              data={currentChainData.exchangeComparison}
              chainName={currentChainData.name}
            />
          </div>

          {/* Low Transaction Fees of NFTs */}
          <div className="lg:col-span-3">
            <LowTransactionFeesTable
              data={currentChainData.transactionFees}
              chainName={currentChainData.name}
            />
          </div>

          {/* Related Chains NFTs */}
          <div className="lg:col-span-3">
            <SlidingCarousel
              title="Related Chains NFTs"
              nfts={currentChainData.relatedChains}
              setModalContent={setModalContent}
              itemsPerPage={4}
              cardType="relatedChain" // New card type for related chains
            />
          </div>
        </div>
      </div>

      {/* Modal for pop-up cards */}
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
            {typeof modalContent.content === "string" ? (
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {" "}
                {/* Added whitespace-pre-wrap */}
                {modalContent.content}
              </p>
            ) : (
              modalContent.content // Render JSX content directly
            )}
            {modalContent.socialLinks && (
              <div className="flex justify-center space-x-4 mt-6">
                {modalContent.socialLinks.twitter && (
                  <a
                    href={modalContent.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.262-.9-.964-2.174-1.568-3.593-1.568-3.407 0-6.167 2.76-6.167 6.169 0 .484.054.955.145 1.404-5.14-.259-9.695-2.723-12.742-6.463-.531.91-.837 1.97-.837 3.109 0 2.144 1.096 4.04 2.766 5.148-.203-.006-.39-.015-.583-.16v.072c0 2.984 2.127 5.474 4.939 6.04-.412.112-.843.179-1.289.179-.314 0-.615-.03-.916-.084.782 2.443 3.06 4.234 5.766 4.283-2.091 1.64-4.743 2.62-7.61 2.62-.495 0-.98-.029-1.458-.084 2.704 1.735 5.93 2.75 9.387 2.75 11.262 0 17.413-9.314 17.413-17.417 0-.266-.007-.53-.02-.795z" />
                    </svg>
                  </a>
                )}
                {modalContent.socialLinks.github && (
                  <a
                    href={modalContent.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.08-.731.084-.716.084-.716 1.192.085 1.815 1.229 1.815 1.229 1.062 1.814 2.784 1.299 3.465.996.108-.775.418-1.291.762-1.591-2.652-.299-5.433-1.326-5.433-5.932 0-1.311.465-2.381 1.235-3.221-.124-.3-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.003.404 2.293-1.552 3.3-.928 3.3-.928.653 1.653.242 2.876.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.618-2.783 5.625-5.446 5.922.429.369.816 1.096.816 2.209v3.293c0 .319.192.694.801.576c4.765-1.589 8.197-6.095 8.197-11.389 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                )}
                {modalContent.socialLinks.website && (
                  <a
                    href={modalContent.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7"
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
            )}
          </>
        )}
      </Modal>
      <ScrollToTopButton />
    </div>
  );
}

NftDashboard.propTypes = {
  chainName: PropTypes.string,
};

// Example usage of NftDashboard component (for demonstration purposes, not part of the component itself)
/*
// In your main App.js or index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import NftDashboard from './NftDashboard'; // Assuming NftDashboard.js is in the same directory

const root = ReactDOM.createRoot(document.getElementById('root'));

// To display Ethereum NFT Dashboard:
root.render(<NftDashboard chainName="Ethereum" />);

// To display Binance NFT Dashboard:
// root.render(<NftDashboard chainName="Binance" />);

// To display Solana NFT Dashboard:
// root.render(<NftDashboard chainName="Solana" />);
*/
