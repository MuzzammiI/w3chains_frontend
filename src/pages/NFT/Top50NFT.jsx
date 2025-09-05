import React, { useState, useEffect, useMemo } from "react";
import ButtonCard from "../../components/ButtonCard";

// --- Data ---
// In a real application, this would be in a separate file, but for this self-contained
// example, it's included here as a JS module within the single component.
const generateRandomNftData = (count) => {
  const data = [];
  const baseNfts = [
    {
      name: "CryptoPunk",
      creator: "Larva Labs",
      description: "Iconic pixel art collectible.",
    },
    {
      name: "Bored Ape Yacht Club",
      creator: "Yuga Labs",
      description: "Exclusive ape avatar collection.",
    },
    {
      name: "Chromie Squiggle",
      creator: "Snowfro",
      description: "Historically significant generative art.",
    },
    {
      name: "Fidenza",
      creator: "Tyler Hobbs",
      description: "Complex algorithmic art with organic flow.",
    },
    {
      name: "Ringers",
      creator: "Dmitri Cherniak",
      description: "Abstract generative art pieces.",
    },
    {
      name: "Azuki",
      creator: "Team Azuki",
      description: "Anime-inspired PFP collection with a distinct style.",
    },
    {
      name: "CyberKongz",
      creator: "Myoo",
      description: "Early PFP project with token utility.",
    },
    {
      name: "Doodles",
      creator: "Burnt Toast",
      description: "Colorful, community-focused character NFTs.",
    },
    {
      name: "Meebit",
      creator: "Larva Labs",
      description: "3D voxel avatars from the creators of CryptoPunks.",
    },
    {
      name: "Cool Cat",
      creator: "Cool Cats NFT",
      description: "Charming and whimsical cartoon cat NFTs.",
    },
    {
      name: "World of Women",
      creator: "Yam Karkai",
      description: "Empowering female-centric art project.",
    },
    {
      name: "Pudgy Penguin",
      creator: "Pudgy Penguins",
      description: "Wholesome and popular penguin PFP collection.",
    },
    {
      name: "Moonbirds",
      creator: "PROOF",
      description: "Owl-themed PFP project with exclusive access.",
    },
    {
      name: "DeGods",
      creator: "Dust Labs",
      description: "Punk-rock inspired PFP NFTs.",
    },
    {
      name: "Clone X",
      creator: "RTFKT Studios",
      description: "High-fashion metaverse avatars.",
    },
    {
      name: "Art Blocks Curated",
      creator: "Various Artists",
      description: "Premier platform for curated generative art.",
    },
    {
      name: "Nouns",
      creator: "Nouns DAO",
      description: "Daily generated, CC0 licensed pixel avatars.",
    },
    {
      name: "Goblintown",
      creator: "Truth Labs",
      description: "Unconventional and quirky CC0 licensed art.",
    },
    {
      name: "Mutant Ape Yacht Club",
      creator: "Yuga Labs",
      description: "Mutated versions of Bored Apes.",
    },
    {
      name: "VeeFriends",
      creator: "Gary Vaynerchuk",
      description: "Character NFTs tied to real-world utility and access.",
    },
  ];

  for (let i = 1; i <= count; i++) {
    const base = baseNfts[Math.floor(Math.random() * baseNfts.length)];
    const priceEth = (Math.random() * 1000 + 50).toFixed(2); // Random price between 50 and 1050 ETH
    const priceUsd = (priceEth * 3500).toFixed(2); // Assuming 1 ETH = $3500 for demo
    const timestamp = Date.now() - Math.floor(Math.random() * 86400 * 7 * 1000); // Last update within 7 days
    const lastTxAddress = "0x" + Math.random().toString(16).substr(2, 40); // Random hex address
    const bgimg = 

    data.push({
      id: i,
      name: `${base.name} #${Math.floor(Math.random() * 10000)}`,
      creator: base.creator,
      price: parseFloat(priceEth),
      image: `https://placehold.co/400x400/${Math.floor(
        Math.random() * 16777215
      ).toString(16)}/FFFFFF?text=${base.name.split(" ")[0]}${i}`,
      description: `${base.description} This particular piece features unique traits and a high rarity score.`,
      rank: i, // Simple rank for demonstration
      topRank: Math.floor(Math.random() * 50) + 1, // Random top rank
      floorPrice: {
        eth: parseFloat(priceEth) * 0.9, // Slightly lower than listed price
        usd: parseFloat(priceUsd) * 0.9,
        chain: "Ethereum",
      },
      lastTransactionAddress: lastTxAddress,
      lastUpdateTime: new Date(timestamp).toLocaleString(),
    });
  }
  return data;
};

