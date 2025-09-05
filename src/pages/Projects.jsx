import { useState, useEffect } from "react";
import ScrollToTopButton from "../components/ScrollToTopButton";
import { 
  Banknote, 
  Paintbrush, 
  Gamepad2, 
  Globe, 
  Link, 
  Package  // Fixed: Replacing Cube with Package
} from "lucide-react"; 

const projectsData = [
  {
    id: 1,
    name: "EtherVault",
    category: "DeFi",
    description: "A decentralized finance platform for secure lending.",
    website: "https://ethervault.com",
  },
  {
    id: 2,
    name: "NFT Galaxy",
    category: "NFT",
    description: "A marketplace for next-gen NFT artists and collectors.",
    website: "https://nftgalaxy.com",
  },
  {
    id: 3,
    name: "CryptoRacers",
    category: "Gaming",
    description: "A play-to-earn blockchain racing game.",
    website: "https://cryptoracers.io",
  },
  {
    id: 4,
    name: "Web3 Social",
    category: "Web3",
    description: "A decentralized social media platform with no censorship.",
    website: "https://web3social.com",
  },
  {
    id: 5,
    name: "MetaArt",
    category: "NFT",
    description: "A virtual NFT art gallery in the metaverse.",
    website: "https://metaart.io",
  },
  {
    id: 6,
    name: "BlockScanner",
    category: "Blockchain",
    description: "A blockchain explorer to track transactions in real-time.",
    website: "https://blockscanner.com",
  },
];

const categories = ["All", "DeFi", "NFT", "Gaming", "Web3", "Blockchain"];

const getCategoryIcon = (category) => {
  switch (category) {
    case "DeFi":
      return <Banknote className="text-yellow-300 w-6 h-6" />;
    case "NFT":
      return <Paintbrush className="text-blue-400 w-6 h-6" />;
    case "Gaming":
      return <Gamepad2 className="text-green-400 w-6 h-6" />;
    case "Web3":
      return <Globe className="text-purple-400 w-6 h-6" />;
    case "Blockchain":
      return <Package className="text-pink-400 w-6 h-6" />; // Fixed this
    default:
      return <Link className="text-gray-400 w-6 h-6" />;
  }
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    setProjects(projectsData);
  }, []);

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "All" || project.category === selectedCategory)
  );

  return (
    <>

    <div className="bg-gray-900 font-mono min-h-screen text-white py-10 px-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-yellow-400 mb-6">
          Explore Crypto Projects 🚀
        </h1>
        <p className="text-center text-gray-300 mb-8">
          Discover the most exciting blockchain and Web3 projects in the industry.
        </p>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <input
            type="text"
            placeholder="Search Projects..."
            className="w-full md:w-1/3 p-2 rounded bg-gray-800 text-white border border-gray-600 mb-3 md:mb-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-yellow-400 text-gray-900"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Project List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              >
                {/* Icon and Title */}
                <div className="flex items-center gap-3">
                  {getCategoryIcon(project.category)}
                  <h2 className="text-xl font-bold text-yellow-300">{project.name}</h2>
                </div>

                <p className="text-gray-400">{project.category}</p>
                <p className="mt-2 text-gray-300">{project.description}</p>
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-yellow-400 hover:underline"
                >
                  Visit Website →
                </a>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No projects found.</p>
          )}
        </div>
      </div>
    </div>
        <ScrollToTopButton />
    
    </>
  );
};

export default Projects;
