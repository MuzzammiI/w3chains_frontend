import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';
import mockData from '../data/mockData.json';

const BlockchainNews = ({ onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = mockData.blockchain;
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1)),
      5000
    );
    return () => {
      resetTimeout();
    };
  }, [currentIndex, slides.length]);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const currentArticle = slides[currentIndex];
  const otherArticles = slides.filter((_, index) => index !== currentIndex).slice(0, 2);

  return (
    <div className="w-full space-y-6">
      <div className="relative">
        <Card article={currentArticle} onNavigate={onNavigate} className="overflow-hidden shadow-lg">
          <div className="relative h-64 md:h-80 w-full">
            <img src={currentArticle.imageUrl} alt={currentArticle.title} className="w-full h-full object-cover transition-transform duration-500 ease-in-out" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          </div>
          <div className="p-6">
            <p className="text-sm font-semibold text-blue-400 uppercase">{currentArticle.category}</p>
            <h2 className="text-2xl font-bold text-white mt-2">{currentArticle.title}</h2>
            <p className="text-gray-400 text-sm mt-2">{currentArticle.date}</p>
          </div>
        </Card>
      </div>
      <div className="flex justify-center items-center space-x-6">
        <button onClick={prevSlide} className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/70 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="flex items-center justify-center space-x-2">
          {slides.map((_, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`cursor-pointer h-2 rounded-full bg-gray-600 transition-all duration-500 ease-out ${currentIndex === slideIndex ? 'w-8 bg-blue-500' : 'w-2 hover:bg-gray-400'}`}
            ></div>
          ))}
        </div>
        <button onClick={nextSlide} className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/70 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {otherArticles.map(article => (
          <Card key={article.id} article={article} onNavigate={onNavigate} className="overflow-hidden flex flex-col">
            <div className="h-40 w-full">
              <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover"/>
            </div>
            <div className="p-4 flex-grow flex flex-col">
              <p className="text-xs font-semibold text-blue-400 uppercase">{article.category}</p>
              <h3 className="text-md font-bold text-white mt-1 flex-grow">{article.title}</h3>
              <p className="text-gray-400 text-xs mt-2">{article.date} by {article.admin}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlockchainNews;