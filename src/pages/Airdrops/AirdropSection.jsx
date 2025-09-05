import { useState } from "react";
// import { motion } from "framer-motion";
// import SlideContent from "../Airdrops/SlideContent"
import FAQSection from "../../components/FAQ";
import AirdropSlider from "../Airdrops/AirdropSlider"
import AirdropDetailSection from "./AirdropDetailSection";
import CategorySection from "./CategorySection";
import FeaturedSection from "./FeaturedSection";
import FreeAirdropsSection from "./FreeAirdropSection";
import HotAirdropsSection from "./HotAirdropSection";
import NewAirdropsSection from "./NewAirdropSection";

const AirdropSection = () => {
  // const [airdrops, setAirdrops] = useState([
  //   {
  //     id: 1,
  //     name: "Ethereum Airdrop",
  //     coin: "Ethereum",
  //     logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  //     reward: "0.5 ETH",
  //     endDate: "March 15, 2025",
  //   },
  //   {
  //     id: 2,
  //     name: "Bitcoin Airdrop",
  //     coin: "Bitcoin",
  //     logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
  //     reward: "0.01 BTC",
  //     endDate: "March 20, 2025",
  //   },
  //   {
  //     id: 3,
  //     name: "Solana Airdrop",
  //     coin: "Solana",
  //     logo: "https://cryptologos.cc/logos/solana-sol-logo.png",
  //     reward: "10 SOL",
  //     endDate: "March 25, 2025",
  //   },
  // ]);

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (

    <>
    {/* <SlideContent /> */}
    <AirdropSlider />
    <div className="min-h-screen bg-gray-900">
      <CategorySection onSearch={handleSearch} />
      <HotAirdropsSection searchQuery={searchQuery} />
      <FreeAirdropsSection searchQuery={searchQuery} />
      {/* Add other airdrop sections here */}
    </div>
    <FeaturedSection/>
    <NewAirdropsSection/>
    <AirdropDetailSection/>
    <FAQSection/>


    {/* <div className="bg-gray-900 text-white py-10">
      <motion.h2
        className="text-3xl font-bold text-center text-yellow-400 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Latest Crypto Airdrops
      </motion.h2>

      <div className="container mx-auto px-4">
        {airdrops.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {airdrops.map((airdrop) => (
              <motion.div
                key={airdrop.id}
                className="bg-gray-800 p-5 rounded-lg shadow-lg flex flex-col items-center text-center transition-transform hover:scale-102"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={airdrop.logo}
                  alt={airdrop.coin}
                  className="w-16 h-16 mb-4 rounded-full border border-yellow-400 shadow-md"
                />
                <h3 className="text-xl font-semibold text-yellow-300 mb-2">{airdrop.name}</h3>
                <p className="text-gray-400">Reward: <span className="text-white font-medium">{airdrop.reward}</span></p>
                <p className="text-gray-400">Ends on: <span className="text-white font-medium">{airdrop.endDate}</span></p>
                <button className="mt-4 cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-full transition-transform ">
                  Claim Now
                </button>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">No active airdrops found.</p>
        )}
      </div>
    </div> */}
    </>

  );
};

export default AirdropSection;
