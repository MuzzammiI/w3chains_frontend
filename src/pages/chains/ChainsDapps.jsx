import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getDappsChainData } from "./dappsData.js";
import ButtonCard from "../../components/ButtonCard.jsx";
import ScrollToTopButton from "../../components/ScrollToTopButton.jsx";
import Modal from "../../components/Modal";

// DApp Grid Card (for the main explore section)
const DappGridCard = ({ dapp, setModalContent }) => (
  <div
    className="bg-purple-mix p-4 rounded-lg shadow-md flex flex-col items-center text-center hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 cursor-pointer"
    onClick={() =>
      setModalContent({
        title: dapp.name,
        content: `Category: ${dapp.category}\nUsers: ${
          dapp.users || "N/A"
        }\n\n${dapp.description}`,
        imageUrl: dapp.imageUrl,
        socialLinks: { website: dapp.link },
      })
    }
  >
    <img
      src={dapp.imageUrl}
      alt={dapp.name}
      className="w-16 h-16 rounded-lg object-cover mb-3 border border-purple-600"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "https://placehold.co/60x60/4A4A4A/FFFFFF?text=DApp";
      }}
    />
    <h3 className="text-white text-md font-bold font-mono mb-1 truncate w-full">
      {dapp.name}
    </h3>
    <p className="text-gray-300 text-sm mb-3 line-clamp-2">
      {dapp.description}
    </p>
    <button
      className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300 text-sm font-semibold"
      onClick={(e) => {
        e.stopPropagation();
        window.open(dapp.link, "_blank");
      }}
    >
      Open dApp
    </button>
  </div>
);

DappGridCard.propTypes = {
  dapp: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    users: PropTypes.string,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
  setModalContent: PropTypes.func.isRequired,
};

