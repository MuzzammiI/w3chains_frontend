import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ScrollToTopButton from "../../components/ScrollToTopButton";

// Helper function to generate random project data
const generateRandomProjects = (count) => {
  const projects = [];
  const projectNames = [
    "Decentralized Oracle Network",
    "Cross-Chain DeFi Aggregator",
    "NFT Art Gallery Platform",
    "Web3 Social Gaming DAO",
    "Scalable Layer 2 Solution",
    "Sustainable Blockchain Initiative",
    "AI-Driven Predictive Analytics",
    "Secure Digital Identity Protocol",
    "Global Remittance Network",
    "Fractionalized Real Estate NFTs",
    "Community-Driven Metaverse",
    "Privacy-Preserving DEX",
    "Yield Farming Optimizer",
    "Decentralized Cloud Storage",
    "Tokenized Carbon Credits",
  ];
  const statuses = ["Funding", "Completed", "Upcoming", "In Progress"];
  const categories = [
    "DeFi",
    "NFT",
    "Web3",
    "Infrastructure",
    "Gaming",
    "SocialFi",
    "Analytics",
    "Payments",
  ];

  for (let i = 0; i < count; i++) {
    const name = projectNames[Math.floor(Math.random() * projectNames.length)];
    const goal = Math.floor(Math.random() * (1000000 - 100000 + 1)) + 100000; // $100k - $1M
    const raised = Math.floor(Math.random() * goal * 1.2); // Can be slightly over goal
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const startDate = new Date(
      Date.now() - Math.floor(Math.random() * 180) * 24 * 60 * 60 * 1000
    ).toLocaleDateString();
    const endDate = new Date(
      new Date(startDate).getTime() +
        Math.floor(Math.random() * 90 + 30) * 24 * 60 * 60 * 1000
    ).toLocaleDateString();

    projects.push({
      id: `project-${Date.now()}-${i}`,
      name: `${name} #${i + 1}`,
      goal: goal,
      raised: raised,
      status: raised >= goal ? "Completed" : status, // Ensure status aligns with raised amount
      category: category,
      startDate: startDate,
      endDate: endDate,
      progress: Math.min(100, Math.round((raised / goal) * 100)),
    });
  }
  return projects;
};

// Helper function to generate random chart data (e.g., monthly funding)
const generateChartData = (numMonths = 6) => {
  const chartData = [];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentMonthIndex = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  for (let i = 0; i < numMonths; i++) {
    const month = (currentMonthIndex - (numMonths - 1 - i) + 12) % 12; // Go back in time for months
    const year = currentYear - (month > currentMonthIndex ? 1 : 0); // Adjust year if going into previous year
    chartData.push({
      name: `${monthNames[month]} ${year % 100}`,
      totalFundsRaised:
        Math.floor(Math.random() * (5000000 - 500000 + 1)) + 500000, // $500k - $5M
      newProjects: Math.floor(Math.random() * (10 - 2 + 1)) + 2, // 2-10 new projects
    });
  }
  return chartData;
};

