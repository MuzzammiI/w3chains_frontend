
// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { getNewsById } from '../../Services/newsAPIs.js';
// import defaultNewsImage from '../../assets/img1.png';
// import LoadingBlurOverlay from '../../components/LoadingBlurOverlay.jsx';
// import ScrollToTopButton from '../../components/ScrollToTopButton.jsx';

// const NewsDetailPage = () => {
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
//           <LoadingBlurOverlay />
//         </div>
//       </div>
//     );
//   }

//   if (error || !newsItem) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <div className="bg-white p-8 rounded-lg shadow-lg text-center">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">{error || 'News Not Found'}</h2>
//           <button
//             onClick={() => navigate('/news')}
//             className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
//           >
//             Go to Dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4 md:p-8 bg-white rounded-lg shadow-lg mt-8">
//       <button
//         onClick={() => navigate('/news')}
//         className="mb-6 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300"
//       >
//         ← Back
//       </button>
//       <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">{newsItem.headline}</h1>
//       <p className="text-md text-gray-600 mb-2">
//         {new Date(newsItem.created_at).toLocaleDateString()} | {newsItem.content_type || 'News'}
//       </p>
//       <img
//         src={newsItem.image || defaultNewsImage}
//         alt={newsItem.headline ? `${newsItem.headline.slice(0, 100)}...` : 'News article image'}
//         className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
//       />
//       <div className="prose max-w-none text-gray-700 leading-relaxed">
//         <p>{newsItem.article}</p>
//         {newsItem.summary && <p className="mt-4 text-sm text-gray-500">{newsItem.summary}</p>}
//         <div className="mt-4">
//           <h3 className="text-lg font-semibold">Keywords:</h3>
//           <p className="text-sm text-gray-500">{newsItem.keywords?.join(', ') || 'N/A'}</p>
//         </div>
//         <div className="mt-2">
//           <h3 className="text-lg font-semibold">Tags:</h3>
//           <p className="text-sm text-gray-500">{newsItem.tags?.join(', ') || 'N/A'}</p>
//         </div>
//       </div>

//      <ScrollToTopButton/>
//     </div>
//   );
// };

// export default NewsDetailPage;




import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaLink } from 'react-icons/fa';

// Assuming these are the correct paths to your services and components
import { fetchNewsById,fetchNews} from '../../Services/newsAPIs.js';
import defaultNewsImage from '../../assets/img1.png';
import LoadingBlurOverlay from '../../components/LoadingBlurOverlay.jsx';
import ScrollToTopButton from '../../components/ScrollToTopButton.jsx';

