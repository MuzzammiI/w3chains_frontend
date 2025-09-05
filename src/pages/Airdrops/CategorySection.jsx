import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { FaFire, FaGift, FaRocket, FaHourglassEnd, FaCheckCircle, FaSearch } from 'react-icons/fa';

const categoryData = [
  {
    name: 'Hot Airdrops',
    icon: <FaFire className="text-orange-500" />,
  },
  {
    name: 'Free Airdrops',
    icon: <FaGift className="text-blue-500" />,
  },
  {
    name: 'New Airdrops',
    icon: <FaRocket className="text-pink-500" />,
  },
  {
    name: 'Ending Soon',
    icon: <FaHourglassEnd className="text-yellow-500" />,
  },
  {
    name: 'Completed Airdrops',
    icon: <FaCheckCircle className="text-green-500" />,
  },
];

const CategorySection = ({ onSearch }) => {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Simulate data fetch with a delay
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setCategories(categoryData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Update the search query and pass it to the parent component
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // Pass the search query to the parent
  };

  return (
    <div className="py-4 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search airdrops..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Category</h2>
          {loading ? (
            // Loading Skeleton
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 animate-pulse">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-gray-800 rounded-lg px-4 py-2 w-full sm:w-auto"
                >
                  <div className="w-6 h-6 bg-gray-700 rounded-full blur-sm"></div>
                  <div className="w-24 h-4 bg-gray-700 rounded blur-sm"></div>
                </div>
              ))}
            </div>
          ) : (
            // Actual Data
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 rounded-lg px-4 py-2 transition w-full sm:w-auto"
                >
                  <span className="text-xl">{category.icon}</span>
                  <span className="text-sm sm:text-base">{category.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Define PropTypes for the component
CategorySection.propTypes = {
  onSearch: PropTypes.func.isRequired, // onSearch is a required function
};

export default CategorySection;