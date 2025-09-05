// // import React from 'react';
// import {
//   FaFacebookF,
//   FaSearch,
//   FaTwitter,
//   FaInstagram,
//   FaLinkedinIn,
//   FaEnvelope,
//   FaPhone,
//   FaFire,
//   FaGift,
//   FaProjectDiagram,
//   FaNewspaper,
//   FaMoneyBillWave,
//   FaInfoCircle,
//   FaBitcoin,
//   FaChartLine,
//   FaChartBar,
//   FaCoins,
//   FaClock,
//   FaTemperatureHigh,
//   FaHandHolding,
//   FaStar,
//   FaCheckCircle,
//   FaHourglassEnd,
// } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import logo from '../assets/w3chains.png'

// const Footer = () => {
//   return (
//     <footer className="bg-gradient-to-tr  border-t-1 border-gray-500 from-blue-900 via-gray-900 to-purple-900 font-mono text-white py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Main Footer Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
//           {/* Branding/Logo Section */}
//           <div className="flex flex-col gap-4">
//             <img src={logo} alt="w3chains logo" />
//             {/* <h3 className="text-2xl sm:text-3xl font-bold">W3Chains</h3> */}
//             <p className="text-gray-400 text-sm sm:text-base">
//               Your go-to platform for the latest in Web3, blockchain, and future technologies.
//             </p>
//           </div>

//           {/* Site Map Section 1: Main Links */}
//           <div className="flex flex-col gap-4">
//             <h4 className="text-lg sm:text-xl font-semibold">Explore</h4>
//             <ul className="flex flex-col gap-2 text-gray-400 text-sm sm:text-base">
//               <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
//                 <FaFire className="w-5 h-5 text-purple-900" />
//                 <Link to="/trending" className="hover:text-white transition">
//                   Trending
//                 </Link>
//               </li>
//               <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
//                 <FaGift className="w-5 h-5 text-purple-900" />
//                 <Link to="/news_airdrops" className="hover:text-white transition">
//                   Airdrops
//                 </Link>
//               </li>
//               <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
//                 <FaProjectDiagram className="w-5 h-5 text-purple-900" />
//                 <Link to="/projects" className="hover:text-white transition">
//                   Projects
//                 </Link>
//               </li>
//               <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
//                 <FaNewspaper className="w-5 h-5 text-purple-900" />
//                 <Link to="/news" className="hover:text-white transition">
//                   News
//                 </Link>
//               </li>
//               <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
//                 <FaMoneyBillWave className="w-5 h-5 text-purple-900" />
//                 <Link to="/funding" className="hover:text-white transition">
//                   Funding
//                 </Link>
//               </li>
//               <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
//                 <FaInfoCircle className="w-5 h-5 text-purple-900" />
//                 <Link to="/about" className="hover:text-white transition">
//                   About Us
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Site Map Section 2: Additional Links */}
//           <div className="flex flex-col gap-4">
//             <h4 className="text-lg sm:text-xl font-semibold">Resources</h4>
//             <ul className="flex flex-col gap-2 text-gray-400 text-sm sm:text-base">
//               <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
//                 <FaProjectDiagram className="w-5 h-5 text-purple-900" />
//                 <Link to="/" className="hover:text-white transition">
//                   Web3 Projects
//                 </Link>
//               </li>
//               <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
//                 <FaBitcoin className="w-5 h-5 text-purple-900" />
//                 <Link to="/" className="hover:text-white transition">
//                   NFT Marketplace
//                 </Link>
//               </li>
//               <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
//                 <FaCoins className="w-5 h-5 text-purple-900" />
//                 <a href="#" className="hover:text-white transition">
//                   Token & Coin Listing
//                 </a>
//               </li>
//               <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
//                 <FaNewspaper className="w-5 h-5 text-purple-900" />
//                 <a href="#" className="hover:text-white transition">
//                   Web3 & Blockchain News
//                 </a>
//               </li>
//               <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
//                 <FaMoneyBillWave className="w-5 h-5 text-purple-900" />
//                 <a href="#" className="hover:text-white transition">
//                   Funding Announcements
//                 </a>
//               </li>
//               <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
//                 <FaSearch className="w-5 h-5 text-purple-900" />
//                 <a href="#" className="hover:text-white transition">
//                   Project Discovery
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Currency Tracker Section with Sub-Links */}
//           <div className="flex flex-col gap-4">
//             <h4 className="text-lg sm:text-xl font-semibold">Currency Tracker</h4>
//             <ul className="flex flex-col gap-2 text-gray-400 text-sm sm:text-base">
//               <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
//                 <FaChartLine className="w-5 h-5 text-purple-900" />
//                 <a href="#" className="hover:text-white transition">
//                   Trending Coins
//                 </a>
//               </li>
//               <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
//                 <FaChartBar className="w-5 h-5 text-purple-900" />
//                 <a href="#" className="hover:text-white transition">
//                   Top Losers
//                 </a>
//               </li>
//               <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
//                 <FaChartLine className="w-5 h-5 text-purple-900" />
//                 <a href="#" className="hover:text-white transition">
//                   Top Gainers
//                 </a>
//               </li>
//               <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
//                 <FaCoins className="w-5 h-5 text-purple-900" />
//                 <a href="#" className="hover:text-white transition">
//                   Stable Coins
//                 </a>
//               </li>
//               <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
//                 <FaClock className="w-5 h-5 text-purple-900" />
//                 <a href="#" className="hover:text-white transition">
//                   Upcoming Tokens
//                 </a>
//               </li>
//               <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
//                 <FaChartLine className="w-5 h-5 text-purple-900" />
//                 <a href="#" className="hover:text-white transition">
//                   Real-time Coins Prices
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Airdrops Section with Sub-Links + Contact Info */}
//           <div className="flex flex-col gap-4">
//             <h4 className="text-lg sm:text-xl font-semibold">Airdrops</h4>
//             <ul className="flex flex-col gap-2 text-gray-400 text-sm sm:text-base">
//               <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
//                 <FaTemperatureHigh className="w-5 h-5 text-purple-900" />
//                 <a href="#" className="hover:text-white transition">
//                   Hot Airdrops
//                 </a>
//               </li>
//               <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
//                 <FaHandHolding className="w-5 h-5 text-purple-900" />
//                 <a href="#" className="hover:text-white transition">
//                   Free Airdrops
//                 </a>
//               </li>
//               <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
//                 <FaStar className="w-5 h-5 text-purple-900" />
//                 <a href="#" className="hover:text-white transition">
//                   New Airdrops
//                 </a>
//               </li>
//               <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
//                 <FaCheckCircle className="w-5 h-5 text-purple-900" />
//                 <a href="#" className="hover:text-white transition">
//                   Completed Airdrops
//                 </a>
//               </li>
//               <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
//                 <FaHourglassEnd className="w-5 h-5 text-purple-900" />
//                 <a href="#" className="hover:text-white transition">
//                   End Soon
//                 </a>
//               </li>
//             </ul>

