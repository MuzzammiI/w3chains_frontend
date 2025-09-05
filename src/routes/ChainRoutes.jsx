import { lazy } from "react";
import { Route } from "react-router-dom";

// Data imports for chain routes
import { chainsData } from "../pages/chains/allchainsData.js";
import { nftChainsData } from "../pages/chains/nftData.js";
import { newsChainsData } from "../pages/chains/newsData.js";
import { platformsChainsData } from "../pages/chains/platfromsData.js";
import { dappsChainsData } from "../pages/chains/dappsData.js";
import { pressReleaseChainsData } from "../pages/chains/pressReleaseData.js";
import { reportsChainsData } from "../pages/chains/reportsData.js";

// Lazy-loaded Components for Chain Routes
const BlockchainPage = lazy(() => import("../pages/chains/BlockchainPage.jsx"));
const ChainNFTsDashboard = lazy(() => import("../pages/chains/ChainNFTsDashboard.jsx"));
const ChainsNews = lazy(() => import("../pages/chains/ChainsNews.jsx"));
const PlatformsDashboard = lazy(() => import("../pages/chains/PlatformsDashboard.jsx"));
const ChainsDapps = lazy(() => import("../pages/chains/ChainsDapps.jsx"));
const PressMarketRelease = lazy(() => import("../pages/chains/PressMarketRelease.jsx"));

const ChainRoutes = () => {
  return (
    <>
      {chainsData.map((chain, index) => (
        <Route
          key={index}
          path={`/chains/${chain.name.toLowerCase()}`}
          element={<BlockchainPage chainName={`${chain.name}`} />}
        />
      ))}

      {nftChainsData.map((chain, index) => (
        <Route
          key={index}
          path={`/chains/${chain.name.toLowerCase()}/nft`}
          element={<ChainNFTsDashboard chainName={`${chain.name}`} />}
        />
      ))}

      {newsChainsData.map((chain, index) => (
        <Route
          key={index}
          path={`/chains/${chain.name.toLowerCase()}/news`}
          element={<ChainsNews chainName={`${chain.name}`} />}
        />
      ))}

      {platformsChainsData.map((chain, index) => (
        <Route
          key={index}
          path={`/chains/${chain.name.toLowerCase()}/platforms`}
          element={<PlatformsDashboard chainName={`${chain.name}`} />}
        />
      ))}
      {dappsChainsData.map((chain, index) => (
        <Route
          key={index}
          path={`/chains/${chain.name.toLowerCase()}/dapps`}
          element={<ChainsDapps chainName={`${chain.name}`} />}
        />
      ))}

      {pressReleaseChainsData.map((chain, index) => (
        <Route
          key={index}
          path={`/chains/${chain.name.toLowerCase()}/press&market`}
          element={<PressMarketRelease chainName={`${chain.name}`} />}
        />
      ))}

      {reportsChainsData.map((chain, index) => (
        <Route
          key={index}
          path={`/chains/${chain.name.toLowerCase()}/reports`}
          element={<PressMarketRelease chainName={`${chain.name}`} />}
        />
      ))}
    </>
  );
};

export default ChainRoutes;
