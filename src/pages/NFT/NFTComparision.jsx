import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ArrowLeft, Users, BarChart3, Tag, Percent, Globe, ExternalLink, ChevronDown } from 'lucide-react';

// --- MOCK DATA GENERATION --- //
const marketplaces = [
  "OpenSea", "Rarible", "Binance NFT", "SuperRare 💎", "Nifty Gateway", "Solana",
  "Axie Marketplace", "Mintable", "Crypto.com", "NBA Top Shot", "Foundation",
  "Polygon", "Zora", "Decentraland", "Ethereum", "GameStop NFT", "NFT Launchpad", "Larva Labs"
];

const generateMarketplaceData = () => {
  return marketplaces.map((name, index) => {
    const isSpecialty = ["SuperRare 💎", "Foundation", "Nifty Gateway", "Zora", "Larva Labs"].includes(name);
    const isGaming = ["Axie Marketplace", "Decentraland", "GameStop NFT"].includes(name);
    const isPlatform = ["Ethereum", "Solana", "Polygon"].includes(name);

    return {
      id: name.toLowerCase().replace(/ /g, '-').replace('💎', ''),
      name,
      volume24h: Math.floor(Math.random() * (isPlatform ? 50000000 : 20000000)) + 500000,
      activeUsers: Math.floor(Math.random() * (isPlatform ? 80000 : 25000)) + 1000,
      avgPrice: parseFloat(((Math.random() * (isSpecialty ? 5 : 1.5)) + 0.1).toFixed(2)),
      totalNfts: Math.floor(Math.random() * 2000000) + 10000,
      transactionFee: parseFloat(((Math.random() * 3) + 1.5).toFixed(2)),
      specialty: isGaming ? "Gaming" : isSpecialty ? "Art" : isPlatform ? "Platform" : "General",
      description: `A leading destination for NFT discovery, collecting, and selling. Explore exclusive digital items, crypto collectibles, and more on the ${name} marketplace.`,
      logoColor: `hsl(${index * (360 / marketplaces.length)}, 70%, 50%)`,
      dateAdded: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000), // Random date in last 30 days
    };
  });
};

const allMarketplaceData = generateMarketplaceData();

// --- Sub-components --- //
const MarketplaceCard = ({ marketplace, onClick }) => (
  <div
    className="bg-purple-900 p-4 rounded-xl cursor-pointer group hover:bg-purple-800 transition-all duration-300 transform hover:-translate-y-1"
    onClick={() => onClick(marketplace)}
  >
    <div className="flex items-center space-x-4 mb-4">
      <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-2xl" style={{ backgroundColor: marketplace.logoColor }}>
        {marketplace.name.charAt(0)}
      </div>
      <h3 className="text-lg font-bold text-white flex-1 truncate">{marketplace.name}</h3>
    </div>
    <div className="space-y-2 text-sm">
      <div className="flex justify-between items-center">
        <span className="text-gray-400">24h Volume</span>
        <span className="font-bold text-white">${marketplace.volume24h.toLocaleString()}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-400">Avg. Price</span>
        <span className="font-bold text-white">{marketplace.avgPrice} ETH</span>
      </div>
       <div className="flex justify-between items-center">
        <span className="text-gray-400">Fee</span>
        <span className="font-bold text-white">{marketplace.transactionFee}%</span>
      </div>
    </div>
  </div>
);

