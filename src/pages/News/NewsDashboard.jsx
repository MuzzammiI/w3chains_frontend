
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNews } from '../../Services/newsAPIs.js';
import defaultNewsImage from '../../assets/img1.png';
import smallDefaultImage from '../../assets/img2.png';
import LoadingBlurOverlay from '../../components/LoadingBlurOverlay.jsx';
import CryptoNews from './CryptoNews'; // Assuming this is in the same directory
import ScrollToTopButton from '../../components/ScrollToTopButton.jsx';

const NewsDashboard = () => {
  const [newsData, setNewsData] = useState({ topNews: [], cryptoNews: [], blockchainNews: [] });
  const [filters, setFilters] = useState({
    category: 'All',
    author: 'All',
    tag: 'All',
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const topNewsRes = await getNews('bitcoin', page, 10);
        const cryptoNewsRes = await getNews('bitcoin', page, 10);
        const blockchainNewsRes = await getNews('ethereum', page, 10);

        setNewsData((prevData) => ({
          topNews: [...prevData.topNews, ...(topNewsRes.data || [])],
          cryptoNews: [...prevData.cryptoNews, ...(cryptoNewsRes.data || [])],
          blockchainNews: [...prevData.blockchainNews, ...(blockchainNewsRes.data || [])],
        }));
      } catch (error) {
        console.error('Failed to fetch news in dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [page]);

  const allData = [...newsData.topNews, ...newsData.cryptoNews, ...newsData.blockchainNews];
  const allCategories = ['All', ...new Set(allData.flatMap((news) => news.tags || []))];
  const allAuthors = ['All', ...new Set(allData.map((news) => news.author).filter(Boolean))];
  const allTags = ['All', ...new Set(allData.flatMap((news) => news.keywords || []))];

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const filteredTopNews = (newsData.topNews || []).filter((news) => {
    const hasCategoryTag = filters.category === 'All' || (news.tags && news.tags.includes(filters.category));
    const hasAuthor = filters.author === 'All' || news.author === filters.author;
    const hasKeywordTag = filters.tag === 'All' || (news.keywords && news.keywords.includes(filters.tag));
    return hasCategoryTag && hasAuthor && hasKeywordTag;
  });

  const handleCardClick = (collection, id) => {
    navigate(`/news/${collection}/${id}`);
  };

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterMessage, setNewsletterMessage] = useState('');

  const handleNewsletterSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterMessage('Thanks for subscribing to our newsletter!');
      setNewsletterEmail('');
      setTimeout(() => setNewsletterMessage(''), 3000);
    } else {
      setNewsletterMessage('Please enter a valid email address.');
    }
  };

  const mainTopNews = filteredTopNews.length > 0 ? filteredTopNews[0] : null;
  const sideTopNews = filteredTopNews.slice(1, 3);
  const otherTopStories = filteredTopNews.slice(2, 12);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      {loading && <LoadingBlurOverlay />}
      <header className="mb-8 bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-wrap gap-4 text-sm items-center justify-center md:justify-start">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-700">FILTERS</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-700">CATEGORY</span>
            <select
              className="p-2 border text-black cursor-pointer border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleFilterChange('category', e.target.value)}
              value={filters.category}
            >
              {allCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-700">AUTHOR</span>
            <select
              className="p-2 border text-black cursor-pointer border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleFilterChange('author', e.target.value)}
              value={filters.author}
            >
              {allAuthors.map((author) => (
                <option key={author} value={author}>
                  {author}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-700">TAG</span>
            <select
              className="p-2 border text-black cursor-pointer border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleFilterChange('tag', e.target.value)}
              value={filters.tag}
            >
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <section className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {mainTopNews && (
              <div
                className="md:col-span-2 bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
                onClick={() => handleCardClick('bitcoin', mainTopNews._id)}
              >
                <img
                  src={mainTopNews.image || defaultNewsImage}
                  alt={mainTopNews.headline ? mainTopNews.headline.slice(0, 50) + '...' : 'News article image'}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{mainTopNews.headline}</h3>
                  <p className="text-sm text-gray-600 mb-1">{mainTopNews.source}</p>
                  <p className="text-xs text-gray-500">{new Date(mainTopNews.created_at).toLocaleDateString()}</p>
                  <p className="text-gray-700 text-sm mt-2 line-clamp-3">{mainTopNews.summary}</p>
                </div>
              </div>
            )}
            <div className="md:col-span-1 grid grid-cols-1 gap-4">
              {sideTopNews.map((news, index) => (
                <div
                  key={news._id || index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
                  onClick={() => handleCardClick('bitcoin', news._id)}
                >
                  <img
                    src={news.image || smallDefaultImage}
                    alt={news.headline ? news.headline.slice(0, 50) + '...' : 'News article image'}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-md font-semibold text-gray-900 mb-1">{news.headline}</h4>
                    <p className="text-xs text-gray-500">{new Date(news.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-blue-500 pb-2">TOP STORIES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {otherTopStories.map((news, index) => (
              <div
                key={news._id || index}
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer flex items-center p-4 hover:shadow-xl transition-shadow duration-300"
                onClick={() => handleCardClick('bitcoin', news._id)}
              >
                <img
                  src={news.image || smallDefaultImage}
                  alt={news.headline ? news.headline.slice(0, 20) + '...' : 'News image'}
                  className="w-24 h-20 object-cover rounded-md mr-4"
                />
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-1">{news.headline}</h4>
                  <p className="text-xs text-gray-500">{new Date(news.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800 border-b-2 border-yellow-500 pb-2">FINANCE</h3>
              <div className="grid grid-cols-1 gap-4">
                {(newsData.cryptoNews || [])
                  .filter((news) => news.tags?.includes('Finance'))
                  .slice(0, 5)
                  .map((news, index) => (
                    <div
                      key={news._id || index}
                      className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-md"
                      onClick={() => handleCardClick('bitcoin', news._id)}
                    >
                      <img
                        src={news.image || smallDefaultImage}
                        alt={news.headline ? news.headline.slice(0, 20) + '...' : 'News image'}
                        className="w-16 h-12 object-cover rounded-md mr-3"
                      />
                      <div>
                        <h4 className="text-md font-medium text-gray-900">{news.headline}</h4>
                        <p className="text-xs text-gray-500">{new Date(news.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                {(newsData.cryptoNews || []).filter((news) => news.tags?.includes('Finance')).length === 0 && (
                  <p className="text-gray-700">No finance news found.</p>
                )}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800 border-b-2 border-red-500 pb-2">POLICY</h3>
              <div className="grid grid-cols-1 gap-4">
                {(newsData.blockchainNews || [])
                  .filter((news) => news.tags?.includes('Regulation'))
                  .slice(0, 5)
                  .map((news, index) => (
                    <div
                      key={news._id || index}
                      className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-md"
                      onClick={() => handleCardClick('ethereum', news._id)}
                    >
                      <img
                        src={news.image || smallDefaultImage}
                        alt={news.headline ? news.headline.slice(0, 20) + '...' : 'News image'}
                        className="w-16 h-12 object-cover rounded-md mr-3"
                      />
                      <div>
                        <h4 className="text-md font-medium text-gray-900">{news.headline}</h4>
                        <p className="text-xs text-gray-500">{new Date(news.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                {(newsData.blockchainNews || []).filter((news) => news.tags?.includes('Regulation')).length === 0 && (
                  <p className="text-gray-700">No policy news found.</p>
                )}
              </div>
            </div>
          </div>
        </section>

        <aside className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b-2 border-green-500 pb-2">LATEST CRYPTO NEWS →</h2>
            <div className="max-h-96 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 scrollbar-track-gray-200">
              {(newsData.cryptoNews || []).slice(0, 10).map((news, index) => (
                <div
                  key={news._id || index}
                  className="flex items-center mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded-md"
                  onClick={() => handleCardClick('bitcoin', news._id)}
                >
                  <img
                    src={news.image || smallDefaultImage}
                    alt={news.headline ? news.headline.slice(0, 20) + '...' : 'News image'}
                    className="w-16 h-12 object-cover rounded-md mr-3"
                  />
                  <div>
                    <h4 className="text-md font-medium text-gray-900">{news.headline}</h4>
                    <p className="text-xs text-gray-500">{new Date(news.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b-2 border-purple-500 pb-2">LATEST BLOCK CHAIN NEWS</h2>
            <div className="max-h-96 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-thumb-gray-400 scrollbar-track-gray-200">
              {(newsData.blockchainNews || []).slice(0, 10).map((news, index) => (
                <div
                  key={news._id || index}
                  className="flex items-center mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded-md"
                  onClick={() => handleCardClick('ethereum', news._id)}
                >
                  <img
                    src={news.image || smallDefaultImage}
                    alt={news.headline ? news.headline.slice(0, 20) + '...' : 'News image'}
                    className="w-16 h-12 object-cover rounded-md mr-3"
                  />
                  <div>
                    <h4 className="text-md font-medium text-gray-900">{news.headline}</h4>
                    <p className="text-xs text-gray-500">{new Date(news.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>

      <div className="flex justify-center mt-8">
        <button
          onClick={handleLoadMore}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      </div>

      <CryptoNews />
      <ScrollToTopButton />

      <section className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">NEWSLETTERS →</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border border-gray-200 rounded-md p-4 md:col-span-1 lg:col-span-1">
            <h3 className="font-semibold text-gray-900 mb-2">Don&apos;t miss another story.</h3>
            <p className="text-sm text-gray-600 mb-4">Subscribe to our Crypto Daily Newsletter today.</p>
            <form onSubmit={handleNewsletterSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
              >
                Subscribe
              </button>
            </form>
            {newsletterMessage && (
              <p className="mt-2 text-sm text-center font-medium text-blue-600">{newsletterMessage}</p>
            )}
          </div>
          <div className="border border-gray-200 rounded-md p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Crypto Daybook Americas</h3>
            <p className="text-sm text-gray-600">Market analysis for crypto traders.</p>
          </div>
          <div className="border border-gray-200 rounded-md p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Crypto Long & Short</h3>
            <p className="text-sm text-gray-600">The most read for blockchain insights, news and analysis.</p>
          </div>
          <div className="border border-gray-200 rounded-md p-4">
            <h3 className="font-semibold text-gray-900 mb-2">The Node</h3>
            <p className="text-sm text-gray-600">The biggest crypto news and ideas of the day.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsDashboard;