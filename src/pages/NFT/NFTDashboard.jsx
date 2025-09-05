import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ArrowLeft,
  ArrowRight,
  LayoutGrid,
  DollarSign,
  BarChart2,
  TrendingUp,
  Clock,
  ExternalLink,
} from "lucide-react";
import NFTComparision from "./NFTComparision";
import Top50NFT from "./Top50NFT";



// --- MOCK DATA (Expanded for demonstration) --- //
const headerStats = [
  {
    id: 1,
    label: "Collections",
    value: "1,708",
    icon: <LayoutGrid className="w-5 h-5" />,
  },
  {
    id: 2,
    label: "Total Market Cap",
    value: "$3.8B",
    icon: <DollarSign className="w-5 h-5" />,
  },
  {
    id: 3,
    label: "24h Volume",
    value: "$1.2M",
    icon: <BarChart2 className="w-5 h-5" />,
  },
  {
    id: 4,
    label: "24h %",
    value: "+3.24%",
    icon: <TrendingUp className="w-5 h-5" />,
    positive: true,
  },
];

const trendingCollections = [
  {
    id: "crypto-punks",
    name: "CryptoPunks",
    rank: 1,
    image:
      "https://images.blur.io/_blur-prod/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/3147-2621bfeedebe9e77?w=512",
    change: "+10.00%",
  },
  {
    id: "bored-ape-yacht-club",
    name: "Bored Ape Yacht Club",
    rank: 2,
    image:
      "https://images.blur.io/_blur-prod/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/9322-a0bb9d34960bd1f7?w=256",
    change: "+8.50%",
  },
  {
    id: "azuki",
    name: "Azuki",
    rank: 3,
    image:
      "https://images.blur.io/_blur-prod/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/4429-7b148d149f25b43a?w=512",
    change: "-2.10%",
  },
  {
    id: "doodles",
    name: "Doodles",
    rank: 4,
    image:
      "https://images.blur.io/_blur-prod/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/5134-467525133a8327aa?w=512",
    change: "+15.20%",
  },
  {
    id: "moonbirds",
    name: "Moonbirds",
    rank: 5,
    image:
      "https://images.blur.io/_blur-prod/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/8029-807274d7d83dc46b?w=512",
    change: "+3.2%",
  },
  {
    id: "degods",
    name: "DeGods",
    rank: 6,
    image:
      "https://images.blur.io/_blur-prod/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/8511-c46924e910f41a5d?w=512",
    change: "+65.0%",
  },
  {
    id: "meebits",
    name: "Meebits",
    rank: 7,
    image:
      "https://images.blur.io/_blur-prod/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/75-7860e142fd5004a3?w=128",
    change: "+63.0%",
  },
];

const allExchangeVolumeData = [
  { name: "Binance", volume: 4080 },
  { name: "OpenSea", volume: 3548 },
  { name: "Magic Eden", volume: 2888 },
  { name: "LooksRare", volume: 3468 },
  { name: "X2Y2", volume: 3438 },
  { name: "Crypto.com", volume: 3548 },
  { name: "Blur", volume: 4200 },
  { name: "Rarible", volume: 1200 },
  { name: "Gem", volume: 1800 },
];

const totalValueLockedData = [
  { name: "Ethereum", value: 52700000, color: "#627EEA" },
  { name: "Iron", value: 8458000, color: "#00C49F" },
  { name: "Polygon", value: 4678000, color: "#8247E5" },
  { name: "Arbitrum", value: 2428000, color: "#28A0F0" },
  { name: "Optimism", value: 898000, color: "#FF0420" },
  { name: "Other", value: 5428000, color: "#FF8042" },
];

