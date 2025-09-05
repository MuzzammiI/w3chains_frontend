  

import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

  function ActivityPage(){
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  // Sample data for Posts Stats Pie Chart
  const postsStatsData = [
    { name: 'Public', value: 32, color: '#4A90E2' },
    { name: 'Private', value: 25, color: '#50E3C2' },
    { name: 'Drafts', value: 18, color: '#F5A623' },
    { name: 'Rejects', value: 25, color: '#D0021B' },
  ];

  // Sample data for Performance Line Chart
  const performanceData = [
    { name: 'Oct 2021', Achieved: 7, Target: 5 },
    { name: 'Nov 2021', Achieved: 4, Target: 6 },
    { name: 'Dec 2021', Achieved: 6, Target: 4 },
    { name: 'Jan 2022', Achieved: 5, Target: 7 },
    { name: 'Feb 2022', Achieved: 8, Target: 6 },
  ];

  // Sample data for recent activities
  const allActivities = [
    { id: 1, title: 'Make an Automatic Payment System that enable the design', date: '05 APRIL 2023', author: 'Yash Ghori', status: 'Reject', category: 'Coin List', tags: ['ETH', 'Sol'], image: 'https://placehold.co/40x40/FF6347/FFFFFF?text=YG' },
    { id: 2, title: 'Make an Automatic Payment System that enable the design', date: '05 APRIL 2023', author: 'Yash Ghori', status: 'Publish', category: 'Coin List', tags: ['Matic', 'Pol'], image: 'https://placehold.co/40x40/32CD32/FFFFFF?text=YG' },
    { id: 3, title: 'Make an Automatic Payment System that enable the design', date: '05 APRIL 2023', author: 'Yash Ghori', status: 'Publish', category: 'Coin List', tags: ['Matic', 'Pol'], image: 'https://placehold.co/40x40/1E90FF/FFFFFF?text=YG' },
    { id: 4, title: 'Make an Automatic Payment System that enable the design', date: '05 APRIL 2023', author: 'Yash Ghori', status: 'Reject', category: 'Coin List', tags: ['Matic', 'Pai'], image: 'https://placehold.co/40x40/FFD700/FFFFFF?text=YG' },
    { id: 5, title: 'Make an Automatic Payment System that enable the design', date: '05 APRIL 2023', author: 'Yash Ghori', status: 'Reject', category: 'Coin List', tags: ['Matic', 'Pal'], image: 'https://placehold.co/40x40/BA55D3/FFFFFF?text=YG' },
    { id: 6, title: 'Another Automatic Payment System design', date: '06 APRIL 2023', author: 'Jane Doe', status: 'Publish', category: 'Web3 News', tags: ['BTC', 'ETH'], image: 'https://placehold.co/40x40/8A2BE2/FFFFFF?text=JD' },
    { id: 7, title: 'New Project Idea for Blockchain', date: '07 APRIL 2023', author: 'John Smith', status: 'Draft', category: 'Blogs', tags: ['Sol', 'ADA'], image: 'https://placehold.co/40x40/00CED1/FFFFFF?text=JS' },
    { id: 8, title: 'Decentralized Finance Report', date: '08 APRIL 2023', author: 'Alice Brown', status: 'Publish', category: 'Market Press', tags: ['DeFi', 'NFT'], image: 'https://placehold.co/40x40/FF4500/FFFFFF?text=AB' },
    { id: 9, title: 'Updates on Smart Contracts', date: '09 APRIL 2023', author: 'Bob White', status: 'Reject', category: 'ICO/IDO', tags: ['Smart', 'Contract'], image: 'https://placehold.co/40x40/228B22/FFFFFF?text=BW' },
    { id: 10, title: 'Exploring Metaverse Opportunities', date: '10 APRIL 2023', author: 'Charlie Green', status: 'Publish', category: 'Trends', tags: ['Meta', 'VR'], image: 'https://placehold.co/40x40/8B0000/FFFFFF?text=CG' },
  ];

  // Filtered activities based on search term
  const filteredActivities = allActivities.filter(activity =>
    activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentActivities = filteredActivities.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
      {/* Header Section */}
      <header className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-0">Posts Analysis</h1>
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search for anything ...."
            className="w-full sm:w-80 p-3 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Posts Stats Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Posts Stats</h2>
            <select className="p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>This Week</option>
              <option>Last Week</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center flex-grow">
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie
                  data={postsStatsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {postsStatsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col ml-0 md:ml-8 mt-4 md:mt-0">
              {postsStatsData.map((entry, index) => (
                <div key={index} className="flex items-center mb-2">
                  <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></span>
                  <span className="text-gray-700 text-sm">{entry.name} ({entry.value}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Performance</h2>
            <select className="p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>This Week</option>
              <option>Last Week</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="flex-grow">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={performanceData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Achieved" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={2} />
                <Line type="monotone" dataKey="Target" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-end mt-4">
            <div className="flex items-center mr-4">
              <span className="inline-block w-3 h-3 rounded-full bg-purple-500 mr-2"></span>
              <span className="text-gray-700 text-sm">Achieved</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 rounded-full bg-green-400 mr-2"></span>
              <span className="text-gray-700 text-sm">Target</span>
            </div>
          </div>
        </div>
      </div>

      {/* Post Action and Recent Activities Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities List */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activities</h2>
          {currentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between border-b border-gray-200 py-4 last:border-b-0">
              <div className="flex items-center">
                <img src={activity.image} alt="User" className="w-10 h-10 rounded-full mr-4 object-cover" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/40x40/CCCCCC/000000?text=User" }} />
                <div>
                  <p className="text-gray-800 font-medium text-sm sm:text-base">{activity.title}</p>
                  <p className="text-gray-500 text-xs sm:text-sm">#{activity.id} {activity.date} by {activity.author}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  activity.status === 'Reject' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                }`}>
                  {activity.status}
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                  {activity.category}
                </span>
                <div className="hidden sm:flex space-x-2">
                  {activity.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="text-gray-400 hover:text-gray-600 focus:outline-none">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                  </svg>
                </button>
                <button className="text-gray-400 hover:text-gray-600 focus:outline-none">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16h.01M12 16h.01M16 16h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-6">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-1 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`px-4 py-2 mx-1 rounded-lg ${
                  currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 mx-1 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>

        {/* Post Action Card */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Post Action</h2>
            <a href="#" className="text-blue-500 text-sm font-medium hover:underline">View all</a>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {/* Post Action Items */}
            {[
              { label: 'Coin List', image: 'https://placehold.co/80x80/E0BBE4/FFFFFF?text=CL' },
              { label: 'Blogs', image: 'https://placehold.co/80x80/957DAD/FFFFFF?text=B' },
              { label: 'Web3 News', image: 'https://placehold.co/80x80/D291BC/FFFFFF?text=WN' },
              { label: 'Market Press', image: 'https://placehold.co/80x80/FFC72C/FFFFFF?text=MP' },
              { label: 'ICO/IDO', image: 'https://placehold.co/80x80/FF6F61/FFFFFF?text=II' },
              { label: 'Trends', image: 'https://placehold.co/80x80/6B5B95/FFFFFF?text=T' },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <img src={item.image} alt={item.label} className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover mb-2" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/80x80/CCCCCC/000000?text=Img" }} />
                <span className="text-gray-700 text-xs sm:text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityPage;