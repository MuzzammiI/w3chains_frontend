import React, { useState, useEffect } from 'react';

const ArticleDetailPage = ({ article, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, [article]);

  if (!article) return null;

  return (
    <div
      className={`fixed inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center p-4 z-50 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-500 ${isVisible ? 'scale-100' : 'scale-95'}">
        <div className="relative">
          <img
            src={article.image || 'https://placehold.co/1200x600/CCCCCC/000000?text=No+Image'}
            alt={article.title}
            className="w-full h-64 md:h-96 object-cover rounded-t-xl"
          />
          <button
            onClick={onClose}
            className="absolute cursor-pointer top-4 right-4 bg-gray-800 text-white rounded-full p-2 shadow-lg hover:bg-gray-700 transition-colors duration-300"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{article.title}</h1>
          <div className="flex flex-wrap items-center text-sm text-gray-600 mb-6 space-x-4">
            {article.author && <span>By <span className="font-semibold">{article.author}</span></span>}
            <span>{article.date}</span>
            <span>{article.time}</span>
          </div>
          <p className="text-base md:text-lg text-gray-800 leading-relaxed whitespace-pre-wrap">
            {article.fullContent || article.description || 'No full content available for this article.'}
          </p>
          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              className="bg-blue-600 cursor-pointer text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 text-lg font-medium"
            >
              Back to Headlines
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;