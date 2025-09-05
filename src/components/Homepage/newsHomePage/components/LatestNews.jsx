import React from 'react';
import mockData from '../data/mockData.json';

const LatestNews = ({ onNavigate }) => (
  <div className="bg-[#1e1e2d] p-6 rounded-lg h-full">
    <div className="h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
      <div>
        <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-2">Latest</h2>
        <div className="space-y-5">
          {mockData.latest.map(item => (
            <div key={item.id} className="cursor-pointer group" onClick={() => onNavigate(item)}>
              <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors">{item.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{item.date}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-green-500 pl-2">Press Releases</h2>
        <div className="space-y-5">
          {mockData.pressReleases.map(item => (
            <div key={item.id} className="cursor-pointer group" onClick={() => onNavigate(item)}>
              <h3 className="text-white font-semibold group-hover:text-green-400 transition-colors">{item.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{item.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default LatestNews;