const DetailPage = ({ marketplace, onBack }) => {
    const stats = [
        { label: '24h Trading Volume', value: `$${marketplace.volume24h.toLocaleString()}`, icon: <BarChart3 className="w-5 h-5 text-blue-400" /> },
        { label: 'Active Users (24h)', value: marketplace.activeUsers.toLocaleString(), icon: <Users className="w-5 h-5 text-green-400" /> },
        { label: 'Average Price', value: `${marketplace.avgPrice} ETH`, icon: <Tag className="w-5 h-5 text-purple-400" /> },
        { label: 'Transaction Fee', value: `${marketplace.transactionFee}%`, icon: <Percent className="w-5 h-5 text-red-400" /> },
        { label: 'Market Specialty', value: marketplace.specialty, icon: <Globe className="w-5 h-5 text-yellow-400" /> },
    ];
    
    return (
        <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center animate-fadeIn">
            <div className="w-full max-w-5xl">
                <button onClick={onBack} className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors">
                    <ArrowLeft size={20} />
                    <span>Back to Comparison</span>
                </button>
                <div className="bg-[#1C1C1E] rounded-2xl shadow-lg p-6 md:p-10 flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/3 flex flex-col items-center text-center">
                         <div className="w-40 h-40 rounded-2xl flex items-center justify-center text-white font-bold text-7xl mb-4" style={{ backgroundColor: marketplace.logoColor }}>
                            {marketplace.name.charAt(0)}
                        </div>
                        <h1 className="text-4xl font-bold text-white">{marketplace.name}</h1>
                        <p className="text-gray-400 mt-2">{marketplace.description}</p>
                         <button className="w-full mt-8 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                            <span>Visit Marketplace</span><ExternalLink size={20} />
                        </button>
                    </div>
                     <div className="lg:w-2/3 lg:pl-8 lg:border-l lg:border-gray-700">
                        <h2 className="text-2xl font-bold mb-6">Key Statistics</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {stats.map(stat => (
                                <div key={stat.label} className="bg-gray-800/50 p-4 rounded-lg flex items-start space-x-4">
                                    <div className="p-2 bg-gray-700 rounded-md mt-1">{stat.icon}</div>
                                    <div>
                                        <p className="text-sm text-gray-400">{stat.label}</p>
                                        <p className="text-xl font-bold text-white">{stat.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                         <div className="mt-8">
                            <h3 className="text-xl font-bold mb-4">Volume vs. Users</h3>
                             <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={[marketplace]} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                                    <XAxis dataKey="name" hide />
                                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" label={{ value: 'Volume ($)', angle: -90, position: 'insideLeft' }}/>
                                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" label={{ value: 'Users', angle: 90, position: 'insideRight' }} />
                                    <Tooltip contentStyle={{ backgroundColor: '#2d3748', border: 'none', borderRadius: '0.5rem' }}/>
                                    <Bar yAxisId="left" dataKey="volume24h" fill="#8884d8" name="24h Volume" radius={[4, 4, 0, 0]}/>
                                    <Bar yAxisId="right" dataKey="activeUsers" fill="#82ca9d" name="Active Users" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FilterBar = ({ filters, setFilters }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const selectClassName = "bg-purple-900 text-white border mr-2 border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none";

    return (
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Explore Marketplaces</h2>
            <div className="flex gap-4">
                <div className="relative">
                    <select name="sortBy" value={filters.sortBy} onChange={handleInputChange} className={selectClassName}>
                        <option value="volume_desc">Volume: High to Low</option>
                        <option value="volume_asc">Volume: Low to High</option>
                        <option value="price_desc">Avg Price: High to Low</option>
                        <option value="price_asc">Avg Price: Low to High</option>
                        <option value="name_asc">Name: A-Z</option>
                        <option value="name_desc">Name: Z-A</option>
                        <option value="date_desc">Date Added: Newest</option>
                        <option value="date_asc">Date Added: Oldest</option>
                    </select>
                     <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
                </div>
                <div className="relative">
                     <select name="specialty" value={filters.specialty} onChange={handleInputChange} className={selectClassName}>
                        <option value="All">All Specialties</option>
                        <option value="General">General</option>
                        <option value="Art">Art</option>
                        <option value="Gaming">Gaming</option>
                        <option value="Platform">Platform</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
                </div>
            </div>
        </div>
    );
};


// --- Main App Component --- //
function NFTComparision() {
    const [view, setView] = useState('main');
    const [selectedMarketplace, setSelectedMarketplace] = useState(null);
    const [activeBar, setActiveBar] = useState(null);
    const [filters, setFilters] = useState({
        sortBy: 'volume_desc',
        specialty: 'All'
    });

    const sortedChartData = useMemo(() => {
        return [...allMarketplaceData].sort((a, b) => b.volume24h - a.volume24h);
    }, []);

    const filteredAndSortedCards = useMemo(() => {
        let items = [...allMarketplaceData];

        // Filter by specialty
        if (filters.specialty !== 'All') {
            items = items.filter(item => item.specialty === filters.specialty);
        }

        // Sort by selected option
        switch (filters.sortBy) {
            case 'volume_desc': items.sort((a, b) => b.volume24h - a.volume24h); break;
            case 'volume_asc': items.sort((a, b) => a.volume24h - b.volume24h); break;
            case 'price_desc': items.sort((a, b) => b.avgPrice - a.avgPrice); break;
            case 'price_asc': items.sort((a, b) => a.avgPrice - b.avgPrice); break;
            case 'name_asc': items.sort((a, b) => a.name.localeCompare(b.name)); break;
            case 'name_desc': items.sort((a, b) => b.name.localeCompare(a.name)); break;
            case 'date_desc': items.sort((a, b) => b.dateAdded - a.dateAdded); break;
            case 'date_asc': items.sort((a, b) => a.dateAdded - b.dateAdded); break;
            default: break;
        }

        return items;
    }, [filters]);

    const handleSelectMarketplace = (marketplace) => {
        setSelectedMarketplace(marketplace);
        setView('detail');
    };

    const handleBackToMain = () => {
        setView('main');
        setSelectedMarketplace(null);
    };

    if (view === 'detail') {
        return <DetailPage marketplace={selectedMarketplace} onBack={handleBackToMain} />;
    }

    return (
        <div className="min-h-screen bg-purple-mix text-white font-sans p-4 sm:p-6 lg:p-8">
            <style jsx global>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
                .recharts-tooltip-cursor { fill: rgba(255, 255, 255, 0.1) !important; }
            `}</style>
            
            <div className="max-w-screen-xl mx-auto animate-fadeIn">
                <header className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">NFT Marketplace Comparison</h1>
                    <p className="text-gray-400 mt-2">An overview of popular NFT exchanges by key metrics.</p>
                </header>

                <section className="mb-12 h-[500px] bg-green-mix p-6 rounded-2xl">
                    <h2 className="text-xl font-bold text-white mb-4">24-Hour Trading Volume (USD)</h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={sortedChartData} margin={{ top: 5, right: 20, left: 20, bottom: 100 }}>
                            <XAxis dataKey="name" angle={-45} textAnchor="end" stroke="#888" interval={0} fontSize={12} />
                            <YAxis stroke="#888" tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}M`} />
                            <Tooltip
                                cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                                contentStyle={{ backgroundColor: '#2d3748', border: 'none', borderRadius: '0.5rem' }}
                                formatter={(value) => `$${Number(value).toLocaleString()}`}
                            />
                            <Bar dataKey="volume24h" name="24h Volume" radius={[4, 4, 0, 0]} onClick={(data) => handleSelectMarketplace(data)} onMouseOver={(data) => setActiveBar(data.id)} onMouseOut={() => setActiveBar(null)}>
                               {sortedChartData.map((entry) => (
                                    <Cell 
                                        key={`cell-${entry.id}`} 
                                        fill={entry.logoColor} 
                                        opacity={activeBar === null || activeBar === entry.id ? 1 : 0.5} 
                                        className="transition-opacity duration-300 cursor-pointer"
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </section>

                <section>
                     <FilterBar filters={filters} setFilters={setFilters} />
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredAndSortedCards.map(marketplace => (
                            <MarketplaceCard key={marketplace.id} marketplace={marketplace} onClick={handleSelectMarketplace} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}




export default NFTComparision;