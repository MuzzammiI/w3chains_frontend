import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ChildNftCard from './ChildNftCard';
import { X } from 'lucide-react'; // For close icon

const CollectionDetailPage = ({ collectionData, onClose, onNftClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, [collectionData]);

  if (!collectionData) return null;

  return (
    <div
      className={`fixed inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center p-4 z-50 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className={`bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-500 ${isVisible ? 'scale-100' : 'scale-95'}`}>
        <div className="relative p-6 md:p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 cursor-pointer bg-gray-800 text-white rounded-full p-2 shadow-lg hover:bg-gray-700 transition-colors duration-300"
            aria-label="Close"
          >
            <X size={24} />
          </button>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
            Collection: {collectionData.name}
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Explore NFTs from the {collectionData.name} collection.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {collectionData.nfts.length > 0 ? (
              collectionData.nfts.map(nft => (
                <ChildNftCard
                  key={nft.id}
                  nft={nft}
                  onClick={onNftClick}
                  onCollectionClick={() => { /* No-op or specific collection action */ }}
                />
              ))
            ) : (
              <p className="text-gray-600 col-span-full">No NFTs found in this collection.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

CollectionDetailPage.propTypes = {
  collectionData: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onNftClick: PropTypes.func.isRequired,
};

export default CollectionDetailPage;