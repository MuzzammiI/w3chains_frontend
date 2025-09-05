import { lazy } from "react";
import { Route } from "react-router-dom";
// import { NewsDetailPage } from "../pages/News/NewsDashboardApp.jsx";
import ChainsNotFoundPage from "../components/ChainsNotFoundPage.jsx";

// Lazy-loaded Components for Public Routes
// const NewsFeed = lazy(() => import("../pages/News/NewsFeed"));
// const TestComponent = lazy(() => import("../components/TestComponent"));
// REMOVED: Login and Register imports are now in AuthRoutes.jsx
const ArticleSection = lazy(() => import("../pages/News/ArticleSection"));
const PressReleaseSlider = lazy(() => import("../pages/News/PressReleaseSlider"));
const NewsSection = lazy(() => import("../pages/News/NewsSection"));
const HotAirdropsSection = lazy(() => import("../pages/Airdrops/HotAirdropSection"));
const FreeAirdropsSection = lazy(() => import("../pages/Airdrops/FreeAirdropSection"));
const NewAirdropsSection = lazy(() => import("../pages/Airdrops/NewAirdropSection"));
const AboutPage = lazy(() => import("../pages/About"));
const Trending = lazy(() => import("../pages/Trending"));
const AirdropSection = lazy(() => import("../pages/Airdrops/AirdropSection"));
const Projects = lazy(() => import("../pages/Projects"));
const Funding = lazy(() => import("../pages/Funding"));
const User = lazy(() => import("../pages/userDashboard/User.jsx")); // Consider moving User to ProtectedRoutes if it's authenticated
const NotFoundPage = lazy(() => import("../components/NotFoundPage.jsx"));
const ProjectDiscovery = lazy(() => import("../components/projectDiscovery/ProjectDiscovery.jsx"));
const NFTDiscovery = lazy(() => import("../pages/NFT/NFTDiscovery.jsx"));
const NewsDashboardApp = lazy(() => import("../pages/News/NewsDashboardApp.jsx"));
const TrendingNews = lazy(() => import("../pages/News/TrendingNews.jsx"));
const TopNews = lazy(() => import("../pages/News/TopNews.jsx"));
const MarketRelease = lazy(() => import("../pages/News/MarketRelease.jsx"));
const PressRelease = lazy(() => import("../pages/News/PressRelease.jsx"));
const ProjectsFundingDashboard = lazy(() => import("../pages/Funding/ProjectsFundingDashboard"));
const Partnership = lazy(() => import("../pages/Funding/Partnership.jsx"));
const ArtNFT = lazy(() => import("../pages/NFT/ArtNFT.jsx"));
const GamingNFT = lazy(() => import("../pages/NFT/GamingNFT.jsx"));
const MusicNFT = lazy(() => import("../pages/NFT/MusicNFT.jsx"));
const PhotographyNFT = lazy(() => import("../pages/NFT/PhotographyNFT.jsx"));
const EditorDashboard = lazy(() => import("../components/EditorDashboard.jsx")); // Assuming this is the main dashboard component
// const quilleditor = lazy(() => import("../components/QuillEditor.jsx"));