const allTopGainersData = [
  {
    id: "pudgy-penguins",
    name: "Pudgy Penguins",
    image:
      "https://images.blur.io/_blur-prod/0xbd3531da5cf5857e7cfaa92426877b022e612cf8/95-9084345e60eccade?w=512",
    change: "+178.0%",
  },
  {
    id: "milady-maker",
    name: "Milady Maker",
    image:
      "https://images.blur.io/_blur-prod/0x5af0d9827e0c534723e498304c8b5c61f4a81389/638-0128f7c038683020?w=128",
    change: "+83.0%",
  },
  {
    id: "degods-gainer",
    name: "DeGods",
    image:
      "https://images.blur.io/_blur-prod/0x8a90cab2b38dba80c64b7734e58ee1db38b8992e/182-cfebcb1240e28739?w=128",
    change: "+65.0%",
  },
  {
    id: "meebits-gainer",
    name: "Meebits",
    image:
      "https://images.blur.io/_blur-prod/0x7bd29408f11d2bfc23c34f18275bbf23bb716bc7/38996-9f8ba138e08595d3?w=512",
    change: "+63.0%",
  },
  {
    id: "captainz",
    name: "Captainz",
    image:
      "https://images.blur.io/_blur-prod/0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b/3356-dfa7946f12a26450?w=128",
    change: "+41.8%",
  },
  {
    id: "azur-bala",
    name: "Azur Bala",
    image:
      "https://images.blur.io/_blur-prod/0x39ee2c73f47e8e4f16526a2732e6a6a22f5a0223/12-2d1045236f04300c?w=128",
    change: "+35.2%",
  },
  {
    id: "beanz",
    name: "BEANZ",
    image:
      "https://images.blur.io/_blur-prod/0x306b1ea3ecdf94ab739f1910bbda052ed4a9f949/1-b93a029d5f096739?w=128",
    change: "+29.5%",
  },
  {
    id: "cyber-brokers",
    name: "Cyber Brokers",
    image:
      "https://images.blur.io/_blur-prod/0x892848074d629a12d915425442b291e6024a18d6/1-b88307469a456543?w=128",
    change: "+22.1%",
  },
];

const marketDominanceData = [
  { name: "BTC", value: 45, color: "#F7931A" },
  { name: "ETH", value: 30, color: "#627EEA" },
  { name: "USDT", value: 10, color: "#26A17B" },
  { name: "BNB", value: 5, color: "#F3BA2F" },
  { name: "USDC", value: 5, color: "#2775CA" },
  { name: "Other", value: 5, color: "#777777" },
];

const allRecentTransactions = [
  {
    id: "tx-1",
    hash: "0xc0ffee...f34d",
    from: "0xUserA...",
    to: "0xUserB...",
    time: "2m ago",
  },
  {
    id: "tx-2",
    hash: "0xdeadbf...f64d",
    from: "0xUserC...",
    to: "0xUserD...",
    time: "5m ago",
  },
  {
    id: "tx-3",
    hash: "0x9d5bde...f1a3",
    from: "0xUserE...",
    to: "0xUserF...",
    time: "8m ago",
  },
  {
    id: "tx-4",
    hash: "0x8acef1...b2c4",
    from: "0xUserG...",
    to: "0xUserH...",
    time: "12m ago",
  },
  {
    id: "tx-5",
    hash: "0xbeefed...a1b3",
    from: "0xUserI...",
    to: "0xUserJ...",
    time: "15m ago",
  },
  {
    id: "tx-6",
    hash: "0xfaded7...c4d5",
    from: "0xUserK...",
    to: "0xUserL...",
    time: "20m ago",
  },
];

