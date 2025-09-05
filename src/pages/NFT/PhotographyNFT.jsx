import React, { useState, useEffect } from 'react';
import ScrollToTopButton from '../../components/ScrollToTopButton';
// Helper function to generate random Photography NFT data
const generateRandomPhotographyNFTs = (count) => {
  const nfts = [];
  const nftNames = [
    "Urban Reflections", "Nature's Serenity", "Abstract Light Play",
    "Street Life Chronicles", "Cosmic Dust", "Ephemeral Moments",
    "Vibrant Cityscape", "Wildlife Untamed", "Monochrome Moods",
    "Digital Dreamscape", "Portraits of the Soul", "Architectural Wonders",
    "Macro Worlds", "Underwater Visions", "Sunset Spectrum",
    "Aurora Borealis", "Desert Blooms", "Mountain Majesty"
  ];
  const photographers = [
    "Ansel Adams", "Annie Leibovitz", "Henri Cartier-Bresson", "Dorothea Lange",
    "Robert Doisneau", "Cindy Sherman", "Steve McCurry", "Richard Avedon",
    "Diane Arbus", "Man Ray", "Irving Penn", "Sebastião Salgado"
  ];
  const genres = [
    "Landscape", "Portrait", "Street", "Abstract", "Wildlife",
    "Architectural", "Macro", "Astrophotography", "Fine Art", "Documentary"
  ];
  const platforms = [
    "OpenSea", "Foundation", "SuperRare", "KnownOrigin", "Art Blocks", "Rarible"
  ];
  const placeholderColors = [
    '#3B82F6', '#10B981', '#6366F1', '#EF4444', '#F97316', '#06B6D4',
    '#8B5CF6', '#EC4899', '#A78BFA', '#FACC15', '#22C55E', '#DC2626'
  ]; // Diverse Tailwind-like colors
  const resolutions = ["4K UHD", "8K UHD", "12K"];
  const cameras = ["Canon EOS R5", "Sony A7 III", "Nikon Z7 II", "Fujifilm X-T4"];

  for (let i = 0; i < count; i++) {
    const name = nftNames[Math.floor(Math.random() * nftNames.length)];
    const photographer = photographers[Math.floor(Math.random() * photographers.length)];
    const genre = genres[Math.floor(Math.random() * genres.length)];
    const platform = platforms[Math.floor(Math.random() * platforms.length)];
    const basePrice = (Math.random() * 8 + 0.1).toFixed(2); // 0.1 to 8.1 ETH
    const price = `${basePrice} ETH`;
    const randomColor = placeholderColors[Math.floor(Math.random() * placeholderColors.length)];

    nfts.push({
      id: `photo-nft-${Date.now()}-${i}`,
      name: name,
      photographer: photographer,
      genre: genre,
      platform: platform,
      price: price,
      imageUrl: `https://placehold.co/150x150/${randomColor.substring(1)}/FFFFFF?text=${name.substring(0, 5).toUpperCase()}`, // Square images for grid
      rank: i + 1, // Simple sequential rank
      // Unique features for photography NFTs: resolution and camera used
      resolution: resolutions[Math.floor(Math.random() * resolutions.length)],
      camera: cameras[Math.floor(Math.random() * cameras.length)],
      owner: `Collector${Math.floor(Math.random() * 5000)}`,
    });
  }
  return nfts;
};

