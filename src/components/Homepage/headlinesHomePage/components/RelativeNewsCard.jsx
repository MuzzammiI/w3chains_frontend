import React from 'react';

const RelativeNewsCard = ({ article, onClick }) => {
  return (
    <div
      className="flex items-center justify-between bg-gray-200 rounded-lg p-3 mb-2 cursor-pointer transform transition-all duration-200 ease-in-out hover:bg-gray-300 hover:shadow-md"
      onClick={() => onClick(article)}
    >
      <div>
        <h4 className="text-sm font-medium text-gray-800 cursor-pointer hover:underline" onClick={(e) => { e.stopPropagation(); onClick(article); }}>{article.title}</h4>
        <p className="text-xs text-gray-500">{article.date} • {article.time}</p>
      </div>
      <button className="text-gray-500 cursor-pointer hover:text-blue-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 0a3 3 0 110 2.684 3 3 0 010-2.684zm0 0a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
      </button>
    </div>
  );
};

export default RelativeNewsCard;