import React, { useState, useEffect } from 'react';
import MainHeadlineCard from './MainHeadlineCard';
import ChildHeadlineCard from './ChildHeadlineCard';
import RelativeNewsCard from './RelativeNewsCard';
import ArticleDetailPage from './ArticleDetailPage';
import articlesData from '../data/articlesData.json';
// import ButtonCard from '../../../ButtonCard';
// import {useNavigate } from 'react-router-dom';

const TodayHeadlines = () => {
  const [mainHeadlines, setMainHeadlines] = useState([]);
  const [childHeadlines, setChildHeadlines] = useState([]);
  const [relativeNews, setRelativeNews] = useState([]);
  const [currentMainHeadlineIndex, setCurrentMainHeadlineIndex] = useState(0);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [autoAdvanceInterval, setAutoAdvanceInterval] = useState(null);
  // const navigate = useNavigate();

  useEffect(() => {
    const main = articlesData.filter(article => article.type === 'main');
    const children = articlesData.filter(article => article.type === 'child');
    const relative = articlesData.filter(article => article.type === 'relative');

    setMainHeadlines(main);
    setChildHeadlines(children);
    setRelativeNews(relative);

    startAutoAdvance(main.length);

    return () => {
      if (autoAdvanceInterval) {
        clearInterval(autoAdvanceInterval);
      }
    };
  }, []);

  const startAutoAdvance = (numHeadlines) => {
    if (autoAdvanceInterval) {
      clearInterval(autoAdvanceInterval);
    }
    const interval = setInterval(() => {
      setCurrentMainHeadlineIndex(prevIndex => (prevIndex + 1) % numHeadlines);
    }, 5000);
    setAutoAdvanceInterval(interval);
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  const handleCloseDetail = () => {
    setSelectedArticle(null);
    startAutoAdvance(mainHeadlines.length);
  };

  const handlePrevHeadline = () => {
    if (autoAdvanceInterval) {
      clearInterval(autoAdvanceInterval);
      setAutoAdvanceInterval(null);
    }
    setCurrentMainHeadlineIndex(prevIndex => (prevIndex - 1 + mainHeadlines.length) % mainHeadlines.length);
  };

  const handleNextHeadline = () => {
    if (autoAdvanceInterval) {
      clearInterval(autoAdvanceInterval);
      setAutoAdvanceInterval(null);
    }
    setCurrentMainHeadlineIndex(prevIndex => (prevIndex + 1) % mainHeadlines.length);
  };

  const handleDotClick = (index) => {
    if (autoAdvanceInterval) {
      clearInterval(autoAdvanceInterval);
      setAutoAdvanceInterval(null);
    }
    setCurrentMainHeadlineIndex(index);
  };
  // const handleSeeMore=()=>{
  //   console.log("this is temporarily unavailable");
  //   navigate("/notfound");
  // }

  return (
    <div className="min-h-screen rounded-2xl bg-gradient-to-r from-gray-950 to-purple-900/90 shadow-lg  text-gray-100 font-sans p-4 md:p-8 relative">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">Today's Headlines</h1>
            <p className="text-lg md:text-xl text-gray-300">Catch up on the latest news from around the globe.</p>
          </div>
          {/* <ButtonCard

                        
                        onClick={handleSeeMore}
                        // className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 
                        //   ${activeTopic === topic
                        //     ? 'bg-blue-600 text-white shadow-lg'
                        //     : 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white'
                        //   }`}
                        size='small'
                        animationType="glow"
                        styles='border border-gray-700'
                        iconPosition='right'
                        icon={null}
                        >
                          See More
            </ButtonCard> */}
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2">
            {mainHeadlines.length > 0 && (
              <div className="mb-8">
                <MainHeadlineCard
                  article={mainHeadlines[currentMainHeadlineIndex]}
                  onClick={handleArticleClick}
                  onPrev={handlePrevHeadline}
                  onNext={handleNextHeadline}
                  totalHeadlines={mainHeadlines.length}
                  currentHeadlineIndex={currentMainHeadlineIndex}
                  onDotClick={handleDotClick}
                />
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {childHeadlines.map(article => (
                <ChildHeadlineCard
                  key={article.id}
                  article={article}
                  onClick={handleArticleClick}
                />
              ))}
            </div>
          </section>
          <aside className="lg:col-span-1">
            <h2 className="text-xl md:text-2xl font-bold mb-6">Relative News</h2>
            <div className="space-y-3">
              {relativeNews.map(article => (
                <RelativeNewsCard
                  key={article.id}
                  article={article}
                  onClick={handleArticleClick}
                />
              ))}
            </div>
          </aside>
        </div>
      </div>
      <ArticleDetailPage article={selectedArticle} onClose={handleCloseDetail} />
    </div>
  );
};

export default TodayHeadlines;