const PhotographyNFT = () => {
  const [allNFTs, setAllNFTs] = useState([]); // All generated NFTs
  const [filteredNFTs, setFilteredNFTs] = useState([]); // NFTs after filtering

  const [filterGenre, setFilterGenre] = useState('All');
  const [filterPhotographer, setFilterPhotographer] = useState('All');
  const [filterPlatform, setFilterPlatform] = useState('All');

  const [currentFeaturedSlide, setCurrentFeaturedSlide] = useState(0); // State for the featured slider
  const FEATURED_NFTS_PER_SLIDE = 5; // Number of featured NFTs to show per slide

  const [currentPage, setCurrentPage] = useState(0); // For the main grid pagination
  const NFTS_PER_GRID_PAGE = 20; // Show more NFTs at once in the main grid

  useEffect(() => {
    const generatedNFTs = generateRandomPhotographyNFTs(100); // Generate a large pool of NFTs
    setAllNFTs(generatedNFTs);
  }, []);

  useEffect(() => {
    let currentFiltered = allNFTs;

    if (filterGenre !== 'All') {
      currentFiltered = currentFiltered.filter(nft => nft.genre === filterGenre);
    }
    if (filterPhotographer !== 'All') {
      currentFiltered = currentFiltered.filter(nft => nft.photographer === filterPhotographer);
    }
    if (filterPlatform !== 'All') {
      currentFiltered = currentFiltered.filter(nft => nft.platform === filterPlatform);
    }
    setFilteredNFTs(currentFiltered);
    setCurrentPage(0); // Reset pagination on filter change
  }, [filterGenre, filterPhotographer, filterPlatform, allNFTs]);

  // Featured Top NFTs slider navigation
  const totalFeaturedSlides = Math.ceil(allNFTs.length / FEATURED_NFTS_PER_SLIDE);
  const handlePrevFeaturedSlide = () => {
    setCurrentFeaturedSlide((prev) => (prev > 0 ? prev - 1 : totalFeaturedSlides - 1));
  };
  const handleNextFeaturedSlide = () => {
    setCurrentFeaturedSlide((prev) => (prev < totalFeaturedSlides - 1 ? prev + 1 : 0));
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

  const handleCardClick = (id) => {
    // Simulate URL routing for NFT details
    window.location.href = `/photography-nft-details/${id}`;
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalGridPages - 1));
  };
  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalGridPages - 1 ? prev + 1 : 0));
  };

  // Unique filter options (derived from all NFTs)
  const uniqueGenres = ['All', ...new Set(allNFTs.map(nft => nft.genre))];
  const uniquePhotographers = ['All', ...new Set(allNFTs.map(nft => nft.photographer))];
  const uniquePlatforms = ['All', ...new Set(allNFTs.map(nft => nft.platform))];

  return (
    <>

    <div className="min-h-screen bg-gray-950 text-white font-inter p-4 overflow-hidden">
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
          .animate-fadeInUp { animation: fadeInUp 1s ease-out forwards; }
          .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
          .animate-popIn { animation: popIn 0.6s ease-out forwards; }

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
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 animate-fadeInUp">
            Digital Photography Showcase
          </h1>
          <div className="flex items-center space-x-2 animate-fadeIn">
            <img src="https://placehold.co/30x30/3B82F6/FFFFFF?text=P" alt="Profile" className="rounded-full border-2 border-blue-400" />
            <span className="text-sm font-semibold hidden sm:inline">My Studio</span>
          </div>
        </div>

        {/* Featured Top Photography NFTs Section (Slider) */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-12 relative animate-popIn">
          <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Top Featured Photography NFTs
          </h2>
          <div className="relative flex items-center">
            <button
              onClick={handlePrevFeaturedSlide}
              className="absolute left-0 z-10 p-2 bg-gray-700 rounded-full text-white hover:bg-gray-600 transition-colors duration-200"
              aria-label="Previous Featured Photography NFT"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex overflow-x-hidden slider-scroll-hide space-x-4 flex-grow px-10">
              {featuredNFTs.map((nft, index) => (
                <div
                  key={nft.id}
                  className="flex-shrink-0 w-64 bg-gray-700 rounded-lg shadow-md overflow-hidden cursor-pointer
                             transform transition-transform duration-300 hover:scale-105 relative"
                  onClick={() => handleCardClick(nft.id)}
                >
                  <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold z-10">
                    #{nft.rank}
                  </div>
                  <img
                    src={nft.imageUrl}
                    alt={nft.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x300/444444/FFFFFF?text=PHOTO+NFT`; }}
                  />
                  <div className="p-4">
                    <span className={`inline-block bg-teal-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full mb-1`}>
                      {nft.genre}
                    </span>
                    <h3 className="text-xl font-bold truncate mb-1">{nft.name}</h3>
                    <p className="text-gray-400 text-sm">Photographer: {nft.photographer}</p>
                    <p className="text-green-400 text-lg font-bold mt-2">{nft.price}</p>
                    <p className="text-blue-300 text-xs mt-1">Res: {nft.resolution} | Cam: {nft.camera}</p> {/* Unique photography features */}
                    <button
                      onClick={(e) => { e.stopPropagation(); handleCardClick(nft.id); }}
                      className="mt-4 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-2 rounded-md
                                 transition-all duration-300 hover:from-blue-600 hover:to-indigo-700 shadow-md"
                    >
                      See Collection
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleNextFeaturedSlide}
              className="absolute right-0 z-10 p-2 bg-gray-700 rounded-full text-white hover:bg-gray-600 transition-colors duration-200"
              aria-label="Next Featured Photography NFT"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>


        {/* Main Photography NFT Grid with Filters and Pagination */}
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-500 mb-8 animate-fadeInUp">
          Explore Digital Photography
        </h2>

        {/* Filter controls */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-3 mb-8 animate-fadeIn" style={{ animationDelay: '0.7s' }}>
          <select
            value={filterGenre}
            onChange={(e) => setFilterGenre(e.target.value)}
            className="bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="All">All Genres</option>
            {uniqueGenres.map(genre => (
              genre !== 'All' && <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
          <select
            value={filterPhotographer}
            onChange={(e) => setFilterPhotographer(e.target.value)}
            className="bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="All">All Photographers</option>
            {uniquePhotographers.map(photographer => (
              photographer !== 'All' && <option key={photographer} value={photographer}>{photographer}</option>
            ))}
          </select>
          <select
            value={filterPlatform}
            onChange={(e) => setFilterPlatform(e.target.value)}
            className="bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="All">All Platforms</option>
            {uniquePlatforms.map(platform => (
              platform !== 'All' && <option key={platform} value={platform}>{platform}</option>
            ))}
          </select>
        </div>

        {/* Main Photography NFT Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8">
          {paginatedGridNFTs.length > 0 ? (
            paginatedGridNFTs.map((nft, index) => (
              <div
                key={nft.id}
                className="bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer
                           transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-popIn"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => handleCardClick(nft.id)}
              >
                <div className="relative">
                  <img
                    src={nft.imageUrl}
                    alt={nft.name}
                    className="w-full h-36 object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/150x150/555555/DDDDDD?text=NFT`; }}
                  />
                  {/* Rank on main grid cards */}
                  <div className="absolute top-2 left-2 bg-gray-900 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                    #{nft.rank}
                  </div>
                </div>
                <div className="p-3">
                  <span className={`inline-block bg-teal-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full mb-1`}>
                    {nft.genre}
                  </span>
                  <h3 className="text-md font-semibold truncate leading-tight">{nft.name}</h3>
                  <p className="text-gray-400 text-xs truncate">Photographer: {nft.photographer}</p>
                  <p className="text-green-400 text-sm font-bold mt-1">{nft.price}</p>
                  <p className="text-blue-300 text-xs mt-1">Res: {nft.resolution} | Cam: {nft.camera}</p>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleCardClick(nft.id); }}
                    className="mt-2 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-1.5 rounded-md text-sm
                               transition-colors duration-200 shadow-sm"
                  >
                    See Collection
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-400 text-lg">
              No Photography NFTs found matching your criteria.
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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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

export default PhotographyNFT;
