import React from 'react';
import PropTypes from 'prop-types';
import DotIndicators from './DotIndicators'; // Import DotIndicators

const MainNftCard = ({ nft, onClick, onPrev, onNext, totalNfts, currentNftIndex, onDotClick }) => {
  return (
    <div
      className="relative w-full h-80 md:h-96 bg-gray-700 rounded-2xl shadow-lg overflow-hidden group animate-fade-in"
    >
      {/* Clickable overlay for NFT detail - This covers the whole card for general click */}
      <div
        className="absolute inset-0 z-10 cursor-pointer"
        onClick={() => onClick(nft)}
      ></div>
      <img
        src={nft.image}
        alt={nft.name}
        className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/1200x600/CCCCCC/000000?text=NFT+Image+Error'; }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent p-6 flex flex-col justify-end text-white z-20">
        {/* Title is explicitly clickable */}
        <h3
          onClick={(e) => { e.stopPropagation(); onClick(nft); }} // Stop propagation and open detail
          className="text-2xl md:text-3xl font-bold mb-2 leading-tight cursor-pointer hover:underline"
        >
          {nft.name}
        </h3>
        <p className="text-base md:text-lg mb-4 opacity-90">
          {nft.description}
        </p>
        <div className="flex items-center text-sm opacity-80">
          <span>Floor: {nft.floorPrice}</span>
          <span className="mx-2">•</span>
          <span>Collection: {nft.collection}</span>
        </div>
      </div>

      {/* Navigation buttons - Always visible */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-70 text-white p-2 rounded-full shadow-lg transition-colors duration-300 z-30 hover:bg-gray-700"
        aria-label="Previous NFT"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="md:h-6 md:w-6 h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-70 text-white p-2 rounded-full shadow-lg transition-colors duration-300 z-30 hover:bg-gray-700"
        aria-label="Next NFT"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="md:h-6 md:w-6 h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <DotIndicators count={totalNfts} activeIndex={currentNftIndex} onDotClick={onDotClick} />
    </div>
  );
};

MainNftCard.propTypes = {
  nft: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  totalNfts: PropTypes.number.isRequired,
  currentNftIndex: PropTypes.number.isRequired,
  onDotClick: PropTypes.func.isRequired,
};

export default MainNftCard;