import React from 'react';
import PropTypes from 'prop-types';

const ChildNftCard = ({ nft, onClick, onCollectionClick }) => {
  return (
    <div
      className="w-full bg-purple-900 rounded-lg shadow-lg overflow-hidden flex flex-col p-4 space-y-4 transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 animate-fade-in-up"
    >
      {/* Left Section: Image */}
      <div className="relative w-full flex-shrink-0 rounded-lg overflow-hidden">
        <img
          src={nft.image}
          alt={nft.name}
          className="w-full h-32 object-cover rounded-lg"
          onError={(e) => { e.target.onerror = null; e.target.src = '[https://placehold.co/400x300/CCCCCC/000000?text=NFT+Image+Error](https://placehold.co/400x300/CCCCCC/000000?text=NFT+Image+Error)'; }}
        />
      </div>

      {/* Right Section: Details */}
      <div className="flex-grow flex flex-col justify-between text-white">
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <h4 className="text-lg font-semibold cursor-pointer hover:underline" onClick={(e) => { e.stopPropagation(); onClick(nft); }}>{nft.name}</h4>
            {nft.nftId && <span className="text-sm font-medium text-gray-300">{nft.nftId}</span>}
            {nft.rank && <span className="text-sm font-medium text-gray-300 ml-2">{nft.rank}</span>}
          </div>

          <div className="bg-purple-200 flex items-center justify-between rounded-md p-2 mb-2">
            <p className="text-xs text-purple-800">Floor price</p>
            <p className="text-lg font-bold text-purple-900">{nft.floorPrice}</p>
            {nft.usdPrice && <p className="text-sm text-purple-700">{nft.usdPrice}</p>}
          </div>

          <div className="text-center cursor-pointer no-underline hover:underline text-sm text-gray-300 mb-2">
            <span>{nft.seller}</span> → <span>{nft.buyer}</span>
          </div>
          {nft.recentTime && <p className="text-center text-xs text-gray-300 mb-3">{nft.recentTime}</p>}
        </div>

        <div className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0 md:space-x-2 mt-2">
          <button
            onClick={(e) => { e.stopPropagation(); onClick(nft); }}
            className="flex-1 text-sm bg-green-500 cursor-pointer text-white py-2 rounded-md font-semibold hover:bg-green-600 transition-colors duration-200"
          >
            See Item
          </button>
          {nft.collection && (
            <button
              onClick={(e) => { e.stopPropagation(); onCollectionClick(nft.collection); }}
              className="flex-1 text-sm cursor-pointer bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition-colors duration-200"
            >
              See Collection
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

ChildNftCard.propTypes = {
  nft: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onCollectionClick: PropTypes.func.isRequired,
};

export default ChildNftCard;