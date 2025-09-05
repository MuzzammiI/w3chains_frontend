import React from 'react';

const ChildHeadlineCard = ({ article, onClick }) => {
  return (
    <div
      className="w-full bg-green-500 rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105"
      onClick={() => onClick(article)}
    >
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-40 object-cover rounded-t-2xl"
      />
      <div className="p-4 bg-white text-gray-800">
        <h4 className="text-lg font-semibold mb-1 cursor-pointer hover:underline" onClick={(e) => { e.stopPropagation(); onClick(article); }}>{article.title}</h4>
        <p className="text-sm text-gray-600 mb-2 truncate">{article.description}</p>
        <div className="text-xs text-gray-500 flex items-center justify-between">
          <span>{article.date} • {article.time}</span>
          <span>By {article.author}</span>
          <button className="text-gray-500 cursor-pointer hover:text-blue-600 ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 0a3 3 0 110 2.684 3 3 0 010-2.684zm0 0a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChildHeadlineCard;