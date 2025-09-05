import React, { useState, useEffect } from 'react';
import NewsHome from './NewsHome';
import ArticleDetail from './ArticleDetail';
import mockData from '../data/mockData.json';

const allArticles = [
  ...mockData.blockchain,
  ...mockData.latest,
  ...mockData.pressReleases,
  ...mockData.recommended,
].map(a => ({...a, slug: a.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') }));

function NewsHomePage() {
  const [currentRoute, setCurrentRoute] = useState({ page: 'home', slug: null });

  useEffect(() => {
    const handlePopState = (event) => {
      const path = window.location.pathname;
      if (path.startsWith('/article/')) {
        const slug = path.split('/article/')[1];
        setCurrentRoute({ page: 'detail', slug });
      } else {
        setCurrentRoute({ page: 'home', slug: null });
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (article) => {
    const slug = article.slug || article.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    const url = `/article/${slug}`;
    window.history.pushState({ slug }, article.title, url);
    setCurrentRoute({ page: 'detail', slug });
  };

  const handleBack = () => {
    window.history.pushState({}, 'Home', '/');
    setCurrentRoute({ page: 'home', slug: null });
  };

  if (currentRoute.page === 'home') {
    return <NewsHome onNavigate={handleNavigate} />;
  } else {
    const article = allArticles.find(a => a.slug === currentRoute.slug);
    return <ArticleDetail article={article} onBack={handleBack} />;
  }
}

export default NewsHomePage;