//             {/* Contact Info */}
//             <h4 className="text-lg sm:text-xl font-semibold mt-6">Contact Us</h4>
//             <ul className="flex flex-col gap-2 text-gray-400 text-sm sm:text-base">
//               <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
//                 <FaEnvelope className="w-5 h-5 text-purple-900" />
//                 <a href="mailto:mdmozammil112002@gmail.com" className="hover:text-white transition">
//                   web3community@gmail.com
//                 </a>
//               </li>
//               <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
//                 <FaPhone className="w-5 h-5 text-purple-900" />
//                 <a href="tel:+1234567890" className="hover:text-white transition">
//                   +1 (234) 567-890
//                 </a>
//               </li>
//             </ul>
//             {/* Social Media Icons */}
//             <div className="flex gap-4 mt-4">
//               <a
//                 href="https://facebook.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-gray-400 hover:text-white transition"
//               >
//                 <FaFacebookF className="w-6 h-6" />
//               </a>
//               <a
//                 href="https://twitter.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-gray-400 hover:text-white transition"
//               >
//                 <FaTwitter className="w-6 h-6" />
//               </a>
//               <a
//                 href="https://instagram.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-gray-400 hover:text-white transition"
//               >
//                 <FaInstagram className="w-6 h-6" />
//               </a>
//               <a
//                 href="https://linkedin.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-gray-400 hover:text-white transition"
//               >
//                 <FaLinkedinIn className="w-6 h-6" />
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Copyright Section */}
//         <div className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-400 text-sm sm:text-base">
//           <p>© {new Date().getFullYear()} Web3 Insights. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;











