import React, { useState, useEffect } from 'react';
import ScrollToTopButton from '../../components/ScrollToTopButton';
// Helper function to generate random partnership data
const generateRandomPartnerships = (count) => {
  const data = [];
  const partnerNames = [
    "Google Cloud", "Binance", "Microsoft", "Salesforce", "IBM", "Amazon Web Services",
    "Polygon Labs", "Chainlink Labs", "Ledger", "Coinbase", "Deloitte", "Accenture"
  ];
  const industries = [
    "Cloud Computing", "Crypto Exchange", "Enterprise Software", "Blockchain Infrastructure",
    "Fintech", "Cybersecurity", "Consulting", "Gaming", "Supply Chain"
  ];
  const partnershipTypes = [
    "Strategic Alliance", "Technology Integration", "Investment", "Joint Venture",
    "Market Expansion", "Research & Development", "Ecosystem Grant"
  ];
  const descriptions = [
    "Forging a landmark strategic alliance to drive Web3 adoption and innovation in enterprise solutions.",
    "Integrating cutting-edge blockchain technology to enhance data security and supply chain transparency.",
    "Securing significant investment to accelerate research and development in decentralized finance protocols.",
    "Launching a joint venture to explore new market opportunities in tokenized real estate assets.",
    "Collaborating on market expansion initiatives to bring blockchain solutions to emerging economies.",
    "Engaging in advanced R&D projects focusing on quantum-resistant cryptography for digital assets.",
    "Receiving an ecosystem grant to foster open-source development and community growth within the blockchain space."
  ];
  const colors = ["#8B5CF6", "#EC4899", "#10B981", "#3B82F6", "#F97316", "#EF4444", "#06B6D4", "#6D28D9"]; // Diverse Tailwind-like colors

  for (let i = 0; i < count; i++) {
    const name = partnerNames[Math.floor(Math.random() * partnerNames.length)];
    const industry = industries[Math.floor(Math.random() * industries.length)];
    const type = partnershipTypes[Math.floor(Math.random() * partnershipTypes.length)];
    const desc = descriptions[Math.floor(Math.random() * descriptions.length)];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const date = new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000).toLocaleDateString();

    data.push({
      id: `partner-${Date.now()}-${i}`,
      partnerName: name,
      industry: industry,
      partnershipType: type,
      description: desc,
      dateAnnounced: date,
      logoUrl: `https://placehold.co/100x100/${randomColor.substring(1)}/FFFFFF?text=${name.substring(0,3).toUpperCase()}`,
      cardColor: randomColor,
    });
  }
  return data;
};

const INITIAL_WEB3_PROJECTS_COUNT = 6;

const Partnership = () => {
  const [allPartnerships, setAllPartnerships] = useState([]);
  const [filteredPartnerships, setFilteredPartnerships] = useState([]);
  const [visiblePartnershipsCount, setVisiblePartnershipsCount] = useState(INITIAL_WEB3_PROJECTS_COUNT); // Initially show 6 partnerships
  const PARTNERSHIPS_LOAD_STEP = 6; // How many to load/hide at a time

  const [filterIndustry, setFilterIndustry] = useState('All');
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    const generatedPartnerships = generateRandomPartnerships(20); // Generate 20 partnerships
    setAllPartnerships(generatedPartnerships);
  }, []);

  useEffect(() => {
    let currentFiltered = allPartnerships;

    if (filterIndustry !== 'All') {
      currentFiltered = currentFiltered.filter(p => p.industry === filterIndustry);
    }
    if (filterType !== 'All') {
      currentFiltered = currentFiltered.filter(p => p.partnershipType === filterType);
    }
    setFilteredPartnerships(currentFiltered);
    setVisiblePartnershipsCount(6); // Reset visible count on filter change
  }, [filterIndustry, filterType, allPartnerships]);

  const handleCardClick = (id) => {
    // Simulate URL routing for partnership details
    window.location.href = `/partnership-details/${id}`;
  };

  const togglePartnershipsVisibility = () => {
    if (visiblePartnershipsCount < filteredPartnerships.length) {
      // If not all are visible, show more
      setVisiblePartnershipsCount(prevCount => Math.min(prevCount + PARTNERSHIPS_LOAD_STEP, filteredPartnerships.length));
    } else {
      // If all are visible, reset to initial count
      setVisiblePartnershipsCount(INITIAL_WEB3_PROJECTS_COUNT); // Revert to initial count
    }
  };

  // Get unique filter options
  const uniqueIndustries = ['All', ...new Set(allPartnerships.map(p => p.industry))];
  const uniqueTypes = ['All', ...new Set(allPartnerships.map(p => p.partnershipType))];

  return (
    <>

    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white font-inter p-4 overflow-hidden">
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

          .animate-fadeInUp {
            animation: fadeInUp 1s ease-out forwards;
          }

          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out forwards;
          }

          .animate-popIn {
            animation: popIn 0.6s ease-out forwards;
          }
        `}
      </style>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-extrabold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600 animate-fadeInUp">
          Our Strategic Partnerships
        </h1>

        {/* Filter Section */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
          <select
            value={filterIndustry}
            onChange={(e) => setFilterIndustry(e.target.value)}
            className="bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500 text-base"
          >
            <option value="All">All Industries</option>
            {uniqueIndustries.map(industry => (
              industry !== 'All' && <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500 text-base"
          >
            <option value="All">All Types</option>
            {uniqueTypes.map(type => (
              type !== 'All' && <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Partnership Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredPartnerships.slice(0, visiblePartnershipsCount).map((partner, index) => (
            <div
              key={partner.id}
              className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden cursor-pointer
                         transform transition-all duration-300 hover:scale-105 hover:shadow-2xl
                         relative animate-popIn"
              style={{ animationDelay: `${index * 0.15}s`, borderColor: partner.cardColor, borderWidth: '2px' }}
              onClick={() => handleCardClick(partner.id)}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img src={partner.logoUrl} alt={`${partner.partnerName} Logo`} className="w-16 h-16 rounded-full mr-4 border-2 p-1" style={{ borderColor: partner.cardColor }} />
                  <h3 className="text-2xl font-bold leading-tight">
                    {partner.partnerName}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: partner.cardColor }}>
                      {partner.partnershipType}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-700 text-gray-300">
                      {partner.industry}
                    </span>
                </div>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {partner.description}
                </p>
                <div className="text-xs text-gray-400">
                  Announced: {partner.dateAnnounced}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See More/See Less button */}
        {filteredPartnerships.length > INITIAL_WEB3_PROJECTS_COUNT && ( // Only show if there's more to see
          <div className="text-center mt-8 animate-fadeInUp">
            <button
              onClick={togglePartnershipsVisibility}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-8 py-4 rounded-full
                         shadow-lg transform transition-all duration-300 hover:scale-105 hover:from-purple-600 hover:to-pink-600
                         focus:outline-none focus:ring-4 focus:ring-purple-300"
            >
              {visiblePartnershipsCount < filteredPartnerships.length ? "See More Partnerships" : "See Less Partnerships"}
            </button>
          </div>
        )}
      </div>
    </div>
    <ScrollToTopButton/>
    </>
  );
};

export default Partnership;