const NewsDetailPage = () => {
  const { collection, id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch the main news article
        const mainNewsResponse = await fetchNewsById(collection, id);
        if (mainNewsResponse.success) {
          setNewsItem(mainNewsResponse.data);

          // Fetch related news using the provided fetchNews function
          const relatedNewsResponse = await fetchNews(collection, 1, 5); // Fetch 5 related articles
          if (relatedNewsResponse.success) {
            setRelatedNews(relatedNewsResponse.data.filter(item => item._id !== id));
          } else {
            console.error('Failed to fetch related news:', relatedNewsResponse.message);
          }
        } else {
          setError(mainNewsResponse.message || 'Failed to fetch news item');
        }
      } catch (err) {
        setError('An error occurred while fetching the news.',err);
      }
      setLoading(false);
    };

    fetchNews();
  }, [collection, id]);
  
  // Handles social media sharing
  const handleShare = (platform) => {
    const url = window.location.href;
    const headline = newsItem?.headline || 'Check out this news article!';
    let shareUrl = '';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(headline)}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(headline)}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  // Handles copying the link to the clipboard
  const handleCopyLink = () => {
    const link = window.location.href;
    const textArea = document.createElement("textarea");
    textArea.value = link;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
    document.body.removeChild(textArea);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <LoadingBlurOverlay />
      </div>
    );
  }

  if (error || !newsItem) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{error || 'News Not Found'}</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Generate a placeholder image URL from the headline if no image is available
  const imageUrl = newsItem.image || `https://placehold.co/1200x600/1E293B/E2E8F0?text=${encodeURIComponent(newsItem.headline.split(' ').slice(0, 5).join('+'))}`;
  const formattedDate = new Date(newsItem.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="bg-gray-50 min-h-screen font-inter py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="container mx-auto max-w-7xl flex flex-col lg:flex-row gap-8">
        
        {/* Left Side: Main Article */}
        <div className="flex-1">
          <article className="bg-white rounded-3xl shadow-2xl overflow-hidden p-6 md:p-10 lg:p-12">
            
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-gray-600 hover:text-blue-600 font-semibold mb-6 transition-all duration-300 transform hover:translate-x-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back
            </button>

            {/* Article Header */}
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                {newsItem.headline}
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center text-gray-500 text-sm md:text-base space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{newsItem.reading_time_minutes || '5'} min read</span>
                </div>
              </div>
            </header>

            {/* Image Section */}
            <figure className="mb-10">
              <img
                src={imageUrl}
                alt={newsItem.headline || 'News article image'}
                className="w-full h-auto object-cover rounded-2xl shadow-lg transition-transform duration-300 hover:scale-[1.01]"
                onError={(e) => { e.target.onerror = null; e.target.src = defaultNewsImage; }}
              />
            </figure>

            {/* Article Body Section */}
            <section className="prose prose-lg max-w-none text-gray-700">
              {newsItem.article.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-6 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </section>

            {/* Keywords & Tags */}
            <div className="mt-10 pt-6 border-t border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Related Topics</h3>
              <div className="flex flex-wrap gap-2">
                {[...(newsItem.tags || []), ...(newsItem.keywords || [])].map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full transition-colors duration-200 hover:bg-blue-200 cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Share Section */}
            <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <h3 className="text-xl font-bold text-gray-800">Share this Article</h3>
              <div className="flex space-x-4">
                <button onClick={() => handleShare('twitter')} className="text-gray-500 hover:text-blue-500 transition-colors duration-200 transform hover:scale-110">
                  <FaTwitter className="h-6 w-6" />
                </button>
                <button onClick={() => handleShare('facebook')} className="text-gray-500 hover:text-blue-600 transition-colors duration-200 transform hover:scale-110">
                  <FaFacebookF className="h-6 w-6" />
                </button>
                <button onClick={() => handleShare('linkedin')} className="text-gray-500 hover:text-blue-700 transition-colors duration-200 transform hover:scale-110">
                  <FaLinkedinIn className="h-6 w-6" />
                </button>
                <button onClick={handleCopyLink} className="relative text-gray-500 hover:text-gray-800 transition-colors duration-200 transform hover:scale-110">
                  <FaLink className="h-6 w-6" />
                  {isCopied && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 animate-fade-in-out">
                      Copied!
                    </span>
                  )}
                </button>
              </div>
            </div>
          </article>
        </div>

        {/* Right Side: Related News */}
        <div className="w-full lg:w-96">
          <div className="bg-white rounded-3xl shadow-2xl p-6 lg:p-8 sticky top-8">
            <h3 className="text-2xl font-extrabold text-gray-900 mb-6">Related Articles</h3>
            <div className="space-y-6">
              {relatedNews.length > 0 ? relatedNews.map(item => (
                <div 
                  key={item._id} 
                  className="flex flex-col transition-all duration-300 hover:bg-gray-100 p-4 rounded-xl cursor-pointer"
                  onClick={() => navigate(`/news/${item.collection}/${item._id}`)}
                >
                  <h4 className="text-lg font-bold text-gray-900 mb-1">{item.headline}</h4>
                  <p className="text-sm text-gray-500">{new Date(item.created_at).toLocaleDateString()}</p>
                </div>
              )) : (
                <p className="text-gray-500">No related articles found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <ScrollToTopButton/>
    </div>
  );
};

export default NewsDetailPage;
