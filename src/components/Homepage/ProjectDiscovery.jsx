import React, { useState, useEffect } from 'react';

// Card component for displaying project information
const ProjectCard = ({ title, description, items, colorClass }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide effect for cards
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % items.length);
    }, 3000); // Change slide every 2 seconds
    return () => clearInterval(slideInterval);
  }, [items.length]); // Re-run effect if items change

  return (
    <div className={`relative bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col justify-between h-auto  overflow-hidden ${colorClass}`}>
      {/* Card Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-md font-semibold text-white">{title}</h3>
        <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm">More &gt;</a>
      </div>

      {/* Sliding Content Area */}
      <div className="flex-grow overflow-hidden relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {items.map((item, index) => (
            <div key={index} className="w-full flex-shrink-0 p-2">
              <div className="flex items-center mb-3">
                {/* Placeholder for project icon/image */}
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center mr-3 text-white">
                  {item.icon || '🚀'} {/* Use provided icon or a default emoji */}
                </div>
                <div className="flex-grow">
                  <p className="text-white font-medium text-sm">{item.name}</p>
                  {item.value && <p className="text-gray-300 text-sm">{item.value}</p>}
                </div>
                {item.date && <p className="text-gray-400 text-sm">{item.date}</p>}
              </div>
              {item.description && <p className="text-gray-400 text-sm">{item.description}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Sliding Point Icons (Pagination) */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {items.map((_, index) => (
          <span
            key={index}
            className={`block w-2.5 h-2.5 rounded-full ${
              index === currentSlide ? 'bg-blue-500' : 'bg-gray-500'
            } transition-colors duration-200 cursor-pointer`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

// ProjectDiscovery Component (the main component requested)
const ProjectDiscovery = () => {
  // Random data for the cards
  const recentFundraisingData = [
    { icon: '💰', name: 'PublicAI', value: '$8M', date: 'Jun 17' },
    { icon: '💰', name: 'EigenCloud', value: '$70M', date: 'Jun 17' },
    { icon: '💰', name: 'Ubyx', value: '$10M', date: 'Jun 17' },
    { icon: '💰', name: 'ZetaChain', value: '$27M', date: 'Jun 16' },
    { icon: '💰', name: 'LayerZero', value: '$120M', date: 'Jun 15' },
  ];

  const newTestNetLaunchesData = [
    { icon: '🧪', name: 'Own Protocol', date: 'May 25' },
    { icon: '🧪', name: 'Energy Labs', date: 'May 09' },
    { icon: '🧪', name: 'Pharos', date: 'May 06' },
    { icon: '🧪', name: 'Blast', date: 'May 01' },
    { icon: '🧪', name: 'Manta Network', date: 'Apr 28' },
  ];

  const latestUpdatesOnXData = [
    { icon: '🐦', name: 'Anatoly Yakovenko', description: 'Followed Block Stranding', date: 'Jun 17' },
    { icon: '🐦', name: 'Hasu', description: 'Followed ink:', date: 'Jun 17' },
    { icon: '🐦', name: 'Nic Carter', description: 'Followed XFX', date: 'Jun 17' },
    { icon: '🐦', name: 'Vitalik Buterin', description: 'Commented on EIP-4844', date: 'Jun 16' },
    { icon: '🐦', name: 'Polygon Labs', description: 'Announced ZK-EVM upgrade', date: 'Jun 15' },
  ];

  return (
    <div className="bg-zinc-900 font-mono rounded-2xl max-w-7xl mx-auto flex flex-col items-center p-4 font-inter">
      {/* Header Section */}
      <div className="w-full max-w-6xl mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-white mb-2">Top 10 Hot Crypto Projects</h1>
        <p className="text-gray-300 text-md">Real-time display of top 100 Crypto projects by Hot Index <span className="text-gray-500 text-sm">&#9432;</span></p>
      </div>

      {/* Project Cards Grid */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard
          title="Recent Fundraising"
          items={recentFundraisingData}
          colorClass="hover:border-blue-500 border border-transparent transition-all duration-300"
        />
        <ProjectCard
          title="New TestNet Launches"
          items={newTestNetLaunchesData}
          colorClass="hover:border-green-500 border border-transparent transition-all duration-300"
        />
        <ProjectCard
          title="Latest Updates on X"
          items={latestUpdatesOnXData}
          colorClass="hover:border-purple-500 border border-transparent transition-all duration-300"
        />
      </div>
    </div>
  );
};



export default ProjectDiscovery;