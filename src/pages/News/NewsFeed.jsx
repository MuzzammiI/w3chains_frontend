import { useState, useEffect } from 'react';
import NewsSection from './NewsSection';
import ArticleSection from './ArticleSection';
// import SubNewsSection from './SimpleNewsSection';
import SimpleNewsSection from './SimpleNewsSection';
import PressReleaseSlider from './PressReleaseSlider';
import TrendingTopics from '../../components/TrendingTopics';
import ScrollToTopButton from '../../components/ScrollToTopButton';

// Sample API data (replace with actual API fetch)
const newsData = [
  {
    id: 1,
    category: 'BLOCKCHAIN',
    title: '$17K Breached: Bitcoin Down 15% from All-Time High',
    date: 'February 5, 2018',
    image: 'https://images.unsplash.com/photo-1679485205984-4ce35c32b2d6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mnw1MDMzMjc1NHx8ZW58MHx8fHx8',
    isFeatured: true,
  },
  {
    id: 2,
    category: 'BLOCKCHAIN',
    title: 'SEC Suspends Crypto Firm’s Stock After Big Price Boost',
    date: 'February 5, 2018 by Admin',
    image: 'https://images.unsplash.com/photo-1645870389341-b4047fb9a148?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NzZ8NTAzMzI3NTR8fGVufDB8fHx8fA%3D%3D',
    
  },
  {
    id: 3,
    category: 'NEWS',
    title: 'Hong Kong Official Rules Out Plan for Central Bank',
    date: 'May 31, 2018 by Admin',
    image: 'https://images.unsplash.com/photo-1639987759021-bc55a0c96ce1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGJsb2NrY2hhaW4lMjBuZXdzfGVufDB8fDB8fHww',
  },
  {
    id: 4,
    category: 'NEWS',
    title: 'New Zcash Software Sets Stage for ‘Sapling’ Upgrade',
    date: 'May 31, 2018 by Admin',
    image: 'https://images.unsplash.com/photo-1677249490921-3246e81f19e3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHw1MDMzMjc1NHx8ZW58MHx8fHx8',
  },
  {
    id: 5,
    category: 'BUSINESS',
    title: 'Coinbase Halts Bitcoin Cash Trading Abruptly After',
    date: 'February 5, 2018 by Admin',
    image: 'https://images.unsplash.com/photo-1686848429284-d108e021a74c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8N3w1MDMzMjc1NHx8ZW58MHx8fHx8',
  },
  
  
];

const latestNews = [
  { title: 'Hong Kong Official Rules Out Plan for Central Bank', date: 'May 31, 2018' },
  { title: 'New Zcash Software Sets Stage for ‘Sapling’ Upgrade', date: 'May 31, 2018' },
  { title: 'SEC Suspends Crypto Firm’s Stock After Big Price Boost', date: 'February 5, 2018' },
  { title: 'Coinbase Halts Bitcoin Cash Trading Abruptly After', date: 'February 5, 2018' },
  { title: 'Chain Moves to Simplify Smart Contracts', date: 'February 5, 2018' },
];

