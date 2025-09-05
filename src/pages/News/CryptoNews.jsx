import { useState, useEffect } from 'react';
import ButtonCard from '../../components/ButtonCard';
// Helper function to generate random news data
const generateRandomNews = (count) => {
  const newsData = [];
  const titles = [
    "Bitcoin Surges Past $70,000 as Institutional Adoption Grows",
    "Ethereum's Dencun Upgrade Goes Live, Reducing Transaction Costs",
    "Altcoin Market Sees Significant Gains Following Bitcoin's Rally",
    "DeFi Protocols Witness Record-Breaking TVL in Q2",
    "NFT Sales Volume Reaches New Highs Amidst Creator Economy Boom",
    "Regulatory Clarity Expected for Stablecoins in Upcoming Legislation",
    "Central Banks Explore CBDCs as Digital Currency Landscape Evolves",
    "Web3 Gaming Attracts Mainstream Attention with Innovative Titles",
    "Cryptocurrency Mining Difficulty Hits All-Time High",
    "Layer 2 Solutions Drive Scalability for Ethereum Ecosystem",
    "Solana Ecosystem Expands with New dApps and Partnerships",
    "Cardano Development Continues with Focus on Smart Contracts",
    "Polkadot Parachains Launch, Enhancing Interoperability",
    "Binance Smart Chain Sees Increased Activity and User Growth",
    "Ripple's XRP Shows Resilience Amidst Ongoing Legal Battle",
    "Dogecoin and Shiba Inu Lead Meme Coin Rally",
    "Metaverse Projects Gain Traction with Virtual Land Sales",
    "DAO Governance Models Evolve for Decentralized Decision-Making",
    "Cybersecurity Threats Loom Large in the Crypto Space",
    "Environmental Concerns Drive Green Crypto Initiatives"
  ];
  const excerpts = [
    "The world of cryptocurrency is abuzz as Bitcoin crosses a major milestone, signaling growing interest from institutional investors.",
    "A highly anticipated upgrade to the Ethereum network aims to significantly reduce gas fees, making transactions more affordable.",
    "Following Bitcoin's impressive performance, several altcoins have experienced substantial price increases, attracting new investors.",
    "Decentralized Finance (DeFi) platforms have achieved unprecedented Total Value Locked (TVL) in the second quarter.",
    "The market for Non-Fungible Tokens (NFTs) is experiencing a surge in sales volume, driven by the expanding creator economy.",
    "Lawmakers are actively working on new legislation to provide much-needed regulatory clarity for stablecoins.",
    "Central banks globally are increasingly exploring the implementation of Central Bank Digital Currencies (CBDCs).",
    "The intersection of gaming and blockchain technology, known as Web3 gaming, is capturing mainstream attention.",
    "The computational difficulty of mining new cryptocurrencies has reached an unprecedented level, reflecting increased network security.",
    "Innovative Layer 2 solutions are playing a crucial role in enhancing the scalability and efficiency of the Ethereum ecosystem.",
    "The Solana blockchain continues to expand its ecosystem with the introduction of new decentralized applications and strategic partnerships.",
    "Development on the Cardano blockchain is progressing steadily, with a strong emphasis on enhancing its smart contract capabilities.",
    "Polkadot's parachains have officially launched, significantly improving interoperability within the blockchain network.",
    "Binance Smart Chain is witnessing a notable increase in user activity and ecosystem growth, attracting more projects and users.",
    "Despite ongoing legal challenges, Ripple's XRP token has demonstrated remarkable resilience in the market.",
    "Meme-inspired cryptocurrencies like Dogecoin and Shiba Inu are leading a new rally, driven by strong community support.",
    "Metaverse-related projects are gaining considerable traction, with virtual land sales reaching impressive valuations.",
    "Decentralized Autonomous Organization (DAO) governance models are continually evolving, empowering more decentralized decision-making.",
    "The rapid growth of the crypto space has also brought increased cybersecurity threats, necessitating robust security measures.",
    "Growing environmental concerns are driving the adoption of more energy-efficient and 'green' crypto initiatives."
  ];
  const sources = ["Forbes", "CoinDesk", "Decrypt", "Bloomberg", "TechCrunch"];
  const categories = ["Bitcoin", "Ethereum", "Altcoins", "DeFi", "NFTs", "Regulation", "CBDC", "Web3", "Mining", "Layer 2"];

  for (let i = 0; i < count; i++) {
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    const randomExcerpt = excerpts[Math.floor(Math.random() * excerpts.length)];
    const randomSource = sources[Math.floor(Math.random() * sources.length)];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    newsData.push({
      id: `news-${Date.now()}-${i}`,
      title: randomTitle,
      excerpt: randomExcerpt,
      source: randomSource,
      category: randomCategory,
      imageUrl: `https://placehold.co/600x400/CCCCCC/FFFFFF?text=CryptoNews+${i + 1}`
    });
  }
  return newsData;
};

const CryptoNews = () => {
  const [news, setNews] = useState([]);
  const [visibleNewsCount, setVisibleNewsCount] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Load initial news data
  useEffect(() => {
    setNews(generateRandomNews(30)); // Generate more initial data to allow for filtering
  }, []);

  const handleSeeMore = () => {
    setVisibleNewsCount(prevCount => prevCount + 10);
  };

  const handleCardClick = (id) => {
    window.location.href = `/news/${id}`; // Simple routing for demonstration
  };

  const handleFilterChange = (category) => {
    setSelectedCategory(category);
    setVisibleNewsCount(10); // Reset visible count when filter changes
  };

  const filteredNews = selectedCategory === 'All'
    ? news
    : news.filter(item => item.category === selectedCategory);

  const categories = ['All', ...new Set(news.map(item => item.category))];

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-4 font-inter">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-start mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-fadeInUp">
          Latest Crypto News
        </h1>

        {/* Filter Section */}
        <div className="mb-8 flex flex-wrap justify-start gap-3">
          {categories.map(category => (
            // <button
            //   key={category}
            //   onClick={() => handleFilterChange(category)}
            //   className={`px-5 py-2 cursor-pointer rounded-full text-sm font-medium transition-all duration-300 ease-in-out
            //     ${selectedCategory === category
            //       ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg transform scale-105'
            //       : 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white'
            //     }`}
            // >
            //   {category}
            // </button>

            <ButtonCard 
                          key={category}
                        onClick={() => handleFilterChange(category)}
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
                      {category}
            </ButtonCard>



          ))}
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredNews.slice(0, visibleNewsCount).map((item, index) => (
            <div
              key={item.id}
              className="bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer
                         transform transition-all duration-300 hover:scale-105 hover:shadow-xl
                         animate-fadeIn"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleCardClick(item.id)}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-48 object-cover rounded-t-xl"
                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/4B5563/D1D5DB?text=No+Image`; }}
              />
              <div className="p-5">
                <span className="inline-block bg-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
                  {item.category}
                </span>
                <h3 className="text-xl font-semibold mb-2 leading-tight">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-3">
                  {item.excerpt}
                </p>
                <div className="mt-4 text-xs text-gray-500">
                  Source: {item.source}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See More Button */}
        {visibleNewsCount < filteredNews.length && (
          <div className="mt-10 text-start">
            <button
              onClick={handleSeeMore}
              className="bg-gradient-to-r cursor-pointer from-blue-500 to-purple-600 text-white font-semibold
                         px-8 py-3 rounded-full shadow-lg transform transition-all duration-300
                         hover:scale-105 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300
                         animate-bounceIn"
            >
              See More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CryptoNews;


