import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { getPressReleaseChainData, pressReleaseChainsData } from "./pressReleaseData.js";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import ScrollToTopButton from "../../components/ScrollToTopButton.jsx";
import Modal from "../../components/Modal";

// Release Card Component
const ReleaseCard = ({ release, setModalContent }) => {
ReleaseCard.propTypes = {
  release: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    sentiment: PropTypes.string.isRequired,
    impactScore: PropTypes.number.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  setModalContent: PropTypes.func.isRequired,
};
  const sentimentColors = {
    positive: 'text-green-500',
    neutral: 'text-yellow-500',
    negative: 'text-red-500',
  };

  const impactStars = Array.from({ length: 5 }, (_, i) => (
    <svg
      key={i}
      className={`h-4 w-4 ${i < release.impactScore ? 'text-yellow-400' : 'text-gray-600'}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.927 8.73c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
    </svg>
  ));

  return (
    <div
      className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 cursor-pointer flex flex-col justify-between"
      onClick={() => setModalContent({
        title: release.title,
        content: release.content,
        date: release.date,
        type: release.type,
        sentiment: release.sentiment,
        impactScore: release.impactScore,
        tags: release.tags,
      })}
    >
      <div>
        <span className={`text-xs font-semibold uppercase ${release.type === 'Press Release' ? 'text-blue-400' : 'text-purple-400'}`}>
          {release.type}
        </span>
        <h3 className="text-white text-lg font-bold font-mono mt-1 mb-2 line-clamp-2">
          {release.title}
        </h3>
        <p className="text-gray-400 text-sm mb-3 line-clamp-3">
          {release.content}
        </p>
      </div>
      <div className="flex justify-between items-center text-sm mt-4">
        <span className="text-gray-500">{release.date}</span>
        <div className="flex items-center space-x-2">
          <span className={`capitalize ${sentimentColors[release.sentiment]}`}>
            {release.sentiment}
          </span>
          <div className="flex">{impactStars}</div>
        </div>
      </div>
    </div>
  );
};

// Release Volume Chart Component
const ReleaseVolumeChart = ({ releases, chainName }) => {
ReleaseVolumeChart.propTypes = {
  releases: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  chainName: PropTypes.string.isRequired,
};
  const data = useMemo(() => {
    const monthlyCounts = {};
    releases.forEach(release => {
      const monthYear = release.date.substring(0, 7); // YYYY-MM
      monthlyCounts[monthYear] = (monthlyCounts[monthYear] || 0) + 1;
    });

    return Object.keys(monthlyCounts)
      .sort()
      .map(monthYear => ({
        name: monthYear,
        releases: monthlyCounts[monthYear],
      }));
  }, [releases]);

  return (
    <div className="bg-gray-900 bg-opacity-70 p-4 rounded-lg shadow-xl">
      <h2 className="text-white text-lg font-bold font-mono mb-4 border-b border-gray-700 pb-2">
        Monthly Release Volume for {chainName}
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
          <XAxis dataKey="name" stroke="#CBD5E0" />
          <YAxis stroke="#CBD5E0" allowDecimals={false} label={{ value: 'Number of Releases', angle: -90, position: 'insideLeft', fill: '#CBD5E0' }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#2D3748', border: 'none', borderRadius: '8px' }}
            itemStyle={{ color: '#E2E8F0' }}
            labelStyle={{ color: '#A0AEC0' }}
            formatter={(value) => [`${value} Releases`, 'Count']}
          />
          <Line type="monotone" dataKey="releases" stroke="#82ca9d" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};


// Main PressMarketRelease Component
export default function PressMarketRelease({ chainName = 'Ethereum' }) {
  const [modalContent, setModalContent] = useState(null);
  const [currentChainData, setCurrentChainData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All'); // 'All', 'Press Release', 'Market Release'
  const [filterSentiment, setFilterSentiment] = useState('All'); // 'All', 'positive', 'neutral', 'negative'
  const [filterMinImpact, setFilterMinImpact] = useState(0); // 0-5
  const [sortBy, setSortBy] = useState('dateDesc'); // 'dateDesc', 'dateAsc', 'impactDesc', 'impactAsc'
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 3 columns * 3 rows

  useEffect(() => {
    const data = getPressReleaseChainData(chainName);
    if (data) {
      setCurrentChainData(data);
      setCurrentPage(1); // Reset page when chain changes
      setSearchTerm(''); // Reset search
      setFilterType('All'); // Reset filters
      setFilterSentiment('All');
      setFilterMinImpact(0);
      setSortBy('dateDesc');
      setStartDate('');
      setEndDate('');
    } else {
      console.error(`No press/market release data found for chain: ${chainName}`);
      setCurrentChainData(null);
    }
  }, [chainName]);

  const allChains = useMemo(() => pressReleaseChainsData.map(chain => chain.name), []);

  const filteredAndSortedReleases = useMemo(() => {
    if (!currentChainData) return [];

    let releases = [...currentChainData.releases];

    // Apply search term filter
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      releases = releases.filter(release =>
        release.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        release.content.toLowerCase().includes(lowerCaseSearchTerm) ||
        release.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearchTerm))
      );
    }

    // Apply type filter
    if (filterType !== 'All') {
      releases = releases.filter(release => release.type === filterType);
    }

    // Apply sentiment filter
    if (filterSentiment !== 'All') {
      releases = releases.filter(release => release.sentiment === filterSentiment);
    }

    // Apply minimum impact filter
    if (filterMinImpact > 0) {
      releases = releases.filter(release => release.impactScore >= filterMinImpact);
    }

    // Apply date range filter
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      releases = releases.filter(release => {
        const releaseDate = new Date(release.date);
        return releaseDate >= start && releaseDate <= end;
      });
    } else if (startDate) {
      const start = new Date(startDate);
      releases = releases.filter(release => new Date(release.date) >= start);
    } else if (endDate) {
      const end = new Date(endDate);
      releases = releases.filter(release => new Date(release.date) <= end);
    }

    // Apply sorting
    releases.sort((a, b) => {
      if (sortBy === 'dateDesc') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === 'dateAsc') {
        return new Date(a.date) - new Date(b.date);
      } else if (sortBy === 'impactDesc') {
        return b.impactScore - a.impactScore;
      } else if (sortBy === 'impactAsc') {
        return a.impactScore - b.impactScore;
      }
      return 0;
    });

    return releases;
  }, [currentChainData, searchTerm, filterType, filterSentiment, filterMinImpact, sortBy, startDate, endDate]);

  const totalPages = Math.ceil(filteredAndSortedReleases.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReleases = filteredAndSortedReleases.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!currentChainData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white text-2xl">
        Loading or press/market release data for {chainName} not found...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 font-sans">
      {/* <style>{globalStyles}</style> Apply global styles */}
      <header className="text-center py-6">
        <h1 className="text-4xl font-bold font-mono mb-2">
          <img src={currentChainData.logo} alt={`${currentChainData.name} Logo`} className="inline-block w-10 h-10 mr-3 rounded-full" />
          {currentChainData.name} Press & Market Releases
        </h1>
        <p className="text-gray-400 text-lg">Stay informed with the latest announcements and market insights.</p>
      </header>

      <div className="container mx-auto space-y-8">
        {/* Top Controls: Chain Selector, Search, Date Filter */}
        <div className="bg-gray-900 bg-opacity-70 p-4 rounded-lg shadow-xl grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Chain Selector */}
          <div>
            <label htmlFor="chain-select" className="block text-gray-400 text-sm font-semibold mb-1">Select Chain:</label>
            <select
              id="chain-select"
              value={chainName}
              onChange={(e) => window.location.href = `?chainName=${e.target.value}`} // Simple reload for demo
              className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {allChains.map(chain => (
                <option key={chain} value={chain}>{chain}</option>
              ))}
            </select>
          </div>

          {/* Search Bar */}
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input
              type="text"
              placeholder="Search releases..."
              className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Date Range Filter */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <div>
              <label htmlFor="start-date" className="block text-gray-400 text-sm font-semibold mb-1">From:</label>
              <input
                type="date"
                id="start-date"
                className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={startDate}
                onChange={(e) => { setStartDate(e.target.value); setCurrentPage(1); }}
              />
            </div>
            <div>
              <label htmlFor="end-date" className="block text-gray-400 text-sm font-semibold mb-1">To:</label>
              <input
                type="date"
                id="end-date"
                className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={endDate}
                onChange={(e) => { setEndDate(e.target.value); setCurrentPage(1); }}
              />
            </div>
          </div>
        </div>

        {/* Filters and Sorting */}
        <div className="bg-gray-900 bg-opacity-70 p-4 rounded-lg shadow-xl grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Type Filter */}
          <div>
            <label htmlFor="filter-type" className="block text-gray-400 text-sm font-semibold mb-1">Filter by Type:</label>
            <select
              id="filter-type"
              value={filterType}
              onChange={(e) => { setFilterType(e.target.value); setCurrentPage(1); }}
              className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Types</option>
              <option value="Press Release">Press Release</option>
              <option value="Market Release">Market Release</option>
            </select>
          </div>

          {/* Sentiment Filter */}
          <div>
            <label htmlFor="filter-sentiment" className="block text-gray-400 text-sm font-semibold mb-1">Filter by Sentiment:</label>
            <select
              id="filter-sentiment"
              value={filterSentiment}
              onChange={(e) => { setFilterSentiment(e.target.value); setCurrentPage(1); }}
              className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Sentiments</option>
              <option value="positive">Positive</option>
              <option value="neutral">Neutral</option>
              <option value="negative">Negative</option>
            </select>
          </div>

          {/* Min Impact Filter */}
          <div>
            <label htmlFor="filter-impact" className="block text-gray-400 text-sm font-semibold mb-1">Min. Impact Score:</label>
            <input
              type="range"
              id="filter-impact"
              min="0"
              max="5"
              step="1"
              value={filterMinImpact}
              onChange={(e) => { setFilterMinImpact(parseInt(e.target.value)); setCurrentPage(1); }}
              className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer range-lg"
            />
            <span className="block text-center text-gray-300 text-sm mt-1">{filterMinImpact} / 5</span>
          </div>

          {/* Sort By */}
          <div>
            <label htmlFor="sort-by" className="block text-gray-400 text-sm font-semibold mb-1">Sort By:</label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
              className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="dateDesc">Date (Newest First)</option>
              <option value="dateAsc">Date (Oldest First)</option>
              <option value="impactDesc">Impact (High to Low)</option>
              <option value="impactAsc">Impact (Low to High)</option>
            </select>
          </div>
        </div>

        {/* Release Volume Chart */}
        <ReleaseVolumeChart releases={filteredAndSortedReleases} chainName={currentChainData.name} />

        {/* Releases Grid */}
        <div className="bg-gray-900 bg-opacity-70 p-4 rounded-lg shadow-xl">
          <h2 className="text-white text-lg font-bold font-mono mb-4 border-b border-gray-700 pb-2">
            All Releases ({filteredAndSortedReleases.length} found)
          </h2>
          {currentReleases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentReleases.map((release) => (
                <ReleaseCard key={release.id} release={release} setModalContent={setModalContent} />
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">No releases found matching your criteria.</p>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-6">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === i + 1 ? 'bg-blue-800 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  } transition-colors duration-300`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal for detailed release content */}
      <Modal isOpen={!!modalContent} onClose={() => setModalContent(null)}>
        {modalContent && (
          <>
            <h2 className="text-3xl font-bold font-mono mb-4">{modalContent.title}</h2>
            <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
              <span>{modalContent.date}</span>
              <span className={`font-semibold uppercase ${modalContent.type === 'Press Release' ? 'text-blue-300' : 'text-purple-300'}`}>
                {modalContent.type}
              </span>
            </div>
            <p className="text-sm leading-relaxed whitespace-pre-wrap mb-4">{modalContent.content}</p>
            <div className="flex items-center space-x-4 text-sm mb-4">
              <span className={`capitalize ${{
                positive: 'text-green-500',
                neutral: 'text-yellow-500',
                negative: 'text-red-500',
              }[modalContent.sentiment]}`}>
                Sentiment: {modalContent.sentiment}
              </span>
              <div className="flex items-center">
                Impact:
                {Array.from({ length: 5 }, (_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ml-1 ${i < modalContent.impactScore ? 'text-yellow-400' : 'text-gray-600'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1.0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.927 8.73c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            {modalContent.tags && modalContent.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {modalContent.tags.map(tag => (
                  <span key={tag} className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs">#{tag}</span>
                ))}
              </div>
            )}
            <div className="flex justify-end space-x-3 mt-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 text-sm font-semibold">
                Share on Twitter
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300 text-sm font-semibold">
                Share on LinkedIn
              </button>
            </div>
          </>
        )}
      </Modal>
      <ScrollToTopButton />
    </div>
  );
}
PressMarketRelease.propTypes = {
  chainName: PropTypes.string,
};
// Example usage of PressMarketRelease component (for demonstration purposes)
/*
// In your main App.js or index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import PressMarketRelease from './PressMarketRelease'; // Assuming PressMarketRelease.js is in the same directory

const root = ReactDOM.createRoot(document.getElementById('root'));

// To display Ethereum Press & Market Releases:
root.render(<PressMarketRelease chainName="Ethereum" />);

// To display Binance Press & Market Releases:
// root.render(<PressMarketRelease chainName="Binance" />);

// To display Solana Press & Market Releases:
// root.render(<PressMarketRelease chainName="Solana" />);
*/