// Suggest DApp Modal Component
const SuggestDappModal = ({ isOpen, onClose, onSubmit }) => {
  const [dappName, setDappName] = useState("");
  const [dappDescription, setDappDescription] = useState("");
  const [dappLink, setDappLink] = useState("");
  const [dappCategory, setDappCategory] = useState("");
  const [dappImageUrl, setDappImageUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name: dappName,
      description: dappDescription,
      link: dappLink,
      category: dappCategory,
      imageUrl: dappImageUrl,
    });
    // Reset form
    setDappName("");
    setDappDescription("");
    setDappLink("");
    setDappCategory("");
    setDappImageUrl("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold font-mono mb-6 text-white">
        Suggest a New dApp
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="dappName"
            className="block text-gray-300 text-sm font-semibold mb-1"
          >
            dApp Name
          </label>
          <input
            type="text"
            id="dappName"
            className="w-full p-2 rounded-md bg-purple-700 text-white border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={dappName}
            onChange={(e) => setDappName(e.target.value)}
            required
          />
        </div>
        <div>
          <label
            htmlFor="dappDescription"
            className="block text-gray-300 text-sm font-semibold mb-1"
          >
            Description
          </label>
          <textarea
            id="dappDescription"
            rows="3"
            className="w-full p-2 rounded-md bg-purple-700 text-white border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={dappDescription}
            onChange={(e) => setDappDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="dappLink"
            className="block text-gray-300 text-sm font-semibold mb-1"
          >
            Website Link
          </label>
          <input
            type="url"
            id="dappLink"
            className="w-full p-2 rounded-md bg-purple-700 text-white border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={dappLink}
            onChange={(e) => setDappLink(e.target.value)}
            required
          />
        </div>
        <div>
          <label
            htmlFor="dappCategory"
            className="block text-gray-300 text-sm font-semibold mb-1"
          >
            Category
          </label>
          <input
            type="text"
            id="dappCategory"
            className="w-full p-2 rounded-md bg-purple-700 text-white border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={dappCategory}
            onChange={(e) => setDappCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label
            htmlFor="dappImageUrl"
            className="block text-gray-300 text-sm font-semibold mb-1"
          >
            Image URL (Logo)
          </label>
          <input
            type="url"
            id="dappImageUrl"
            className="w-full p-2 rounded-md bg-purple-700 text-white border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={dappImageUrl}
            onChange={(e) => setDappImageUrl(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300 font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300 font-semibold"
          >
            Submit dApp
          </button>
        </div>
      </form>
    </Modal>
  );
};

SuggestDappModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

// Main ChainsDapps Component
export default function ChainsDapps({ chainName = "Ethereum" }) {
  const [modalContent, setModalContent] = useState(null);
  const [currentChainData, setCurrentChainData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term
  const [currentPage, setCurrentPage] = useState(1); // State for current pagination page
  const itemsPerPage = 15; // Number of items per page as per figure
  const [isSuggestDappModalOpen, setIsSuggestDappModalOpen] = useState(false); // State for suggest dApp modal


  useEffect(() => {
    const data = getDappsChainData(chainName);
    if (data) {
      setCurrentChainData(data);
      setCurrentPage(1); // Reset page when chain changes
    } else {
      console.error(`No dApps data found for chain: ${chainName}`);
      setCurrentChainData(null);
}

ChainsDapps.propTypes = {
  chainName: PropTypes.string,
};
  }, [chainName]);

  const handleSuggestDappSubmit = (dappData) => {
    console.log("Suggested dApp:", dappData);
    // In a real application, you would send this data to a backend or a database
    // For now, we'll just log it and close the modal.
    alert(
      `Thank you for suggesting ${dappData.name}! Your suggestion has been received.`
    );
  };

  if (!currentChainData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white text-2xl">
        Loading or dApps data for {chainName} not found...
      </div>
    );
  }

  const allCategories = ["All", ...currentChainData.categories];

  // Filter dApps based on selected category and search term
  const getFilteredDapps = () => {
    let dapps = currentChainData.allDapps;

    // Apply category filter
    if (selectedCategory !== "All") {
      dapps = dapps.filter((dapp) => dapp.category === selectedCategory);
    }

    // Apply search filter
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      dapps = dapps.filter(
        (dapp) =>
          dapp.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          dapp.description.toLowerCase().includes(lowerCaseSearchTerm) ||
          dapp.category.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    return dapps;
  };

  const filteredDapps = getFilteredDapps();
  const totalPages = Math.ceil(filteredDapps.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDapps = filteredDapps.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-green-mix text-white p-4 font-sans">
      <header className="text-center py-6">
        <h1 className="text-4xl font-bold font-mono mb-2">
          <img
            src={currentChainData.logo}
            alt={`${currentChainData.name} Logo`}
            className="inline-block w-10 h-10 mr-3 rounded-full"
          />
          {currentChainData.name} DApps Explorer
        </h1>
        <p className="text-gray-300 text-lg">
          Discover decentralized applications on {currentChainData.name}
        </p>
      </header>

      <div className="container mx-auto space-y-8">
        {/* Top Header Section (Search Bar & Suggest dApp) */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-purple-mix bg-opacity-70 p-4 rounded-lg shadow-xl">
          {/* Search Bar */}
          <div className="flex items-center w-full sm:w-auto mb-4 sm:mb-0 sm:flex-grow mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-300 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search dApps..."
              className="w-full p-2 rounded-md bg-purple-700 text-white border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
            />
          </div>
          {/* Suggest dApp Button */}
          <button
            className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300 flex items-center text-sm font-semibold"
            onClick={() => setIsSuggestDappModalOpen(true)}
          >
            Suggest dApp
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
        </div>

        {/* Explore dApps Section */}
        <div className="bg-purple-mix bg-opacity-70 p-4 rounded-lg shadow-xl">
          {/* Category Filter */}
          <div className="mb-6 overflow-x-auto custom-scrollbar-horizontal pb-2">
            <div className="flex space-x-3 whitespace-nowrap">
              {allCategories.map((category) => (
                <ButtonCard
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentPage(1); // Reset to first page on category change
                  }}
                  background={`px-4 py-2 cursor-pointer rounded-full text-sm font-semibold transition-colors duration-200
                    ${
                      selectedCategory === category
                        ? "bg-purple-600 text-white"
                        : "bg-purple-900 text-gray-300 hover:bg-purple-600"
                    }`}
                  size="small"
                  animationType="glow"
                >
                  {category}
                </ButtonCard>
              ))}
            </div>
          </div>

          {/* DApp Grid */}
          {currentDapps.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentDapps.map((dapp) => (
                <DappGridCard
                  key={dapp.id}
                  dapp={dapp}
                  setModalContent={setModalContent}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-300 text-center py-8">
              No dApps found for {searchTerm} in {selectedCategory}
              category.
            </p>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-6">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === i + 1
                      ? "bg-purple-800 text-white"
                      : "bg-purple-700 text-gray-300 hover:bg-purple-600"
                  } transition-colors duration-300`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
              >
                Next
              </button>
            </div>
          )}
          <p className="text-gray-500 text-sm text-center mt-4">
            Items: {filteredDapps.length}
          </p>
        </div>
      </div>

      {/* Modal for pop-up content */}
      <Modal isOpen={!!modalContent} onClose={() => setModalContent(null)}>
        {modalContent && (
          <>
            <h2 className="text-3xl font-bold font-mono mb-4">
              {modalContent.title}
            </h2>
            {modalContent.imageUrl && (
              <img
                src={modalContent.imageUrl}
                alt={modalContent.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/600x400/4A4A4A/FFFFFF?text=Image+Not+Found";
                }}
              />
            )}
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {modalContent.content}
            </p>
            {modalContent.socialLinks && modalContent.socialLinks.website && (
              <a
                href={modalContent.socialLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300"
              >
                Visit dApp
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            )}
          </>
        )}
      </Modal>

      {/* Suggest DApp Modal */}
      <SuggestDappModal
        isOpen={isSuggestDappModalOpen}
        onClose={() => setIsSuggestDappModalOpen(false)}
        onSubmit={handleSuggestDappSubmit}
      />
      <ScrollToTopButton />
    </div>
  );
}
