import { useState } from 'react';
import CategoryList from './CategoryList';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import ScrollToTopButton from '../ScrollToTopButton';


// Mock data
const mockSearchResults = {
  trendsNews: ['News 1: Ethereum ETF Approved', 'News 2: Solana Upgrade'],
  trendsProjects: ['Project A', 'Project B'],
  trendsBlogs: ['Blog 1: DeFi Trends', 'Blog 2: NFT Boom'],
  upcomingTokens: ['Token X: Q1 2026', 'Token Y: Q2 2026'],
  releasedTokens: ['Token Z: Released Q4 2025'],
  fundingDetails: ['Project A: $10M Series A', 'Project B: $5M Seed'],
  projectHealth: {
    score: 85,
    metrics: ['Community: Strong', 'Development: Active', 'Liquidity: High']
  },
  relatedProjects: ['Project C', 'Project D', 'Project E']
};

const ProjectDiscovery = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchResults, setSearchResults] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSearchResults(null); // Reset search results when category changes
  };

  const handleSearch = (query) => {
    // Simulate search results based on query
    setSearchResults(mockSearchResults);
  };

  return (
    <>

    <div className="min-h-screen bg-gray-900">
      <header className="bg-blue-800 p-4 text-white text-center">
        <h1 className="text-3xl font-bold">Project Discovery Dashboard</h1>
      </header>
      <CategoryList onCategorySelect={handleCategorySelect} />
      <SearchBar onSearch={handleSearch} />
      {selectedCategory && (
        <div className="p-6 text-white">
          <h2 className="text-xl font-semibold">Selected Category: {selectedCategory}</h2>
        </div>
      )}
      {searchResults && <SearchResults results={searchResults} />}
    </div>
    <ScrollToTopButton />

    </>
  );
};

export default ProjectDiscovery;