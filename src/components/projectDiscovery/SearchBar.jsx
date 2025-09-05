import { useState } from 'react';
import PropTypes from 'prop-types';
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="p-6 bg-gray-800">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for projects..."
          className="flex-grow p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Search
        </button>
      </form>
    </div>
  );
};


SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;