import React, { useState, useEffect } from 'react';
import ButtonCard from '../../components/ButtonCard';
import { ArrowUpLeft, CircleArrowOutDownLeft, CircleArrowOutDownLeftIcon, CircleArrowOutDownRight, CircleEllipsis } from 'lucide-react';
import ScrollToTopButton from '../../components/ScrollToTopButton';
// Helper function to generate random news data for various sections
const generateRandomNews = (count, type = 'general') => {
  const newsData = [];
  const titles = {
    general: [
      "Hong Kong Official Rules Out Plan for Central Bank",
      "New Zcash Software Sets Stage for 'Sapling' Upgrade",
      "SEC Suspends Crypto Firm's Stock After Big Price Boost",
      "Coinbase Halts Bitcoin Cash Trading Abruptly After Abruptly After",
      "Chain Moves to Simplify Smart Contracts",
      "Blockchain Project Announces Major Partnership",
      "DeFi Protocol Reaches $1 Billion TVL",
      "NFT Market Sees Surge in Trading Volume",
      "Ethereum Upgrade Reduces Gas Fees by 30%",
      "Bitcoin Hash Rate Hits All-Time High",
      "Web3 Gaming Attracts Mainstream Investors",
      "New Privacy Coin Gains Traction",
      "Layer 2 Scaling Solution Goes Live",
      "DAO Governance Proposal Passes Unanimously",
      "Cryptocurrency Regulations Looming in Europe",
      "Metaverse Real Estate Sales Soar",
      "Green Blockchain Initiatives on the Rise",
      "Stablecoin Adoption Grows Across Asia",
      "Decentralized Storage Solutions Expand",
      "Quantum Computing Threat to Crypto Analyzed"
    ],
    press: [
      "Company X Releases Q1 Earnings Report",
      "Partnership Formed for Supply Chain Blockchain",
      "Security Audit Completed for Smart Contract Platform",
      "New Patent Filed for Decentralized Technology",
      "Community Grant Program Announced",
      "Product Roadmap Update Released",
      "Strategic Investment Round Closed",
      "Open Source Initiative Launched",
      "Developer Conference Dates Announced",
      "Whitepaper v2.0 Published"
    ],
    recommended: [
      "Understanding the Basics of Decentralized Finance (DeFi)",
      "The Rise of NFTs: More Than Just Digital Art",
      "How Blockchain Technology is Revolutionizing Supply Chains",
      "Investing in Cryptocurrencies: A Beginner's Guide",
      "The Future of Work in the Web3 Era",
      "Exploring the Potential of Metaverse Applications",
      "Security Best Practices for Your Digital Assets",
      "Tokenomics Explained: What You Need to Know",
      "The Impact of Central Bank Digital Currencies (CBDCs)",
      "Navigating the World of Cryptocurrency Taxes"
    ]
  };
  const excerpts = {
    general: [
      "The latest announcement from Hong Kong officials indicates no immediate plans for a central bank digital currency, focusing on regulatory frameworks instead.",
      "Zcash is preparing for a significant software update, 'Sapling', which promises enhanced privacy features and improved performance for its network.",
      "The SEC has temporarily halted trading of a crypto firm's stock following an unprecedented price surge, citing concerns over market manipulation.",
      "Coinbase experienced a sudden halt in Bitcoin Cash trading, leading to speculation and market volatility across various platforms.",
      "A leading blockchain chain is implementing new protocols to simplify the creation and execution of smart contracts, aiming for broader adoption.",
      "A prominent blockchain project has just announced a major strategic partnership with a global tech firm, aiming to expand its ecosystem and reach.",
      "A decentralized finance protocol has reached a significant milestone, achieving a total value locked of over $1 billion, signaling robust growth.",
      "The non-fungible token (NFT) market is experiencing a considerable surge in trading volume, with new artists and collectors entering the space daily.",
      "A recent upgrade to the Ethereum network has successfully reduced gas fees by an impressive 30%, making transactions more affordable and efficient.",
      "The computational power dedicated to mining Bitcoin has reached an unprecedented level, indicating increased network security and miner confidence.",
      "Web3 gaming platforms are increasingly attracting attention from mainstream investors, drawn by the innovative play-to-earn models and growing user bases.",
      "A new privacy-focused cryptocurrency is quickly gaining traction in the market, offering enhanced anonymity and security for transactions.",
      "A cutting-edge Layer 2 scaling solution has officially gone live, promising significantly faster and cheaper transactions on the Ethereum network.",
      "A pivotal governance proposal within a decentralized autonomous organization (DAO) has passed unanimously, setting a new direction for the community.",
      "New cryptocurrency regulations are expected to be implemented across Europe soon, aiming to provide a clearer legal framework for digital assets.",
      "The virtual real estate market within various metaverse platforms is experiencing a boom, with sales volumes reaching new record highs.",
      "There's a growing trend towards environmentally friendly blockchain initiatives, focusing on sustainable consensus mechanisms and energy-efficient operations.",
      "Stablecoin Adoption Grows Across Asia",
      "Decentralized Storage Solutions Expand",
      "Quantum Computing Threat to Crypto Analyzed"
    ],
    press: [
      "This is a placeholder excerpt for a press release, detailing the company's latest announcement.",
      "Further details on the strategic partnership are expected to be released next quarter, according to official statements.",
      "The comprehensive security audit confirmed the robust nature of the smart contract platform's infrastructure and protocols.",
      "Revolutionary decentralized technology is set to disrupt the industry, with a new patent protecting its core innovations.",
      "Applications are now open for the community grant program, fostering decentralized application development and growth.",
      "The updated product roadmap outlines key milestones and features planned for the upcoming development cycles.",
      "A successful closing of the strategic investment round provides significant capital for future expansion and innovation.",
      "The new open-source initiative aims to decentralize development and encourage collaborative contributions from the global community.",
      "Mark your calendars: the annual developer conference will bring together leading minds in blockchain and Web3 technology.",
      "The second version of the whitepaper offers deeper insights into the project's tokenomics and technical architecture."
    ],
    recommended: [
      "This excerpt highlights why understanding the basics of DeFi is crucial for new crypto participants.",
      "Discover how NFTs are transforming digital ownership beyond traditional art, including music and collectibles.",
      "Learn about the revolutionary impact of blockchain technology on modern supply chain management and transparency.",
      "A beginner's comprehensive guide to navigating the exciting yet volatile world of cryptocurrency investments.",
      "Explore the transformative potential of Web3 technologies in redefining the future of work and digital economies.",
      "Dive into the immersive possibilities of metaverse applications and their impact on social interaction and commerce.",
      "Essential security practices to safeguard your valuable digital assets from cyber threats and unauthorized access.",
      "A detailed explanation of tokenomics, covering token distribution, utility, and economic models in blockchain projects.",
      "Understand the global implications and potential benefits of Central Bank Digital Currencies (CBDCs) on financial systems.",
      "A practical guide to understanding and managing cryptocurrency taxes in various jurisdictions."
    ]
  };
  const authors = ["Admin", "John Doe", "Jane Smith", "Crypto Analyst", "Blockchain Expert"];
  const dates = [
    "May 31, 2018", "February 5, 2018", "March 10, 2018", "April 20, 2018", "January 15, 2018"
  ];
  const categories = ["BLOCKCHAIN", "NEWS", "BUSINESS", "TECHNOLOGY", "MARKET"];

  for (let i = 0; i < count; i++) {
    const randomTitle = titles[type][Math.floor(Math.random() * titles[type].length)];
    const randomExcerpt = excerpts[type][Math.floor(Math.random() * excerpts[type].length)];
    const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
    const randomDate = dates[Math.floor(Math.random() * dates.length)];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`; // Random hex color for placeholders

    newsData.push({
      id: `${type}-${Date.now()}-${i}`,
      title: randomTitle,
      excerpt: randomExcerpt,
      author: randomAuthor,
      date: randomDate,
      category: randomCategory,
      imageUrl: `https://placehold.co/400x250/${randomColor.substring(1)}/FFFFFF?text=${randomCategory.substring(0,2).toUpperCase()}`,
      smallImageUrl: `https://placehold.co/100x60/${randomColor.substring(1)}/FFFFFF?text=${randomCategory.substring(0,2).toUpperCase()}`
    });
  }
  return newsData;
};

