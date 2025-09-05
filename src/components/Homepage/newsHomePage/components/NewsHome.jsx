import React from 'react';
import LatestNews from './LatestNews';
import BlockchainNews from './BlockchainNews';
import RecommendedNews from './RecommendedNews';

const NewsHome = ({ onNavigate }) => {
  return (
    <div className="bg-[#12121c] min-h-screen text-white font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-screen-2xl mx-auto">
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-3 h-auto lg:h-[85vh]">
            <LatestNews onNavigate={onNavigate} />
          </aside>
          <section className="lg:col-span-6">
            <BlockchainNews onNavigate={onNavigate} />
          </section>
          <aside className="lg:col-span-3 h-auto lg:h-[85vh]">
            <RecommendedNews onNavigate={onNavigate} />
          </aside>
        </main>
      </div>
    </div>
  );
};

export default NewsHome;