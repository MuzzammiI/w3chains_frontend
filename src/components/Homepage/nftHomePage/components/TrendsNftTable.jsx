import React from 'react';
import PropTypes from 'prop-types';

const TrendsNftTable = ({ trends, onClick }) => {
  return (
    <div className="border border-gray-500 rounded-xl shadow-lg p-6 animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-bold text-teal-400 mb-6">
        Trends NFT
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-purple-800">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                COLLECTION
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                FLOOR PRICE
              </th>
              {/* <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                TO CHANGE
              </th> */}
              {/* <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                TOP OFFER
              </th> */}
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                1D VOL
              </th>
              {/* <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                OWNERS
              </th> */}
            </tr>
          </thead>
          <tbody className=" divide-y divide-gray-700">
            {trends.map((nft) => (
              <tr key={nft.id} className="hover:bg-purple-900 transition-colors duration-200 cursor-pointer" onClick={() => onClick(nft)}>
                <td className="px-4 py-4 whitespace-nowrap text-xs font-medium text-white">
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-2">★</span> {nft.collection}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-200">
                  {nft.floorPrice}
                </td>
                {/* <td className={`px-4 py-4 whitespace-nowrap text-sm ${nft.toChange.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {nft.toChange}
                </td> */}
                {/* <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-200">
                  {nft.topOffer}
                </td> */}
                <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-200">
                  {nft.vol}
                </td>
                {/* <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-200">
                  {nft.ownerCount}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

TrendsNftTable.propTypes = {
  trends: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TrendsNftTable;