const allNftData = generateRandomNftData(50); // Generate 50 NFTs

const Top50NFT = () => {
  // State for the search query
  const [searchQuery, setSearchQuery] = useState("");
  // State for managing the "routing" or view (list vs. detail)
  const [selectedNft, setSelectedNft] = useState(null);

  // Filter NFTs based on the search query
  const filteredNfts = useMemo(
    () =>
      allNftData.filter(
        (nft) =>
          nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          nft.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
          nft.description.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery]
  );

  // Since all 50 cards are shown at once, currentPage and totalPages will effectively be 1.
  // The itemsPerPage is implicitly 50 here as we render filteredNfts directly.
  const currentPage = 1;
  const totalPages = filteredNfts.length > 0 ? 1 : 0; // Only one "page" if there are NFTs

  // Pagination controls - these buttons will now always be disabled
  const handlePrev = () => {
    /* No-op, always on first/only page */
  };
  const handleNext = () => {
    /* No-op, always on first/only page */
  };

  // When showing all 50 cards at once, currentNfts is simply filteredNfts
  const currentNfts = filteredNfts;

  // Handle selecting an NFT to view its details
  const handleSelectNft = (nft) => {
    setSelectedNft(nft);
  };

  // Handle going back from the detail view
  const handleBack = () => {
    setSelectedNft(null);
  };

  // --- NFTCard Component (Nested) ---
  const NFTCard = ({ nft }) => (
    <div
      className="bg-green-mix rounded-2xl overflow-hidden shadow-lg hover:shadow-purple-400/50 transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer group flex flex-col"
      onClick={() => handleSelectNft(nft)} // Make the whole card clickable
    >
      <img
        src={nft.image}
        alt={nft.name}
        className="w-full h-35 object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://placehold.co/400x400/333333/FFFFFF?text=Image+Error";
        }}
      />
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-md font-bold text-white truncate group-hover:text-purple-400 transition-colors">
            {nft.name}
          </h3>
          <p className="text-xs text-gray-400">by {nft.creator}</p>
          <div className="mt-2 text-xs text-gray-300">
            <p>
              <span className="font-semibold text-purple-300">Rank:</span> #
              {nft.rank} (Top {nft.topRank})
            </p>
            <p className="mt-1">
              <span className="font-semibold text-md text-purple-300">
                Floor:
              </span>{" "}
              {nft.floorPrice.eth.toFixed(2)} {nft.floorPrice.chain} ($
              {nft.floorPrice.usd.toFixed(2)})
            </p>
            <p className="mt-1 text-xs truncate">
              <span className="font-semibold text-purple-300">Last Tx:</span>{" "}
              {nft.lastTransactionAddress}
            </p>
            <p className="mt-1 text-xs">
              <span className="font-semibold text-purple-300">Updated:</span>{" "}
              {nft.lastUpdateTime}
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-col sm:flex-row justify-start items-start md:justify-between md:items-center gap-2">
          <p className="text-sm font-semibold text-purple-400">{nft.price} ETH</p>
          <div className="flex gap-1">
            {/* These buttons are now secondary actions within the clickable card */}
            

              <ButtonCard
              onClick={(e) => {
                e.stopPropagation();
                handleSelectNft(nft);
              }} // Still navigate to item detail
              icon={null}
              size="small"
              background="bg-purple-600 hover:bg-purple-700"
              animationType="fade"
              >
              See Item
              </ButtonCard>

              <ButtonCard
              onClick={(e) => {
                e.stopPropagation();
                console.log(
                  `See Collection for ${nft.creator}`
                ); /* Placeholder for actual collection navigation */
              }}
              icon={null}
              size="small"
              background="bg-purple-600 hover:bg-purple-700"
              animationType="fade"
              >
                See Collection
              </ButtonCard>








          </div>
        </div>
      </div>
    </div>
  );

  // --- NFTDetailView Component (Nested) ---
  const NFTDetailView = ({ nft }) => (
    <div className="min-h-screen bg-blue-mix text-white p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <div className="container mx-auto max-w-4xl bg-gray-800 rounded-2xl shadow-2xl shadow-cyan-500/20 overflow-hidden">
        <div className="relative">
          <button
            onClick={handleBack}
            className="absolute top-4 left-4 z-10 bg-gray-900/50 hover:bg-cyan-500 text-white font-bold rounded-full h-10 w-10 flex items-center justify-center transition-all duration-300"
            aria-label="Go back"
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
          <img
            src={nft.image}
            alt={nft.name}
            className="w-full h-64 md:h-96 object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/800x400/333333/FFFFFF?text=Image+Error";
            }}
          />
        </div>
        <div className="p-6 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold text-purple-400 mb-2">
            {nft.name}
          </h1>
          <p className="text-lg text-gray-300 mb-4">
            by <span className="font-semibold">{nft.creator}</span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-gray-300">
            <div>
              <p className="text-sm text-gray-400 block">Current Price</p>
              <p className="text-xl font-bold text-white">{nft.price} ETH</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 block">Floor Price</p>
              <p className="text-3xl font-bold text-white">
                {nft.floorPrice.eth.toFixed(2)} {nft.floorPrice.chain} ($
                {nft.floorPrice.usd.toFixed(2)})
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400 block">Rank</p>
              <p className="text-3xl font-bold text-white">
                #{nft.rank} (Top {nft.topRank})
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400 block">Last Transaction</p>
              <p className="text-lg font-bold text-white break-words">
                {nft.lastTransactionAddress}
              </p>
              <p className="text-sm text-gray-400">{nft.lastUpdateTime}</p>
            </div>
          </div>

          <p className="text-gray-300 leading-relaxed">{nft.description}</p>
          <div className="mt-8">
            <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 transform hover:scale-105">
              Make an Offer
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Conditional Rendering: Show detail view if an NFT is selected
  if (selectedNft) {
    return <NFTDetailView nft={selectedNft} />;
  }

  // Main View
  return (
    <div className="bg-purple-mix rounded-2xl mt-1 min-h-screen text-white font-sans p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        {/* Header Section */}
        <header className="text-start mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Top 50 NFTs
            </span>
          </h1>
          <p className="mt-2 text-lg text-gray-400">
            Explore the most iconic digital collectibles.
          </p>
        </header>

        {/* Search and Pagination Controls Section (Top) */}
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-1/2 lg:w-1/3 order-1 md:order-1">
            {" "}
            {/* Search on left */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute top-1/2 left-3 -translate-y-1/2 text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search NFTs by name, creator, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-purple-900   text-white rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 order-2 md:order-2">
            {" "}
            {/* Prev/Next on right */}
            <button
              onClick={handlePrev} // No-op, always disabled
              disabled={true} // Always disabled
              className="bg-purple-900 hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-full h-10 w-10 flex items-center justify-center transition-all duration-300"
              aria-label="Previous NFTs"
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
              onClick={handleNext} // No-op, always disabled
              disabled={true} // Always disabled
              className="bg-purple-900 hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-full h-10 w-10 flex items-center justify-center transition-all duration-300"
              aria-label="Next NFTs"
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
            {/* Display "1 of 1" or "0 of 0" if no NFTs */}
            <span className="text-gray-400 text-sm">
              Page {currentPage} of {totalPages === 0 ? 0 : totalPages}
            </span>
          </div>
        </div>

        {/* NFT Grid Section */}
        {currentNfts.length > 0 ? (
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6`}
          >
            {currentNfts.map((nft) => (
              <NFTCard key={nft.id} nft={nft} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-gray-300">
              No NFTs Found
            </h3>
            <p className="text-gray-500 mt-2">
              Try adjusting your search query or clear the search.
            </p>
          </div>
        )}

        {/* Pagination Controls Section (Bottom Right) */}
        <div className="mt-8 flex justify-end items-center gap-2">
          {" "}
          {/* Align to end (right) */}
          <button
            onClick={handlePrev} // No-op, always disabled
            disabled={true} // Always disabled
            className="bg-purple-900 hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-full h-10 w-10 flex items-center justify-center transition-all duration-300"
            aria-label="Previous NFTs"
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
            onClick={handleNext} // No-op, always disabled
            disabled={true} // Always disabled
            className="bg-purple-900 hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-full h-10 w-10 flex items-center justify-center transition-all duration-300"
            aria-label="Next NFTs"
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
          {/* Display "1 of 1" or "0 of 0" if no NFTs */}
          <span className="text-gray-400 text-sm">
            Page {currentPage} of {totalPages === 0 ? 0 : totalPages}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Top50NFT;
