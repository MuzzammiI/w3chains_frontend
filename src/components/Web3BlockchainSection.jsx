import { useState, useEffect } from 'react';
import { FaBitcoin, FaBook, FaMoneyBillWave, FaSearch } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const web3Data = {
  topLeft: {
    title: 'Web3 Blockchain Technology',
    description: 'Stay informed with our blog section dedicated to future technology.',
    icon: <FaBitcoin className="w-10 h-10 text-yellow-400" />,
  },
  bottomLeft: {
    title: 'Research Insights Blogs',
    description: 'Dive deep into future tech concepts with our research section.',
    icon: <FaBook className="w-10 h-10 text-yellow-400" />,
  },
  topRight: [
    {
      title: 'Web3 Projects',
      description: 'Over 1,000+ articles on emerging trends and breakthroughs.',
    },
    {
      title: 'Token & Coin Listing',
      description: 'Articles cover fields like AI, robotics, biotechnology, and more.',
    },
    {
      title: 'NFT Marketplace',
      description: 'Written by our team of tech experts and industry professionals.',
    },
    {
      title: 'Web3 & Blockchain News',
      description: '500+ research articles for in-depth understanding.',
    },
  ],
  bottomRight: [
    {
      title: 'Funding Announcements',
      description: 'Explore emerging trends in future technology.',
      icon: <FaMoneyBillWave className="w-10 h-10 text-yellow-400" />,
    },
    {
      title: 'Project Discovery',
      description: 'Contributions from tech researchers and academics.',
      icon: <FaSearch className="w-10 h-10 text-yellow-400" />,
    },
  ],
};

const Web3BlockchainSection = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setData(web3Data);
      } catch (error) {
        console.error('Error fetching web3 data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.03, transition: { duration: 0.3 } },
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500"
        >
          Explore Web3 & Blockchain
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            {/* Top Left Card */}
            <AnimatePresence>
              {loading ? (
                <motion.div
                  className="bg-gray-800 rounded-2xl p-8 animate-pulse shadow-lg h-72"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-10 h-10 bg-gray-700 rounded-full mb-6"></div>
                  <div className="w-3/4 h-7 bg-gray-700 rounded mb-4"></div>
                  <div className="w-full h-5 bg-gray-700 rounded"></div>
                </motion.div>
              ) : (
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  className="bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 h-72 flex flex-col justify-between"
                >
                  <div>
                    {data?.topLeft.icon}
                    <h3 className="text-xl sm:text-2xl font-semibold mt-4 mb-3 text-yellow-400">
                      {data?.topLeft.title}
                    </h3>
                    <p className="text-gray-300 text-base">{data?.topLeft.description}</p>
                  </div>
                  <button className="mt-4 text-yellow-400 hover:text-yellow-300 font-medium flex items-center gap-2">
                    Learn More <span>&rarr;</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Left Card */}
            <AnimatePresence>
              {loading ? (
                <motion.div
                  className="bg-gray-800 rounded-2xl p-8 animate-pulse shadow-lg h-72"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-10 h-10 bg-gray-700 rounded-full mb-6"></div>
                  <div className="w-3/4 h-7 bg-gray-700 rounded mb-4"></div>
                  <div className="w-full h-5 bg-gray-700 rounded"></div>
                </motion.div>
              ) : (
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  className="bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 h-72 flex flex-col justify-between"
                >
                  <div>
                    {data?.bottomLeft.icon}
                    <h3 className="text-xl sm:text-2xl font-semibold mt-4 mb-3 text-yellow-400">
                      {data?.bottomLeft.title}
                    </h3>
                    <p className="text-gray-300 text-base">{data?.bottomLeft.description}</p>
                  </div>
                  <button className="mt-4 text-yellow-400 hover:text-yellow-300 font-medium flex items-center gap-2">
                    Learn More <span>&rarr;</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Top Right (4 Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {loading
                ? [...Array(4)].map((_, index) => (
                    <motion.div
                      key={index}
                      className="bg-gray-800 rounded-2xl p-6 animate-pulse shadow-lg h-40"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="w-3/4 h-7 bg-gray-700 rounded mb-4"></div>
                      <div className="w-full h-5 bg-gray-700 rounded"></div>
                    </motion.div>
                  ))
                : data?.topRight.map((card, index) => (
                    <motion.div
                      key={index}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      className="bg-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 h-40 flex flex-col justify-between"
                    >
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">
                          {card.title}
                        </h3>
                        <p className="text-gray-300 text-sm sm:text-base">{card.description}</p>
                      </div>
                    </motion.div>
                  ))}
            </div>

            {/* Bottom Right (2 Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {loading
                ? [...Array(2)].map((_, index) => (
                    <motion.div
                      key={index}
                      className="bg-gray-800 rounded-2xl p-6 animate-pulse shadow-lg h-48"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="w-10 h-10 bg-gray-700 rounded-full mb-6"></div>
                      <div className="w-3/4 h-7 bg-gray-700 rounded mb-4"></div>
                      <div className="w-full h-5 bg-gray-700 rounded"></div>
                    </motion.div>
                  ))
                : data?.bottomRight.map((card, index) => (
                    <motion.div
                      key={index}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      className="bg-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 h-48 flex flex-col justify-between"
                    >
                      <div>
                        {card.icon}
                        <h3 className="text-lg sm:text-xl font-semibold mt-4 mb-2 text-white">
                          {card.title}
                        </h3>
                        <p className="text-gray-300 text-sm sm:text-base">{card.description}</p>
                      </div>
                    </motion.div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Web3BlockchainSection;