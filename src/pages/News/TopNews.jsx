import React, { useState, useEffect } from 'react';
import ScrollToTopButton from '../../components/ScrollToTopButton';
// Helper function to generate random news data
const generateRandomNews = (count, type = 'general') => {
  const newsData = [];
  const titles = [
    "Crypto Goes Corporate As A New Wave Of Public Companies Buy Bitcoin",
    "Why The Fed Must Be Hit By The Intellectual Equivalent Of A B-2 Bomber",
    "Trusted Advisor Stole From Retirees And Lied To The IRS—Now He’ll Spend Decades In Prison",
    "The Tax Scammers, Con Men, And Thieves, Oh My! Edition",
    "Trump Media Stock (DJT) — Downtrend At Critical Level",
    "Inside The Global 2000: Trump’s Tariffs Haven’t Stopped The World’s Growth… Yet",
    "As The Byrd Bath Continues, Here’s A Look At What Will Likely Be Out Of The Big Beautiful Bill",
    "Bitcoin Surges Past $70000 as Institutional Adoption Grows",
    "Ethereum's Dencun Upgrade Goes Live, Reducing Transaction Costs",
    "Altcoin Market Sees Significant Gains Following Bitcoin's Rally",
    "DeFi Protocols Witness Record-Breaking TVL in Q2",
    "NFT Sales Volume Reaches New Highs Amidst Creator Economy Boom",
    "Regulatory Clarity Expected for Stablecoins in Upcoming Legislation",
  ];
  const excerpts = [
    "A growing number of public companies are adding Bitcoin to their balance sheets, marking a significant shift in corporate finance.",
    "Experts argue for a drastic overhaul of the Federal Reserve's policies to combat rising inflation and economic instability.",
    "A financial advisor has been sentenced to prison for defrauding retirees and deceiving the IRS in a multi-million dollar scheme.",
    "A comprehensive look into the intricate world of tax fraud, detailing common tactics used by scammers and how to avoid them.",
    "Shares of Trump Media & Technology Group are experiencing a notable decline, raising concerns among investors.",
    "Despite tariffs, the global economy continues to show resilience, with many sectors still demonstrating growth.",
    "A detailed examination of ongoing legislative debates, focusing on a major bill and its potential impact on various industries.",
    "The world of cryptocurrency is abuzz as Bitcoin crosses a major milestone, signaling growing interest from institutional investors.",
    "A highly anticipated upgrade to the Ethereum network aims to significantly reduce gas fees, making transactions more affordable.",
    "Following Bitcoin's impressive performance, several altcoins have experienced substantial price increases, attracting new investors.",
    "Decentralized Finance (DeFi) platforms have achieved unprecedented Total Value Locked (TVL) in the second quarter.",
    "The market for Non-Fungible Tokens (NFTs) is experiencing a surge in sales volume, driven by the expanding creator economy.",
    "Lawmakers are actively working on new legislation to provide much-needed regulatory clarity for stablecoins.",
  ];
  const authors = ["Nina Bambysheva", "Steve Forbes", "Kelly Phillips Erb", "John S. Tobey", "Hank Tucker"];
  const sources = ["Forbes Staff", "Forbes Contributor"];
  const placeholderColors = ['4B5563', '6B7280', '1F2937', '374151', '4B5563', '525252', '737373', '8C8C8C']; // Different shades for more variety
  const textColors = ['D1D5DB', 'F3F4F6', '9CA3AF', 'D1D5DB', 'E5E7EB', 'D4D4D4', 'A3A3A3']; // Different shades of light text for contrast

  for (let i = 0; i < count; i++) {
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    const randomExcerpt = excerpts[Math.floor(Math.random() * excerpts.length)];
    const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
    const randomSource = sources[Math.floor(Math.random() * sources.length)];
    const bgColor = placeholderColors[Math.floor(Math.random() * placeholderColors.length)];
    const txtColor = textColors[Math.floor(Math.random() * textColors.length)];

    newsData.push({
      id: `${type}-${Date.now()}-${i}`,
      title: randomTitle,
      excerpt: randomExcerpt,
      author: randomAuthor,
      source: randomSource,
      imageUrl: `https://placehold.co/600x400/${bgColor}/${txtColor}?text=${type}+${i + 1}`,
      smallImageUrl: `https://placehold.co/150x100/${bgColor}/${txtColor}?text=${type}+${i + 1}`
    });
  }
  return newsData;
};

