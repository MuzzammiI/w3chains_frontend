import { useState, useEffect } from 'react';
import ScrollToTopButton from '../../components/ScrollToTopButton';
// Helper function to generate random press release data
const generateRandomPressRelease = (count) => {
  const data = [];
  const titles = [
    "Tech Giant Announces Strategic Partnership for Blockchain Integration",
    "Fintech Startup Secures Series B Funding to Scale Operations",
    "Leading Crypto Exchange Reports Record-Breaking Q1 Earnings",
    "Decentralized Autonomous Organization Launches New Governance Model",
    "Environmental Initiative to Use Blockchain for Carbon Tracking",
    "New Cybersecurity Solution Unveiled for Digital Assets",
    "Global Bank Pilots Blockchain for Cross-Border Payments",
    "Innovative NFT Collection to Feature Renowned Artists",
    "Web3 Foundation Awards Grants for Open-Source Development",
    "Regulators Issue Guidelines for Digital Asset Custody",
    "Metaverse Platform Collaborates with Fashion Brand for Virtual Wearables",
    "AI-Driven Analytics Firm Expands Crypto Market Coverage",
  ];
  const descriptions = [
    "A major technology company has entered into a strategic partnership aimed at integrating blockchain solutions across its product ecosystem, promising enhanced security and transparency.",
    "A promising fintech startup has successfully closed its Series B funding round, raising significant capital to expand its global operations and accelerate product development.",
    "A prominent cryptocurrency exchange has reported unprecedented earnings for the first quarter, driven by increased trading volumes and user adoption.",
    "A decentralized autonomous organization (DAO) has officially launched a new governance model, empowering its community members with greater decision-making capabilities.",
    "A groundbreaking environmental initiative is set to leverage blockchain technology to create a transparent and immutable system for tracking carbon emissions.",
    "A state-of-the-art cybersecurity solution designed specifically for protecting digital assets has been officially unveiled, offering advanced threat detection and prevention.",
    "A leading global bank has initiated a pilot program to explore the use of blockchain technology for streamlining cross-border payment transactions, aiming for greater efficiency and lower costs.",
    "An eagerly anticipated non-fungible token (NFT) collection, featuring collaborations with several renowned artists, is set to launch, offering unique digital collectibles.",
    "The Web3 Foundation has announced a new round of grants, providing financial support to open-source projects that contribute to the decentralized web ecosystem.",
    "Regulatory bodies have released a comprehensive set of guidelines pertaining to the secure custody of digital assets, aiming to enhance consumer protection and market integrity.",
    "A popular metaverse platform has announced a collaboration with a well-known fashion brand to introduce exclusive lines of virtual wearables for its digital avatars.",
    "An artificial intelligence-driven analytics firm specializing in the crypto market has expanded its coverage, now offering in-depth insights on a wider range of digital assets."
  ];
  const organizations = ["ConsenSys", "Coinbase", "Ripple", "Binance", "Circle", "IBM Blockchain", "Microsoft Azure", "Google Cloud", "Amazon Web Services"];
  const categories = ["Partnership", "Funding", "Earnings", "Governance", "ESG", "Security", "Payments", "NFTs", "Grants", "Regulation", "Metaverse", "Analytics"];
  const colors = ["#8B5CF6", "#EC4899", "#10B981", "#3B82F6", "#F97316", "#EF4444"]; // Different shades of Tailwind colors

  for (let i = 0; i < count; i++) {
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    const randomDesc = descriptions[Math.floor(Math.random() * descriptions.length)];
    const randomOrg = organizations[Math.floor(Math.random() * organizations.length)];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    data.push({
      id: `press-${Date.now()}-${i}`,
      title: randomTitle,
      description: randomDesc,
      organization: randomOrg,
      category: randomCategory,
      date: new Date(Date.now() - Math.floor(Math.random() * 60) * 24 * 60 * 60 * 1000).toLocaleDateString(), // Random date within last 60 days
      color: randomColor,
      icon: `https://placehold.co/40x40/${randomColor.substring(1)}/FFFFFF?text=${randomCategory.substring(0,2).toUpperCase()}` // Icon based on category
    });
  }
  return data;
};

const PressRelease = () => {
  const [releases, setReleases] = useState([]);
  const [visibleReleasesCount, setVisibleReleasesCount] = useState(8); // Initially show 8 releases

  useEffect(() => {
    setReleases(generateRandomPressRelease(25)); // Generate more releases to allow "View All"
  }, []);

  const handleCardClick = (id) => {
    // This simulates URL routing. In a real application, you'd use a routing library.
    window.location.href = `/press-release/${id}`;
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
              box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
            }
            70% {
              box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
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
        <h1 className="text-5xl font-extrabold text-start mb-16 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-600 animate-slideInUp">
          Official Press Releases
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
                  <span>Released by: {item.organization}</span>
                  <span>Date: {item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Conditionally render "View All Releases" button */}
        {visibleReleasesCount < releases.length && (
          <div className="text-center mt-16 animate-slideInUp">
            <p className="text-gray-400 text-lg">Explore more official announcements.</p>
            <button
              onClick={handleViewAllReleases}
              className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-8 py-4 rounded-full
                               shadow-lg transform transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-purple-700
                               focus:outline-none focus:ring-4 focus:ring-blue-300">
              View All Press Releases
            </button>
          </div>
        )}
      </div>
    </div>
    <ScrollToTopButton/>
    </>
  );
};

export default PressRelease;
