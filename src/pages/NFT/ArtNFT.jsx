import React, { useState, useEffect } from "react";
import ButtonCard from "../../components/ButtonCard";
import { Binoculars, Combine, Eye, SquareLibrary } from "lucide-react";
import ScrollToTopButton from "../../components/ScrollToTopButton";
// Helper function to generate random NFT data
const generateRandomNFTs = (count) => {
  const nfts = [];
  const nftNames = [
    "Crypto King",
    "Pixel Dreamscape",
    "Blockchain Bloom",
    "Digital Odyssey",
    "Metaverse Muse",
    "Abstract Algorithmic",
    "Cybernetic Canvas",
    "Ethereal Echoes",
    "Quantum Quilt",
    "Sonic Sculpture",
    "Neon Nomad",
    "Glitch Goddess",
    "Vector Visions",
    "Data Dragon",
    "Fractal Phoenix",
    "Aura",
    "Zenith",
    "Chronos",
    "Ignis",
    "Lux",
    "Nyx",
    "Orion",
    "Pharos",
    "Rune",
    "Solstice",
    "Terra",
    "Vesper",
    "Wisp",
    "Xenon",
    "Yggdrasil",
    "Zephyr",
    "Apex",
    "Blaze",
    "Cipher",
    "Dusk",
    "Echo",
    "Flare",
    "Glimmer",
    "Halo",
    "Iris",
    "Joule",
    "Karma",
    "Lumen",
    "Mantra",
    "Nova",
    "Onyx",
    "Pylon",
    "Quasar",
    "Rift",
    "Spectra",
    "Tangent",
    "Umbra",
    "Vortex",
    "Whisper",
  ];
  const artists = [
    "Beeple",
    "Pak",
    "XCopy",
    "Fewocious",
    "Grimes",
    "Mad Dog Jones",
    "Trevor Jones",
    "SlimeSunday",
    "Hackatao",
    "Larva Labs",
    "Matt Kane",
    "Banksy DAO",
    "Digital Native",
    "Artificially Human",
  ];
  const categories = [
    "Abstract",
    "Portrait",
    "Generative",
    "Landscape",
    "Fantasy",
    "Sci-Fi",
    "Surreal",
    "Pixel Art",
    "3D Render",
    "Photography",
    "Animation",
  ];
  const placeholderColors = [
    "#22D3EE",
    "#A78BFA",
    "#F87171",
    "#FACC15",
    "#4ADE80",
    "#FB923C",
    "#67E8F9",
    "#C084FC",
    "#F472B6",
    "#EAB308",
    "#22C55E",
    "#F97316",
    "#06B6D4",
    "#8B5CF6",
    "#EC4899",
    "#10B981",
    "#3B82F6",
    "#EF4444",
  ]; // Diverse Tailwind-like colors

  for (let i = 0; i < count; i++) {
    const name = nftNames[Math.floor(Math.random() * nftNames.length)];
    const artist = artists[Math.floor(Math.random() * artists.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const basePrice = (Math.random() * 5 + 0.1).toFixed(2); // 0.1 to 5.1 ETH
    const price = `${basePrice} ETH`;
    const randomColor =
      placeholderColors[Math.floor(Math.random() * placeholderColors.length)];

    nfts.push({
      id: `nft-${Date.now()}-${i}`,
      name: name,
      artist: artist,
      price: price,
      imageUrl: `https://placehold.co/150x150/${randomColor.substring(
        1
      )}/FFFFFF?text=${name.substring(0, 5).toUpperCase()}`, // Square images for grid
      category: category,
      rarityScore: (Math.random() * 100).toFixed(2),
      // Add rank to each card
      rank: i + 1, // Simple sequential rank
    });
  }
  return nfts;
};

const ArtNFT = () => {
  const [allNFTs, setAllNFTs] = useState([]); // All generated NFTs
  const [filteredNFTs, setFilteredNFTs] = useState([]); // NFTs after filtering

  const [filterCategory, setFilterCategory] = useState("All");
  const [filterArtist, setFilterArtist] = useState("All");
  const [filterPriceRange, setFilterPriceRange] = useState("All");

  const [currentFeaturedSlide, setCurrentFeaturedSlide] = useState(0); // State for the featured slider
  const FEATURED_NFTS_PER_SLIDE = 5; // Number of featured NFTs to show per slide (UPDATED TO 5)

  const [currentPage, setCurrentPage] = useState(0); // For the main grid pagination
  const NFTS_PER_GRID_PAGE = 20; // Show more NFTs at once in the main grid

  useEffect(() => {
    const generatedNFTs = generateRandomNFTs(100); // Generate a large pool of NFTs
    setAllNFTs(generatedNFTs);
  }, []);

  useEffect(() => {
    let currentFiltered = allNFTs;

    if (filterCategory !== "All") {
      currentFiltered = currentFiltered.filter(
        (nft) => nft.category === filterCategory
      );
    }
    if (filterArtist !== "All") {
      currentFiltered = currentFiltered.filter(
        (nft) => nft.artist === filterArtist
      );
    }
    if (filterPriceRange !== "All") {
      const [min, max] = filterPriceRange.split("-").map(Number);
      currentFiltered = currentFiltered.filter((nft) => {
        const priceValue = parseFloat(nft.price.replace(" ETH", ""));
        return priceValue >= min && (max ? priceValue <= max : true);
      });
    }
    setFilteredNFTs(currentFiltered);
    setCurrentPage(0); // Reset pagination on filter change
  }, [filterCategory, filterArtist, filterPriceRange, allNFTs]);

  // Featured Top NFTs slider navigation
  const totalFeaturedSlides = Math.ceil(
    allNFTs.length / FEATURED_NFTS_PER_SLIDE
  ); // Assuming allNFTs are candidates for featured
  const handlePrevFeaturedSlide = () => {
    setCurrentFeaturedSlide((prev) =>
      prev > 0 ? prev - 1 : totalFeaturedSlides - 1
    );
  };
  const handleNextFeaturedSlide = () => {
    setCurrentFeaturedSlide((prev) =>
      prev < totalFeaturedSlides - 1 ? prev + 1 : 0
    );
  };

  const featuredNFTs = allNFTs.slice(
    currentFeaturedSlide * FEATURED_NFTS_PER_SLIDE,
    (currentFeaturedSlide + 1) * FEATURED_NFTS_PER_SLIDE
  );

  // Main grid pagination
  const totalGridPages = Math.ceil(filteredNFTs.length / NFTS_PER_GRID_PAGE);
  const gridStartIndex = currentPage * NFTS_PER_GRID_PAGE;
  const gridEndIndex = gridStartIndex + NFTS_PER_GRID_PAGE;
  const paginatedGridNFTs = filteredNFTs.slice(gridStartIndex, gridEndIndex);

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalGridPages - 1));
  };
  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalGridPages - 1 ? prev + 1 : 0));
  };

  const handleCardClick = (id) => {
    // Simulate URL routing for NFT details
    window.location.href = `/nft-details/${id}`;
  };

  // Unique filter options (derived from all NFTs, not just filtered ones)
  const uniqueCategories = [
    "All",
    ...new Set(allNFTs.map((nft) => nft.category)),
  ];
  const uniqueArtists = ["All", ...new Set(allNFTs.map((nft) => nft.artist))];
  const priceRanges = [
    { label: "All Prices", value: "All" },
    { label: "0.1 - 1 ETH", value: "0.1-1" },
    { label: "1 - 5 ETH", value: "1-5" },
    { label: "5+ ETH", value: "5-" },
  ];

  return (
    <>

    <div className="min-h-screen bg-blue-mix text-white font-inter  overflow-hidden">
      <style>
        {`
          /* Custom keyframes for animations */
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes popIn {
            0% { transform: scale(0.5); opacity: 0; }
            80% { transform: scale(1.05); opacity: 1; }
            100% { transform: scale(1); }
          }
          @keyframes slideInFromLeft {
            from { opacity: 0; transform: translateX(-50px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .animate-fadeInUp { animation: fadeInUp 1s ease-out forwards; }
          .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
          .animate-popIn { animation: popIn 0.6s ease-out forwards; }
          .animate-slideInFromLeft { animation: slideInFromLeft 0.7s ease-out forwards; }

          /* Custom styling for slider scrollbar */
          .slider-scroll-hide {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
          .slider-scroll-hide::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
          }
        `}
      </style>

      <div className="container mx-auto px-4 py-8">
        {/* Top Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 animate-fadeInUp">
            My NFT Gallery
          </h1>
          {/* <div className="flex items-center space-x-2 animate-fadeIn">
            <img src="https://placehold.co/30x30/60A5FA/FFFFFF?text=P" alt="Profile" className="rounded-full border-2 border-blue-400" />
            <span className="text-sm font-semibold hidden sm:inline">My Wallet</span>
          </div> */}
        </div>

        {/* Featured Top NFTs Section (Slider) */}
        <div className="bg-green-mix   rounded-xl shadow-lg p-6 mb-12 relative animate-popIn">
          <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
            Top Featured Collections
          </h2>
          <div className="relative flex items-center">
            <button
              onClick={handlePrevFeaturedSlide}
              className="absolute left-0 z-10 p-2 bg-purple-700 rounded-full cursor-pointer text-white hover:bg-purple-600 transition-colors duration-200"
              aria-label="Previous Featured NFT"
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
            <div className="flex overflow-x-hidden slider-scroll-hide space-x-4 flex-grow px-10">
              {featuredNFTs.map((nft, index) => (
                <div
                  key={nft.id}
                  className="flex-shrink-0 w-64  rounded-lg shadow-md overflow-hidden cursor-pointer
                             transform transition-transform duration-300 hover:scale-105 relative"
                  onClick={() => handleCardClick(nft.id)}
                >
                  <div className="absolute top-2 left-2 bg-blue-mix text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                    #{nft.rank}
                  </div>
                  <img
                    src={nft.imageUrl}
                    alt={nft.name}
                    className="w-full h-32 object-cover rounded-t-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/400x300/444444/FFFFFF?text=FEATURED`;
                    }}
                  />
                  <div className="p-4 bg-purple-mix">
                    <h3 className="lg:text-lg text-md font-bold truncate mb-1">
                      {nft.name}
                    </h3>
                    <p className="text-gray-400 lg:text-sm text-xs">
                      by {nft.artist}
                    </p>
                    <p className="text-purple-300 lg:text-lg text-sm font-bold mt-2">
                      {nft.price}
                    </p>

                    <ButtonCard
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(nft.id);
                      }}
                      icon={Combine}
                      iconPosition="right"
                      background="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-1.5 mt-2 rounded-md lg:text-sm text-xs
                               transition-colors duration-200 shadow-sm"
                      animationType="scale"
                      size="medium"
                    >
                      See Collection
                    </ButtonCard>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleNextFeaturedSlide}
              className="absolute right-0 z-10 p-2 bg-purple-700 rounded-full text-white hover:bg-purple-600 cursor-pointer transition-colors duration-200"
              aria-label="Next Featured NFT"
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

        {/* Main NFT Grid with Filters and Pagination */}
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-8 animate-fadeInUp">
          Explore Art NFTs
        </h2>

        {/* Filter controls */}
        <div
          className="flex flex-wrap justify-start sm:justify-start gap-3 mb-4 animate-fadeIn"
          style={{ animationDelay: "0.7s" }}
        >
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-purple-900   text-white rounded-md px-3 py-2 text-sm focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="All">All Categories</option>
            {uniqueCategories.map(
              (cat) =>
                cat !== "All" && (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                )
            )}
          </select>
          <select
            value={filterArtist}
            onChange={(e) => setFilterArtist(e.target.value)}
            className="bg-purple-900   text-white rounded-md px-3 py-2 text-sm focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="All">All Artists</option>
            {uniqueArtists.map(
              (artist) =>
                artist !== "All" && (
                  <option key={artist} value={artist}>
                    {artist}
                  </option>
                )
            )}
          </select>
          <select
            value={filterPriceRange}
            onChange={(e) => setFilterPriceRange(e.target.value)}
            className="bg-purple-900   text-white rounded-md px-3 py-2 text-sm focus:ring-purple-500 focus:border-purple-500"
          >
            {priceRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Main NFT Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8">
          {paginatedGridNFTs.length > 0 ? (
            paginatedGridNFTs.map((nft, index) => (
              <div
                key={nft.id}
                className="bg-purple-mix rounded-lg shadow-md overflow-hidden cursor-pointer
                           transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-popIn"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => handleCardClick(nft.id)}
              >
                <div className="relative">
                  <img
                    src={nft.imageUrl}
                    alt={nft.name}
                    className="w-full h-28 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/150x150/555555/DDDDDD?text=NFT`;
                    }}
                  />
                  {/* Rank on main grid cards */}
                  <div className="absolute top-2 left-2 bg-gray-900 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                    #{nft.rank}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="lg:text-md text-sm font-semibold truncate leading-tight">
                    {nft.name}
                  </h3>
                  <p className="text-gray-400 text-xs truncate">
                    by {nft.artist}
                  </p>
                  <p className="text-green-400 lg:text-sm text-xs font-bold mt-1">
                    {nft.price}
                  </p>
                  <div className="text-xs text-gray-500 mt-1 mb-2">
                    Rarity:{" "}
                    <span className="font-semibold text-gray-300">
                      {nft.rarityScore}
                    </span>
                  </div>

                  <ButtonCard
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(nft.id);
                    }}
                    icon={Combine}
                    background="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-1.5 rounded-md lg:text-sm text-xs
                               transition-colors duration-200 shadow-sm"
                    animationType="fade"
                    iconPosition="right"
                    size="small"
                  >
                    See Collection
                  </ButtonCard>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-400 text-lg">
              No NFTs found matching your criteria.
            </div>
          )}
        </div>

        {/* Pagination buttons for main grid */}
        {filteredNFTs.length > NFTS_PER_GRID_PAGE && (
          <div className="flex justify-center mt-8 space-x-4 animate-fadeInUp">
            <button
              onClick={handlePrevPage}
              className="p-3 bg-gray-700 rounded-full text-white hover:bg-gray-600 transition-colors duration-200"
              aria-label="Previous page"
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
            <span className="text-gray-300 text-lg flex items-center">
              Page {currentPage + 1} of {totalGridPages}
            </span>
            <button
              onClick={handleNextPage}
              className="p-3 bg-gray-700 rounded-full text-white hover:bg-gray-600 transition-colors duration-200"
              aria-label="Next page"
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
        )}
      </div>
    </div>
    <ScrollToTopButton/>
    
    </>
  );
};

export default ArtNFT;
