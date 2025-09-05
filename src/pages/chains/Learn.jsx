import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { getLearnContent, getLearnCategories, getLearnDifficulties } from "./learnData.js";
import ScrollToTopButton from "../../components/ScrollToTopButton.jsx";
import Modal from "../../components/Modal";

// Learning Module Card
const LearningCard = ({ module, setModalContent }) => {
  const difficultyColors = {
    Beginner: 'bg-green-600',
    Intermediate: 'bg-yellow-600',
    Advanced: 'bg-red-600',
  };

  return (
    <div
      className="bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 ease-in-out flex flex-col"
      onClick={() => setModalContent(module)}
    >
      <img
        src={module.imageUrl}
        alt={module.title}
        className="w-full h-40 object-cover"
        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x200/4A4A4A/FFFFFF?text=Learning"; }}
      />
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <span className="text-xs font-semibold text-blue-400 uppercase">{module.category}</span>
          <h3 className="text-white text-lg font-bold font-mono mt-1 mb-2 line-clamp-2">
            {module.title}
          </h3>
          <p className="text-gray-400 text-sm line-clamp-3">
            {module.description}
          </p>
        </div>
        <div className="flex justify-between items-center mt-4 text-sm">
          <span className={`px-2 py-1 rounded-full text-white ${difficultyColors[module.difficulty]}`}>
            {module.difficulty}
          </span>
          <span className="text-gray-500">{module.readTime}</span>
        </div>
      </div>
    </div>
  );
};

LearningCard.propTypes = {
  module: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    readTime: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  setModalContent: PropTypes.func.isRequired,
};

// Main Learn Component
export default function Learn() {
  const [modalContent, setModalContent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 3 columns * 3 rows

  // Memoized lists of categories and difficulties
  const allCategories = useMemo(() => getLearnCategories(), []);
  const allDifficulties = useMemo(() => getLearnDifficulties(), []);

  // Memoize filtered content to optimize performance
  const filteredModules = useMemo(() => {
    setCurrentPage(1); // Reset page when filters or search term changes
    return getLearnContent(selectedCategory, selectedDifficulty, searchTerm);
  }, [selectedCategory, selectedDifficulty, searchTerm]);

  const totalPages = Math.ceil(filteredModules.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentModules = filteredModules.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 font-sans">
      <header className="text-center py-6">
        <h1 className="text-4xl font-bold font-mono mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 inline-block mr-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253" /></svg>
          Learn Blockchain & Crypto
        </h1>
        <p className="text-gray-400 text-lg">Your ultimate guide to understanding the decentralized world.</p>
      </header>

      <div className="container mx-auto space-y-8">
        {/* Search Bar */}
        <div className="bg-gray-900 bg-opacity-70 p-4 rounded-lg shadow-xl flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input
            type="text"
            placeholder="Search learning modules..."
            className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filters: Categories and Difficulty */}
        <div className="bg-gray-900 bg-opacity-70 p-4 rounded-lg shadow-xl grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Category Filter */}
          <div>
            <label htmlFor="category-filter" className="block text-gray-400 text-sm font-semibold mb-1">Filter by Category:</label>
            <div className="flex flex-wrap gap-2 overflow-x-auto custom-scrollbar-horizontal pb-2">
              {allCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 whitespace-nowrap
                    ${selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`
                  }
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label htmlFor="difficulty-filter" className="block text-gray-400 text-sm font-semibold mb-1">Filter by Difficulty:</label>
            <div className="flex flex-wrap gap-2">
              {allDifficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 whitespace-nowrap
                    ${selectedDifficulty === difficulty ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`
                  }
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Learning Modules Grid */}
        <div className="bg-gray-900 bg-opacity-70 p-4 rounded-lg shadow-xl">
          <h2 className="text-white text-lg font-bold font-mono mb-4 border-b border-gray-700 pb-2">
            Explore Modules ({filteredModules.length} found)
          </h2>
          {currentModules.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentModules.map((module) => (
                <LearningCard key={module.id} module={module} setModalContent={setModalContent} />
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-10">No learning modules found matching your criteria.</p>
          )}

          {/* Pagination */}
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

      {/* Modal for detailed learning content */}
      <Modal isOpen={!!modalContent} onClose={() => setModalContent(null)}>
        {modalContent && (
          <>
            <h2 className="text-3xl font-bold font-mono mb-4">{modalContent.title}</h2>
            <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
              <span className="text-blue-300 font-semibold">{modalContent.category}</span>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-white ${
                  modalContent.difficulty === 'Beginner' ? 'bg-green-600' :
                  modalContent.difficulty === 'Intermediate' ? 'bg-yellow-600' : 'bg-red-600'
                }`}>
                  {modalContent.difficulty}
                </span>
                <span>{modalContent.readTime}</span>
              </div>
            </div>
            <img
              src={modalContent.imageUrl}
              alt={modalContent.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/4A4A4A/FFFFFF?text=Content+Image"; }}
            />
            <div className="prose prose-invert max-w-none text-gray-300"> {/* Apply prose for markdown styling */}
              {/* Render content directly as it's markdown-like text */}
              <div dangerouslySetInnerHTML={{ __html: modalContent.content.replace(/\n/g, '<br/>') }} />
            </div>
            {modalContent.tags && modalContent.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {modalContent.tags.map(tag => (
                  <span key={tag} className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs">#{tag}</span>
                ))}
              </div>
            )}
          </>
        )}
      </Modal>
      <ScrollToTopButton />
    </div>
  );
}
