import PropTypes from "prop-types";

const categories = [
  'Ethereum', 'Solana', 'Polygon', 'Binance', 'Bitcoin', 'Others'
];

const CategoryList = ({ onCategorySelect }) => {
  return (
    <div className="p-6 bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-4">Blockchain Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => onCategorySelect(category)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};


CategoryList.propTypes = {
  onCategorySelect: PropTypes.func.isRequired,
};

export default CategoryList;