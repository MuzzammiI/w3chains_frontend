import React, { useState } from 'react';
const LatestNftNews = () => {
  // Sample Data for different news categories
  const [trendsNews] = useState([
    {
      id: 1,
      title: "Metaverse Real Estate Boom: Digital Land Prices Soar",
      image: "https://media.gettyimages.com/id/1347851940/vector/non-fungible-token.jpg?s=612x612&w=0&k=20&c=0CVGrztxJQ9zrSXW6irM4Gg09UL3MTVHGm2cxAtbrv0=", // Indigo background
      description:
        "Reports indicate a massive surge in virtual land sales across popular metaverse platforms like Decentraland and The Sandbox.",
      source: "MetaWorld Daily",
      time: "2 hours ago",
      tags: ["Metaverse", "Investment", "Real Estate"],
    },
    {
      id: 2,
      title: "PFP Collections Dominate Market Caps, Driven by Community Hype",
      image: "https://media.gettyimages.com/id/1240089799/photo/bored-ape-yacht-club-collection-in-opensea-displayed-on-a-phone-screen-and-nft-logo-displayed.jpg?s=612x612&w=0&k=20&c=CP3C5wXyZ0r4XTOW6W4kYCA6gtvuXyuDIz8_cf9X3h4=", // Maroon background
      description:
        "Profile Picture (PFP) NFT collections continue to hold the highest market capitalization, fueled by strong community engagement and cultural significance.",
      source: "NFT Insights",
      time: "5 hours ago",
      tags: ["PFPs", "Community", "Market Cap"],
    },
  ]);

  const [upcomingNews] = useState([
    {
      id: 1,
      title: "New AI-Generated NFT Art Platform Launching Soon",
      source: "TechArt Digest",
      time: "Tomorrow",
      tags: ["AI", "Art"],
    },
    {
      id: 2,
      title: "Major Brand to Announce First NFT Collection Collaboration",
      source: "BrandWire",
      time: "Next Week",
      tags: ["Brands", "Partnership"],
    },
    {
      id: 3,
      title: "Gaming Guild Reveals Exclusive NFT Avatars for Q3 Release",
      source: "GameVerse News",
      time: "Upcoming Month",
      tags: ["Gaming", "Utility"],
    },
    {
      id: 4,
      title: "Decentralized Music NFTs to Revolutionize Artist Royalties",
      source: "TuneBlock",
      time: "End of Month",
      tags: ["Music", "DeFi"],
    },
    {
      id: 5,
      title: "VR Experience Integrates Dynamic NFT Characters",
      source: "Virtual Horizon",
      time: "Soon",
      tags: ["VR", "Interactive"],
    },
    {
      id: 6,
      title: "Fashion House Drops Digital Wearables for Metaverse Avatars",
      source: "StyleByte",
      time: "Season Launch",
      tags: ["Fashion", "Wearables"],
    },
    {
      id: 7,
      title: "Sports League Minting Fan Token NFTs for 2025 Season",
      source: "SportsChain",
      time: "Next Season",
      tags: ["Sports", "Fan Tokens"],
    },
    {
      id: 8,
      title: "Charity Auction Featuring Rare Historical Document NFTs",
      source: "Heritage Chain",
      time: "Fundraiser Date",
      tags: ["Charity", "History"],
    },
  ]);

  const [topSearchNews] = useState([
    {
      id: 1,
      title: "Why Solana NFTs Are Gaining Traction Over Ethereum",
      source: "BlockCrunch",
      time: "1 day ago",
      tags: ["Solana", "Ethereum"],
    },
    {
      id: 2,
      title: "Understanding Royalty Structures in NFT Marketplaces",
      source: "CryptoExplain",
      time: "3 days ago",
      tags: ["Royalties", "Marketplace"],
    },
    {
      id: 3,
      title: "The Rise of Utility NFTs: Beyond JPEGs",
      source: "Web3 Learn",
      time: "5 days ago",
      tags: ["Utility", "Education"],
    },
    {
      id: 4,
      title: "Impact of Regulatory Changes on the NFT Landscape",
      source: "LawChain",
      time: "1 week ago",
      tags: ["Regulation", "Legal"],
    },
    {
      id: 5,
      title: "NFT Fractionalization: Making High-Value Assets Accessible",
      source: "DeFi Digest",
      time: "2 weeks ago",
      tags: ["Fractionalization", "Investment"],
    },
    {
      id: 6,
      title: "Exploring Play-to-Earn Mechanics in Blockchain Games",
      source: "GameFi Review",
      time: "3 weeks ago",
      tags: ["GameFi", "P2E"],
    },
    {
      id: 7,
      title: "The Future of Digital Identity with Soulbound Tokens",
      source: "IdentityChain",
      time: "1 month ago",
      tags: ["Identity", "SBTs"],
    },
    {
      id: 8,
      title: "Are Brands Ready for the Mainstream NFT Adoption?",
      source: "Marketing3.0",
      time: "2 months ago",
      tags: ["Brands", "Adoption"],
    },
    
  ]);

  // State for "See More" functionality
  const [showMoreUpcoming, setShowMoreUpcoming] = useState(false);
  const [showMoreTopSearch, setShowMoreTopSearch] = useState(false);

  const initialSmallCardsCount = 3;

  const displayedUpcomingNews = showMoreUpcoming
    ? upcomingNews
    : upcomingNews.slice(0, initialSmallCardsCount);
  const displayedTopSearchNews = showMoreTopSearch
    ? topSearchNews
    : topSearchNews.slice(0, initialSmallCardsCount);

  // Common animation classes
  const fadeIn = "animate-fadeIn";
  const slideInRight = "animate-slideInRight";
  const slideInLeft = "animate-slideInLeft";
  const fadeInUpStagger = (index) => `animate-fadeInUp delay-${index * 100}`; // Staggered fade in up

  return (
    <div className="w-full border-2 border-zinc-700 rounded-2xl mx-auto px-4 py-8">
      {/* Page Title */}
      <h1 className="text-2xl sm:text-5xl lg:text-3xl font-extrabold text-start text-white mb-12 drop-shadow-lg animate-scaleIn">
        Latest NFT News
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Trends News (1x2 layout) */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-orange-400  animate-fadeInLeft">
            🔥 Trends News
          </h2>

          {/* Top Box */}
          <div
            className={` rounded-xl overflow-hidden shadow-2xl border-2 border-orange-500 transform hover:scale-103 transition duration-300 ease-in-out ${fadeIn}`}
          >
            <img
              src={trendsNews[0].image}
              alt={trendsNews[0].title}
              className="w-full h-56 sm:h-72 object-cover cursor-pointer object-center animate-zoomInImage"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://plus.unsplash.com/premium_photo-1749979042422-1daec3adc0aa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG5mdCUyMGNvbGxlY3Rpb258ZW58MHx8MHx8fDA%3D";
              }}
            />
            <div className="p-6">
              <h3 className="text-xl font-bold no-underline hover:underline cursor-pointer text-white mb-2 animate-fadeInText">
                {trendsNews[0].title}
              </h3>
              <p className="text-gray-300 text-sm mb-4 animate-fadeInText delay-100">
                {trendsNews[0].description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {trendsNews[0].tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full animate-bounceIn tag-delay-${index}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center text-sm text-gray-400 animate-fadeInText delay-200">
                <span>{trendsNews[0].source}</span>
                <span>{trendsNews[0].time}</span>
              </div>
            </div>
          </div>

          {/* Bottom Box */}
          <div
            className={` rounded-xl overflow-hidden shadow-2xl border-2 border-orange-500 transform hover:scale-103 transition duration-300 ease-in-out ${slideInLeft}`}
          >
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2 no-underline hover:underline cursor-pointer animate-fadeInText">
                {trendsNews[1].title}
              </h3>
              <p className="text-gray-300 text-sm mb-4 animate-fadeInText delay-100">
                {trendsNews[1].description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {trendsNews[1].tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full animate-bounceIn tag-delay-${index}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center text-sm text-gray-400 animate-fadeInText delay-200">
                <span>{trendsNews[1].source}</span>
                <span>{trendsNews[1].time}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Upcoming & Top Search News (Small Cards) */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Upcoming News */}
          <div className='flex justify-between items-center'>
            <h2 className="text-2xl font-bold text-emerald-400  animate-fadeInRight">
            🚀 Upcoming News
          </h2>
                {upcomingNews.length > initialSmallCardsCount && (
            <div className="flex justify-start ">
              <button
                onClick={() => setShowMoreUpcoming(!showMoreUpcoming)}
                className="bg-emerald-600 text-white px-4 py-2 text-sm cursor-pointer rounded-full font-semibold shadow-lg hover:bg-emerald-700 transition duration-300 ease-in-out transform hover:translate-y-1 animate-pulseButton"
              >
                {showMoreUpcoming ? "See Less" : "See More"}
              </button>
            </div>
          )}
          </div>



          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {displayedUpcomingNews.map((news, index) => (
              <div
                key={news.id}
                className={`bg-gray-800  rounded-lg p-4 shadow-xl border-2 border-emerald-600 transform hover:scale-105 transition duration-300 ease-in-out ${fadeInUpStagger(
                  index
                )}`}
              >
                <h4 className="text-sm cursor-pointer no-underline hover:underline font-semibold text-white mb-1">
                  {news.title}
                </h4>
                <div className="flex flex-wrap gap-1 mb-2">
                  {news.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-emerald-700 text-emerald-100 text-xs px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>{news.source}</span>
                  <span>{news.time}</span>
                </div>
              </div>
            ))}
          </div>
          

          {/* Top Search News */}
        <div className='flex justify-between items-center'>

            <h2 className="text-2xl font-bold text-sky-400  animate-fadeInRight delay-300">
            🔍 Top Search News
          </h2>
          {topSearchNews.length > initialSmallCardsCount && (
            <div className="flex justify-start mt-4">
              <button
                onClick={() => setShowMoreTopSearch(!showMoreTopSearch)}
                className="bg-sky-600 text-white px-4 text-sm py-2 rounded-full  cursor-pointer font-semibold shadow-lg hover:bg-sky-700 transition duration-300 ease-in-out transform hover:translate-y-1 animate-pulseButton"
              >
                {showMoreTopSearch ? "See Less" : "See More"}
              </button>
            </div>
          )}
        </div>






          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {displayedTopSearchNews.map((news, index) => (
              <div
                key={news.id}
                className={`bg-gray-800 rounded-lg p-4 shadow-xl border-2 border-sky-600 transform hover:scale-105 transition duration-300 ease-in-out ${fadeInUpStagger(
                  index
                )}`}
              >
                <h4 className="text-sm cursor-pointer no-underline hover:underline font-semibold text-white mb-1">
                  {news.title}
                </h4>
                <div className="flex flex-wrap gap-1 mb-2">
                  {news.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-sky-700 text-sky-100 text-xs px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>{news.source}</span>
                  <span>{news.time}</span>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
};
export default LatestNftNews;