// Helper function to generate random Web3 project data
const generateRandomWeb3Projects = (count) => {
  const web3Projects = [];
  const web3ProjectNames = [
    "Quantum Ledger Protocol",
    "Ethos Decentralized Identity",
    "Veridian Supply Chain",
    "Aura Gaming Guild",
    "Flux Data Marketplace",
    "Chronos Timechain",
    "Gnosis Prediction Market",
    "Helios Energy Exchange",
    "Mirage NFT Studio",
    "Nebula DAO Governance",
    "Solstice DeFi Hub",
    "Terraform Carbon Exchange",
  ];
  const chains = [
    "Ethereum",
    "Polygon",
    "Solana",
    "Binance Smart Chain",
    "Avalanche",
    "Polkadot",
  ];
  const investors = [
    "Andreessen Horowitz (a16z)",
    "Paradigm",
    "Pantera Capital",
    "Coinbase Ventures",
    "Polychain Capital",
    "Jump Crypto",
    "Multicoin Capital",
  ];

  for (let i = 0; i < count; i++) {
    const name =
      web3ProjectNames[Math.floor(Math.random() * web3ProjectNames.length)];
    const chain = chains[Math.floor(Math.random() * chains.length)];
    const fundsRaised =
      Math.floor(Math.random() * (20000000 - 500000 + 1)) + 500000; // $500k - $20M
    const numInvestors = Math.floor(Math.random() * 3) + 1; // 1 to 3 investors
    const selectedInvestors = Array.from(
      { length: numInvestors },
      () => investors[Math.floor(Math.random() * investors.length)]
    );

    web3Projects.push({
      id: `web3-project-${Date.now()}-${i}`,
      name: name,
      chain: chain,
      fundsRaised: fundsRaised,
      investors: [...new Set(selectedInvestors)], // Ensure unique investors
      socialLinks: {
        twitter: `https://twitter.com/${name.replace(/\s/g, "").toLowerCase()}`,
        telegram: `https://t.me/${name.replace(/\s/g, "").toLowerCase()}`,
        website: `https://${name.replace(/\s/g, "").toLowerCase()}.xyz`,
      },
      imageUrl: `https://placehold.co/400x250/000000/FFFFFF?text=${name.replace(
        /\s/g,
        "+"
      )}`,
    });
  }
  return web3Projects;
};