const allCollectionsTableData = [
  {
    id: "crypto-punks-table",
    name: "CryptoPunks",
    icon: "https://i.seadn.io/gae/BdxvLseXcfl57BiuQcQoJgTAGpL8LS2wlGCagGWBzS__sp3gZ_flexHY4wVRTB4QAQ?auto=format&w=128",
    floorPrice: "40.95 ETH",
    volume: "223.27 ETH",
    owners: 3870,
  },
  {
    id: "wrapped-crypto-punks",
    name: "Wrapped",
    icon: "https://i.seadn.io/gae/w_p_1s-w3c7f99JMr_s25N_bS2b2s_AK9xK3m3-1y_p_2e_b4z?auto=format&w=128",
    floorPrice: "44.33 ETH",
    volume: "38.18 WETH",
    owners: 126,
  },
  {
    id: "pudgy-penguins-table",
    name: "Pudgy Penguins",
    icon: "https://i.seadn.io/gae/y2QcxTc9l6Xh-1qYkE1KjGqQ-P8gX-a2X-kI-Z-I?auto=format&w=128",
    floorPrice: "8.82 ETH",
    volume: "83.84 ETH",
    owners: 4979,
  },
  {
    id: "milady-maker-table",
    name: "Milady Maker",
    icon: "https://i.seadn.io/gae/a_frplnav7B6xJRuVAaD-e-p_nSGthVw_M0-1w?auto=format&w=128",
    floorPrice: "1.9839 ETH",
    volume: "70.63 ETH",
    owners: 5155,
  },
  {
    id: "boredapeyachtclub-table",
    name: "BoredApeYachtClub",
    icon: "https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8Uct2-M9He2PjILP0oOvxE8-MA?auto=format&w=128",
    floorPrice: "25.50 ETH",
    volume: "180.15 ETH",
    owners: 6400,
  },
  {
    id: "azuki-table",
    name: "Azuki",
    icon: "https://i.seadn.io/gae/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA?auto=format&w=128",
    floorPrice: "5.15 ETH",
    volume: "95.80 ETH",
    owners: 4900,
  },
  {
    id: "doodles-table",
    name: "Doodles",
    icon: "https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8EG6_GUYAE?auto=format&w=128",
    floorPrice: "2.80 ETH",
    volume: "45.30 ETH",
    owners: 10200,
  },
  {
    id: "moonbirds-table",
    name: "Moonbirds",
    icon: "https://i.seadn.io/gae/J2iIgy5_gmA8IS6sXGKGZeFVZwhldQy4wAbKq95t_Y3_s?auto=format&w=128",
    floorPrice: "1.90 ETH",
    volume: "30.75 ETH",
    owners: 6500,
  },
];

// --- Helper & Generic Components --- //
const SeeMoreButton = ({ onClick, isExpanded, text = "See More" }) => (
  <button
    onClick={onClick}
    className="text-xs text-blue-400 cursor-pointer hover:text-blue-300 transition-colors"
  >
    {isExpanded ? "See Less" : text}
  </button>
);

SeeMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  text: PropTypes.string,
};