const TopNews = () => {
  const [mainNews, setMainNews] = useState([]);
  const [relatedNews, setRelatedNews] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentRelatedPage, setCurrentRelatedPage] = useState(0); // State for related news pagination
  const CARDS_PER_ROW = 4; // Number of related cards to show per row

  useEffect(() => {
    setMainNews(generateRandomNews(5, 'main')); // 5 articles for the main slider
    setRelatedNews(generateRandomNews(12, 'related')); // More related articles to allow pagination
  }, []);

  // Main Slider navigation
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % mainNews.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + mainNews.length) % mainNews.length);
  };

  // Related Cards Slider navigation
  const nextRelatedPage = () => {
    setCurrentRelatedPage((prevPage) => {
      const maxPage = Math.ceil(relatedNews.length / CARDS_PER_ROW) - 1;
      return prevPage < maxPage ? prevPage + 1 : 0; // Loop back to start
    });
  };

  const prevRelatedPage = () => {
    setCurrentRelatedPage((prevPage) => {
      const maxPage = Math.ceil(relatedNews.length / CARDS_PER_ROW) - 1;
      return prevPage > 0 ? prevPage - 1 : maxPage; // Loop to end
    });
  };

  const handleCardClick = (id) => {
    // In a real application, you'd use a routing library like react-router-dom
    window.location.href = `/article/${id}`;
  };

  // Calculate visible related news
  const startIndex = currentRelatedPage * CARDS_PER_ROW;
  const visibleRelatedNews = relatedNews.slice(startIndex, startIndex + CARDS_PER_ROW);

  return (
    <>

    <div className="min-h-screen bg-gray-900 text-white font-inter p-4">
      <style>
        {`
          /* Custom keyframes for animations */
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes slideInFromLeft {
            from {
              opacity: 0;
              transform: translateX(-50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .animate-fadeInUp {
            animation: fadeInUp 1s ease-out forwards;
          }

          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out forwards;
          }

          .animate-slideInFromLeft {
            animation: slideInFromLeft 0.7s ease-out forwards;
          }
        `}
      </style>

      <div className="container mx-auto px-4 ">
        <h2 className="text-3xl font-bold py-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 animate-fadeInUp">
            Top News within the Last 24 Hours
          </h2>

        {/* Main News Section */}
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Left Side: Main Slider (7xl width equivalent) */}
          <div className="lg:col-span-2 relative bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-slideInFromLeft max-w-full">
            {mainNews.length > 0 && (
              <div className="w-full h-96 relative">
                <img
                  src={mainNews[currentSlide].imageUrl}
                  alt={mainNews[currentSlide].title}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/800x600/4B5563/D1D5DB?text=No+Image`; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                  <h2 className="text-3xl font-bold mb-2 leading-tight">
                    {mainNews[currentSlide].title}
                  </h2>
                  <p className="text-gray-300 text-sm">
                    By {mainNews[currentSlide].author}, {mainNews[currentSlide].source}
                  </p>
                </div>

                {/* Slider Navigation Buttons */}
                <button
                  onClick={prevSlide}
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 bg-gray-700 rounded-full text-white hover:bg-gray-600 transition-colors duration-200"
                  aria-label="Previous slide"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 bg-gray-700 rounded-full text-white hover:bg-gray-600 transition-colors duration-200"
                  aria-label="Next slide"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Right Side: Related Elements (Top Global 2000 Card & another news item) */}
          <div className="lg:col-span-1 space-y-6">
            {/* Global 2000 Card */}
            <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fadeIn">
              <img
                src="https://placehold.co/400x250/1F2937/F9FAFB?text=The+Global+2000"
                alt="The Global 2000"
                className="w-full h-40 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  Inside The Global 2000: Trump’s Tariffs Haven’t Stopped The World’s Growth… Yet
                </h3>
                <p className="text-gray-400 text-sm">
                  By Hank Tucker, Forbes Staff
                </p>
              </div>
            </div>

            {/* Another Related News Item */}
            <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fadeIn">
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  As The Byrd Bath Continues, Here’s A Look At What Will Likely Be Out Of The Big Beautiful Bill
                </h3>
                <p className="text-gray-400 text-sm">
                  By Kelly Phillips Erb, Forbes Staff
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Cards Section at Bottom */}
        {/* Top-right buttons for "More Stories" */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 animate-fadeInUp">
            More Stories
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={prevRelatedPage}
              className="p-2 bg-gray-700 rounded-full text-white hover:bg-gray-600 transition-colors duration-200"
              aria-label="Previous related story"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextRelatedPage}
              className="p-2 bg-gray-700 rounded-full text-white hover:bg-gray-600 transition-colors duration-200"
              aria-label="Next related story"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleRelatedNews.map((item, index) => (
            <div
              key={item.id}
              className="bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer
                         transform transition-all duration-300 hover:scale-105 hover:shadow-xl
                         animate-fadeIn"
              style={{ animationDelay: `${index * 0.15}s` }}
              onClick={() => handleCardClick(item.id)}
            >
              <img
                src={item.smallImageUrl}
                alt={item.title}
                className="w-full h-32 object-cover rounded-t-xl"
                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/300x200/4B5563/D1D5DB?text=No+Image`; }}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1 leading-tight">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-xs">
                  By {item.author}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom-right buttons for "More Stories" */}
        <div className="flex justify-end mt-8"> {/* Adjusted to justify-end */}
          <div className="flex space-x-2">
            <button
              onClick={prevRelatedPage}
              className="p-2 bg-gray-700 rounded-full text-white hover:bg-gray-600 transition-colors duration-200"
              aria-label="Previous related story"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextRelatedPage}
              className="p-2 bg-gray-700 rounded-full text-white hover:bg-gray-600 transition-colors duration-200"
              aria-label="Next related story"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <ScrollToTopButton/>
    </>
  );
};

export default TopNews;
