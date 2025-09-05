// import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import mockData from '../data/mockData.json';

const RecommendedNews = ({ onNavigate }) => (
  <div className="bg-[#1e1e2d] p-6 rounded-lg h-full flex flex-col space-y-4">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold text-white">Recommended</h2>
      <a href="#" className="text-sm text-blue-400 hover:underline">View all </a>
    </div>
    <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide">
      {mockData.recommended.slice(0, 1).map(item => (
        <Card key={item.id} article={item} onNavigate={onNavigate} className="flex-shrink-0 w-full md:w-[280px] overflow-hidden">
          <div className="relative h-40">
            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-2 left-4">
              <p className="text-xs text-blue-300">{item.category}</p>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-white">{item.title}</h3>
          </div>
        </Card>
      ))}
    </div>
    <div className="flex-grow overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
      {mockData.recommended.slice(1).map(item => (
        <div key={item.id} className="flex items-start space-x-4 cursor-pointer group" onClick={() => onNavigate(item)}>
          <img src={item.imageUrl} alt={item.title} className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
          <div>
            <p className="text-xs text-blue-400">{item.category} - {item.time}</p>
            <h4 className="text-sm font-semibold text-white mt-1 group-hover:text-blue-300 transition-colors">{item.title}</h4>
          </div>
        </div>
      ))}
    </div>
    <div className="bg-gray-800 p-4 rounded-lg mt-4">
      <h3 className="font-bold text-white">The Breakdown</h3>
      <p className="text-sm text-gray-300 mt-1">Deep dives and market analysis.</p>
    </div>
  </div>
);
RecommendedNews.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};

export default RecommendedNews;