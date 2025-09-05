import { useState, useEffect } from 'react';
import { FaCube } from 'react-icons/fa';
import { FaTwitter, FaDiscord, FaGlobe, FaLink, FaCalendarAlt, FaGift, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const airdropDetailData = {
  title: 'Monad',
  description: '$244M investment by TOP VCs',
  videoSrc: 'https://www.w3schools.com/html/mov_bbb.mp4', // Placeholder video URL
  videoAlt: 'Monad Free Airdrop Video',
  cost: 'FREE',
  raised: '$244M',
  potential: '$10K+',
  time: '30min',
  icon: <FaCube className="text-purple-500" />,
};


// Alvara Protocol Airdrop Detail Data
const alvaraData = {
    // logo: 'https://via.placeholder.com/50?text=Alvara', // Placeholder logo
    icon: <FaCube className="text-purple-500" />,
    title: 'Alvara Protocol',
    subtitle: 'Alvara Protocol is reshaping decentralized finance by introducing a seamless method to create and manage on-chain ERC-BTS technology, Anchored by the dual token system of ALVA and veALVA, the protocol enhances governance while encouraging ecosystem growth.',
    description: [
      "Alvara's platform features a BTS Factory and Marketplace, enabling investors to engage with funds from creation to trade. Fund managers mint, while investors steer the BTS tokens, informed by the real-time leaderboard.",
      "Alvara Protocol is hosting a colossal Airdrop League, flaunting a reward pool of 4,000,000 $ALVA tokens, worth $1,200,000 at TGE, with a HUGE top prize of $30,000 awaiting the ultimate victor. 🏆",
      "This colossal Airdrop represents a lucrative opportunity for blockchain enthusiasts, tech wizards, and dedicated degens to not just win big but also to be a part of shaping the future of decentralized finance."
    ],
    details: {
      projectWebsite: 'www.alvaraprotocol.io',
      source: 'zealy.io',
      distributionDate: 'February 29, 2024',
      totalRewards: '4,000,000 ALVA',
      additionalRequirements: 'Complete Zealy Tasks',
    },
    steps: [
      'Visit the Alvara Protocol Airdrop League on Zealy.',
      'Follow @AlvaraProtocol & @TenseT_io on Twitter.',
      "Join Alvara’s Telegram and Discord communities.",
      'Earn XP on Zealy by finishing tasks and referring friends.',
    ],
  };


const AirdropDetailSection = () => {
  const [airdrop, setAirdrop] = useState(null);
  const [alvaraInfo, setAlvaraInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate data fetch with a delay
  useEffect(() => {
    const fetchAirdropDetail = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setAirdrop(airdropDetailData);
      } catch (error) {
        console.error('Error fetching airdrop detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAirdropDetail();
  }, []);

  // Simulate data fetch with a delay
  useEffect(() => {
    const fetchAlvaraInfo = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setAlvaraInfo(alvaraData);
      } catch (error) {
        console.error('Error fetching Alvara info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlvaraInfo();
  }, []);


  return (
    <>
    
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Container for Left and Right Boxes */}
        <div className="flex flex-col lg:flex-row gap-6">
          {loading ? (
            <>
              {/* Left Box Skeleton (Video) */}
              <div className="w-full lg:w-1/2 h-64 bg-gray-800 rounded-lg animate-pulse">
                <div className="w-full h-full bg-gray-700 rounded-lg blur-sm flex items-center justify-center">
                  <div className="w-3/4 h-6 bg-gray-600 rounded blur-sm"></div>
                </div>
              </div>

              {/* Right Box Skeleton (Content) */}
              <div className="w-full lg:w-1/2 space-y-4 animate-pulse">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-700 rounded-full blur-sm"></div>
                  <div className="w-1/2 h-6 bg-gray-700 rounded blur-sm"></div>
                </div>
                <div className="w-3/4 h-4 bg-gray-700 rounded blur-sm"></div>
                <div className="flex space-x-4">
                  <div className="w-32 h-10 bg-gray-700 rounded-full blur-sm"></div>
                  <div className="w-32 h-10 bg-gray-700 rounded-full blur-sm"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="w-full h-16 bg-gray-700 rounded-lg blur-sm"></div>
                  <div className="w-full h-16 bg-gray-700 rounded-lg blur-sm"></div>
                  <div className="w-full h-16 bg-gray-700 rounded-lg blur-sm"></div>
                  <div className="w-full h-16 bg-gray-700 rounded-lg blur-sm"></div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Left Box (Video) */}
              <div className="w-full lg:w-1/2">
                <video
                  controls
                  className="w-full h-64 object-cover rounded-lg"
                  poster="https://via.placeholder.com/600x300?text=Monad+Video"
                >
                  <source src={airdrop.videoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Right Box (Content) */}
              <div className="w-full lg:w-1/2 space-y-4">
                {/* Title and Icon */}
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{airdrop.icon}</div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold">{airdrop.title}</h2>
                    <p className="text-gray-400 text-sm sm:text-base">{airdrop.description}</p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <a
                    href="#"
                    className="bg-white text-gray-900 px-6 py-2 rounded-full text-center font-semibold hover:bg-gray-200 transition"
                  >
                    Join Airdrop
                  </a>
                  <a
                    href="#"
                    className="bg-gray-700 text-white px-6 py-2 rounded-full text-center font-semibold hover:bg-gray-600 transition"
                  >
                    Updates on Telegram
                  </a>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-800 rounded-lg p-4 flex items-center space-x-3">
                    <div className="text-2xl">💰</div>
                    <div>
                      <p className="text-gray-400 text-sm">Cost:</p>
                      <p className="text-white font-semibold">{airdrop.cost}</p>
                    </div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 flex items-center space-x-3">
                    <div className="text-2xl">📈</div>
                    <div>
                      <p className="text-gray-400 text-sm">Raised:</p>
                      <p className="text-white font-semibold">{airdrop.raised}</p>
                    </div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 flex items-center space-x-3">
                    <div className="text-2xl">🎯</div>
                    <div>
                      <p className="text-gray-400 text-sm">Potential:</p>
                      <p className="text-white font-semibold">{airdrop.potential}</p>
                    </div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 flex items-center space-x-3">
                    <div className="text-2xl">⏳</div>
                    <div>
                      <p className="text-gray-400 text-sm">Time:</p>
                      <p className="text-white font-semibold">{airdrop.time}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>


          {/* Alvara Airdrops details */}
          <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        {loading ? (
          // Loading Skeleton
          <div className="space-y-6 animate-pulse">
            {/* Logo and Title Skeleton */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full blur-sm"></div>
              <div className="w-1/3 h-6 bg-gray-300 rounded blur-sm"></div>
            </div>
            {/* Social Icons Skeleton */}
            <div className="flex space-x-2">
              <div className="w-6 h-6 bg-gray-300 rounded-full blur-sm"></div>
              <div className="w-6 h-6 bg-gray-300 rounded-full blur-sm"></div>
              <div className="w-6 h-6 bg-gray-300 rounded-full blur-sm"></div>
            </div>
            {/* Subtitle Skeleton */}
            <div className="w-full h-4 bg-gray-300 rounded blur-sm"></div>
            <div className="w-3/4 h-4 bg-gray-300 rounded blur-sm"></div>
            {/* Description Skeleton */}
            <div className="space-y-2">
              <div className="w-full h-4 bg-gray-300 rounded blur-sm"></div>
              <div className="w-full h-4 bg-gray-300 rounded blur-sm"></div>
              <div className="w-1/2 h-4 bg-gray-300 rounded blur-sm"></div>
            </div>
            {/* Details Skeleton */}
            <div className="space-y-2">
              <div className="w-1/2 h-4 bg-gray-300 rounded blur-sm"></div>
              <div className="w-1/2 h-4 bg-gray-300 rounded blur-sm"></div>
              <div className="w-1/2 h-4 bg-gray-300 rounded blur-sm"></div>
              <div className="w-1/2 h-4 bg-gray-300 rounded blur-sm"></div>
              <div className="w-1/2 h-4 bg-gray-300 rounded blur-sm"></div>
            </div>
            {/* Steps Skeleton */}
            <div className="space-y-2">
              <div className="w-1/3 h-6 bg-gray-300 rounded blur-sm"></div>
              <div className="w-3/4 h-4 bg-gray-300 rounded blur-sm"></div>
              <div className="w-3/4 h-4 bg-gray-300 rounded blur-sm"></div>
              <div className="w-3/4 h-4 bg-gray-300 rounded blur-sm"></div>
              <div className="w-3/4 h-4 bg-gray-300 rounded blur-sm"></div>
            </div>
            {/* Buttons Skeleton */}
            <div className="flex space-x-4">
              <div className="w-32 h-10 bg-gray-300 rounded-full blur-sm"></div>
              <div className="w-32 h-10 bg-gray-300 rounded-full blur-sm"></div>
            </div>
          </div>
        ) : (
          // Actual Data
          <div className="space-y-6">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              {/* <img
                src={alvaraInfo.logo}
                alt="Alvara Logo"
                className="w-12 h-12 rounded-full"
              /> */}
                  <div className="text-4xl">{airdrop.icon}</div>
              
              <h1 className="text-2xl sm:text-3xl font-bold">{alvaraInfo.title}</h1>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-2 text-white">
              <a href="#" className="text-gray-500 hover:text-white">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-500 hover:text-white">
                <FaDiscord className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-500 hover:text-white">
                <FaGlobe className="w-6 h-6" />
              </a>
            </div>

            {/* Subtitle */}
            <p className=" text-sm sm:text-base text-white">{alvaraInfo.subtitle}</p>

            {/* Description */}
            <div className="space-y-4">
              {alvaraInfo.description.map((paragraph, index) => (
                <p key={index} className="text-white text-sm sm:text-base">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Details */}
            <div className="space-y-2">
              <h2 className="text-lg sm:text-xl font-semibold">Details</h2>
              <div className="space-y-2 text-whit text-sm sm:text-base">
                <p className="flex items-center">
                  <FaGlobe className="w-5 h-5 mr-2 text-gray-500" />
                  <span className="font-semibold">Project website:</span>&nbsp;
                  <a href={`https://${alvaraInfo.details.projectWebsite}`} className="text-blue-500 hover:underline">
                    {alvaraInfo.details.projectWebsite}
                  </a>
                </p>
                <p className="flex items-center">
                  <FaLink className="w-5 h-5 mr-2 text-gray-500" />
                  <span className="font-semibold">Source:</span>&nbsp;
                  <a href={`https://${alvaraInfo.details.source}`} className="text-blue-500 hover:underline">
                    {alvaraInfo.details.source}
                  </a>
                </p>
                <p className="flex items-center">
                  <FaCalendarAlt className="w-5 h-5 mr-2 text-gray-500" />
                  <span className="font-semibold">Distribution date:</span>&nbsp;
                  {alvaraInfo.details.distributionDate}
                </p>
                <p className="flex items-center">
                  <FaGift className="w-5 h-5 mr-2 text-gray-500" />
                  <span className="font-semibold">Total rewards:</span>&nbsp;
                  {alvaraInfo.details.totalRewards}
                </p>
                <p className="flex items-center">
                  <FaCheckCircle className="w-5 h-5 mr-2 text-gray-500" />
                  <span className="font-semibold">Additional requirements:</span>&nbsp;
                  {alvaraInfo.details.additionalRequirements}
                </p>
              </div>
            </div>

            {/* Step-by-Step Guide */}
            <div className="space-y-2">
              <h2 className="text-lg sm:text-xl font-semibold">Step-by-Step Guide Alvara Protocol - Airdrop League</h2>
              <ol className="space-y-2 text-white text-sm sm:text-base list-decimal list-inside">
                {alvaraInfo.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="#"
                className="flex items-center justify-center bg-gray-200 text-gray-700 px-6 py-2 rounded-full font-semibold hover:bg-gray-300 transition"
              >
                <FaExclamationTriangle className="w-5 h-5 mr-2" />
                Report Issue
              </a>
              <a
                href="#"
                className="bg-blue-500 text-white px-6 py-2 rounded-full text-center font-semibold hover:bg-blue-600 transition"
              >
                Claim Airdrop
              </a>
            </div>
          </div>
        )}
      </div>
    </div>


    </>
  );
};

export default AirdropDetailSection;