const ProjectsFundingDashboard = () => {
  const [allProjects, setAllProjects] = useState([]); // Store all generated projects for the table
  const [projects, setProjects] = useState([]); // Projects currently displayed/filtered in the table
  const [chartData, setChartData] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const [currentPage, setCurrentPage] = useState(0); // Current page for the table
  const PROJECTS_PER_PAGE = 8; // Number of projects per table page

  const [allWeb3Projects, setAllWeb3Projects] = useState([]); // Store all generated Web3 projects
  const [visibleWeb3ProjectsCount, setVisibleWeb3ProjectsCount] = useState(4); // Initially show 4 Web3 projects

  useEffect(() => {
    const generatedProjects = generateRandomProjects(30); // Generate more projects for filtering and pagination
    setAllProjects(generatedProjects);
    setProjects(generatedProjects); // Initially display all projects
    setChartData(generateChartData(6)); // Generate 6 months of chart data
    setAllWeb3Projects(generateRandomWeb3Projects(12)); // Generate 12 Web3 projects
  }, []);

  useEffect(() => {
    // Apply filters whenever filterCategory or filterStatus changes
    let filtered = allProjects;
    if (filterCategory !== "All") {
      filtered = filtered.filter((p) => p.category === filterCategory);
    }
    if (filterStatus !== "All") {
      filtered = filtered.filter((p) => p.status === filterStatus);
    }
    setProjects(filtered);
    setCurrentPage(0); // Reset to first page on filter change
  }, [filterCategory, filterStatus, allProjects]);

  // Calculate overall metrics from the 'projects' (filtered) array
  const totalProjects = projects.length;
  const totalFundsRaised = projects.reduce((sum, p) => sum + p.raised, 0);
  const totalFundingGoal = projects.reduce((sum, p) => sum + p.goal, 0);
  const completedProjects = projects.filter(
    (p) => p.status === "Completed"
  ).length;

  // Pagination logic for the table
  const totalTablePages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
  const startIndex = currentPage * PROJECTS_PER_PAGE;
  const endIndex = startIndex + PROJECTS_PER_PAGE;
  const paginatedProjects = projects.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalTablePages - 1)); // Loop backward
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalTablePages - 1 ? prev + 1 : 0)); // Loop forward
  };

  const handleRowClick = (id) => {
    // Simulate URL routing for project details
    window.location.href = `/project-details/${id}`;
  };

  const handleWeb3CardClick = (id) => {
    // Simulate URL routing for web3 project details
    window.location.href = `/web3-project-details/${id}`;
  };

  const handleSeeMoreWeb3Projects = () => {
    setVisibleWeb3ProjectsCount((prevCount) => prevCount + 4); // Load 4 more Web3 projects
  };

  // Get unique categories and statuses for filters
  const uniqueCategories = [
    "All",
    ...new Set(allProjects.map((p) => p.category)),
  ];
  const uniqueStatuses = ["All", ...new Set(allProjects.map((p) => p.status))];

  return (
    <>

    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white font-inter p-4 overflow-hidden">
      <style>
        {`
          /* Custom keyframes for animations */
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes popIn {
            0% {
              transform: scale(0.5);
              opacity: 0;
            }
            80% {
              transform: scale(1.05);
              opacity: 1;
            }
            100% {
              transform: scale(1);
            }
          }

          .animate-fadeInUp {
            animation: fadeInUp 1s ease-out forwards;
          }

          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out forwards;
          }

          .animate-popIn {
            animation: popIn 0.6s ease-out forwards;
          }
        `}
      </style>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-extrabold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 animate-fadeInUp">
          Projects Funding Dashboard
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div
            className="bg-gradient-to-br from-purple-700 to-pink-600 rounded-xl p-6 shadow-lg animate-popIn"
            style={{ animationDelay: "0.1s" }}
          >
            <h3 className="text-sm uppercase font-semibold text-white mb-2">
              Total Projects
            </h3>
            <p className="text-4xl font-bold">{totalProjects}</p>
          </div>
          <div
            className="bg-gradient-to-br from-green-500 to-blue-500 rounded-xl p-6 shadow-lg animate-popIn"
            style={{ animationDelay: "0.2s" }}
          >
            <h3 className="text-sm uppercase font-semibold text-white mb-2">
              Funds Raised
            </h3>
            <p className="text-4xl font-bold">
              ${totalFundsRaised.toLocaleString()}
            </p>
          </div>
          <div
            className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl p-6 shadow-lg animate-popIn"
            style={{ animationDelay: "0.3s" }}
          >
            <h3 className="text-sm uppercase font-semibold text-white mb-2">
              Funding Goal
            </h3>
            <p className="text-4xl font-bold">
              ${totalFundingGoal.toLocaleString()}
            </p>
          </div>
          <div
            className="bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl p-6 shadow-lg animate-popIn"
            style={{ animationDelay: "0.4s" }}
          >
            <h3 className="text-sm uppercase font-semibold text-white mb-2">
              Completed Projects
            </h3>
            <p className="text-4xl font-bold">{completedProjects}</p>
          </div>
        </div>

        {/* Projects Table */}
        <div className="bg-gray-800 rounded-xl shadow-xl p-6 mb-12 animate-fadeInUp">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-500 mb-4 sm:mb-0">
              Recent Projects Overview
            </h2>
            {/* Filter controls */}
            <div className="flex flex-wrap gap-3">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="All">All Categories</option>
                {uniqueCategories.map(
                  (cat) =>
                    cat !== "All" && (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    )
                )}
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="All">All Statuses</option>
                {uniqueStatuses.map(
                  (status) =>
                    status !== "All" && (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    )
                )}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Project Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Goal
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Raised
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Progress
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {paginatedProjects.length > 0 ? (
                  paginatedProjects.map((project, index) => (
                    <tr
                      key={project.id}
                      className="hover:bg-gray-700 transition-colors duration-200 animate-fadeIn cursor-pointer"
                      style={{ animationDelay: `${index * 0.05}s` }}
                      onClick={() => handleRowClick(project.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">
                          {project.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">
                          {project.category}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">
                          ${project.goal.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white font-medium">
                          ${project.raised.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <div className="w-24 bg-gray-600 rounded-full h-2.5">
                          <div
                            className="bg-blue-400 h-2.5 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className="ml-2">{project.progress}%</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${
                            project.status === "Completed"
                              ? "bg-green-500 text-white"
                              : project.status === "Funding"
                              ? "bg-purple-500 text-white"
                              : project.status === "Upcoming"
                              ? "bg-yellow-500 text-white"
                              : "bg-gray-500 text-white"
                          }`}
                        >
                          {project.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-center text-gray-400"
                    >
                      No projects found matching the filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination buttons for table */}
          {projects.length > PROJECTS_PER_PAGE && (
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={handlePrevPage}
                className="p-2 bg-gray-700 rounded-full text-white hover:bg-gray-600 transition-colors duration-200"
                aria-label="Previous page"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <span className="text-gray-300 text-sm flex items-center">
                Page {currentPage + 1} of {totalTablePages}
              </span>
              <button
                onClick={handleNextPage}
                className="p-2 bg-gray-700 rounded-full text-white hover:bg-gray-600 transition-colors duration-200"
                aria-label="Next page"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Funding Trend Chart */}
        <div
          className="bg-gray-800 rounded-xl shadow-xl p-6 mb-12 animate-fadeInUp"
          style={{ animationDelay: "0.6s" }}
        >
          <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-red-500">
            Monthly Funding Trends
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
              <XAxis dataKey="name" stroke="#CBD5E0" />
              <YAxis stroke="#CBD5E0" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#2D3748",
                  border: "none",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#E2E8F0" }}
                itemStyle={{ color: "#A0AEC0" }}
                formatter={(value, name) => [
                  `$${value.toLocaleString()}`,
                  name === "totalFundsRaised" ? "Funds Raised" : "New Projects",
                ]}
              />
              <Legend wrapperStyle={{ color: "#E2E8F0", paddingTop: "10px" }} />
              <Line
                type="monotone"
                dataKey="totalFundsRaised"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                name="Total Funds Raised"
              />
              <Line
                type="monotone"
                dataKey="newProjects"
                stroke="#82ca9d"
                name="New Projects Launched"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Web3 Project Cards Section */}
        <h2 className="text-3xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 animate-fadeInUp">
          Featured Web3 Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {allWeb3Projects
            .slice(0, visibleWeb3ProjectsCount)
            .map((project, index) => (
              <div
                key={project.id}
                className="bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer
                         transform transition-all duration-300 hover:scale-105 hover:shadow-2xl
                         animate-popIn"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleWeb3CardClick(project.id)}
              >
                <img
                  src={project.imageUrl}
                  alt={project.name}
                  className="w-full h-40 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/400x250/374151/D1D5DB?text=Web3+Project`;
                  }}
                />
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 leading-tight">
                    {project.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">
                    Chain:{" "}
                    <span className="font-semibold text-white">
                      {project.chain}
                    </span>
                  </p>
                  <p className="text-gray-400 text-sm mb-2">
                    Funds Raised:{" "}
                    <span className="font-semibold text-green-400">
                      ${project.fundsRaised.toLocaleString()}
                    </span>
                  </p>
                  <div className="text-gray-400 text-xs mt-3">
                    <span className="font-semibold">Investors:</span>
                    <ul className="list-disc list-inside ml-2">
                      {project.investors.map((investor, i) => (
                        <li key={i}>{investor}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {visibleWeb3ProjectsCount < allWeb3Projects.length && (
          <div className="text-center mt-8">
            <button
              onClick={handleSeeMoreWeb3Projects}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-8 py-3 rounded-full
                         shadow-lg transform transition-all duration-300 hover:scale-105 hover:from-purple-600 hover:to-pink-600
                         focus:outline-none focus:ring-4 focus:ring-purple-300"
            >
              See More Web3 Projects
            </button>
          </div>
        )}
      </div>
    </div>
    
    <ScrollToTopButton/>
    </>
  );
};

export default ProjectsFundingDashboard;