const PublicRoutes = () => {
  return (
    <>
    
      <Route path="/trending" element={<Trending />} />
      {/* <Route path="/newsfeed" element={<NewsFeed />} /> */}
      <Route path="/airdrops" element={<AirdropSection />} />
      <Route path="/nftdiscovery" element={<NFTDiscovery />} />
    
      <Route path="/news/*" element={<NewsDashboardApp />} />


      <Route path="/trending_news" element={<TrendingNews />} />
      <Route path="/top_news" element={<TopNews />} />
      <Route path="/market_release" element={<MarketRelease />} />
      <Route path="press_release" element={<PressRelease />} />
      <Route path="/funding_dashboard" element={<ProjectsFundingDashboard />} />
      <Route path="/partnership" element={<Partnership />} />
      <Route path="/artnft" element={<ArtNFT />} />
      <Route path="/gamingnft" element={<GamingNFT />} />
      <Route path="/musicnft" element={<MusicNFT />} />
      <Route path="/photographynft" element={<PhotographyNFT />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/funding" element={<Funding />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/articlesection" element={<ArticleSection />} />
      <Route path="/press" element={<PressReleaseSlider />} />
      <Route path="/newssection" element={<NewsSection />} />
      <Route path="/hot_airdrops" element={<HotAirdropsSection searchQuery={"none"} />} />
      <Route path="/free_airdrops" element={<FreeAirdropsSection />} />
      <Route path="/news_airdrops" element={<NewAirdropsSection />} />
      <Route path="/project_discovery" element={<ProjectDiscovery />} />
      {/* <Route path="/testcomponent" element={<TestComponent />} /> */}
      <Route path="/user_dashboard" element={<User />} />
      <Route path="/*" element={<NotFoundPage />} />
      <Route path ="/chains/*" element={<ChainsNotFoundPage/>}/>
      <Route path="/editor_dashboard" element={<EditorDashboard />} />
      {/* Add more public routes as needed */}
      {/* <Route path="/quilleditor" element={<quilleditor />} /> */}


    </>
  );
};

export default PublicRoutes;    









// import { lazy, Suspense } from "react";
// import { Routes, Route } from "react-router-dom";
// import NewsDashboardApp from "../pages/News/NewsDashboardApp.jsx";

// // Lazy-loaded Components for Public Routes
// const ArticleSection = lazy(() => import("../pages/News/ArticleSection"));
// const PressReleaseSlider = lazy(() => import("../pages/News/PressReleaseSlider"));
// const NewsSection = lazy(() => import("../pages/News/NewsSection"));
// const HotAirdropsSection = lazy(() => import("../pages/Airdrops/HotAirdropSection"));
// const FreeAirdropsSection = lazy(() => import("../pages/Airdrops/FreeAirdropSection"));
// const NewAirdropsSection = lazy(() => import("../pages/Airdrops/NewAirdropSection"));
// const AboutPage = lazy(() => import("../pages/About"));
// const Trending = lazy(() => import("../pages/Trending"));
// const AirdropSection = lazy(() => import("../pages/Airdrops/AirdropSection"));
// const Projects = lazy(() => import("../pages/Projects"));
// const Funding = lazy(() => import("../pages/Funding"));
// const User = lazy(() => import("../pages/userDashboard/User.jsx"));
// const ProjectDiscovery = lazy(() => import("../components/projectDiscovery/ProjectDiscovery.jsx"));
// const NFTDiscovery = lazy(() => import("../pages/NFT/NFTDiscovery.jsx"));
// const TrendingNews = lazy(() => import("../pages/News/TrendingNews.jsx"));
// const TopNews = lazy(() => import("../pages/News/TopNews.jsx"));
// const MarketRelease = lazy(() => import("../pages/News/MarketRelease.jsx"));
// const PressRelease = lazy(() => import("../pages/News/PressRelease.jsx"));
// const ProjectsFundingDashboard = lazy(() => import("../pages/Funding/ProjectsFundingDashboard"));
// const Partnership = lazy(() => import("../pages/Funding/Partnership.jsx"));
// const ArtNFT = lazy(() => import("../pages/NFT/ArtNFT.jsx"));
// const GamingNFT = lazy(() => import("../pages/NFT/GamingNFT.jsx"));
// const MusicNFT = lazy(() => import("../pages/NFT/MusicNFT.jsx"));
// const PhotographyNFT = lazy(() => import("../pages/NFT/PhotographyNFT.jsx"));
// const EditorDashboard = lazy(() => import("../components/EditorDashboard.jsx"));

// // NewsDashboardShows and NewsDetailPage (reused from NewsDashboardApp)

// const PublicRoutes = () => {
//   return (
//     <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-600">Loading...</div>}>
//       <Routes>
//         <Route path="/trending" element={<Trending />} />
//         <Route path="/airdrops" element={<AirdropSection />} />
//         <Route path="/nftdiscovery" element={<NFTDiscovery />} />
//         {/* Parent Route for News with Child Routes */}
//         <Route path="/news" element={<NewsDashboardApp/>}/>
//         <Route path="/trending_news" element={<TrendingNews />} />
//         <Route path="/top_news" element={<TopNews />} />
//         <Route path="/market_release" element={<MarketRelease />} />
//         <Route path="/press_release" element={<PressRelease />} />
//         <Route path="/funding_dashboard" element={<ProjectsFundingDashboard />} />
//         <Route path="/partnership" element={<Partnership />} />
//         <Route path="/artnft" element={<ArtNFT />} />
//         <Route path="/gamingnft" element={<GamingNFT />} />
//         <Route path="/musicnft" element={<MusicNFT />} />
//         <Route path="/photographynft" element={<PhotographyNFT />} />
//         <Route path="/projects" element={<Projects />} />
//         <Route path="/funding" element={<Funding />} />
//         <Route path="/about" element={<AboutPage />} />
//         <Route path="/articlesection" element={<ArticleSection />} />
//         <Route path="/press" element={<PressReleaseSlider />} />
//         <Route path="/newssection" element={<NewsSection />} />
//         <Route path="/hot_airdrops" element={<HotAirdropsSection searchQuery="none" />} />
//         <Route path="/free_airdrops" element={<FreeAirdropsSection />} />
//         <Route path="/news_airdrops" element={<NewAirdropsSection />} />
//         <Route path="/project_discovery" element={<ProjectDiscovery />} />
//         <Route path="/user_dashboard" element={<User />} />
//         <Route path="/editor_dashboard" element={<EditorDashboard />} />
//         {/* Add a catch-all route for 404 pages if needed */}
//         {/* <Route path="*" element={<NotFoundPage />} /> */}
//       </Routes>
//     </Suspense>
//   );
// };

// export default PublicRoutes;
