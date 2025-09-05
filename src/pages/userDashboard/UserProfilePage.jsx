// components/UserProfilePage.js
// import React from 'react';
// Corrected imports for Heroicons v2
import {
    EnvelopeIcon as MailIcon, // MailIcon is EnvelopeIcon in v2
    PhoneIcon,
    UserCircleIcon,
    GlobeAltIcon
} from '@heroicons/react/24/solid'; // Assuming you want solid icons here based on original import
// Placeholder for chart component - install and import your chosen library e.g., Recharts
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data for the chart (replace with actual data)
const performanceData = [
  { name: 'Oct 2021', Posts: 4, TotalPosts: 6 },
  { name: 'Nov 2021', Posts: 6, TotalPosts: 7 },
  { name: 'Dec 2021', Posts: 5, TotalPosts: 8 },
  { name: 'Jan 2022', Posts: 7, TotalPosts: 9 },
  { name: 'Feb 2022', Posts: 6, TotalPosts: 7 },
];

const UserProfilePage = () => {
  const workedWith = [
    { id: 1, name: 'User A', avatar: 'https://via.placeholder.com/40' },
    { id: 2, name: 'User B', avatar: 'https://via.placeholder.com/40' },
    { id: 3, name: 'User C', avatar: 'https://via.placeholder.com/40' },
  ];

  const allPosts = [
    { id: 1, title: 'Blogs', image: 'https://via.placeholder.com/150/CBD5E0/4A5568?Text=Blog' },
    { id: 2, title: 'News', image: 'https://via.placeholder.com/150/A0AEC0/2D3748?Text=News' },
    { id: 3, title: 'Coin Listing', image: 'https://via.placeholder.com/150/FEEBC8/975A16?Text=Coin' },
    { id: 4, title: 'ICO/IDO', image: 'https://via.placeholder.com/150/C6F6D5/2F855A?Text=ICO' },
    { id: 5, title: 'Funding', image: 'https://via.placeholder.com/150/EBF4FF/4C51BF?Text=Funding' },
    { id: 6, title: 'Gothic art', image: 'https://via.placeholder.com/150/000000/FFFFFF?Text=Gothic' },
    { id: 7, title: '"happy :3', image: 'https://via.placeholder.com/150/FBD38D/744210?Text=Happy' },
    { id: 8, title: '"vAMPvIR"', image: 'https://via.placeholder.com/150/A0AEC0/718096?Text=Vamp' },
    { id: 9, title: 'I <3 Art', image: 'https://via.placeholder.com/150/FED7E2/9B2C6F?Text=Art' },
  ];

  return (
    <div className="space-y-6">
      {/* Top section with profile info and form */}
      <div className="bg-white p-4 sm:p-6 shadow rounded-lg">
        <div className="text-sm text-gray-500 mb-4">
          Inicio &gt; Profile
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: User Info Card */}
          <div className="lg:col-span-1 bg-gray-50 p-6 rounded-lg shadow-inner">
            <div className="flex flex-col items-center">
              <img
                className="h-32 w-32 rounded-full object-cover mx-auto mb-4"
                src="https://via.placeholder.com/128/E0E7FF/4338CA?text=YG" // Placeholder, replace with actual image URL
                alt="Yash Ghori"
              />
              <h2 className="text-xl font-semibold text-gray-800">Yash Ghori</h2>
              <p className="text-sm text-gray-500">Ahmedabad, Gujarat</p>
              <p className="text-sm text-gray-500 mb-6">India</p>

              <div className="w-full space-y-3 text-sm">
                <div className="flex items-center text-gray-600">
                  <UserCircleIcon className="h-5 w-5 mr-2 text-gray-400" />
                  <span>User Name</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <GlobeAltIcon className="h-5 w-5 mr-2 text-gray-400" />
                  <span>Full Name</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <PhoneIcon className="h-5 w-5 mr-2 text-gray-400" />
                  <span>+91 7048144030</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MailIcon className="h-5 w-5 mr-2 text-gray-400" />
                  <span>example@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Profile Edit Form and Worked With */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Full Name</h3>
              <p className="mt-1 text-sm text-gray-500">This is all about my self</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-md font-medium text-gray-700">Worked with</h4>
                <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                  View all
                </a>
              </div>
              <div className="flex space-x-3">
                {workedWith.map(user => (
                  <img key={user.id} className="h-10 w-10 rounded-full" src={user.avatar} alt={user.name} title={user.name} />
                ))}
              </div>
            </div>

            <form className="space-y-4 bg-gray-50 p-6 rounded-lg shadow-inner">
              {[
                { label: 'User Name', type: 'text', currentVal: 'yash_g' },
                { label: 'Wallet Address', type: 'text', currentVal: '0xAbCd...EfGh' },
                { label: 'Full Name', type: 'text', currentVal: 'Yash Ghori' },
                { label: 'Email', type: 'email', currentVal: 'example@gmail.com' },
                { label: 'Change Password', type: 'password', currentVal: '••••••••' },
              ].map((field) => (
                <div key={field.label} className="flex items-center justify-between">
                  <div>
                    <label htmlFor={field.label.toLowerCase().replace(' ', '')} className="block text-sm font-medium text-gray-700">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.label.toLowerCase().replace(' ', '')}
                      id={field.label.toLowerCase().replace(' ', '')}
                      defaultValue={field.currentVal}
                      className="mt-1 block w-full sm:w-64 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3 bg-white"
                      disabled
                    />
                  </div>
                  <button
                    type="button"
                    className="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Change
                  </button>
                </div>
              ))}
            </form>
          </div>
        </div>
      </div>

      {/* Middle Section: Performance Chart and Total Work */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-4 sm:p-6 shadow rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Performance</h3>
            <select className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm py-1">
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-64 sm:h-72 md:h-80">
            <div className="flex items-center justify-center h-full bg-gray-100 rounded-md text-gray-500">
              {/* Example using Recharts (you would import and use <ResponsiveContainer>, <LineChart> etc.) */}
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{fontSize: 12}} />
                  <YAxis tick={{fontSize: 12}} />
                  <Tooltip />
                  <Legend wrapperStyle={{fontSize: "14px"}} />
                  <Line type="monotone" dataKey="Posts" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="TotalPosts" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
              Performance Chart Goes Here
            </div>
            <div className="flex justify-end space-x-4 mt-2 text-xs">
                <div className="flex items-center">
                    <span className="h-2 w-2 bg-red-500 rounded-full mr-1"></span> Posts
                </div>
                <div className="flex items-center">
                    <span className="h-2 w-2 bg-blue-500 rounded-full mr-1"></span> TotalPosts
                </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 shadow rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Total work done</h3>
            <select className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm py-1">
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="flex flex-col items-center justify-center h-64 sm:h-72 md:h-80">
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  className="text-gray-200"
                  strokeWidth="3.8"
                  fill="none"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-blue-500"
                  strokeWidth="3.8"
                  strokeDasharray="70, 100"
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl sm:text-2xl font-semibold text-gray-700">5w: 2d</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: All Post */}
      <div className="bg-white p-4 sm:p-6 shadow rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">All Post</h3>
          <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
            View all
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {allPosts.slice(0,6).map((post) => (
            <div key={post.id} className="rounded-lg overflow-hidden shadow-sm border border-gray-200">
              <img src={post.image} alt={post.title} className="w-full h-32 object-cover" />
              <div className="p-3">
                <h4 className="text-sm font-medium text-gray-700 truncate">{post.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
