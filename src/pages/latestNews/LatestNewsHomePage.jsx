
const LatestNewsHomePage = () => {
  const latestItems = [
    {
      id: 1,
      title: 'Praise the "public chain" thinking of "Su Chao"',
      description: 'This is not a simple traffic event, but a textbook-level case of regional collaborative development.',
      tags: ['Public Chain'],
      timeAgo: '4 hours ago',
      imageUrl: 'https://specials-images.forbesimg.com/imageserve/68513624afad80f77ec7c88a/768x0.jpg', // Placeholder image
    },
    {
      id: 2,
      title: 'Cryptocurrencies to Wall Street',
      description: 'Welcome to the major identity crisis of cryptocurrencies in 2025.',
      tags: ['Cryptocurrency', 'Wall Street'],
      timeAgo: '4 hours ago',
      imageUrl: 'https://specials-images.forbesimg.com/imageserve/68513624afad80f77ec7c88a/768x0.jpg', // Placeholder image
    },
    {
      id: 3,
      title: 'JPMorgan opens JPMD "deposit token" experiment: claiming to be superi...',
      description: 'JPMD is deployed on the Coinbase-backed Base blockchain and will be piloted for several months, or with interest-bearing capabilities in the future.',
      tags: ['JPMD', 'JP Morgan', 'Stablecoins'],
      timeAgo: '7 hours ago',
      imageUrl: 'https://specials-images.forbesimg.com/imageserve/68513624afad80f77ec7c88a/768x0.jpg', // Placeholder image
    },
    {
      id: 4,
      title: 'Pan Gongsheng, Governor of the People\'s Bank of China: Some Thoughts ...',
      description: 'Improving global financial governance requires all parties to strengthen dialogue and cooperation.',
      tags: ['Finance'],
      timeAgo: '7 hours ago',
      imageUrl: 'https://specials-images.forbesimg.com/imageserve/68513624afad80f77ec7c88a/768x0.jpg', // Placeholder image
    },
  ];

  return (
    <div className="min-h-screen mx-w-7xl  bg-gray-900 flex flex-col items-center justify-center p-4 font-inter">
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-2xl p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Latest Updates</h1>

        <div className="space-y-6">
          {latestItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center bg-gray-700 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              {/* Image Section */}
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-lg object-cover border-2 border-gray-600"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/100x100/6B7280/F3F4F6?text=No+Image`;
                  }}
                />
              </div>

              {/* Content Section */}
              <div className="flex-grow text-center md:text-left">
                <div className="text-sm text-gray-400 mb-1">2025.06.18 - {item.timeAgo}</div>
                <h2 className="text-xl md:text-2xl font-semibold text-white mb-2 leading-tight">
                  {item.title}
                </h2>
                <p className="text-gray-300 text-sm md:text-base mb-3">
                  {item.description}
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-md hover:bg-blue-700 transition-colors duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    );
}
export default LatestNewsHomePage;