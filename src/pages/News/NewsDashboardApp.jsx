// import { useState, useEffect } from 'react';
// import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
// import CryptoNews from './CryptoNews';
// import ScrollToTopButton from '../../components/ScrollToTopButton';
// import { getNews, getNewsById } from '../../Services/newsAPIs.js';

// // Main App component
// function NewsDashboardApp() {
//   return (
//     <Routes>
//       <Route path="/" element={<NewsDashboard />} />
//       <Route path="/news/:id" element={<NewsDetailPage />} />
//     </Routes>
//   );
// }

// // News Dashboard Component
// function NewsDashboard() {
//   const [newsData, setNewsData] = useState({ topNews: [], cryptoNews: [], blockchainNews: [] });
//   const [filters, setFilters] = useState({
//     category: 'All',
//     author: 'All',
//     tag: 'All',
//   });
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchNews = async () => {
//       setLoading(true);
//       const topNews = await getNews('feeds', page, 10);
//       const cryptoNews = await getNews('bitcoin', page, 10);
//       const blockchainNews = await getNews('ethereum', page, 10);
//       setNewsData(prevData => ({
//         topNews: Array.isArray(topNews) ? [...prevData.topNews, ...topNews] : prevData.topNews,
//         cryptoNews: Array.isArray(cryptoNews) ? [...prevData.cryptoNews, ...cryptoNews] : prevData.cryptoNews,
//         blockchainNews: Array.isArray(blockchainNews) ? [...prevData.blockchainNews, ...blockchainNews] : prevData.blockchainNews,
//       }));
//       setLoading(false);
//     };

//     fetchNews();
//   }, [page]);

//   // Extract unique filter options with the new specific categories and tags
//   const allCategories = ['All', 'NFT', 'Blockchain', 'Art', 'Music', 'Finance', 'Regulation', 'Technology', 'Market', 'Crypto'];
//   const allAuthors = ['All', ...new Set([...(newsData.topNews || []), ...(newsData.cryptoNews || []), ...(newsData.blockchainNews || [])].map(news => news.author))];
//   const allTags = ['All', 'Ethereum', 'Solana', 'Polygon', 'Bitcoin', 'Stablecoin', 'Altcoin', 'Litecoin', 'Avalanche', 'Regulation', 'Vision', 'Market'];

//   const handleFilterChange = (type, value) => {
//     setFilters(prev => ({ ...prev, [type]: value }));
//   };

//   const filteredTopNews = newsData.topNews ? newsData.topNews.filter(news => {
//     return (filters.category === 'All' || news.category === filters.category) &&
//            (filters.author === 'All' || news.author === filters.author) &&
//            (filters.tag === 'All' || news.tag === filters.tag);
//   }) : [];

//   const handleCardClick = (id) => {
//     navigate(`/news/${id}`);
//   };

//   // Newsletter state and handler
//   const [newsletterEmail, setNewsletterEmail] = useState('');
//   const [newsletterMessage, setNewsletterMessage] = useState('');

//   const handleNewsletterSubscribe = (e) => {
//     e.preventDefault();
//     if (newsletterEmail) {
//       setNewsletterMessage('Thanks for subscribing to our newsletter!');
//       setNewsletterEmail(''); // Clear input
//       setTimeout(() => setNewsletterMessage(''), 3000); // Clear message after 3 seconds
//     } else {
//       setNewsletterMessage('Please enter a valid email address.');
//     }
//   };

//   // Determine the main top news and two side news for the new layout
//   const mainTopNews = filteredTopNews.length > 0 ? filteredTopNews[0] : null;
//   const sideTopNews = filteredTopNews.slice(1, 3);
//   const otherTopStories = filteredTopNews.slice(2, 12); // For the "TOP STORIES" section in the main content area

//   const handleLoadMore = () => {
//     setPage(prevPage => prevPage + 1);
//   };

//   return (
//     <div className="container mx-auto p-4 md:p-8">
//       {/* Header and Filters */}
//       <header className="mb-8 bg-white p-4 rounded-lg shadow-md">
//         <div className="flex flex-wrap gap-4 text-sm items-center justify-center md:justify-start">
//           <div className="flex items-center space-x-2">
//             <span className="font-semibold  text-gray-700">FILTERS</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <span className="font-semibold text-gray-700">CATEGORY</span>
//             <select
//               className="p-2 border text-black cursor-pointer border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               onChange={(e) => handleFilterChange('category', e.target.value)}
//               value={filters.category}
//             >
//               {allCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
//             </select>
//           </div>
//           <div className="flex items-center space-x-2">
//             <span className="font-semibold text-gray-700">AUTHOR</span>
//             <select
//               className="p-2 border text-black cursor-pointer border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               onChange={(e) => handleFilterChange('author', e.target.value)}
//               value={filters.author}
//             >
//               {allAuthors.map(author => <option key={author} value={author}>{author}</option>)}
//             </select>
//           </div>
//           <div className="flex items-center space-x-2">
//             <span className="font-semibold text-gray-700">TAG</span>
//             <select
//               className="p-2 border text-black cursor-pointer border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               onChange={(e) => handleFilterChange('tag', e.target.value)}
//               value={filters.tag}
//             >
//               {allTags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
//             </select>
//           </div>
//         </div>
//       </header>

//       {/* Main Content Area */}
//       <main className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//         <section className="lg:col-span-2">
//           {/* Top Main Article and Two Side Articles */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//             {mainTopNews && (
//               <div
//                 className="md:col-span-2 bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
//                 onClick={() => handleCardClick(mainTopNews._id)}
//               >
//                 <img src={mainTopNews.image} alt={mainTopNews.title} className="w-full h-64 object-cover"/>
//                 <div className="p-4">
//                   <h3 className="text-xl font-bold text-gray-900 mb-2">{mainTopNews.title}</h3>
//                   <p className="text-sm text-gray-600 mb-1">{mainTopNews.source}</p>
//                   <p className="text-xs text-gray-500">{mainTopNews.time}</p>
//                   <p className="text-gray-700 text-sm mt-2 line-clamp-3">{mainTopNews.content}</p>
//                 </div>
//               </div>
//             )}
//             <div className="md:col-span-1 grid grid-cols-1 gap-4">
//               {sideTopNews.map(news => (
//                 <div
//                   key={news._id}
//                   className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
//                   onClick={() => handleCardClick(news._id)}
//                 >
//                   <img src={news.image} alt={news.title} className="w-full h-32 object-cover"/>
//                   <div className="p-4">
//                     <h4 className="text-md font-semibold text-gray-900 mb-1">{news.title}</h4>
//                     <p className="text-xs text-gray-500">{news.time}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* TOP STORIES (remaining topNews items) */}
//           <h2 className="text-2xl font-bold mb-4 text-white border-b-2 border-blue-500 pb-2">TOP STORIES</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
//             {otherTopStories.map(news => (
//               <div
//                 key={news._id}
//                 className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer flex items-center p-4 hover:shadow-xl transition-shadow duration-300"
//                 onClick={() => handleCardClick(news._id)}
//               >
//                 <img src={news.image} alt={news.title} className="w-24 h-20 object-cover rounded-md mr-4"/>
//                 <div>
//                   <h4 className="text-md font-semibold text-gray-900 mb-1">{news.title}</h4>
//                   <p className="text-xs text-gray-500">{news.time}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* FINANCE Section (static for now) */}
//           <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="bg-white rounded-lg shadow-lg p-6">
//               <h3 className="text-xl font-bold mb-4 text-gray-800 border-b-2 border-yellow-500 pb-2">FINANCE</h3>
//               <div className="grid grid-cols-1 gap-4">
//                 {/* Example Finance news items */}
//                 {newsData.cryptoNews?.slice(0,10).map(news => news.category === 'Finance' && (
//                   <div key={news._id} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-md" onClick={() => handleCardClick(news._id)}>
//                     <img src={news.image} alt={news.title} className="w-16 h-12 object-cover rounded-md mr-3" />
//                     <div>
//                       <h4 className="text-md font-medium text-gray-900">{news.title}</h4>
//                       <p className="text-xs text-gray-500">{news.time}</p>
//                     </div>
//                   </div>
//                 ))}
//                 {/* Add more finance news as needed based on your data structure or mock them */}
//                 <p className="text-gray-700">Content for Finance news. This section can also be dynamically populated based on category filters.</p>
//               </div>
//             </div>
//             {/* POLICY Section (static for now) */}
//             <div className="bg-white rounded-lg shadow-lg p-6">
//               <h3 className="text-xl font-bold mb-4 text-gray-800 border-b-2 border-red-500 pb-2">POLICY</h3>
//               <div className="grid grid-cols-1 gap-4">
//                 {/* Example Policy news items */}
//                 {newsData.blockchainNews?.slice(0,10).map(news => news.category === 'Regulation' && (
//                   <div key={news._id} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-md" onClick={() => handleCardClick(news._id)}>
//                     <img src={news.image} alt={news.title} className="w-16 h-12 object-cover rounded-md mr-3" />
//                     <div>
//                       <h4 className="text-md font-medium text-gray-900">{news.title}</h4>
//                       <p className="text-xs text-gray-500">{news.time}</p>
//                     </div>
//                   </div>
//                 ))}
//                 {/* Add more policy news as needed */}
//                 <p className="text-gray-700">Content for Policy news. More dynamic content can be added here.</p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Sidebar */}
//         <aside className="lg:col-span-1">
//           {/* Latest Crypto News */}
//           <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
//             <h2 className="text-xl font-bold mb-4 text-gray-800 border-b-2 border-green-500 pb-2">LATEST CRYPTO NEWS →</h2>
//             <div className="max-h-93 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 scrollbar-track-gray-200">
//               {(newsData.cryptoNews || []).slice(0,10).map(news => (
//                 <div key={news._id} className="flex items-center mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded-md" onClick={() => handleCardClick(news._id)}>
//                   <img src={news.image} alt={news.title} className="w-16 h-12 object-cover rounded-md mr-3" />
//                   <div>
//                     <h4 className="text-md font-medium text-gray-900">{news.title}</h4>
//                     <p className="text-xs text-gray-500">{news.time}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Latest Blockchain News */}
//           <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
//             <h2 className="text-xl font-bold mb-4 text-gray-800 border-b-2 border-purple-500 pb-2">LATEST BLOCK CHAIN NEWS</h2>
//             <div className="max-h-118 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 scrollbar-track-gray-200">
//               {(newsData.blockchainNews || []).slice(0,10).map(news => (
//                 <div key={news._id} className="flex items-center mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded-md" onClick={() => handleCardClick(news._id)}>
//                   <img src={news.image} alt={news.title} className="w-16 h-12 object-cover rounded-md mr-3" />
//                   <div>
//                     <h4 className="text-md font-medium text-gray-900">{news.title}</h4>
//                     <p className="text-xs text-gray-500">{news.time}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </aside>
//       </main>

//       <div className="flex justify-center mt-8">
//         <button
//           onClick={handleLoadMore}
//           disabled={loading}
//           className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
//         >
//           {loading ? 'Loading...' : 'Load More'}
//         </button>
//       </div>

//       <CryptoNews/>
//       {/* Newsletter Section */}
//       <section className="mt-8 bg-white rounded-lg shadow-lg p-6">
//         <h2 className="text-2xl font-bold mb-4 text-gray-800">NEWSLETTERS →</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           <div className="border border-gray-200 rounded-md p-4 md:col-span-1 lg:col-span-1">
//             <h3 className="font-semibold text-gray-900 mb-2">Don&apos;t miss another story.</h3>
//             <p className="text-sm text-gray-600 mb-4">Subscribe to our Crypto Daily Newsletter today.</p>
//             <form onSubmit={handleNewsletterSubscribe} className="flex flex-col sm:flex-row gap-2">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={newsletterEmail}
//                 onChange={(e) => setNewsletterEmail(e.target.value)}
//                 required
//               />
//               <button
//                 type="submit"
//                 className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
//               >
//                 Subscribe
//               </button>
//             </form>
//             {newsletterMessage && <p className="mt-2 text-sm text-center font-medium text-blue-600">{newsletterMessage}</p>}
//           </div>

//           <div className="border border-gray-200 rounded-md p-4">
//             <h3 className="font-semibold text-gray-900 mb-2">Crypto Daybook Americas</h3>
//             <p className="text-sm text-gray-600">Market analysis for crypto traders.</p>
//           </div>
//           <div className="border border-gray-200 rounded-md p-4">
//             <h3 className="font-semibold text-gray-900 mb-2">Crypto Long & Short</h3>
//             <p className="text-sm text-gray-600">The most read for blockchain insights, news and analysis.</p>
//           </div>
//           <div className="border border-gray-200 rounded-md p-4">
//             <h3 className="font-semibold text-gray-900 mb-2">The Node</h3>
//             <p className="text-sm text-gray-600">The biggest crypto news and ideas of the day.</p>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// // News Detail Page Component
// function NewsDetailPage() {
//     const { id } = useParams();
//     const [newsItem, setNewsItem] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchNews = async () => {
//             const item = await getNewsById('feeds', id);
//             setNewsItem(item);
//         }
//         fetchNews();
//     }, [id]);

//     if (!newsItem) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gray-100">
//                 <div className="bg-white p-8 rounded-lg shadow-lg text-center">
//                     <h2 className="text-2xl font-bold text-gray-800 mb-4">News Not Found</h2>
//                     <button
//                         onClick={() => navigate('/')}
//                         className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
//                     >
//                         Go to Dashboard
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-zinc-900 font-sans">
//             <div className="container mx-auto p-4 md:p-8 bg-white rounded-lg shadow-lg mt-8">
//                 <button
//                     onClick={() => navigate(-1)}
//                     className="mb-6 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300"
//                 >
//                     ← Back
//                 </button>
//                 <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">{newsItem.title}</h1>
//                 <p className="text-md text-gray-600 mb-2">By <span className="font-semibold">{newsItem.author}</span> | {newsItem.source} | {newsItem.time}</p>
//                 <img src={newsItem.image} alt={newsItem.title} className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"/>
//                 <div className="prose max-w-none text-gray-700 leading-relaxed">
//                     <p>{newsItem.content}</p>
//                     <p className="mt-4 text-sm text-gray-500">
//                         This is a simulated news article. The content is for demonstration purposes only.
//                     </p>
//                 </div>
//             </div>
//             <ScrollToTopButton />
//         </div>
//     );
// }

// export default NewsDashboardApp;

















// import { useState, useEffect } from "react";
// import { Routes, Route, useNavigate, useParams } from "react-router-dom";
// import { getNews, getNewsById } from '../../Services/newsAPIs.js';

// // Import your default image from your assets folder
// import defaultNewsImage from '../../assets/img1.png'; // Adjust the path as needed
// import smallDefaultImage from '../../assets/img2.png'; // Adjust the path for a smaller image
// import LoadingBlurOverlay from "../../components/LoadingBlurOverlay.jsx";

// // Mock components to make the app runnable as a single file
// const CryptoNews = () => {
//     return (
//         <div className="p-4 bg-gray-100 rounded-lg text-center mt-8 text-gray-700">
//             <h3 className="font-bold mb-2">Crypto Market Data</h3>
//             <p>This is a placeholder for crypto market data. The actual component would display live market info.</p>
//         </div>
//     );
// };

// const ScrollToTopButton = () => {
//     const [isVisible, setIsVisible] = useState(false);

//     // Show button when page is scrolled up to 300px
//     const toggleVisibility = () => {
//         if (window.pageYOffset > 300) {
//             setIsVisible(true);
//         } else {
//             setIsVisible(false);
//         }
//     };

//     const scrollToTop = () => {
//         window.scrollTo({
//             top: 0,
//             behavior: 'smooth',
//         });
//     };

//     useEffect(() => {
//         window.addEventListener('scroll', toggleVisibility);
//         return () => {
//             window.removeEventListener('scroll', toggleVisibility);
//         };
//     }, []);

//     return (
//         <button
//             onClick={scrollToTop}
//             className={`fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg transition-opacity duration-300 ${
//                 isVisible ? 'opacity-100' : 'opacity-0'
//             }`}
//             aria-label="Scroll to top"
//         >
//             <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//             >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
//             </svg>
//         </button>
//     );
// };

// // Main App component with routes
// function NewsDashboardApp() {
//     return (
    
//         <Routes>
//             <Route path="/" element={<NewsDashboard />} />
//             <Route path="/:collection/:id" element={<NewsDetailPage />} />
//         </Routes>
    
//     );
// }


// // News Dashboard Component
// function NewsDashboard() {
//     const [newsData, setNewsData] = useState({ topNews: [], cryptoNews: [], blockchainNews: [] });
//     const [filters, setFilters] = useState({
//         category: 'All',
//         author: 'All',
//         tag: 'All',
//     });
//     const [page, setPage] = useState(1);
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchNews = async () => {
//             setLoading(true);
//             try {
//                 // Fetch data from valid collections like 'bitcoin' and 'ethereum'
//                 const topNewsRes = await getNews('bitcoin', page, 10);
//                 const cryptoNewsRes = await getNews('bitcoin', page, 10);
//                 const blockchainNewsRes = await getNews('ethereum', page, 10);

//                 setNewsData(prevData => ({
//                     topNews: [...prevData.topNews, ...(topNewsRes.data || [])],
//                     cryptoNews: [...prevData.cryptoNews, ...(cryptoNewsRes.data || [])],
//                     blockchainNews: [...prevData.blockchainNews, ...(blockchainNewsRes.data || [])],
//                 }));
//             } catch (error) {
//                 console.error("Failed to fetch news in dashboard:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchNews();
//     }, [page]);

//     // Dynamically extract unique filter options from the fetched data
//     // This is more flexible than hardcoding them.
//     const allData = [...newsData.topNews, ...newsData.cryptoNews, ...newsData.blockchainNews];
//     const allCategories = ['All', ...new Set(allData.flatMap(news => news.tags || []))];
//     const allAuthors = ['All', ...new Set(allData.map(news => news.author).filter(Boolean))];
//     const allTags = ['All', ...new Set(allData.flatMap(news => news.keywords || []))];

//     const handleFilterChange = (type, value) => {
//         setFilters(prev => ({ ...prev, [type]: value }));
//     };

//     const filteredTopNews = (newsData.topNews || []).filter(news => {
//         // Check if the news item has at least one of the selected tags or keywords
//         const hasCategoryTag = filters.category === 'All' || (news.tags && news.tags.includes(filters.category));
//         const hasAuthor = filters.author === 'All' || news.author === filters.author;
//         const hasKeywordTag = filters.tag === 'All' || (news.keywords && news.keywords.includes(filters.tag));

//         return hasCategoryTag && hasAuthor && hasKeywordTag;
//     });

//     const handleCardClick = (collection, id) => {
//         navigate(`/news/${collection}/${id}`);
//     };

//     // Newsletter state and handler
//     const [newsletterEmail, setNewsletterEmail] = useState('');
//     const [newsletterMessage, setNewsletterMessage] = useState('');

//     const handleNewsletterSubscribe = (e) => {
//         e.preventDefault();
//         if (newsletterEmail) {
//             setNewsletterMessage('Thanks for subscribing to our newsletter!');
//             setNewsletterEmail('');
//             setTimeout(() => setNewsletterMessage(''), 3000);
//         } else {
//             setNewsletterMessage('Please enter a valid email address.');
//         }
//     };

//     // Determine the main top news and two side news for the new layout
//     const mainTopNews = filteredTopNews.length > 0 ? filteredTopNews[0] : null;
//     const sideTopNews = filteredTopNews.slice(1, 3);
//     const otherTopStories = filteredTopNews.slice(2, 12);

//     const handleLoadMore = () => {
//         setPage(prevPage => prevPage + 1);
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
//             <div className="container mx-auto p-4 md:p-8">
//                 {/* Header and Filters */}
//                 <header className="mb-8 bg-white p-4 rounded-lg shadow-md">
//                     <div className="flex flex-wrap gap-4 text-sm items-center justify-center md:justify-start">
//                         <div className="flex items-center space-x-2">
//                             <span className="font-semibold text-gray-700">FILTERS</span>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                             <span className="font-semibold text-gray-700">CATEGORY</span>
//                             <select
//                                 className="p-2 border text-black cursor-pointer border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 onChange={(e) => handleFilterChange('category', e.target.value)}
//                                 value={filters.category}
//                             >
//                                 {allCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
//                             </select>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                             <span className="font-semibold text-gray-700">AUTHOR</span>
//                             <select
//                                 className="p-2 border text-black cursor-pointer border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 onChange={(e) => handleFilterChange('author', e.target.value)}
//                                 value={filters.author}
//                             >
//                                 {allAuthors.map(author => <option key={author} value={author}>{author}</option>)}
//                             </select>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                             <span className="font-semibold text-gray-700">TAG</span>
//                             <select
//                                 className="p-2 border text-black cursor-pointer border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 onChange={(e) => handleFilterChange('tag', e.target.value)}
//                                 value={filters.tag}
//                             >
//                                 {allTags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
//                             </select>
//                         </div>
//                     </div>
//                 </header>

//                 {/* Main Content Area */}
//                 <main className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//                     <section className="lg:col-span-2">
//                         {/* Top Main Article and Two Side Articles */}
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//                             {mainTopNews && (
//                                 <div
//                                     className="md:col-span-2 bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
//                                     onClick={() => handleCardClick('bitcoin', mainTopNews._id)}
//                                 >
//                                     <img 
//                                         src={mainTopNews.image || defaultNewsImage} 
//                                         alt={mainTopNews.headline ? mainTopNews.headline.slice(0, 50) + "..." : "News article image"} 
//                                         className="w-full h-64 object-cover" 
//                                     />
//                                     <div className="p-4">
//                                         <h3 className="text-xl font-bold text-gray-900 mb-2">{mainTopNews.headline}</h3>
//                                         <p className="text-sm text-gray-600 mb-1">{mainTopNews.source}</p>
//                                         <p className="text-xs text-gray-500">{new Date(mainTopNews.created_at).toLocaleDateString()}</p>
//                                         <p className="text-gray-700 text-sm mt-2 line-clamp-3">{mainTopNews.summary}</p>
//                                     </div>
//                                 </div>
//                             )}
//                             <div className="md:col-span-1 grid grid-cols-1 gap-4">
//                                 {sideTopNews.map((news, index) => (
//                                     <div
//                                         key={news._id || index}
//                                         className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
//                                         onClick={() => handleCardClick('bitcoin', news._id)}
//                                     >
//                                         <img 
//                                             src={news.image || smallDefaultImage} 
//                                             alt={news.headline ? news.headline.slice(0, 50) + "..." : "News article image"} 
//                                             className="w-full h-32 object-cover" 
//                                         />
//                                         <div className="p-4">
//                                             <h4 className="text-md font-semibold text-gray-900 mb-1">{news.headline}</h4>
//                                             <p className="text-xs text-gray-500">{new Date(news.created_at).toLocaleDateString()}</p>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* TOP STORIES (remaining topNews items) */}
//                         <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-blue-500 pb-2">TOP STORIES</h2>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
//                             {otherTopStories.map((news, index) => (
//                                 <div
//                                     key={news._id || index}
//                                     className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer flex items-center p-4 hover:shadow-xl transition-shadow duration-300"
//                                     onClick={() => handleCardClick('bitcoin', news._id)}
//                                 >
//                                     <img 
//                                         src={news.image || smallDefaultImage} 
//                                         alt={news.headline ? news.headline.slice(0, 20) + "..." : "News image"} 
//                                         className="w-24 h-20 object-cover rounded-md mr-4" 
//                                     />
//                                     <div>
//                                         <h4 className="text-md font-semibold text-gray-900 mb-1">{news.headline}</h4>
//                                         <p className="text-xs text-gray-500">{new Date(news.created_at).toLocaleDateString()}</p>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         {/* FINANCE Section (static for now) */}
//                         <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div className="bg-white rounded-lg shadow-lg p-6">
//                                 <h3 className="text-xl font-bold mb-4 text-gray-800 border-b-2 border-yellow-500 pb-2">FINANCE</h3>
//                                 <div className="grid grid-cols-1 gap-4">
//                                     {/* Example Finance news items, filtered from cryptoNews */}
//                                     {(newsData.cryptoNews || []).filter(news => news.tags?.includes('Finance')).slice(0, 5).map((news, index) => (
//                                         <div key={news._id || index} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-md" onClick={() => handleCardClick('bitcoin', news._id)}>
//                                             <img 
//                                                 src={news.image || smallDefaultImage} 
//                                                 alt={news.headline ? news.headline.slice(0, 20) + "..." : "News image"} 
//                                                 className="w-16 h-12 object-cover rounded-md mr-3" 
//                                             />
//                                             <div>
//                                                 <h4 className="text-md font-medium text-gray-900">{news.headline}</h4>
//                                                 <p className="text-xs text-gray-500">{new Date(news.created_at).toLocaleDateString()}</p>
//                                             </div>
//                                         </div>
//                                     ))}
//                                     {/* If no items, show a placeholder */}
//                                     {(newsData.cryptoNews || []).filter(news => news.tags?.includes('Finance')).length === 0 && (
//                                         <p className="text-gray-700">No finance news found.</p>
//                                     )}
//                                 </div>
//                             </div>
//                             {/* POLICY Section (static for now) */}
//                             <div className="bg-white rounded-lg shadow-lg p-6">
//                                 <h3 className="text-xl font-bold mb-4 text-gray-800 border-b-2 border-red-500 pb-2">POLICY</h3>
//                                 <div className="grid grid-cols-1 gap-4">
//                                     {/* Example Policy news items, filtered from blockchainNews */}
//                                     {(newsData.blockchainNews || []).filter(news => news.tags?.includes('Regulation')).slice(0, 5).map((news, index) => (
//                                         <div key={news._id || index} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-md" onClick={() => handleCardClick('ethereum', news._id)}>
//                                             <img 
//                                                 src={news.image || smallDefaultImage} 
//                                                 alt={news.headline ? news.headline.slice(0, 20) + "..." : "News image"} 
//                                                 className="w-16 h-12 object-cover rounded-md mr-3" 
//                                             />
//                                             <div>
//                                                 <h4 className="text-md font-medium text-gray-900">{news.headline}</h4>
//                                                 <p className="text-xs text-gray-500">{new Date(news.created_at).toLocaleDateString()}</p>
//                                             </div>
//                                         </div>
//                                     ))}
//                                     {/* If no items, show a placeholder */}
//                                     {(newsData.blockchainNews || []).filter(news => news.tags?.includes('Regulation')).length === 0 && (
//                                         <p className="text-gray-700">No policy news found.</p>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     </section>

//                     {/* Sidebar */}
//                     <aside className="lg:col-span-1">
//                         {/* Latest Crypto News */}
//                         <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
//                             <h2 className="text-xl font-bold mb-4 text-gray-800 border-b-2 border-green-500 pb-2">LATEST CRYPTO NEWS →</h2>
//                             <div className="max-h-96 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 scrollbar-track-gray-200">
//                                 {(newsData.cryptoNews || []).slice(0, 10).map((news, index) => (
//                                     <div key={news._id || index} className="flex items-center mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded-md" onClick={() => handleCardClick('bitcoin', news._id)}>
//                                         <img 
//                                             src={news.image || smallDefaultImage} 
//                                             alt={news.headline ? news.headline.slice(0, 20) + "..." : "News image"} 
//                                             className="w-16 h-12 object-cover rounded-md mr-3" 
//                                         />
//                                         <div>
//                                             <h4 className="text-md font-medium text-gray-900">{news.headline}</h4>
//                                             <p className="text-xs text-gray-500">{new Date(news.created_at).toLocaleDateString()}</p>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Latest Blockchain News */}
//                         <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
//                             <h2 className="text-xl font-bold mb-4 text-gray-800 border-b-2 border-purple-500 pb-2">LATEST BLOCK CHAIN NEWS</h2>
//                             <div className="max-h-96 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 scrollbar-track-gray-200">
//                                 {(newsData.blockchainNews || []).slice(0, 10).map((news, index) => (
//                                     <div key={news._id || index} className="flex items-center mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded-md" onClick={() => handleCardClick('ethereum', news._id)}>
//                                         <img 
//                                             src={news.image || smallDefaultImage} 
//                                             alt={news.headline ? news.headline.slice(0, 20) + "..." : "News image"} 
//                                             className="w-16 h-12 object-cover rounded-md mr-3" 
//                                         />
//                                         <div>
//                                             <h4 className="text-md font-medium text-gray-900">{news.headline}</h4>
//                                             <p className="text-xs text-gray-500">{new Date(news.created_at).toLocaleDateString()}</p>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </aside>
//                 </main>

//                 <div className="flex justify-center mt-8">
//                     <button
//                         onClick={handleLoadMore}
//                         disabled={loading}
//                         className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
//                     >
//                         {loading ? 'Loading...' : 'Load More'}

//                     </button>
//                 </div>
                
//                 <CryptoNews />
//                 <ScrollToTopButton />

//                 {/* Newsletter Section */}
//                 <section className="mt-8 bg-white rounded-lg shadow-lg p-6">
//                     <h2 className="text-2xl font-bold mb-4 text-gray-800">NEWSLETTERS →</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                         <div className="border border-gray-200 rounded-md p-4 md:col-span-1 lg:col-span-1">
//                             <h3 className="font-semibold text-gray-900 mb-2">Don&apos;t miss another story.</h3>
//                             <p className="text-sm text-gray-600 mb-4">Subscribe to our Crypto Daily Newsletter today.</p>
//                             <form onSubmit={handleNewsletterSubscribe} className="flex flex-col sm:flex-row gap-2">
//                                 <input
//                                     type="email"
//                                     placeholder="Enter your email"
//                                     className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     value={newsletterEmail}
//                                     onChange={(e) => setNewsletterEmail(e.target.value)}
//                                     required
//                                 />
//                                 <button
//                                     type="submit"
//                                     className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
//                                 >
//                                     Subscribe
//                                 </button>
//                             </form>
//                             {newsletterMessage && <p className="mt-2 text-sm text-center font-medium text-blue-600">{newsletterMessage}</p>}
//                         </div>

//                         <div className="border border-gray-200 rounded-md p-4">
//                             <h3 className="font-semibold text-gray-900 mb-2">Crypto Daybook Americas</h3>
//                             <p className="text-sm text-gray-600">Market analysis for crypto traders.</p>
//                         </div>
//                         <div className="border border-gray-200 rounded-md p-4">
//                             <h3 className="font-semibold text-gray-900 mb-2">Crypto Long & Short</h3>
//                             <p className="text-sm text-gray-600">The most read for blockchain insights, news and analysis.</p>
//                         </div>
//                         <div className="border border-gray-200 rounded-md p-4">
//                             <h3 className="font-semibold text-gray-900 mb-2">The Node</h3>
//                             <p className="text-sm text-gray-600">The biggest crypto news and ideas of the day.</p>
//                         </div>
//                     </div>
//                 </section>
//             </div>
//         </div>
//     );
// }



// function NewsDetailPage() {
//   const { collection, id } = useParams();
//   const [newsItem, setNewsItem] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchNews = async () => {
//       setLoading(true);
//       setError(null);

//       const response = await getNewsById(collection, id);
//       console.log(response);
//       if (response.success) {
//         setNewsItem(response.data);
//       } else {
//         setError(response.message || 'Failed to fetch news item');
//       }
//       setLoading(false);
//     };

//     fetchNews();
//   }, [collection, id]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <div className="bg-white p-8 rounded-lg shadow-lg text-center">
//           {/* <h2 className="text-2xl font-bold text-gray-800 mb-4">Loading...</h2> */}
//           <LoadingBlurOverlay/>
//         </div>
//       </div>
//     );
//   }

//   if (error || !newsItem) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <div className="bg-white p-8 rounded-lg shadow-lg text-center">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">
//             {error || 'News Not Found'}
//           </h2>
//           <button
//             onClick={() => navigate('/')}
//             className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
//           >
//             Go to Dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
//       <div className="container mx-auto p-4 md:p-8 bg-white rounded-lg shadow-lg mt-8">
//         <button
//           onClick={() => navigate(-1)}
//           className="mb-6 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300"
//         >
//           ← Back
//         </button>
//         <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
//           {newsItem.headline}
//         </h1>
//         <p className="text-md text-gray-600 mb-2">
//           {new Date(newsItem.created_at).toLocaleDateString()} |{' '}
//           {newsItem.content_type || 'News'}
//         </p>
//         <img
//           src={newsItem.image || defaultNewsImage}
//           alt={newsItem.headline ? `${newsItem.headline.slice(0, 100)}...` : 'News article image'}
//           className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
//         />
//         <div className="prose max-w-none text-gray-700 leading-relaxed">
//           <p>{newsItem.article}</p>
//           {newsItem.summary && <p className="mt-4 text-sm text-gray-500">{newsItem.summary}</p>}
//           <div className="mt-4">
//             <h3 className="text-lg font-semibold">Keywords:</h3>
//             <p className="text-sm text-gray-500">{newsItem.keywords?.join(', ') || 'N/A'}</p>
//           </div>
//           <div className="mt-2">
//             <h3 className="text-lg font-semibold">Tags:</h3>
//             <p className="text-sm text-gray-500">{newsItem.tags?.join(', ') || 'N/A'}</p>
//           </div>
//         </div>
//       </div>
//       <ScrollToTopButton />
//     </div>
//   );
// }

// export default NewsDashboardApp;




import { lazy } from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';

// Lazy-loaded child components
const NewsDashboard = lazy(() => import('./NewsDashboard'));
const NewsDetailPage = lazy(() => import('./NewsDetailPage'));

// Layout component for news section
const NewsLayout = () => (
  <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
    <Outlet /> {/* Child routes (NewsDashboard, NewsDetailPage) render here */}
  </div>
);

const NewsDashboardApp = () => {
  return (
    <Routes>
      <Route element={<NewsLayout />}>
        <Route index path="/" element={<NewsDashboard />} />
        <Route path=":collection/:id" element={<NewsDetailPage />} />
      </Route>
    </Routes>
  );
};

export default NewsDashboardApp;