const DetailPage = ({ item, onBack }) => (
  <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center animate-fadeIn">
    {" "}
    <div className="w-full max-w-4xl">
      {" "}
      <button
        onClick={onBack}
        className="flex items-center cursor-pointer space-x-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors"
      >
        {" "}
        <ArrowLeft size={20} /> <span>Back to Dashboard</span>{" "}
      </button>{" "}
      <div className="bg-[#1C1C1E] rounded-lg shadow-lg p-6 md:p-10 flex flex-col md:flex-row gap-8">
        {" "}
        <div className="md:w-1/2 flex-shrink-0">
          {" "}
          <img
            src={
              item.image ||
              `https://placehold.co/600x600/1a1a1a/ffffff?text=${item.name.charAt(
                0
              )}`
            }
            alt={item.name}
            className="w-full h-auto rounded-xl object-cover shadow-2xl"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://placehold.co/600x600/1a1a1a/ffffff?text=Error`;
            }}
          />{" "}
        </div>{" "}
        <div className="md:w-1/2 flex flex-col">
          {" "}
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">
            {" "}
            {item.name}{" "}
          </h1>{" "}
          {item.rank && (
            <p className="text-lg text-gray-400 mb-6">Rank #{item.rank}</p>
          )}{" "}
          <div className="grid grid-cols-2 gap-4 text-lg mb-6">
            {" "}
            {item.floorPrice && (
              <div className="bg-gray-800/50 p-3 rounded-lg">
                {" "}
                <p className="text-sm text-gray-400">Floor Price</p>{" "}
                <p className="font-bold">{item.floorPrice}</p>{" "}
              </div>
            )}{" "}
            {item.volume && (
              <div className="bg-gray-800/50 p-3 rounded-lg">
                {" "}
                <p className="text-sm text-gray-400">24h Volume</p>{" "}
                <p className="font-bold">{item.volume}</p>{" "}
              </div>
            )}{" "}
            {item.change && (
              <div className="bg-gray-800/50 p-3 rounded-lg">
                {" "}
                <p className="text-sm text-gray-400">24h Change</p>{" "}
                <p
                  className={`font-bold ${
                    item.change.startsWith("+")
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {" "}
                  {item.change}{" "}
                </p>{" "}
              </div>
            )}{" "}
            {item.owners && (
              <div className="bg-gray-800/50 p-3 rounded-lg">
                {" "}
                <p className="text-sm text-gray-400">Owners</p>{" "}
                <p className="font-bold">{item.owners}</p>{" "}
              </div>
            )}{" "}
          </div>{" "}
          <p className="text-gray-300 mb-6">
            {" "}
            Detailed placeholder description for the {
              item.name
            } collection.{" "}
          </p>{" "}
          <div className="mt-auto pt-6 border-t border-gray-700">
            {" "}
            <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              {" "}
              <span>View on OpenSea</span> <ExternalLink size={20} />{" "}
            </button>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>{" "}
  </div>
);

DetailPage.propTypes = {
  item: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
};

const Card = ({ children, className = "" }) => (
  <div className={`bg-green-mix p-4 rounded-2xl flex flex-col ${className}`}>
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const TrendingSlider = ({ collections, onCardClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(4);
  const updateItemsToShow = useCallback(() => {
    if (window.innerWidth >= 1280) {
      setItemsToShow(4);
    } else if (window.innerWidth >= 1024) {
      setItemsToShow(3);
    } else if (window.innerWidth >= 640) {
      setItemsToShow(2);
    } else {
      setItemsToShow(1);
    }
  }, []);
  useEffect(() => {
    updateItemsToShow();
    window.addEventListener("resize", updateItemsToShow);
    return () => window.removeEventListener("resize", updateItemsToShow);
  }, [updateItemsToShow]);
  const nextSlide = useCallback(() => {
    const maxIndex = Math.max(0, collections.length - itemsToShow);
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  }, [collections.length, itemsToShow]);
  const prevSlide = () => {
    const maxIndex = Math.max(0, collections.length - itemsToShow);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };
  useEffect(() => {
    if (currentIndex > collections.length - itemsToShow) {
      setCurrentIndex(0);
    }
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, [nextSlide, currentIndex, collections.length, itemsToShow]);
  return (
    <Card>
      {" "}
      <div className="flex justify-between items-center mb-4">
        {" "}
        <h2 className="text-xl font-bold text-white">
          {" "}
          Trending NFT Collections{" "}
        </h2>{" "}
        <div className="flex space-x-2">
          {" "}
          <button
            onClick={prevSlide}
            className="bg-purple-900 text-white p-2 rounded-full cursor-pointer hover:bg-purple-600 transition-all disabled:opacity-50"
            disabled={currentIndex === 0}
          >
            {" "}
            <ArrowLeft size={16} />{" "}
          </button>{" "}
          <button
            onClick={nextSlide}
            className="bg-purple-900 text-white p-2 rounded-full cursor-pointer hover:bg-purple-600 transition-all disabled:opacity-50"
            disabled={currentIndex >= collections.length - itemsToShow}
          >
            {" "}
            <ArrowRight size={16} />{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
      <div className="overflow-hidden">
        {" "}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
          }}
        >
          {" "}
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="flex-shrink-0 p-2"
              style={{ width: `${100 / itemsToShow}%` }}
            >
              {" "}
              <div
                className="bg-purple-mix rounded-lg p-3 cursor-pointer group h-full flex flex-col"
                onClick={() => onCardClick(collection)}
              >
                {" "}
                <div className="w-full aspect-square mb-3">
                  {" "}
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                  />{" "}
                </div>{" "}
                <div className="flex justify-between items-start mt-auto">
                  {" "}
                  <div>
                    {" "}
                    <h3 className="font-bold text-white truncate">
                      {" "}
                      {collection.name}{" "}
                    </h3>{" "}
                    <p className="text-gray-400 text-sm">
                      {" "}
                      Rank #{collection.rank}{" "}
                    </p>{" "}
                  </div>{" "}
                  <div className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-md flex-shrink-0">
                    {" "}
                    {collection.change}{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>
          ))}{" "}
        </div>{" "}
      </div>{" "}
    </Card>
  );
};

TrendingSlider.propTypes = {
  collections: PropTypes.array.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

const DonutChartCard = ({ title, data }) => (
  <Card className="h-full flex flex-col">
    {" "}
    <h2 className="text-xl font-bold mb-4 text-white">{title}</h2>{" "}
    <div className="flex-grow flex m-auto relative">
      {" "}
      <ResponsiveContainer width={200} height={200}>
        {" "}
        <PieChart>
          {" "}
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="80%"
            fill="#8884d8"
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
          >
            {" "}
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}{" "}
          </Pie>{" "}
          <Tooltip
            contentStyle={{
              backgroundColor: "#2d3748",
              border: "none",
              borderRadius: "0.5rem",
            }}
          />{" "}
        </PieChart>{" "}
      </ResponsiveContainer>{" "}
    </div>{" "}
    <div className="mt-4 space-y-2 text-sm">
      {" "}
      {data.map((item) => (
        <div key={item.name} className="flex items-center justify-between">
          {" "}
          <div className="flex items-center">
            {" "}
            <span
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: item.color }}
            ></span>{" "}
            <span className="text-gray-300">{item.name}</span>{" "}
          </div>{" "}
          <span className="font-bold text-white">{item.value}%</span>{" "}
        </div>
      ))}{" "}
    </div>{" "}
  </Card>
);

DonutChartCard.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

// --- Updated Modular Cards with State Logic --- //
const TopGainersCard = ({ handleCardClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const initialItemCount = 6;
  const items = allTopGainersData;
  return (
    <Card className="h-full">
      <h2 className="text-xl font-bold mb-4 text-white">Top Gainers</h2>
      <div
        className={`flex-grow pr-2 transition-all duration-300 ${
          isExpanded ? "h-52 overflow-y-auto" : "h-52"
        }`}
      >
        <div
          className={`grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-3 ${
            !isExpanded && "overflow-hidden"
          }`}
        >
          {items
            .slice(0, !isExpanded ? initialItemCount : items.length)
            .map((gainer, index) => (
              <div
                key={`${gainer.id}-${index}`}
                className="text-center cursor-pointer group"
                onClick={() => handleCardClick(gainer)}
              >
                <img
                  src={gainer.image}
                  alt={gainer.name}
                  className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-transparent group-hover:border-blue-500 transition-all"
                />
                <p className="text-xs font-bold text-white truncate">
                  {gainer.name}
                </p>
                <p className="text-xs font-bold text-green-400">
                  {gainer.change}
                </p>
              </div>
            ))}
        </div>
      </div>
      <div className="mt-auto pt-2 flex justify-start">
        {allTopGainersData.length > initialItemCount && (
          <SeeMoreButton
            onClick={() => setIsExpanded(!isExpanded)}
            isExpanded={isExpanded}
            text="See More Gainers"
          />
        )}
      </div>
    </Card>
  );
};

TopGainersCard.propTypes = {
  handleCardClick: PropTypes.func.isRequired,
};

const ExchangesCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const initialItemCount = 6;
  const items = allExchangeVolumeData.slice(
    0,
    isExpanded ? allExchangeVolumeData.length : initialItemCount
  );
  return (
    <Card className="h-full">
      <h2 className="text-xl font-bold mb-4 text-white">
        Exchanges by Trading Volume
      </h2>
      <div
        className={`flex-grow transition-all duration-300 pr-2 ${
          isExpanded ? "h-64 overflow-y-auto" : "h-auto"
        }`}
      >
        <ResponsiveContainer width="100%" height={items.length * 40}>
          <BarChart
            data={items}
            layout="vertical"
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              width={80}
              stroke="#888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              cursor={{ fill: "#2C2C2E" }}
              contentStyle={{
                backgroundColor: "#1C1C1E",
                border: "none",
                borderRadius: "0.5rem",
              }}
            />
            <Bar
              dataKey="volume"
              fill="#8884d8"
              radius={[0, 4, 4, 0]}
              barSize={15}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-auto pt-2 flex justify-start">
        {allExchangeVolumeData.length > initialItemCount && (
          <SeeMoreButton
            onClick={() => setIsExpanded(!isExpanded)}
            isExpanded={isExpanded}
            text="See More Exchanges"
          />
        )}
      </div>
    </Card>
  );
};

const RecentTransactionsCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const initialItemCount = 3;
  const items = allRecentTransactions.slice(
    0,
    isExpanded ? allRecentTransactions.length : initialItemCount
  );

  return (
    <Card className="h-full">
      <h2 className="text-xl font-bold mb-4 text-white">
        Recent NFT Transaction
      </h2>
      <div
        className={`space-y-4 flex-grow pr-2 ${
          isExpanded ? "h-48 overflow-y-auto" : ""
        }`}
      >
        {items.map((tx, index) => (
          <div
            key={`${tx.id}-${index}`}
            className="flex items-center space-x-3 text-sm"
          >
            <div className="p-3 bg-[#2C2C2E] rounded-lg">
              <Clock size={16} className="text-blue-400" />
            </div>
            <div className="flex-grow font-mono">
              <p className="text-white truncate">{tx.hash}</p>
              <p className="text-gray-500 text-xs">
                from {tx.from} to {tx.to}
              </p>
            </div>
            <p className="text-gray-500 text-xs">{tx.time}</p>
          </div>
        ))}
      </div>
      <div className="mt-auto pt-2 flex justify-start">
        {allRecentTransactions.length > initialItemCount && (
          <SeeMoreButton
            onClick={() => setIsExpanded(!isExpanded)}
            isExpanded={isExpanded}
            text="See More Trans"
          />
        )}
      </div>
    </Card>
  );
};

const TopCollectionsCard = ({ handleCardClick }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(allCollectionsTableData.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = allCollectionsTableData.slice(startIndex, endIndex);
  const nextPage = () =>
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  const prevPage = () => setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));

  return (
    <Card className="h-full">
      <h2 className="text-xl font-bold mb-4 text-white">Top Collections</h2>
      <div className="overflow-x-auto flex-grow">
        <table className="w-full text-left text-sm">
          <thead className="text-gray-400">
            <tr>
              <th className="p-2 font-normal">Collection</th>
              <th className="p-2 font-normal">Floor Price</th>
              <th className="p-2 font-normal">Volume</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((col, index) => (
              <tr
                key={`${col.id}-${index}`}
                className="border-t border-[#2C2C2E] hover:bg-[#2C2C2E]/50 cursor-pointer"
                onClick={() => handleCardClick(col)}
              >
                <td className="p-2">
                  <div className="flex items-center space-x-3">
                    <img
                      src={col.icon}
                      alt={col.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="font-semibold text-white">{col.name}</span>
                  </div>
                </td>
                <td className="p-2 font-mono text-white">{col.floorPrice}</td>
                <td className="p-2 font-mono text-white">{col.volume}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end items-center mt-auto pt-2 space-x-2">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition-all disabled:opacity-50"
        >
          <ArrowLeft size={16} />
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages - 1}
          className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition-all disabled:opacity-50"
        >
          <ArrowRight size={16} />
        </button>
      </div>
    </Card>
  );
};

TopCollectionsCard.propTypes = {
  handleCardClick: PropTypes.func.isRequired,
};

// --- Main App Component --- //
function NFTDashboard() {
  const [view, setView] = useState("dashboard");
  const [selectedItem, setSelectedItem] = useState(null);
  const handleCardClick = (item) => {
    setView("detail");
    setSelectedItem(item);
  };
  const handleBackToDashboard = () => {
    setView("dashboard");
    setSelectedItem(null);
  };

  if (view === "detail") {
    return <DetailPage item={selectedItem} onBack={handleBackToDashboard} />;
  }

  const totalTVL = totalValueLockedData.reduce(
    (acc, entry) => acc + entry.value,
    0
  );
  const formatCurrency = (value) => {
    if (value >= 1_000_000_000)
      return `$${(value / 1_000_000_000).toFixed(1)}B`;
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
    return `$${value}`;
  };

  return (
    <>
    <div className="min-h-screen bg-blue-mix font-sans mt-4 p-4 sm:p-6 lg:p-8">
      <div className="max-w-screen-2xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 animate-fadeIn">
          <div>
            {" "}
            <h1 className="text-3xl font-bold text-white">
              {" "}
              NFT Market Overview{" "}
            </h1>{" "}
            <p className="text-gray-400">Jun 24, 2025</p>{" "}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4 md:mt-0">
            {" "}
            {headerStats.map((stat) => (
              <div
                key={stat.id}
                className=" border border-gray-500 p-3 rounded-lg flex items-center space-x-3"
              >
                {" "}
                <div className=" p-2 rounded-md text-blue-400">
                  {" "}
                  {stat.icon}{" "}
                </div>{" "}
                <div>
                  {" "}
                  <p className="text-xs text-gray-400">{stat.label}</p>{" "}
                  <p className="text-sm font-bold text-white">{stat.value}</p>{" "}
                </div>{" "}
              </div>
            ))}{" "}
          </div>
        </header>

        <div className="mb-6 animate-fadeIn" style={{ animationDelay: "0.1s" }}>
          <TrendingSlider
            collections={trendingCollections}
            onCardClick={handleCardClick}
          />
        </div>

        <div className="mb-6 animate-fadeIn" style={{ animationDelay: "0.1s" }}>
          <Top50NFT />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div
            className="lg:col-span-5 animate-fadeIn"
            style={{ animationDelay: "0.2s" }}
          >
            <ExchangesCard />
          </div>
          <div
            className="lg:col-span-4 animate-fadeIn"
            style={{ animationDelay: "0.3s" }}
          >
            <Card className="h-full flex flex-col">
              <h2 className="text-xl font-bold mb-4 text-white">
                Total Value Locked
              </h2>
              <div className="flex-grow relative flex items-center justify-center">
                <ResponsiveContainer width={200} height={200}>
                  <PieChart>
                    <Pie
                      data={totalValueLockedData}
                      cx="50%"
                      cy="50%"
                      innerRadius="70%"
                      outerRadius="90%"
                      fill="#8884d8"
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {totalValueLockedData.map((entry) => (
                        <Cell key={`cell-${entry.name}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <p className="text-3xl font-bold">
                    {formatCurrency(totalTVL)}
                  </p>
                  <p className="text-gray-400">Total</p>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                {totalValueLockedData.map((item) => (
                  <div key={item.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-300">{item.name}</span>
                      <span className="text-white font-bold">
                        {formatCurrency(item.value)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full"
                        style={{
                          width: `${(item.value / totalTVL) * 100}%`,
                          backgroundColor: item.color,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          <div
            className="lg:col-span-3 animate-fadeIn"
            style={{ animationDelay: "0.4s" }}
          >
            <TopGainersCard handleCardClick={handleCardClick} />
          </div>
          <div
            className="lg:col-span-4 animate-fadeIn"
            style={{ animationDelay: "0.5s" }}
          >
            <RecentTransactionsCard />
          </div>
          <div
            className="lg:col-span-3 animate-fadeIn"
            style={{ animationDelay: "0.6s" }}
          >
            <DonutChartCard
              title="NFT Market Dominance"
              data={marketDominanceData}
            />
          </div>
          <div
            className="lg:col-span-5 animate-fadeIn"
            style={{ animationDelay: "0.7s" }}
          >
            <TopCollectionsCard handleCardClick={handleCardClick} />
          </div>
        </div>
      </div>
    </div>
    <NFTComparision/>
    </>
  );
}





















export default NFTDashboard;
