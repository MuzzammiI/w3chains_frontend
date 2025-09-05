import React from 'react';
import DotIndicators from './DotIndicators';

const MainHeadlineCard = ({ article, onClick, onPrev, onNext, totalHeadlines, currentHeadlineIndex, onDotClick }) => {
  return (
    <div className="relative w-full h-80 md:h-96 bg-yellow-400 rounded-2xl shadow-lg overflow-hidden group">
      <div className="absolute inset-0 z-10 cursor-pointer" onClick={() => onClick(article)}></div>
      <img
        src={article.image}
        alt={article.title}
        className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent p-6 flex flex-col justify-end text-white z-20">
        <h3
          onClick={(e) => { e.stopPropagation(); onClick(article); }}
          className="text-2xl md:text-3xl font-bold mb-2 leading-tight cursor-pointer hover:underline"
        >
          {article.title}
        </h3>
        <p className="text-base md:text-lg mb-4 opacity-90">{article.description}</p>
        <div className="flex items-center text-sm opacity-80">
          <span>{article.date}</span>
          <span className="mx-2">•</span>
          <span>{article.time}</span>
        </div>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-8 transform -translate-y-1/2 bg-gray-800 bg-opacity-70 text-white p-2 rounded-full shadow-lg transition-opacity duration-300 z-30 hover:bg-gray-700"
        aria-label="Previous Headline"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-8 transform -translate-y-1/2 bg-gray-800 bg-opacity-70 text-white p-2 rounded-full shadow-lg transition-opacity duration-300 z-30 hover:bg-gray-700"
        aria-label="Next Headline"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      <DotIndicators count={totalHeadlines} activeIndex={currentHeadlineIndex} onDotClick={onDotClick} />
    </div>
  );
};

export default MainHeadlineCard;