// import React from 'react';
import { Link } from 'react-router-dom';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Flame,
  Gift,
  GitFork,
  Newspaper,
  Wallet,
  Info,
  Bitcoin,
  LineChart,
  BarChart,
  Coins,
  Clock,
  ThermometerSun,
  HandCoins,
  Star,
  CheckCircle,
  Hourglass,
  Search,
} from 'lucide-react';
import logo from '../assets/w3chains.png'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-tr border-t-1 border-gray-500 from-blue-900 via-gray-900 to-purple-900 font-mono text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Branding/Logo Section */}
          <div className="flex flex-col gap-4">
            <img src={logo} alt="w3chains logo" />
            {/* <h3 className="text-2xl sm:text-3xl font-bold">W3Chains</h3> */}
            <p className="text-gray-400 text-sm sm:text-base">
              Your go-to platform for the latest in Web3, blockchain, and future technologies.
            </p>
          </div>

          {/* Site Map Section 1: Main Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg sm:text-xl font-semibold">Explore</h4>
            <ul className="flex flex-col gap-2 text-gray-400 text-sm sm:text-base">
              <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
                <Flame size={20} className="text-purple-900" />
                <Link to="/trending" className="hover:text-white transition">
                  Trending
                </Link>
              </li>
              <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
                <Gift size={20} className="text-purple-900" />
                <Link to="/news_airdrops" className="hover:text-white transition">
                  Airdrops
                </Link>
              </li>
              <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
                <GitFork size={20} className="text-purple-900" />
                <Link to="/projects" className="hover:text-white transition">
                  Projects
                </Link>
              </li>
              <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
                <Newspaper size={20} className="text-purple-900" />
                <Link to="/news" className="hover:text-white transition">
                  News
                </Link>
              </li>
              <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
                <Wallet size={20} className="text-purple-900" />
                <Link to="/funding" className="hover:text-white transition">
                  Funding
                </Link>
              </li>
              <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
                <Info size={20} className="text-purple-900" />
                <Link to="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Site Map Section 2: Additional Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg sm:text-xl font-semibold">Resources</h4>
            <ul className="flex flex-col gap-2 text-gray-400 text-sm sm:text-base">
              <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
                <GitFork size={20} className="text-purple-900" />
                <Link to="/" className="hover:text-white transition">
                  Web3 Projects
                </Link>
              </li>
              <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
                <Bitcoin size={20} className="text-purple-900" />
                <Link to="/" className="hover:text-white transition">
                  NFT Marketplace
                </Link>
              </li>
              <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
                <Coins size={20} className="text-purple-900" />
                <a href="#" className="hover:text-white transition">
                  Token & Coin Listing
                </a>
              </li>
              <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
                <Newspaper size={20} className="text-purple-900" />
                <a href="#" className="hover:text-white transition">
                  Web3 & Blockchain News
                </a>
              </li>
              <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
                <Wallet size={20} className="text-purple-900" />
                <a href="#" className="hover:text-white transition">
                  Funding Announcements
                </a>
              </li>
              <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
                <Search size={20} className="text-purple-900" />
                <a href="#" className="hover:text-white transition">
                  Project Discovery
                </a>
              </li>
            </ul>
          </div>

          {/* Currency Tracker Section with Sub-Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg sm:text-xl font-semibold">Currency Tracker</h4>
            <ul className="flex flex-col gap-2 text-gray-400 text-sm sm:text-base">
              <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
                <LineChart size={20} className="text-purple-900" />
                <a href="#" className="hover:text-white transition">
                  Trending Coins
                </a>
              </li>
              <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
                <BarChart size={20} className="text-purple-900" />
                <a href="#" className="hover:text-white transition">
                  Top Losers
                </a>
              </li>
              <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
                <LineChart size={20} className="text-purple-900" />
                <a href="#" className="hover:text-white transition">
                  Top Gainers
                </a>
              </li>
              <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
                <Coins size={20} className="text-purple-900" />
                <a href="#" className="hover:text-white transition">
                  Stable Coins
                </a>
              </li>
              <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
                <Clock size={20} className="text-purple-900" />
                <a href="#" className="hover:text-white transition">
                  Upcoming Tokens
                </a>
              </li>
              <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
                <LineChart size={20} className="text-purple-900" />
                <a href="#" className="hover:text-white transition">
                  Real-time Coins Prices
                </a>
              </li>
            </ul>
          </div>

          {/* Airdrops Section with Sub-Links + Contact Info */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg sm:text-xl font-semibold">Airdrops</h4>
            <ul className="flex flex-col gap-2 text-gray-400 text-sm sm:text-base">
              <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
                <ThermometerSun size={20} className="text-purple-900" />
                <a href="#" className="hover:text-white transition">
                  Hot Airdrops
                </a>
              </li>
              <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
                <HandCoins size={20} className="text-purple-900" />
                <a href="#" className="hover:text-white transition">
                  Free Airdrops
                </a>
              </li>
              <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
                <Star size={20} className="text-purple-900" />
                <a href="#" className="hover:text-white transition">
                  New Airdrops
                </a>
              </li>
              <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
                <CheckCircle size={20} className="text-purple-900" />
                <a href="#" className="hover:text-white transition">
                  Completed Airdrops
                </a>
              </li>
              <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
                <Hourglass size={20} className="text-purple-900" />
                <a href="#" className="hover:text-white transition">
                  End Soon
                </a>
              </li>
            </ul>

            {/* Contact Info */}
            <h4 className="text-lg sm:text-xl font-semibold mt-6">Contact Us</h4>
            <ul className="flex flex-col gap-2 text-gray-400 text-sm sm:text-base">
              <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
                <Mail size={20} className="text-purple-900" />
                <a href="mailto:mdmozammil112002@gmail.com" className="hover:text-white transition">
                  web3community@gmail.com
                </a>
              </li>
              <li className="flex items-center hover:underline hover:underline-offset-3 gap-2">
                <Phone size={20} className="text-purple-900" />
                <a href="tel:+1234567890" className="hover:text-white transition">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
            {/* Social Media Icons */}
            <div className="flex gap-4 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <Twitter size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-400 text-sm sm:text-base">
          <p>© {new Date().getFullYear()} Web3 Insights. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
