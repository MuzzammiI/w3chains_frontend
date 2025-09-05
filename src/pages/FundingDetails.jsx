// import { u } from 'framer-motion/client';
import { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FaArrowRight, FaBitcoin, FaEthereum, FaCube, FaChartLine, FaMoneyBillWave } from 'react-icons/fa';

// Sample data for upcoming token generation events
const tokenEventsData = [
  {
    id: 1,
    date: 'Q1 2025',
    logo: 'https://icoanalytics.org/wp-content/uploads/2024/03/stakestone.jpg',
    name: 'STONE',
    description: 'StakeSTONE TGE',
  },
  {
    id: 2,
    date: 'Q1 2025',
    logo: 'https://icoanalytics.org/wp-content/uploads/2024/03/og.jpg',
    name: 'OG',
    description: 'OG Labs Mainnet release',
  },
  {
    id: 3,
    date: 'Q1 2025',
    logo: 'https://icoanalytics.org/wp-content/uploads/2023/09/N1.jpg',
    name: 'N1 (ex Layer N)',
    description: 'TBA',
  },
  {
    id: 4,
    date: 'April 1, 2025',
    logo: 'https://icoanalytics.org/wp-content/uploads/2023/09/N1.jpg',
    name: 'SEED',
    description: 'SEED Combinator TGE',
  },
  {
    id: 5,
    date: 'Q1 2025',
    logo: 'https://icoanalytics.org/wp-content/uploads/2023/09/N1.jpg',
    name: 'NIL',
    description: 'Nillion TGE',
  },
  {
    id: 6,
    date: 'Q1 2025',
    logo: 'https://icoanalytics.org/wp-content/uploads/2024/08/Soon.png',
    name: 'SOON',
    description: 'TGE',
  },
];


//Recently Launched Data
const tokenData = [
    {
      project: 'BubbleMaps',
      ticker: 'BMT',
      logo: <FaChartLine className="text-purple-500" />,
      icoPrice: '$0.02',
      currentPrice: '$0.165496',
      currentROI: '8.3x',
      athROI: '15.9x',
    },
    {
      project: 'Glue',
      ticker: 'GLUE',
      logo: <FaCube className="text-green-500" />,
      icoPrice: '$0.85',
      currentPrice: '$0.117441',
      currentROI: '0.1x',
      athROI: '0.2x',
    },
    {
      project: 'BAD Coin',
      ticker: 'BADAI',
      logo: <FaBitcoin className="text-gray-800" />,
      icoPrice: '$0.01250',
      currentPrice: '$0.0127309',
      currentROI: '0.9x',
      athROI: '5.5x',
    },
    {
      project: 'Forkast (Community Gaming)',
      ticker: 'CGX',
      logo: <FaEthereum className="text-green-600" />,
      icoPrice: '$0.04',
      currentPrice: '$0.005339074',
      currentROI: '0.1x',
      athROI: '1x',
    },
    {
      project: 'MyShell',
      ticker: 'SHELL',
      logo: <FaMoneyBillWave className="text-blue-500" />,
      icoPrice: '$0.022',
      currentPrice: '$0.273166',
      currentROI: '12.4x',
      athROI: '31.1x',
    },
  ];



//Fund raising Events Data
const fundraisingEventsData = [
    {
      project: 'Rain',
      logo: <FaBitcoin className="text-yellow-500" />,
      raised: '$24.50M',
      investors: [
        { name: 'Norwest', icon: <FaCube className="text-gray-600" /> },
        { name: 'Galaxy', icon: <FaChartLine className="text-blue-600" /> },
        { name: 'Latitude Capital', icon: <FaMoneyBillWave className="text-green-600" /> },
      ],
      additionalInvestors: '+8 investors',
    },
    {
      project: 'Skate (SkateFi ex Range Protocol)',
      logo: <FaEthereum className="text-purple-500" />,
      raised: '$1M Public sale',
      investors: [],
      additionalInvestors: '',
    },
    {
      project: 'Fragmetric',
      logo: <FaCube className="text-teal-500" />,
      raised: '$5M Strategic',
      investors: [
        { name: 'Rockaway', icon: <FaChartLine className="text-red-600" /> },
        { name: 'Bot Ventures', icon: <FaMoneyBillWave className="text-orange-600" /> },
        { name: 'Amber', icon: <FaBitcoin className="text-yellow-600" /> },
      ],
      additionalInvestors: '+2 investors',
    },
    {
      project: 'Hibit',
      logo: <FaBitcoin className="text-blue-500" />,
      raised: '$5M',
      investors: [
        { name: 'Bochsler', icon: <FaCube className="text-gray-600" /> },
        { name: 'Nvidia', icon: <FaChartLine className="text-green-600" /> },
        { name: 'Waterdrip Capital', icon: <FaMoneyBillWave className="text-blue-600" /> },
      ],
      additionalInvestors: '+2 investors',
    },
    {
      project: 'Betterx',
      logo: <FaEthereum className="text-gray-500" />,
      raised: '$1.70M Series A',
      investors: [
        { name: 'Grand Prix', icon: <FaCube className="text-red-600" /> },
        { name: 'Aument Capital Partners', icon: <FaChartLine className="text-purple-600" /> },
        { name: 'Aura Group', icon: <FaMoneyBillWave className="text-teal-600" /> },
      ],
      additionalInvestors: '+2 investors',
    },
  ];

  

const FundingDetails = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselRef = useRef(null);

//Fund raising Events Data
const [fundevents, setFundEvents] = useState([]);
//   const [loading, setLoading] = useState(true);

  // Simulate data fetch with a delay
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setFundEvents(fundraisingEventsData);
      } catch (error) {
        console.error('Error fetching fundraising events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

//upcoming launched data
const [upcomingtokens, setUpcomingTokens] = useState([]);
// Simulate data fetch with a delay
useEffect(() => {
    const fetchTokens = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setUpcomingTokens(tokenData);
      } catch (error) {
        console.error('Error fetching token data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);


  // Simulate API fetch with a delay
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setEvents(tokenEventsData);
      } catch (error) {
        console.error('Error fetching token events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Calculate the number of visible cards based on screen size
  const getVisibleCards = () => {
    if (window.innerWidth >= 1024) return 5; // lg screens
    if (window.innerWidth >= 768) return 3; // md screens
    if (window.innerWidth >= 640) return 2; // sm screens
    return 1; // xs screens
  };

  const [visibleCards, setVisibleCards] = useState(getVisibleCards());

  useEffect(() => {
    const handleResize = () => {
      setVisibleCards(getVisibleCards());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + visibleCards >= events.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? events.length - visibleCards : prev - 1
    );
  };

  


  return (
    <>
    
     
    <div className="py-8 px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-bold mb-6">Upcoming Token Generation Events</h2>
    
      <div className="relative">
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute z-10 cursor-pointer left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition"
        >
          <FaChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute z-10 cursor-pointer right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition"
        >
          <FaChevronRight size={20} />
        </button>

        {/* Carousel Container */}
        <div className="overflow-hidden p-10">
          <div
            ref={carouselRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
          >
            {loading ? (
              // Loading Skeleton
              [...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2 animate-pulse`}
                >
                  <div className="bg-white border border-gray-300 rounded-lg p-4">
                    <div className="w-1/2 h-4 bg-gray-300 rounded blur-sm mb-2"></div>
                    <div className="w-12 h-12 bg-gray-300 rounded-full blur-sm mx-auto mb-2"></div>
                    <div className="w-1/3 h-4 bg-gray-300 rounded blur-sm mx-auto mb-2"></div>
                    <div className="w-2/3 h-4 bg-gray-300 rounded blur-sm mx-auto"></div>
                  </div>
                </div>
              ))
            ) : (
              // Actual Data
              events.map((event) => (
                <div
                  key={event.id}
                  className={`flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2`}
                >
                  <div className="bg-gray-300 border border-gray-300 rounded-lg p-4 text-center">
                    <p className="text-gray-500 text-sm mb-2">{event.date}</p>
                    <img
                      src={event.logo}
                      alt={event.name}
                      className="w-12 h-12 mx-auto mb-2 rounded-full"
                    />
                    <h3 className="text-lg text-black font-semibold">{event.name}</h3>
                    <p className="text-gray-600 text-sm">{event.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>

    {/* Fund raising Events */}
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      {/* Title and More Link */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Recent Private Fundraising Events
        </h2>
        <a
          href="#"
          className="flex items-center text-gray-300 hover:text-blue-600 border border-gray-300 rounded-full px-4 py-1 text-sm sm:text-base"
        >
          More <FaArrowRight className="ml-2" />
        </a>
      </div>

      {/* Table Header */}
      <div className="bg-gray-50 rounded-t-lg border border-gray-200 hidden sm:grid sm:grid-cols-3 gap-4 p-4 text-gray-500 font-semibold text-sm">
        <div>PROJECT</div>
        <div>RAISED</div>
        <div>INVESTORS</div>
      </div>

      {/* Table Body */}
      <div className="bg-white border border-t-0 sm:border-t border-gray-200 rounded-b-lg sm:rounded-t-none">
        {loading ? (
          // Loading Skeleton
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="flex flex-col sm:grid sm:grid-cols-3 gap-4 p-4 border-b border-gray-200 last:border-b-0 animate-pulse"
              >
                {/* Project */}
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 rounded-full blur-sm"></div>
                  <div className="w-24 h-4 bg-gray-300 rounded blur-sm"></div>
                </div>

                {/* Raised */}
                <div className="w-16 h-4 bg-gray-300 rounded blur-sm mt-2 sm:mt-0"></div>

                {/* Investors */}
                <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-16 h-4 bg-gray-300 rounded blur-sm"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Actual Data
          fundevents.map((event, index) => (
            <div
              key={index}
              className="flex flex-col sm:grid sm:grid-cols-3 gap-4 p-4 border-b border-gray-200 last:border-b-0"
            >
              {/* Project */}
              <div className="flex items-center space-x-3">
                <div className="text-2xl sm:text-3xl">{event.logo}</div>
                <span className="text-gray-900 font-semibold text-sm sm:text-base">
                  {event.project}
                </span>
              </div>

              {/* Raised */}
              <div className="text-gray-900 text-sm sm:text-base mt-2 sm:mt-0">
                <span className="sm:hidden font-semibold">Raised: </span>
                {event.raised}
              </div>

              {/* Investors */}
              <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
                <span className="sm:hidden font-semibold">Investors: </span>
                {event.investors.length > 0 ? (
                  event.investors.map((investor, i) => (
                    <div key={i} className="flex items-center space-x-1">
                      <span className="text-lg sm:text-xl">{investor.icon}</span>
                      <span className="text-gray-600 text-xs sm:text-sm">
                        {investor.name}
                      </span>
                    </div>
                  ))
                ) : (
                  <span className="text-gray-600 text-xs sm:text-sm">-</span>
                )}
                {event.additionalInvestors && (
                  <span className="text-red-500 text-xs sm:text-sm">
                    {event.additionalInvestors}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>


    {/* Recently Launched Tokens */}
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      {/* Title and More Link */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Recently Launched Tokens
        </h2>
        <a
          href="#"
          className="flex items-center text-gray-300 hover:text-blue-600 border border-gray-300 rounded-full px-4 py-1 text-sm sm:text-base"
        >
          More <FaArrowRight className="ml-2" />
        </a>
      </div>

      {/* Table Header */}
      <div className="bg-gray-50 rounded-t-lg border border-gray-200 hidden sm:grid sm:grid-cols-5 gap-4 p-4 text-gray-500 font-semibold text-sm">
        <div>PROJECT</div>
        <div>ICO PRICE</div>
        <div>CURRENT PRICE</div>
        <div>CURRENT ROI</div>
        <div>ATH ROI</div>
      </div>

      {/* Table Body */}
      <div className="bg-white border border-t-0 sm:border-t border-gray-200 rounded-b-lg sm:rounded-t-none">
        {loading ? (
          // Loading Skeleton
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="flex flex-col sm:grid sm:grid-cols-5 gap-4 p-4 border-b border-gray-200 last:border-b-0 animate-pulse"
              >
                {/* Project */}
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 rounded-full blur-sm"></div>
                  <div className="w-24 h-4 bg-gray-300 rounded blur-sm"></div>
                </div>

                {/* ICO Price */}
                <div className="w-16 h-4 bg-gray-300 rounded blur-sm mt-2 sm:mt-0"></div>

                {/* Current Price */}
                <div className="w-20 h-4 bg-gray-300 rounded blur-sm mt-2 sm:mt-0"></div>

                {/* Current ROI */}
                <div className="w-12 h-4 bg-gray-300 rounded blur-sm mt-2 sm:mt-0"></div>

                {/* ATH ROI */}
                <div className="w-12 h-4 bg-gray-300 rounded blur-sm mt-2 sm:mt-0"></div>
              </div>
            ))}
          </div>
        ) : (
          // Actual Data
          upcomingtokens.map((token, index) => (
            <div
              key={index}
              className="flex flex-col sm:grid sm:grid-cols-5 gap-4 p-4 border-b border-gray-200 last:border-b-0"
            >
              {/* Project */}
              <div className="flex items-center space-x-3">
                <div className="text-2xl sm:text-3xl">{token.logo}</div>
                <div>
                  <span className="text-gray-900 font-semibold text-sm sm:text-base">
                    {token.project}
                  </span>
                  <p className="text-gray-500 text-xs sm:text-sm">{token.ticker}</p>
                </div>
              </div>

              {/* ICO Price */}
              <div className="text-gray-900 text-sm sm:text-base mt-2 sm:mt-0">
                <span className="sm:hidden font-semibold">ICO Price: </span>
                {token.icoPrice}
              </div>

              {/* Current Price */}
              <div className="text-gray-900 text-sm sm:text-base mt-2 sm:mt-0">
                <span className="sm:hidden font-semibold">Current Price: </span>
                {token.currentPrice}
              </div>

              {/* Current ROI */}
              <div
                className={`text-sm sm:text-base mt-2 sm:mt-0 ${
                  parseFloat(token.currentROI) >= 1 ? 'text-green-500' : 'text-red-500'
                }`}
              >
                <span className="sm:hidden font-semibold">Current ROI: </span>
                {token.currentROI}
              </div>

              {/* ATH ROI */}
              <div
                className={`text-sm sm:text-base mt-2 sm:mt-0 ${
                  parseFloat(token.athROI) >= 1 ? 'text-green-500' : 'text-red-500'
                }`}
              >
                <span className="sm:hidden font-semibold">ATH ROI: </span>
                {token.athROI}
              </div>
            </div>
          ))
        )}
      </div>
    </div>

    </>
  );
};

export default FundingDetails;










