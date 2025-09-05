import React, { useState, useEffect, useCallback,useRef } from 'react';
import MainNftCard from '../nftHomePage/components/MainNftCard';
import ChildNftCard from '../nftHomePage/components/ChildNftCard';
import TrendsNftTable from '../nftHomePage/components/TrendsNftTable';
import NftDetailPage from '../nftHomePage/components/NftDetailPage';
import CollectionDetailPage from '../nftHomePage/components/CollectionDetailPage';
// import '../../../index.css'

import nftData from '../nftHomePage/data/nftData.json';

const NFTAPP = () => {
  const [mainNfts, setMainNfts] = useState([]);
  const [childNfts, setChildNfts] = useState([]);
  const [trendNfts, setTrendNfts] = useState([]);
  const [currentMainNftIndex, setCurrentMainNftIndex] = useState(0);
  const [selectedNft, setSelectedNft] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const autoAdvanceIntervalRef = useRef(null);

  // Function to start (or restart) the auto-advance interval
  const startAutoAdvance = useCallback((numNfts) => {
    // Clear any existing interval first using the ref
    if (autoAdvanceIntervalRef.current) {
      clearInterval(autoAdvanceIntervalRef.current);
    }
    if (numNfts > 0) {
      const interval = setInterval(() => {
        setCurrentMainNftIndex(prevIndex =>
          (prevIndex + 1) % numNfts
        );
      }, 5000);
      autoAdvanceIntervalRef.current = interval;
    }
  }, []);

  useEffect(() => {
    // Separate NFTs based on their type
    const main = nftData.filter(nft => nft.type === 'main');
    const children = nftData.filter(nft => nft.type === 'child');
    const trends = nftData.filter(nft => nft.type === 'trend');

    setMainNfts(main);
    setChildNfts(children);
    setTrendNfts(trends);

    // Initial auto-advance setup
    startAutoAdvance(main.length);

    return () => {
      // Clear interval on unmount or re-render of this effect
      if (autoAdvanceIntervalRef.current) {
        clearInterval(autoAdvanceIntervalRef.current);
      }
    };
  }, [startAutoAdvance]);

  const handleNftClick = (nft) => {
    setSelectedNft(nft);
    // When an NFT detail page opens, clear collection detail if open
    setSelectedCollection(null);
    // Clear auto-advance on manual interaction
    if (autoAdvanceIntervalRef.current) {
      clearInterval(autoAdvanceIntervalRef.current);
      autoAdvanceIntervalRef.current = null;
    }
  };

  const handleCloseNftDetail = () => {
    setSelectedNft(null);
    // Restart auto-advance when closing the detail page
    startAutoAdvance(mainNfts.length);
  };

  const handleCollectionClick = (collectionName) => {
    // Find all NFTs belonging to this collection
    const collectionNfts = nftData.filter(nft => nft.collection === collectionName && nft.type !== 'trend');
    setSelectedCollection({
      name: collectionName,
      nfts: collectionNfts
    });
    // When a collection detail page opens, clear NFT detail if open
    setSelectedNft(null);
    // Clear auto-advance on manual interaction
    if (autoAdvanceIntervalRef.current) {
      clearInterval(autoAdvanceIntervalRef.current);
      autoAdvanceIntervalRef.current = null;
    }
  };

  const handleCloseCollectionDetail = () => {
    setSelectedCollection(null);
    // Restart auto-advance when closing the detail page
    startAutoAdvance(mainNfts.length);
  };


  const handlePrevNft = () => {
    // Clear auto-advance on manual interaction
    if (autoAdvanceIntervalRef.current) {
      clearInterval(autoAdvanceIntervalRef.current);
      autoAdvanceIntervalRef.current = null;
    }
    setCurrentMainNftIndex(prevIndex =>
      (prevIndex - 1 + mainNfts.length) % mainNfts.length
    );
  };

  const handleNextNft = () => {
    // Clear auto-advance on manual interaction
    if (autoAdvanceIntervalRef.current) {
      clearInterval(autoAdvanceIntervalRef.current);
      autoAdvanceIntervalRef.current = null;
    }
    setCurrentMainNftIndex(prevIndex =>
      (prevIndex + 1) % mainNfts.length
    );
  };

  const handleDotClick = (index) => {
    // Clear auto-advance on manual interaction
    if (autoAdvanceIntervalRef.current) {
      clearInterval(autoAdvanceIntervalRef.current);
      autoAdvanceIntervalRef.current = null;
    }
    setCurrentMainNftIndex(index);
  };

  return (
    <div className="min-h-screen  rounded-lg shadow-lg  text-gray-100 font-sans p-4 md:p-8 relative">
      <style jsx>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
body {
  font-family: 'Inter', sans-serif;
}
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

  .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
  .animate-scale-in { animation: scaleIn 0.3s ease-out forwards; }
  .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 animate-fade-in">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
              Top NFT
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              Discover the hottest NFTs on the market.
            </p>
          </div>
          <button className="mt-4 md:mt-0 bg-teal-500 text-gray-900 px-6 py-2 rounded-full font-semibold hover:bg-teal-400 transition-colors duration-300 shadow-md">
            See More
          </button>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section: Main NFT & Child NFTs */}
          <section className="lg:col-span-2">
            {/* Main NFT */}
            {mainNfts.length > 0 && (
              <div className="mb-8">
                <MainNftCard
                  nft={mainNfts[currentMainNftIndex]}
                  onClick={handleNftClick}
                  onPrev={handlePrevNft}
                  onNext={handleNextNft}
                  totalNfts={mainNfts.length}
                  currentNftIndex={currentMainNftIndex}
                  onDotClick={handleDotClick}
                />
              </div>
            )}

            {/* Child NFTs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {childNfts.map(nft => (
                <ChildNftCard
                  key={nft.id}
                  nft={nft}
                  onClick={handleNftClick}
                  onCollectionClick={handleCollectionClick} // Pass new handler
                />
              ))}
            </div>
          </section>

          {/* Right Section: Trends NFT */}
          <aside className="lg:col-span-1">
            <TrendsNftTable trends={trendNfts} onClick={handleNftClick} />
          </aside>
        </div>
      </div>

      {/* NFT Detail Page */}
      <NftDetailPage
        nft={selectedNft}
        onClose={handleCloseNftDetail}
        onNftClick={handleNftClick}
        onCollectionClick={handleCollectionClick}
      />

      {/* Collection Detail Page */}
      <CollectionDetailPage
        collectionData={selectedCollection}
        onClose={handleCloseCollectionDetail}
        onNftClick={handleNftClick} // Allow clicking NFTs within collection to open their detail
      />
    </div>
  );
};

export default NFTAPP;