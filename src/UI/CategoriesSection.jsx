import React from "react";
import PropTypes from "prop-types";
const { useState, useEffect } = React;
import { Link } from "react-router-dom";
import ButtonCard from "../components/ButtonCard";

import { ChevronDown, ChevronUp } from "lucide-react";

const categories = [
  { id: 1, title: "Bitcoin", icon: "💰", link: "/chains/bitcoin" },
  { id: 2, title: "Ethereum", icon: "🔷", link: "/chains/ethereum" },
  { id: 3, title: "Solana", icon: "⚡", link: "/chains/solana" },
  { id: 4, title: "Cardano", icon: "🧠", link: "/chains/cardano" },
  { id: 5, title: "Polkadot", icon: "🎯", link: "/chains/polkadot" },
  { id: 6, title: "Avalanche", icon: "🏔️", link: "/chains/avalanche" },
  { id: 7, title: "BNB Chain", icon: "🦊", link: "/chains/binance" },
  { id: 8, title: "Tron", icon: "🚀", link: "/chains/tron" },
  { id: 9, title: "Fantom", icon: "👻", link: "/chains/fantom" },
  { id: 10, title: "NEAR Protocol", icon: "📡", link: "/chains/near" },
  { id: 11, title: "Tezos", icon: "⚖️", link: "/chains/tezos" },
  { id: 12, title: "Algorand", icon: "🔢", link: "/chains/algorand" },
  { id: 13, title: "Cosmos", icon: "�", link: "/chains/cosmos" },
  { id: 14, title: "Harmony", icon: "🎶", link: "/chains/harmony" },
  { id: 15, title: "MultiversX", icon: "🌐", link: "/chains/multiversx" },
  { id: 16, title: "Aptos", icon: "🌱", link: "/chains/aptos" },
  { id: 17, title: "Sui", icon: "💧", link: "/chains/sui" },
  { id: 18, title: "Arbitrum", icon: "⚖️", link: "/chains/arbitrum" },
  { id: 19, title: "Optimism", icon: "🌟", link: "/chains/optimism" },
  { id: 20, title: "Polygon", icon: "🔺", link: "/chains/polygon" },
  { id: 21, title: "zkSync", icon: "🌀", link: "/chains/zksync" },
  { id: 22, title: "StarkNet", icon: "🌩️", link: "/chains/starknet" },
  { id: 23, title: "Base", icon: "🏛️", link: "/chains/base" },
  { id: 24, title: "Flow", icon: "💧", link: "/chains/flow" },
  { id: 25, title: "Internet Computer", icon: "🖥️", link: "/chains/icp" },
  { id: 26, title: "EOS", icon: "📦", link: "/chains/eos" },
  { id: 27, title: "Hedera", icon: "🌿", link: "/chains/hedera" },
  { id: 28, title: "Celo", icon: "📲", link: "/chains/celo" },
  { id: 29, title: "Klaytn", icon: "🟫", link: "/chains/klaytn" },
  { id: 30, title: "Chia", icon: "🌾", link: "/chains/chia" },
];

// CategoryComponent displays a single category card.
const CategoryComponent = ({ title, icon, link }) => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Link
      to={link}
      onClick={handleClick}
      className="category-card bg-purple-900 p-4 rounded-lg shadow-md flex items-center justify-between border-2 border-purple-600 hover:border-2 hover:border-purple-700 transition"
    >
      <span className="text-md">{icon}</span>
      <span className="font-semibold text-sm">{title}</span>
      <span>→</span>
    </Link>
  );
};

// PropTypes for CategoryComponent to ensure type-checking.
CategoryComponent.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

// CategoriesSection is the main component that displays the list of categories.
const CategoriesSection = () => {
  // State to manage how many categories are currently visible.
  const [visibleCount, setVisibleCount] = useState(5);
  // State to manage the search term entered by the user.
  const [searchTerm, setSearchTerm] = useState("");

  // Filter the categories based on the search term.
  // Converts both the category title and search term to lowercase for case-insensitive search.
  const filteredCategories = categories.filter((category) =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handler for the "See More" button.
  // Increases the visible count by 4, up to the total number of filtered categories.
  const handleSeeMore = () => {
    setVisibleCount((prev) => Math.min(prev + 5, filteredCategories.length));
  };

  // Handler for the "See Less" button.
  // Resets the visible count back to 4.
  const handleSeeLess = () => {
    setVisibleCount(5);
  };

  // useEffect hook to apply animation classes to category cards.
  // This runs whenever visibleCount or filteredCategories change.
  useEffect(() => {
    const cards = document.querySelectorAll(".category-card");
    cards.forEach((card, index) => {
      // Add 'visible' class with a slight delay for a staggered animation effect.
      setTimeout(() => {
        card.classList.add("visible");
      }, index * 100);
    });
  }, [visibleCount, filteredCategories]); // Re-run effect if visibleCount or filteredCategories change.

  return (
    <div className="w-full font-mono mx-auto py-8  rounded-xl p-6 sm:p-8 lg:p-10 mb-8">
      {/* Header section with title and search bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h2 className="text-2xl font-bold">Categories for you</h2>
        {/* Search input field */}
        <input
          type="text"
          placeholder="Search chains..."
          className="p-2 rounded-md bg-purple-800 text-white border border-purple-700 focus:outline-none focus:purple-blue-500 w-full sm:w-auto"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setVisibleCount(5); // Reset visible count when search term changes
          }}
        />
      </div>
      <p className="text-gray-300 mb-6">
        Stay Updated, Explore the Best Categories, and Never Miss Out on
        What&apos;s Happening in the Crypto World!
      </p>

      {/* Grid for displaying category cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2">
        {/* Map over filtered categories and slice to show only visible ones */}
        {filteredCategories.slice(0, visibleCount).map((category) => (
          <CategoryComponent
            key={category.id}
            title={category.title}
            icon={category.icon}
            link={category.link}
          />
        ))}
      </div>

      {/* Conditional rendering for "See More" and "See Less" buttons */}
      {filteredCategories.length > 0 && ( // Only show buttons if there are any filtered categories
        <div className="mt-4 flex justify-center gap-4">
          {/* "See More" button */}
          {visibleCount < filteredCategories.length && (
            <ButtonCard
              background="bg-gradient-to-r from-purple-500 to-zinc-500"
              icon={ChevronDown}
              size="medium"
              
              animationType="rotate"
              iconPosition="left"
              onClick={handleSeeMore}
            >
              See more
            </ButtonCard>
          )}
          {/* "See Less" button */}
          {visibleCount > 5 && (
            <ButtonCard
              background="bg-gradient-to-r from-purple-500 to-zinc-500"
              icon={ChevronUp}
              size="medium"
              animationType="rotate"
              iconPosition="left"
              onClick={handleSeeLess}
            >
              See less
            </ButtonCard>
          )}
        </div>
      )}

      {/* Message when no categories are found for the search term */}
      {filteredCategories.length === 0 && searchTerm !== "" && (
        <p className="text-center text-gray-300 mt-4">
          oho .. No categories found for &quot{searchTerm}&quot.
        </p>
      )}
    </div>
  );
};

export default CategoriesSection;
