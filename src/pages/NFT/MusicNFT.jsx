import React, { useState, useEffect } from 'react';
import ScrollToTopButton from '../../components/ScrollToTopButton';
// Helper function to generate random Music NFT data
const generateRandomMusicNFTs = (count) => {
  const nfts = [];
  const nftNames = [
    "Synthwave Serenade", "Acoustic Echoes", "Future Funk Anthem",
    "Lo-Fi Chill Beat", "Classical Remix", "Ambient Dreamscape",
    "Electro Groove", "Jazz Fusion Rhapsody", "Punk Rock Rebellion",
    "Hip Hop Cypher", "Trance Journey", "Downtempo Vibes",
    "Orchestral Overture", "Soulful Melody", "Reggae Riddim",
    "Pop Anthem", "Blues Harmonies", "Metal Fury"
  ];
  const artists = [
    "DJ Cypher", "Lofi Luminary", "Beat Wizard", "Harmony Haze",
    "Sonic Sculptor", "Rhythm Architect", "Melody Maker", "Groove Guru",
    "Echo Weaver", "Sound Seeker", "Audio Alchemist", "Vibe Master"
  ];
  const genres = [
    "Electronic", "Hip Hop", "Acoustic", "Jazz", "Classical",
    "Rock", "Pop", "Ambient", "Lo-Fi", "Trance", "Reggae", "Blues"
  ];
  const platforms = [
    "OpenSea", "Foundation", "Catalog", "Sound.xyz", "Async Art", "Zora"
  ];
  const placeholderColors = [
    '#A78BFA', '#F472B6', '#34D399', '#60A5FA', '#FBBF24', '#EF4444',
    '#8B5CF6', '#EC4899', '#10B981', '#3B82F6', '#F97316', '#DC2626'
  ]; // Diverse Tailwind-like colors

  for (let i = 0; i < count; i++) {
    const name = nftNames[Math.floor(Math.random() * nftNames.length)];
    const artist = artists[Math.floor(Math.random() * artists.length)];
    const genre = genres[Math.floor(Math.random() * genres.length)];
    const platform = platforms[Math.floor(Math.random() * platforms.length)];
    const basePrice = (Math.random() * 5 + 0.01).toFixed(2); // 0.01 to 5.01 ETH
    const price = `${basePrice} ETH`;
    const randomColor = placeholderColors[Math.floor(Math.random() * placeholderColors.length)];

    nfts.push({
      id: `music-nft-${Date.now()}-${i}`,
      name: name,
      artist: artist,
      genre: genre,
      platform: platform,
      price: price,
      imageUrl: `https://placehold.co/150x150/${randomColor.substring(1)}/FFFFFF?text=${name.substring(0, 5).toUpperCase()}`, // Square images for grid
      rank: i + 1, // Simple sequential rank
      // Unique feature for music NFTs: audio length and owner
      audioLength: `${Math.floor(Math.random() * 4) + 2}:${Math.floor(Math.random() * 59).toString().padStart(2, '0')}`, // e.g., "2:30"
      owner: `Collector${Math.floor(Math.random() * 5000)}`,
    });
  }
  return nfts;
};

const MusicNFT = () => {
  const [allNFTs, setAllNFTs] = useState([]); // All generated NFTs
  const [filteredNFTs, setFilteredNFTs] = useState([]); // NFTs after filtering

  const [filterGenre, setFilterGenre] = useState('All');
  const [filterArtist, setFilterArtist] = useState('All');
  const [filterPlatform, setFilterPlatform] = useState('All');

  const [currentFeaturedSlide, setCurrentFeaturedSlide] = useState(0); // State for the featured slider
  const FEATURED_NFTS_PER_SLIDE = 5; // Number of featured NFTs to show per slide

  const [currentPage, setCurrentPage] = useState(0); // For the main grid pagination
  const NFTS_PER_GRID_PAGE = 20; // Show more NFTs at once in the main grid

  useEffect(() => {
    const generatedNFTs = generateRandomMusicNFTs(100); // Generate a large pool of NFTs
    setAllNFTs(generatedNFTs);
  }, []);

  useEffect(() => {
    let currentFiltered = allNFTs;

    if (filterGenre !== 'All') {
      currentFiltered = currentFiltered.filter(nft => nft.genre === filterGenre);
    }
    if (filterArtist !== 'All') {
      currentFiltered = currentFiltered.filter(nft => nft.artist === filterArtist);
    }
    if (filterPlatform !== 'All') {
      currentFiltered = currentFiltered.filter(nft => nft.platform === filterPlatform);
    }
    setFilteredNFTs(currentFiltered);
    setCurrentPage(0); // Reset pagination on filter change
  }, [filterGenre, filterArtist, filterPlatform, allNFTs]);

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
    window.location.href = `/music-nft-details/${id}`;
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalGridPages - 1));
  };
  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalGridPages - 1 ? prev + 1 : 0));
  };

  // Unique filter options (derived from all NFTs)
  const uniqueGenres = ['All', ...new Set(allNFTs.map(nft => nft.genre))];
  const uniqueArtists = ['All', ...new Set(allNFTs.map(nft => nft.artist))];
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
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-green-500 animate-fadeInUp">
            Music NFT Marketplace
          </h1>
          <div className="flex items-center space-x-2 animate-fadeIn">
            <img src="https://placehold.co/30x30/34D399/FFFFFF?text=M" alt="Profile" className="rounded-full border-2 border-teal-400" />
            <span className="text-sm font-semibold hidden sm:inline">My Collection</span>
          </div>
        </div>

        {/* Featured Top Music NFTs Section (Slider) */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-12 relative animate-popIn">
          <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Top Featured Music NFTs
          </h2>
          <div className="relative flex items-center">
            <button
              onClick={handlePrevFeaturedSlide}
              className="absolute left-0 z-10 p-2 bg-gray-700 rounded-full text-white hover:bg-gray-600 transition-colors duration-200"
              aria-label="Previous Featured Music NFT"
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
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x300/444444/FFFFFF?text=MUSIC+NFT`; }}
                  />
                  <div className="p-4">
                    <span className={`inline-block bg-indigo-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full mb-1`}>
                      {nft.genre}
                    </span>
                    <h3 className="text-xl font-bold truncate mb-1">{nft.name}</h3>
                    <p className="text-gray-400 text-sm">Artist: {nft.artist}</p>
                    <p className="text-green-400 text-lg font-bold mt-2">{nft.price}</p>
                    <p className="text-blue-300 text-xs mt-1">Length: {nft.audioLength}</p> {/* Unique music feature */}
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
              aria-label="Next Featured Music NFT"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>


        {/* Main Music NFT Grid with Filters and Pagination */}
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-500 mb-8 animate-fadeInUp">
          Explore Music Assets
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
            value={filterArtist}
            onChange={(e) => setFilterArtist(e.target.value)}
            className="bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="All">All Artists</option>
            {uniqueArtists.map(artist => (
              artist !== 'All' && <option key={artist} value={artist}>{artist}</option>
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

        {/* Main Music NFT Grid */}
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
                  <span className={`inline-block bg-indigo-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full mb-1`}>
                    {nft.genre}
                  </span>
                  <h3 className="text-md font-semibold truncate leading-tight">{nft.name}</h3>
                  <p className="text-gray-400 text-xs truncate">Artist: {nft.artist}</p>
                  <p className="text-green-400 text-sm font-bold mt-1">{nft.price}</p>
                  <p className="text-blue-300 text-xs mt-1">Length: {nft.audioLength}</p>
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
              No Music NFTs found matching your criteria.
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

export default MusicNFT;
