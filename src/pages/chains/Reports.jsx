import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { getReportsChainData, reportChainsData } from "./reportsData.js";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ScrollToTopButton from "../../components/ScrollToTopButton.jsx";
import Modal from "../../components/Modal";

// Report Card Component
const ReportCard = ({ report, setModalContent }) => {
  const categoryColors = {
    'Market Analysis': 'bg-blue-600',
    'Technical Analysis': 'bg-indigo-600',
    'Security Audit': 'bg-red-600',
    'On-Chain Data': 'bg-green-600',
    'Regulatory': 'bg-yellow-600',
  };

  return (
    <div
      className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 cursor-pointer flex flex-col justify-between"
      onClick={() => setModalContent(report)}
    >
      <div>
        <span className={`text-xs font-semibold uppercase px-2 py-1 rounded-full text-white ${categoryColors[report.category] || 'bg-gray-600'}`}>
          {report.category}
        </span>
        <h3 className="text-white text-lg font-bold font-mono mt-2 mb-2 line-clamp-2">
          {report.title}
        </h3>
        <p className="text-gray-400 text-sm mb-3 line-clamp-3">
          {report.summary}
        </p>
      </div>
      <div className="flex justify-between items-center text-sm mt-4">
        <span className="text-gray-500">{report.date}</span>
        <span className="text-gray-400">By {report.author}</span>
      </div>
    </div>
  );
};

ReportCard.propTypes = {
  report: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    fullContent: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  setModalContent: PropTypes.func.isRequired,
};

// Report Category Distribution Chart
const ReportCategoryChart = ({ reports, chainName }) => {
  const data = useMemo(() => {
    const categoryCounts = {};
    reports.forEach(report => {
      categoryCounts[report.category] = (categoryCounts[report.category] || 0) + 1;
    });
    return Object.keys(categoryCounts).map(category => ({
      name: category,
      value: categoryCounts[category],
    }));
  }, [reports]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  return (
    <div className="bg-gray-900 bg-opacity-70 p-4 rounded-lg shadow-xl">
      <h2 className="text-white text-lg font-bold font-mono mb-4 border-b border-gray-700 pb-2">
        Report Categories on {chainName}
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: '#2D3748', border: 'none', borderRadius: '8px' }}
            itemStyle={{ color: '#E2E8F0' }}
          />
          <Legend wrapperStyle={{ color: '#E2E8F0', paddingTop: '10px' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

ReportCategoryChart.propTypes = {
  reports: PropTypes.arrayOf(PropTypes.object).isRequired,
  chainName: PropTypes.string.isRequired,
};

// Main Reports Component
export default function Reports({ chainName = 'Ethereum' }) {
  const [modalContent, setModalContent] = useState(null);
  const [currentChainData, setCurrentChainData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortBy, setSortBy] = useState('dateDesc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const data = getReportsChainData(chainName);
    if (data) {
      setCurrentChainData(data);
      setCurrentPage(1);
      setSearchTerm('');
      setFilterCategory('All');
      setSortBy('dateDesc');
    } else {
      console.error(`No reports data found for chain: ${chainName}`);
      setCurrentChainData(null);
    }
  }, [chainName]);

  const allChains = useMemo(() => reportChainsData.map(chain => chain.name), []);
  const allCategories = useMemo(() => {
    if (!currentChainData) return [];
    return ['All', ...new Set(currentChainData.reports.map(r => r.category))];
  }, [currentChainData]);

  const filteredAndSortedReports = useMemo(() => {
    if (!currentChainData) return [];
    let reports = [...currentChainData.reports];

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      reports = reports.filter(r =>
        r.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        r.summary.toLowerCase().includes(lowerCaseSearchTerm) ||
        r.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearchTerm))
      );
    }

    if (filterCategory !== 'All') {
      reports = reports.filter(r => r.category === filterCategory);
    }

    reports.sort((a, b) => {
      if (sortBy === 'dateDesc') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'dateAsc') return new Date(a.date) - new Date(b.date);
      if (sortBy === 'titleAsc') return a.title.localeCompare(b.title);
      if (sortBy === 'titleDesc') return b.title.localeCompare(a.title);
      return 0;
    });

    return reports;
  }, [currentChainData, searchTerm, filterCategory, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedReports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReports = filteredAndSortedReports.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!currentChainData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white text-2xl">
        Loading or reports data for {chainName} not found...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 font-sans">
      <header className="text-center py-6">
        <h1 className="text-4xl font-bold font-mono mb-2">
          <img src={currentChainData.logo} alt={`${currentChainData.name} Logo`} className="inline-block w-10 h-10 mr-3 rounded-full" />
          {currentChainData.name} Reports
        </h1>
        <p className="text-gray-400 text-lg">In-depth analysis and insights on the {currentChainData.name} ecosystem.</p>
      </header>

      <div className="container mx-auto space-y-8">
        <div className="bg-gray-900 bg-opacity-70 p-4 rounded-lg shadow-xl grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div>
            <label htmlFor="chain-select" className="block text-gray-400 text-sm font-semibold mb-1">Select Chain:</label>
            <select
              id="chain-select"
              value={chainName}
              onChange={(e) => window.location.href = `?chainName=${e.target.value}`}
              className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {allChains.map(chain => (
                <option key={chain} value={chain}>{chain}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input
              type="text"
              placeholder="Search reports..."
              className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>
        </div>

        <div className="bg-gray-900 bg-opacity-70 p-4 rounded-lg shadow-xl grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="filter-category" className="block text-gray-400 text-sm font-semibold mb-1">Filter by Category:</label>
            <select
              id="filter-category"
              value={filterCategory}
              onChange={(e) => { setFilterCategory(e.target.value); setCurrentPage(1); }}
              className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {allCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
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
              <option value="titleAsc">Title (A-Z)</option>
              <option value="titleDesc">Title (Z-A)</option>
            </select>
          </div>
        </div>

        <ReportCategoryChart reports={filteredAndSortedReports} chainName={currentChainData.name} />

        <div className="bg-gray-900 bg-opacity-70 p-4 rounded-lg shadow-xl">
          <h2 className="text-white text-lg font-bold font-mono mb-4 border-b border-gray-700 pb-2">
            All Reports ({filteredAndSortedReports.length} found)
          </h2>
          {currentReports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentReports.map((report) => (
                <ReportCard key={report.id} report={report} setModalContent={setModalContent} />
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">No reports found matching your criteria.</p>
          )}

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

      <Modal isOpen={!!modalContent} onClose={() => setModalContent(null)}>
        {modalContent && (
          <>
            <h2 className="text-3xl font-bold font-mono mb-4">{modalContent.title}</h2>
            <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
              <span>{modalContent.date}</span>
              <span className="font-semibold uppercase text-blue-300">{modalContent.category}</span>
            </div>
            <div className="prose prose-invert max-w-none text-gray-300" dangerouslySetInnerHTML={{ __html: modalContent.fullContent.replace(/\n/g, '<br/>') }} />
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

Reports.propTypes = {
  chainName: PropTypes.string,
};
