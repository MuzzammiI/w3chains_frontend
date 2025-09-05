

import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Import the route groups (returning fragments of <Route>)
import PublicRoutes from "./PublicRoutes";
import ChainRoutes from "./ChainRoutes";
import AuthRoutes from "./AuthRoutes";

// Eagerly loaded Home component
import Home from "../pages/Home";
import LoadingBlurOverlay from "../components/LoadingBlurOverlay";

// Lazy load optional components
// const CryptoTicker = lazy(() => import("../components/CryptoTicker"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingBlurOverlay />}>
      {/* Main application routes */}
      <Routes>
        {/* Home route */}
        <Route path="/" element={<Home />} />

        {/* Inject all route groups directly */}
        {PublicRoutes()}
        {AuthRoutes()}
        {ChainRoutes()}
      </Routes>

      {/* Uncomment if CryptoTicker is needed */}
      {/* <CryptoTicker /> */}
    </Suspense>
  );
};

export default AppRoutes;




