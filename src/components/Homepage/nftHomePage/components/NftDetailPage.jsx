import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NFTPriceComparator from './NFTPriceComparator'; // Import the new component
import { X } from 'lucide-react'; // For close icon


const NftDetailPage = ({ nft, onClose, onNftClick, onCollectionClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, [nft]);

  if (!nft) return null;

  return (
    <div className={`fixed inset-0 bg-gradient-to-br from-blue-900 via-gray-900 to-purple-900 bg-opacity-90 flex items-center justify-center p-4 z-50 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-purple-900 rounded-xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-500 ${isVisible ? 'scale-100' : 'scale-95'}`}>
        <div className="relative w-full">
          <img src={nft.image} className='w-full object-cover bg-center h-56' />
          <button onClick={onClose} className="absolute top-4 right-4 cursor-pointer bg-gray-800 text-white rounded-full p-2 shadow-lg hover:bg-gray-700 transition-colors duration-300" aria-label="Close">
            <X size={24} />
          </button>
        </div>
        <div className="p-6 md:p-8 ">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-200 mb-4 leading-tight">{nft.name} {nft.nftId}</h1>
          <div className="flex flex-wrap items-center text-sm text-gray-400 mb-6 space-x-4">
            {nft.collection && <span>Collection: <span className="font-semibold">{nft.collection}</span></span>}
            {nft.floorPrice && <span>Floor Price: <span className="font-semibold">{nft.floorPrice} ({nft.usdPrice})</span></span>}
            {nft.ownerCount && <span>Owners: <span className="font-semibold">{nft.ownerCount}</span></span>}
          </div>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed whitespace-pre-wrap">{nft.fullContent || nft.description || 'No full content available for this NFT.'}</p>
        </div>
        <NFTPriceComparator
          onNftClick={onNftClick}
          onCollectionClick={onCollectionClick}
          initialSelectedNftName={nft.name} // Pass the name of the currently viewed NFT
        />
      </div>
    </div>
  );
};

NftDetailPage.propTypes = {
  nft: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onNftClick: PropTypes.func.isRequired,
  onCollectionClick: PropTypes.func.isRequired,
};

export default NftDetailPage;
