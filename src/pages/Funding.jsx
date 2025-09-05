import { useState, useEffect } from "react";
import { Banknote, TrendingUp, Users, Globe, DollarSign, ChevronLeft, ChevronRight, Filter, X } from "lucide-react";
import ScrollToTopButton from "../components/ScrollToTopButton";
const categoryColors = {};

const getCategoryColor = (category) => {
  if (!categoryColors[category]) {
    const colors = [
      "text-red-400",
      "text-blue-400",
      "text-green-400",
      "text-yellow-400",
      "text-purple-400",
      "text-pink-400",
      "text-orange-400",
      "text-teal-400",
    ];
    categoryColors[category] = colors[Object.keys(categoryColors).length % colors.length];
  }
  return categoryColors[category];
};

const Funding = () => {
  const [fundings, setFundings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchFundingData();
  }, []);

  const fetchFundingData = async () => {
    try {
      const response = await fetch("https://api.llama.fi/raises");
      const data = await response.json();
      setFundings(data.raises || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching funding data:", error);
      setLoading(false);
    }
  };

  const filteredFundings = fundings.filter(
    (funding) =>
      funding.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "All" || funding.category?.includes(selectedCategory))
  );

  const totalPages = Math.ceil(filteredFundings.length / itemsPerPage);
  const paginatedFundings = filteredFundings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getCategoryIcon = (category) => {
    switch (category) {
      case "DeFi":
        return <Banknote className="w-5 h-5" />;
      case "NFT":
        return <TrendingUp className="w-5 h-5" />;
      case "Gaming":
        return <Users className="w-5 h-5" />;
      case "Web3":
        return <Globe className="w-5 h-5" />;
      case "Blockchain":
        return <DollarSign className="w-5 h-5" />;
      default:
        return <DollarSign className="w-5 h-5" />;
    }
  };

  return (
    <>

    <div className="bg-gradient-to-r font-mono from-gray-900 to-black min-h-screen text-white py-12 px-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">Web3 Funding Rounds 💰</h1>

        {/* Search & Filter */}
        <div className="flex items-center justify-between mb-6">
          <input
            type="text"
            placeholder="Search Funding Rounds..."
            className="w-1/3 p-2 rounded bg-gray-800 text-white border border-gray-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Filter Button */}
          <button
            onClick={() => setShowFilterPopup(true)}
            className="bg-gray-800 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-700"
          >
            <Filter className="w-5 h-5" /> Filter
          </button>
        </div>

        {/* Filter Popup */}
        {showFilterPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-900 p-6 rounded-lg w-[400px] shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-yellow-400">Filter by Category</h2>
                <button onClick={() => setShowFilterPopup(false)} className="text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {["All", ...new Set(fundings.map((f) => f.category || "Web3"))].map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowFilterPopup(false);
                    }}
                    className={`w-full p-3 rounded-lg font-semibold transition ${
                      selectedCategory === category ? "bg-yellow-400 text-gray-900" : "bg-gray-800 hover:bg-gray-700"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Funding List */}
        <div className="overflow-y-auto max-h-[500px]">
          {loading ? (
            <p className="text-center text-gray-400">Loading funding data...</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-800 text-yellow-400">
                  <th className="p-3">Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Funding Raised</th>
                  <th className="p-3">Details</th>
                </tr>
              </thead>
              <tbody>
                {paginatedFundings.length > 0 ? (
                  paginatedFundings.map((funding, index) => (
                    <tr key={funding.id || index} className="border-b border-gray-700 hover:bg-gray-800 transition">
                      <td className="p-3 flex items-center gap-2">
                        {getCategoryIcon(funding.category || "Web3")}
                        <span className={`font-semibold ${getCategoryColor(funding.category || "Web3")}`}>
                          {funding.name}
                        </span>
                      </td>
                      <td className={`p-3 ${getCategoryColor(funding.category || "Web3")}`}>
                        {funding.category || "Web3"}
                      </td>
                      <td className="p-3">${funding.raised ? funding.raised.toLocaleString() : "N/A"}</td>
                      <td className="p-3">
                        <a
                          href={funding.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-yellow-400 hover:underline"
                        >
                          Read More →
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-gray-500 p-3">
                      No funding rounds found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50"
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="text-gray-400">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
    <ScrollToTopButton />
    
    </>
  );
};

export default Funding;
