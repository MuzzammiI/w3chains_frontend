import { useState, useContext, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DelayedLink from "./DelayedLink.jsx";
import w3wirelogo from "../assets/w3chains.png";
import {
  FaChevronDown, FaNewspaper, FaMoneyBillWave, FaChartLine, FaFire,
  FaHandHolding, FaStar, FaCheckCircle, FaHourglassEnd, FaBullhorn,
  FaChartBar, FaCoins, FaClock, FaPalette, FaGamepad, FaMusic,
  FaCamera, FaUserCircle
} from "react-icons/fa";
import { AuthContext } from "../context/AuthContext.jsx";
import PropTypes from "prop-types";
import ButtonCard from "./ButtonCard.jsx";
import { Wallet } from "lucide-react";


const ICON_CLASSES = "w-5 h-5 text-purple-400";
const NAV_LINK_CLASSES =
  "hover:border-1 border-purple-500 border-1 hover:border-purple-500 hover:rounded-lg  px-3 py-2 text-sm font-bold flex items-center gap-1 whitespace-nowrap transition-all duration-200";
const SUB_ITEM_LINK_CLASSES =
  "flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-black hover:text-white ";
const MOBILE_SUB_ITEM_LINK_CLASSES =
  "flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-black hover:text-white ";

const navItems = [
  {
    name: "Airdrops",
    description: "Discover the latest airdrop opportunities.",
    subItems: [
      {
        name: "Hot Airdrops",
        to: "/hot_airdrops",
        icon: <FaFire className={ICON_CLASSES} />,
      },
      {
        name: "Free Airdrops",
        to: "/free_airdrops",
        icon: <FaHandHolding className={ICON_CLASSES} />,
      },
      {
        name: "New Airdrops",
        to: "/news_airdrops",
        icon: <FaStar className={ICON_CLASSES} />,
      },
      {
        name: "Completed Airdrops",
        to: "#",
        icon: <FaCheckCircle className={ICON_CLASSES} />,
      },
      {
        name: "End Soon",
        to: "#",
        icon: <FaHourglassEnd className={ICON_CLASSES} />,
      },
    ],
  },
  {
    name: "Project Discovery",
    to: "/projects",
  },
  {
    name: "Web3 News",
    to: "/news",
    description: "Stay updated with the latest news in Web3 and blockchain.",
    subItems: [
      {
        name: "Trending News",
        to: "/trending_news",
        icon: <FaNewspaper className={ICON_CLASSES} />,
      },
      {
        name: "Upcoming News",
        to: "/newsfeed",
        icon: <FaClock className={ICON_CLASSES} />,
      },
      {
        name: "Top News",
        to: "/top_news",
        icon: <FaStar className={ICON_CLASSES} />,
      },
      {
        name: "Market Releases",
        to: "/market_release",
        icon: <FaBullhorn className={ICON_CLASSES} />,
      },
      {
        name: "Press Releases",
        to: "/press_release",
        icon: <FaNewspaper className={ICON_CLASSES} />,
      },
    ],
  },
  {
    name: "Funding",
    to: "/funding_dashboard",
    description: "Explore funding opportunities and partnerships.",
    subItems: [
      {
        name: "Partnership",
        to: "/partnership",
        icon: <FaHandHolding className={ICON_CLASSES} />,
      },
      {
        name: "Company Back",
        to: "#",
        icon: <FaMoneyBillWave className={ICON_CLASSES} />,
      },
    ],
  },
  {
    name: "NFT Marketplace",
    to: "/nftdiscovery",
    description: "Dive into the world of NFTs across various categories.",
    subItems: [
      {
        name: "Art",
        to: "/artnft",
        icon: <FaPalette className={ICON_CLASSES} />,
      },
      {
        name: "Gaming",
        to: "/gamingnft",
        icon: <FaGamepad className={ICON_CLASSES} />,
      },
      {
        name: "Music",
        to: "/musicnft",
        icon: <FaMusic className={ICON_CLASSES} />,
      },
      {
        name: "Photography",
        to: "/photographynft",
        icon: <FaCamera className={ICON_CLASSES} />,
      },
    ],
  },
  {
    name: "Currency Tracker",
    description: "Track cryptocurrency prices and trends.",
    subItems: [
      {
        name: "Trending Coins",
        to: "/trending",
        icon: <FaChartLine className={ICON_CLASSES} />,
      },
      {
        name: "Top Losers",
        to: "#",
        icon: <FaChartBar className={ICON_CLASSES} />,
      },
      {
        name: "Top Gainers",
        to: "#",
        icon: <FaChartLine className={ICON_CLASSES} />,
      },
      {
        name: "Stable Coins",
        to: "#",
        icon: <FaCoins className={ICON_CLASSES} />,
      },
      {
        name: "Upcoming Token/Coins",
        to: "#",
        icon: <FaClock className={ICON_CLASSES} />,
      },
      {
        name: "Real-time Coin Price",
        to: "#",
        icon: <FaChartLine className={ICON_CLASSES} />,
      },
    ],
  },
];

const AnimatedHamburgerIcon = ({ open, onClick }) => (
  <button
    onClick={onClick}
    className="text-white cursor-pointer focus:outline-none w-6 h-6 flex flex-col justify-around items-center group relative z-50" // Added 'group' for potential future use or better specificity if needed, 'relative' for absolute children. Added 'z-50'
    aria-label="Toggle menu"
  >
    {/* Top line */}
    <span className={`block w-full h-0.5 bg-current transform transition duration-300 ease-in-out
                      ${open ? "rotate-45 translate-y-[8px]" : ""}`} // Adjusted translate-y for better centering, roughly half the space between lines + line height
    />
    {/* Middle line */}
    <span className={`block w-full h-0.5 bg-current transition duration-300 ease-in-out
                      ${open ? "opacity-0" : ""}`}
    />
    {/* Bottom line */}
    <span className={`block w-full h-0.5 bg-current transform transition duration-300 ease-in-out
                      ${open ? "-rotate-45 -translate-y-[8px]" : ""}`} // Negative rotate and negative translate-y
    />
  </button>
);

AnimatedHamburgerIcon.propTypes = {
  open: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const NavDropdownDesktop = ({ item }) => (
  <div className="relative group">
    <Link to={item.to || "#"} className={`${NAV_LINK_CLASSES} text-white`}>
      {item.name}
      {item.subItems && <FaChevronDown className="w-4 h-4 ml-1" />}
    </Link>
    {item.subItems && (
      <div className="absolute left-0 mt-2 w-64 bg-purple-900 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-300 z-10">
        {item.subItems.map((subItem, subIndex) => (
          <DelayedLink key={subIndex} to={subItem.to} className={SUB_ITEM_LINK_CLASSES}>
            {subItem.icon}
            {subItem.name}
          </DelayedLink>
        ))}
        {item.description && (
          <div className="px-4 py-3 border-t border-black">
            <p className="text-sm font-semibold">{item.name}</p>
            <p className="text-xs text-gray-400">{item.description}</p>
          </div>
        )}
      </div>
    )}
  </div>
);

NavDropdownDesktop.propTypes = {
  item: PropTypes.object.isRequired,
};

const NavDropdownMobile = ({ item, index, openDropdown, toggleDropdown, closeMobileMenu }) => (
  <div className="w-full">
    <div
      className="flex items-center max-w-screen max-h-screen justify-between text-white hover:bg-purple-900 px-3 py-2 rounded-md text-sm font-bold cursor-pointer"
      onClick={() => (item.subItems ? toggleDropdown(index) : closeMobileMenu())}
    >
      {item.to && !item.subItems ? (
        <Link to={item.to} className="block w-full" onClick={closeMobileMenu}>
          {item.name}
        </Link>
      ) : (
        <span>{item.name}</span>
      )}
      {item.subItems && (
        <FaChevronDown className={`w-4 h-4 transition-transform ${openDropdown === index ? "rotate-180" : ""}`} />
      )}
    </div>
    {item.subItems && openDropdown === index && (
      <div className="pl-4 mt-1 space-y-1">
        {item.subItems.map((subItem, subIndex) => (
          <DelayedLink key={subIndex} to={subItem.to} onClick={closeMobileMenu} className={MOBILE_SUB_ITEM_LINK_CLASSES}>
            {subItem.icon}
            {subItem.name}
          </DelayedLink>
        ))}
        {item.description && (
          <div className="px-3 py-2 border-t border-gray-700 mt-2">
            <p className="text-sm font-semibold text-white">{item.name}</p>
            <p className="text-xs text-gray-400">{item.description}</p>
          </div>
        )}
      </div>
    )}
  </div>
);

NavDropdownMobile.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  openDropdown: PropTypes.number,
  toggleDropdown: PropTypes.func.isRequired,
  closeMobileMenu: PropTypes.func.isRequired,
};

const MainNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    setIsProfileOpen(false);
    navigate("/");
  }, [logout, navigate]);

  //handle wallet

  const walletHandle =()=>{
    navigate("/login");
  }

  const toggleDropdown = useCallback(index => setOpenDropdown(prev => (prev === index ? null : index)), []);
  const closeMobileMenu = useCallback(() => { setIsOpen(false); setOpenDropdown(null); }, []);
  const closeProfileDropdown = useCallback(() => setIsProfileOpen(false), []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "backdrop-blur-md bg-purple-900/60 shadow-lg" : "bg-purple-mix"}`}>
      <div className="mx-4 sm:mx-6 lg:mx-8">
        <div className="font-mono text-white w-full rounded-lg">
          <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <Link to="/" onClick={closeMobileMenu}>
                <img src={w3wirelogo} className="w-40 lg:w-50" alt="w3wire logo" loading="lazy" />
              </Link>
              <div className="hidden lg:flex items-center  space-x-2">
                {navItems.map((item, index) => <NavDropdownDesktop key={index} item={item} />)}
              </div>
              <div className="hidden lg:flex items-center space-x-3">
                {isAuthenticated ? (
                  <div className="relative">
                    <button onClick={() => setIsProfileOpen(prev => !prev)} className="flex items-center justify-center w-10 h-10 bg-purple-500 rounded-full hover:bg-purple-600">
                      {user?.imageUrl ? (
                        <img src={user.imageUrl} alt="Profile" className="w-8 h-8 rounded-full object-cover" loading="lazy" />
                      ) : (
                        <FaUserCircle className="w-6 h-6" />
                      )}
                    </button>
                    {isProfileOpen && (
                      <div className="absolute bg-[#101828] right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-20 border border-gray-200">
                        <Link to="/user_dashboard" className="block px-4 py-2 text-sm text-white hover:bg-purple-900" onClick={closeProfileDropdown}>My Profile</Link>
                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-purple-900 hover:text-red-500">Log Out</button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-sm font-bold flex items-center gap-x-2">
                    <Link to="/login" className="text-white hover:underline px-3 py-2">Login</Link>
                    <Link to="/register" className="text-white hover:underline px-3 py-2">Register</Link>
                    <ButtonCard
              background="bg-gradient-to-r from-purple-500 to-zinc-500"
              icon={Wallet}
              size="small"
              animationType="glow"
              iconPosition="left"
              onClick={walletHandle}
            >
              Connect Wallet 
            </ButtonCard>
                  </div>
                )}
              </div>
              <div className="lg:hidden flex items-center">
                <AnimatedHamburgerIcon open={isOpen} onClick={() => setIsOpen(!isOpen)} />
              </div>
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="lg:hidden bg-black bg-opacity-70 font-mono backdrop-blur-xl max-h-screen sm:mx-6 lg:mx-8 rounded-lg shadow-xl">
            <div className="px-4 w-full pt-2 pb-4 ">
              {navItems.map((item, index) => (
                <NavDropdownMobile
                  key={index}
                  item={item}
                  index={index}
                  openDropdown={openDropdown}
                  toggleDropdown={toggleDropdown}
                  closeMobileMenu={closeMobileMenu}
                />
              ))}
              <div className="border-t border-purple-900 pt-4 mt-2 space-y-2">
                {isAuthenticated ? (
                  <div className="px-3">
                    <div className="flex items-center mb-3">
                      {user?.imageUrl ? (
                        <img src={user.imageUrl} alt="Profile" className="w-10 h-10 rounded-full object-cover mr-3" loading="lazy" />
                      ) : (
                        <FaUserCircle className="w-10 h-10 text-purple-400 mr-3" />
                      )}
                      <div>
                        <p className="text-base font-medium text-white">{user?.name || "User Profile"}</p>
                        <Link to="/user_dashboard" onClick={closeMobileMenu} className="text-sm text-purple-300 hover:underline">View Profile</Link>
                      </div>
                    </div>
                    <button onClick={handleLogout} className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 text-base font-medium transition">Log Out</button>
                  </div>
                ) : (
                  <>
                    <Link to="/login" onClick={closeMobileMenu} className="block text-center text-white bg-gray-700 hover:bg-purple-900 px-3 py-2 rounded-md text-base font-medium">Login</Link>
                    <Link to="/register" onClick={closeMobileMenu} className="block text-center text-white bg-gray-700 hover:bg-purple-900 px-3 py-2 rounded-md text-base font-medium">Register</Link>
                    {/* <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg text-base font-medium hover:bg-purple-700 transition">Connect Wallet</button> */}
                    <ButtonCard
              background="bg-gradient-to-r w-full from-purple-500 to-zinc-500"
              icon={Wallet}
              size="small"
              animationType="glow"
              iconPosition="left"
              onClick={walletHandle}
            >
              Connect Wallet 
            </ButtonCard>




                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MainNavbar;
