const mostRead = [
  '$17K Breached: Bitcoin Down 15% from All-Time High',
  'SEC Suspends Crypto Firm’s Stock After Big Price Boost',
  'New Zcash Software Sets Stage for ‘Sapling’ Upgrade',
  'Coinbase Halts Bitcoin Cash Trading Abruptly After',
  'Hong Kong Official Rules Out Plan for Central Bank',
];

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate API fetch with a delay
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setNews(newsData);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
    {/* Trending TOpics */}
    <TrendingTopics/>



    <div className="bg-gray-100 text-black min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar (Latest and Press Releases) */}
          <div className="lg:col-span-1 space-y-6">
            {/* Latest News */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-red-500 font-semibold mb-4">Latest</h3>
              {loading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="w-3/4 h-4 bg-gray-300 rounded blur-sm mb-2"></div>
                      <div className="w-1/2 h-3 bg-gray-300 rounded blur-sm"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="space-y-4">
                  {latestNews.map((item, index) => (
                    <li key={index}>
                      <a href="#" className="text-gray-800 hover:text-blue-600">
                        {item.title}
                      </a>
                      <p className="text-gray-500 text-sm">{item.date}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Press Releases */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-red-500 font-semibold mb-4">Press Releases</h3>
              {loading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="w-3/4 h-4 bg-gray-300 rounded blur-sm mb-2"></div>
                      <div className="w-1/2 h-3 bg-gray-300 rounded blur-sm"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="space-y-4">
                  {latestNews.map((item, index) => (
                    <li key={index}>
                      <a href="#" className="text-gray-800 hover:text-blue-600">
                        {item.title}
                      </a>
                      <p className="text-gray-500 text-sm">{item.date}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Main News Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Featured News */}
            {loading ? (
              <div className="bg-white p-4 rounded-lg shadow animate-pulse">
                <div className="w-1/2 h-4 bg-gray-300 rounded blur-sm mb-2"></div>
                <div className="w-3/4 h-6 bg-gray-300 rounded blur-sm mb-2"></div>
                <div className="w-full h-48 bg-gray-300 rounded blur-sm"></div>
              </div>
            ) : (
              news
                .filter((item) => item.isFeatured)
                .map((item) => (
                  <div key={item.id} className="bg-white p-4  rounded-lg shadow">
                    <span className="text-blue-500 text-sm">{item.category}</span>
                    <h2 className="text-2xl font-bold mt-2 cursor-pointer">{item.title}</h2>
                    <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded mt-4" />
                    <p className="text-gray-500 text-sm mt-2">{item.date}</p>
                  </div>
                ))
            )}

            {/* News Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {loading ? (
                [...Array(4)].map((_, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow animate-pulse">
                    <div className="w-1/2 h-4 bg-gray-300 rounded blur-sm mb-2"></div>
                    <div className="w-3/4 h-4 bg-gray-300 rounded blur-sm mb-2"></div>
                    <div className="w-full h-32 bg-gray-300 rounded blur-sm"></div>
                    <div className="w-1/2 h-3 bg-gray-300 rounded blur-sm mt-2"></div>
                  </div>
                ))
              ) : (
                news
                  .filter((item) => !item.isFeatured)
                  .map((item) => (
                    <div key={item.id} className="bg-white p-4 cursor-pointer rounded-lg shadow">
                      <span className="text-blue-500 text-sm">{item.category}</span>
                      <h3 className="text-lg font-semibold mt-2">{item.title}</h3>
                      <img src={item.image} alt={item.title} className="w-full h-32 object-cover rounded mt-4" />
                      <p className="text-gray-500 text-sm mt-2">{item.date}</p>
                    </div>
                  ))
              )}
            </div>

            {/* Load More Button */}
            <button className="w-full py-2 bg-gray-200 cursor-pointer text-gray-700 rounded-lg hover:bg-gray-300">
              Load More Posts
            </button>
          </div>

          {/* Sidebar (Calculator, ICO Calendar, Most Read) */}
          <div className="lg:col-span-1 space-y-6">
            {/* Calculator */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-blue-600 font-semibold mb-4">Calculator</h3>
              <div className="flex justify-between items-center mb-2">
                <span>BITCOIN</span>
                <span className="text-gray-700">1</span>
              </div>
              <div className="flex justify-between items-center">
                <span>US DOLLAR</span>
                <span className="text-gray-700">62886</span>
              </div>
            </div>

            {/* ICO Calendar */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-blue-600 font-semibold mb-4">ICO Calendar</h3>
              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="w-1/2 h-4 bg-gray-300 rounded blur-sm mb-2"></div>
                      <div className="w-3/4 h-3 bg-gray-300 rounded blur-sm"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="space-y-4">
                  <li>
                    <p className="text-gray-800 font-semibold">June 22, 2018</p>
                    <p className="text-gray-600">HDC</p>
                    <p className="text-gray-500 text-sm">IoT platform backed by Hyundai</p>
                  </li>
                  <li>
                    <p className="text-gray-800 font-semibold">May 17, 2018</p>
                    <p className="text-gray-600">CoinLion</p>
                    <p className="text-gray-500 text-sm">Exchange & portfolio management</p>
                  </li>
                  <li>
                    <p className="text-gray-800 font-semibold">May 11, 2018</p>
                    <p className="text-gray-600">United Traders</p>
                    <p className="text-gray-500 text-sm">IoT platform backed by Hyundai</p>
                  </li>
                  <a href="#" className="text-blue-600 text-sm hover:underline">
                    View All ICOs
                  </a>
                </ul>
              )}
            </div>

            {/* Banner Ad */}
            <div className="bg-gradient-to-r from-blue-500 to-pink-500 p-4 rounded-lg shadow text-white text-center">
              <p>Banner 250x250</p>
            </div>

            {/* Most Read */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-blue-600 font-semibold mb-4 cursor-pointer">Most Read</h3>
              {loading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="w-3/4 h-4 bg-gray-300 rounded blur-sm"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="space-y-4">
                  {mostRead.map((item, index) => (
                    <li key={index} className="flex items-center cursor-pointer">
                      <span className="text-gray-500 mr-2">{index + 1}</span>
                      <a href="#" className="text-gray-800 hover:text-blue-600">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
              

              {/* Top News Section */}
              <NewsSection/>
              {/* Sub News Section */}
              <SimpleNewsSection/>

              

              
                {/* Press Release Sectioni */}
                <PressReleaseSlider/>

                
              {/* this is News details  */}
              <ArticleSection/>

    <ScrollToTopButton />
    
    </>
  );
};

export default NewsFeed;