import React, { useEffect } from 'react';

const ArticleDetail = ({ article, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!article) {
    return (
      <div className="bg-[#12121c] min-h-screen text-white flex flex-col items-center justify-center p-8">
        <h1 className="text-2xl font-bold mb-4">Article not found.</h1>
        <button onClick={onBack} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#12121c] min-h-screen text-white font-sans p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="mb-8 flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
          Back to News
        </button>
        <div className="bg-[#1e1e2d] p-6 sm:p-8 rounded-lg">
          <p className="text-sm font-semibold text-blue-400 uppercase">{article.category || 'News'}</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4">{article.title}</h1>
          <p className="text-gray-400 mb-6">{article.date || article.time}</p>
          {article.imageUrl && (
            <img src={article.imageUrl} alt={article.title} className="w-full h-auto max-h-[450px] object-cover rounded-lg mb-8" />
          )}
          <div className="prose prose-invert prose-lg max-w-none text-gray-300">
            <p>{article.content || "This is placeholder content for the article. In a real application, the full story would be displayed here, providing readers with all the details about the event or topic."}</p>
            <p>Further paragraphs would continue the story, offering deeper insights, quotes, and analysis to give a comprehensive overview.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;