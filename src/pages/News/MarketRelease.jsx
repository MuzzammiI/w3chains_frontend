import React, { useState, useEffect } from 'react';
import ScrollToTopButton from '../../components/ScrollToTopButton';
// Helper function to generate random market release data
const generateRandomMarketRelease = (count) => {
  const data = [];
  const titles = [
    "New DeFi Protocol Launches with High APY Staking",
    "Major Exchange Announces Support for New Altcoin",
    "Blockchain Gaming Platform Unveils NFT Marketplace",
    "Decentralized Social Media App Hits 1 Million Users",
    "Web3 Infrastructure Project Secures $50M Funding Round",
    "Layer 2 Solution Integrates with Top DeFi Protocols",
    "Central Bank Digital Currency Pilot Program Expands",
    "Cross-Chain Bridge Facilitates Seamless Asset Transfers",
    "AI-Powered Crypto Trading Bot Shows Record Returns",
    "Sustainable Blockchain Initiative Gains Traction",
    "Metaverse Land Sale Breaks New Records",
    "Zero-Knowledge Proofs Adopted by Enterprise Blockchain",
  ];
  const descriptions = [
    "A groundbreaking decentralized finance protocol has just gone live, offering unprecedented annual percentage yields for stakers.",
    "One of the largest cryptocurrency exchanges has officially added a highly anticipated altcoin to its trading pairs.",
    "A leading blockchain gaming company has launched a comprehensive non-fungible token marketplace, enhancing in-game economies.",
    "A privacy-focused decentralized social media application has reached a significant milestone, surpassing one million active users.",
    "An innovative Web3 infrastructure project has successfully closed a funding round, securing $50 million from prominent investors.",
    "A popular Layer 2 scaling solution has completed its integration with several top decentralized finance protocols, improving efficiency.",
    "The pilot program for a new Central Bank Digital Currency has expanded its reach, involving more financial institutions and users.",
    "A newly developed cross-chain bridge now allows for secure and seamless transfer of digital assets between disparate blockchains.",
    "An artificial intelligence-powered cryptocurrency trading bot has demonstrated exceptional performance, yielding record returns for its users.",
    "A movement focused on creating environmentally friendly blockchain solutions is gaining significant momentum and support.",
    "A recent virtual land sale in a prominent metaverse project has shattered previous records, indicating growing interest in digital real estate.",
    "A major enterprise blockchain platform has begun incorporating zero-knowledge proofs, enhancing privacy and scalability for businesses."
  ];
  const categories = ["DeFi", "Exchange", "NFTs", "Web3", "Funding", "Layer2", "CBDC", "Cross-Chain", "AI", "Sustainability", "Metaverse", "Privacy"];
  const impacts = ["High", "Medium", "Low"];
  const colors = ["#22D3EE", "#A78BFA", "#F87171", "#FACC15", "#4ADE80", "#FB923C"]; // Tailwind-like colors

  for (let i = 0; i < count; i++) {
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    const randomDesc = descriptions[Math.floor(Math.random() * descriptions.length)];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomImpact = impacts[Math.floor(Math.random() * impacts.length)];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    data.push({
      id: `release-${Date.now()}-${i}`,
      title: randomTitle,
      description: randomDesc,
      category: randomCategory,
      impact: randomImpact,
      date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString(), // Random date within last 30 days
      color: randomColor,
      icon: `https://placehold.co/40x40/${randomColor.substring(1)}/FFFFFF?text=${randomCategory.substring(0,2).toUpperCase()}` // Icon based on category
    });
  }
  return data;
};

const MarketRelease = () => {
  const [releases, setReleases] = useState([]);
  const [visibleReleasesCount, setVisibleReleasesCount] = useState(8); // Initially show 8 releases

  useEffect(() => {
    setReleases(generateRandomMarketRelease(20)); // Generate more releases to allow "View All"
  }, []);

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const handleCardClick = (id) => {
    // This simulates URL routing. In a real application, you'd use a routing library.
    window.location.href = `/release/${id}`;
  };

  const handleViewAllReleases = () => {
    setVisibleReleasesCount(prevCount => prevCount + 8); // Load 8 more releases
  };

  return (
    <>

    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white font-inter p-4 overflow-hidden">
      <style>
        {`
          /* Custom keyframes for animations */
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes popIn {
            0% {
              transform: scale(0.5);
              opacity: 0;
            }
            80% {
              transform: scale(1.05);
              opacity: 1;
            }
            100% {
              transform: scale(1);
            }
          }

          @keyframes pulseEffect {
            0% {
              box-shadow: 0 0 0 0 rgba(100, 100, 100, 0.4);
            }
            70% {
              box-shadow: 0 0 0 10px rgba(100, 100, 100, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(100, 100, 100, 0);
            }
          }

          .animate-slideInUp {
            animation: slideInUp 0.8s ease-out forwards;
          }

          .animate-popIn {
            animation: popIn 0.6s ease-out forwards;
          }

          .animate-pulseEffect {
            animation: pulseEffect 2s infinite;
          }
        `}
      </style>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-extrabold text-start mb-16 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 animate-slideInUp">
          Market Pulse: Latest Releases
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {releases.slice(0, visibleReleasesCount).map((item, index) => (
            <div
              key={item.id}
              className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden
                         transform transition-all duration-300 hover:scale-105 hover:shadow-2xl
                         relative animate-popIn cursor-pointer"
              style={{ animationDelay: `${index * 0.15}s`, borderColor: item.color, borderWidth: '2px' }}
              onClick={() => handleCardClick(item.id)}
            >
              <div className="absolute top-0 right-0 m-4 px-3 py-1 rounded-full text-xs font-semibold"
                   style={{ backgroundColor: item.color }}>
                {item.category}
              </div>

              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img src={item.icon} alt="icon" className="w-10 h-10 rounded-full mr-3 animate-pulseEffect" />
                  <h3 className="text-2xl font-bold leading-tight">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {item.description}
                </p>
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>Released: {item.date}</span>
                  <span className={`px-2 py-0.5 rounded-full ${getImpactColor(item.impact)} text-white`}>
                    Impact: {item.impact}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Conditionally render "View All Releases" button */}
        {visibleReleasesCount < releases.length && (
          <div className="text-center mt-16 animate-slideInUp">
            <p className="text-gray-400 text-lg">Stay ahead with the latest in the crypto world.</p>
            <button
              onClick={handleViewAllReleases}
              className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-8 py-4 rounded-full
                               shadow-lg transform transition-all duration-300 hover:scale-105 hover:from-purple-600 hover:to-pink-600
                               focus:outline-none focus:ring-4 focus:ring-purple-300">
              View All Releases
            </button>
          </div>
        )}
      </div>
    </div>
    <ScrollToTopButton/>
    </>
  );
};

export default MarketRelease;