const TrendingNews = () => {
  const [topTopics, setTopTopics] = useState([
    "DeepSeek", "ChatGPT", "Claude", "AI Video Generator", "Ethereum", "NFT"
  ]);
  const [activeTopic, setActiveTopic] = useState("DeepSeek"); // Initial active topic

  const [sliderNews, setSliderNews] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [pressReleases, setPressReleases] = useState([]);
  const [mainNewsGrid, setMainNewsGrid] = useState([]);
  const [mostRead, setMostRead] = useState([]);
  const [recommended, setRecommended] = useState([]);

  const [currentSlide, setCurrentSlide] = useState(0); // For the central slider
  const INITIAL_GRID_COUNT = 6; // Define initial visible count for "Load More"
  const [visibleGridCount, setVisibleGridCount] = useState(INITIAL_GRID_COUNT);

  useEffect(() => {
    // Populate with random data
    setSliderNews(generateRandomNews(5, 'general').map((item, idx) => ({ ...item, date: `February ${5 + idx}, 2018` })));
    setLatestNews(generateRandomNews(10, 'general').map((item, idx) => ({ ...item, date: `May ${31 - idx}, 2018` }))); // More for scrolling
    setPressReleases(generateRandomNews(10, 'press').map((item, idx) => ({ ...item, date: `February ${5 + idx}, 2018` }))); // More for scrolling
    setMainNewsGrid(generateRandomNews(20, 'general')); // Increased for more "load more" content
    setMostRead(generateRandomNews(10, 'general').map((item, idx) => ({ ...item, title: `(${idx+1}) ${item.title}` }))); // More for scrolling
    setRecommended(generateRandomNews(8, 'recommended')); // More for scrolling
  }, []);

  const handleTopicClick = (topic) => {
    setActiveTopic(topic);
    // In a real app, this would trigger fetching news related to the topic
    // For now, it just changes the active state
  };

  const handleLoadMore = () => {
    setVisibleGridCount(prevCount => prevCount + INITIAL_GRID_COUNT); // Load 6 more posts
  };

  const handleSeeLess = () => {
    setVisibleGridCount(INITIAL_GRID_COUNT); // Reset to initial count
  };

  const handleArticleClick = (id) => {
    window.location.href = `/article-details/${id}`; // Simulate routing
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderNews.length);
  };
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderNews.length) % sliderNews.length);
  };

  return (
    <>

    <div className="min-h-screen  text-gray-100 flex font-mono p-4"> {/* Removed overflow-hidden */}
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
          @keyframes expandText {
            from { max-height: 48px; } /* line-clamp-2 */
            to { max-height: 200px; } /* arbitrary large value */
          }
          .animate-fadeInUp { animation: fadeInUp 1s ease-out forwards; }
          .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
          .animate-popIn { animation: popIn 0.6s ease-out forwards; }

          /* Custom scrollbar hide for elements like the slider if needed */
          .scrollbar-hide {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
          }

          /* Expanding Text */
          .expandable-text {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            transition: -webkit-line-clamp 0.3s ease-in-out;
          }
          .expandable-text.expanded {
            -webkit-line-clamp: unset;
          }

          /* Custom scrollbar styles for visible scrollbars */
          .custom-scrollbar {
            scrollbar-width: thin; /* For Firefox */
            scrollbar-color: #4B5563 #1F2937; /* thumb and track */
          }

          /* For Webkit browsers (Chrome, Safari) */
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px; /* width of the scrollbar */
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: #1F2937; /* color of the track */
            border-radius: 10px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #4B5563; /* color of the scroll thumb */
            border-radius: 10px; /* roundness of the scroll thumb */
            border: 2px solid #1F2937; /* creates padding around scroll thumb */
          }
        `}
      </style>

      <div className="container mx-auto  py-8">
        {/* Trending Topics */}
        <h1 className="text-3xl font-bold mb-8 text-white animate-fadeInUp">
          Trending Topics
        </h1>
        <div className="flex flex-wrap gap-2 mb-12 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          {topTopics.map(topic => (
            // <button
            //   key={topic}
            //   onClick={() => handleTopicClick(topic)}
            //   className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
            //     ${activeTopic === topic
            //       ? 'bg-blue-600 text-white shadow-lg'
            //       : 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white'
            //     }`}
            // >
            //   {topic}
            // </button>

            <ButtonCard 
              key={topic}
              onClick={()=> handleTopicClick(topic)}
              // className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 
              //   ${activeTopic === topic
              //     ? 'bg-blue-600 text-white shadow-lg'
              //     : 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white'
              //   }`}
              size='small'
              animationType="glow"
              styles='border border-gray-700'
              iconPosition='right'
              icon={null}
              >
                {topic}
              </ButtonCard>

            



          ))}
        </div>

        {/* Main Content Grid - Adjusted Column Spans */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-8 sticky top-4 self-start"> {/* Added sticky top and self-start */}
            {/* Latest News */}
            <div className="bg-purple-mix  text-gray-100 rounded-xl shadow-lg p-6 animate-fadeInUp">
              <h2 className="text-xl font-bold mb-4 text-purple-400">Latest</h2>
              <ul className="space-y-4 max-h-120 overflow-y-auto custom-scrollbar">
                {latestNews.map(item => (
                  <li key={item.id} className="cursor-pointer group" onClick={() => handleArticleClick(item.id)}>
                    <h3 className="text-sm lg:text-md font-semibold text-gray-300 group-hover:text-blue-400 transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-xs mt-1">{item.date}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Press Releases */}
            <div className="bg-gradient-to-r from-gray-900 to-teal-900/90   text-gray-100 rounded-xl shadow-lg p-6 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-xl font-bold mb-4 text-pink-400">Press Releases</h2>
              <ul className="space-y-4 max-h-120 overflow-y-auto custom-scrollbar">
                {pressReleases.map(item => (
                  <li key={item.id} className="cursor-pointer group" onClick={() => handleArticleClick(item.id)}>
                    <h3 className="text-sm lg:text-md font-semibold text-gray-300 group-hover:text-blue-400 transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">{item.date}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Middle Column (Main Slider and Grid) - This column will now be wider */}
          <div className="lg:col-span-2 space-y-4 ">
            {/* Central Slider */}
            <div className="bg-gradient-to-r from-gray-900 to-teal-900/90 min-h-[200px]  text-gray-100 rounded-xl shadow-lg p-6 relative animate-popIn">
              {sliderNews.length > 0 && (
                <div
                  className="relative w-full h-72 rounded-lg overflow-hidden cursor-pointer group"
                  onClick={() => handleArticleClick(sliderNews[currentSlide].id)}
                >
                  <img
                    src={sliderNews[currentSlide].imageUrl}
                    alt={sliderNews[currentSlide].title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x350/444444/FFFFFF?text=TRENDING`; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

                  <div className="absolute top-2 right-2 bg-gray-900 text-white text-xs px-2 py-1 rounded-full border border-gray-700">
                    {sliderNews[currentSlide].date} {/* Time circle/date indicator */}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full mb-1">
                      {sliderNews[currentSlide].category}
                    </span>
                    <h3 className="text-xl font-bold leading-tight mb-2">
                      {sliderNews[currentSlide].title}
                    </h3>
                    {/* Expanding Point */}
                    <p className="text-gray-300 text-xs lg:text-sm expandable-text group-hover:expanded">
                      {sliderNews[currentSlide].excerpt}
                    </p>
                  </div>

                  {/* Slider Navigation Buttons */}
                  <button
                    onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                    className="absolute top-1/5 cursor-pointer left-2 transform -translate-y-1/2 p-2 bg-gray-700 rounded-full text-white hover:bg-gray-600 transition-colors duration-200"
                    aria-label="Previous slide"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 lg:h-6 lg:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                    className="absolute top-1/5 cursor-pointer right-2 transform -translate-y-1/2 p-2 bg-gray-700 rounded-full text-white hover:bg-gray-600 transition-colors duration-200"
                    aria-label="Next slide"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 lg:h-6 lg:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Main News Grid (below slider) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mainNewsGrid.slice(0, visibleGridCount).map((item, index) => (
                <div
                  key={item.id}
                  className="bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer
                             transform transition-all duration-300 hover:scale-102 hover:shadow-xl
                             animate-fadeIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleArticleClick(item.id)}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-36 object-cover rounded-t-xl"
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x250/555555/DDDDDD?text=NEWS`; }}
                  />
                  <div className="p-4">
                    <span className="inline-block bg-purple-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-sm font-semibold mb-1 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-xs mt-1">By {item.author} | {item.date}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Posts / See Less Buttons */}
            <div className="flex justify-center gap-4 mt-8 ">
              {visibleGridCount < mainNewsGrid.length && (
                // <button
                //   onClick={handleLoadMore}
                //   className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold
                //              px-8 py-3 rounded-full shadow-lg transform transition-all duration-300
                //              hover:scale-105 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                // >
                //   Load More Posts
                // </button>
              <ButtonCard 
              onClick={handleLoadMore}
              size='medium'
              animationType="glow"
              styles='border border-gray-700'
              iconPosition='right'
              icon={CircleArrowOutDownRight}
              >
                Load more 
              </ButtonCard>





              )}
              {visibleGridCount > INITIAL_GRID_COUNT && (
                <ButtonCard 
              
              onClick={handleSeeLess}
              size='medium'
              animationType="glow"
              styles='border border-gray-700'
              iconPosition='right'
              icon={ArrowUpLeft}
              >
                Less See 
              </ButtonCard>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1 space-y-8 sticky top-4 self-start"> {/* Added sticky top and self-start */}
            {/* Calculator/Crypto Price */}
            <div className="bg-green-mix text-gray-100 border border-teal-700/50 rounded-xl shadow-lg p-6 animate-fadeInUp">
              <h2 className="text-xl font-bold mb-4 text-green-400">Calculator</h2>
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-semibold">BITCOIN</span>
                <span className="text-lg font-bold text-green-300">62886</span>
              </div>
              <div className="text-gray-400 text-sm mb-4">
                US DOLLAR
              </div>
              <h3 className="text-lg font-bold mb-3 text-blue-400">Recommended</h3>
              <ul className="space-y-4 max-h-100 overflow-y-auto custom-scrollbar">
                {recommended.map(item => (
                  <li key={item.id} className="flex items-start space-x-3 cursor-pointer group" onClick={() => handleArticleClick(item.id)}>
                    <img
                      src={item.smallImageUrl}
                      alt={item.title}
                      className="flex-shrink-0 w-16 h-12 object-cover rounded-md"
                      onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/100x60/666666/FFFFFF?text=Rec`; }}
                    />
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
                        {item.title}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Most Read */}
            <div className="bg-blue-mix  text-gray-100 rounded-xl shadow-lg p-6 animate-fadeInUp">
              <h2 className="text-xl font-bold mb-4 text-yellow-400">Most Read</h2>
              <ul className="space-y-3 max-h-120 overflow-y-auto custom-scrollbar">
                {mostRead.map((item, index) => (
                  <li key={item.id} className="cursor-pointer group text-xs" onClick={() => handleArticleClick(item.id)}>
                    <p className="text-white group-hover:text-blue-400 transition-colors duration-200 text-sm">
                      {/* <span className="font-bold  text-gray-500 mr-2">{index + 1}</span> */}
                       {item.title}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ScrollToTopButton/>
    </>
  );
};

export default TrendingNews;
