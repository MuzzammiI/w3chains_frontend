import { Suspense, lazy } from "react";
import LoadingBlurOverlay from "../components/LoadingBlurOverlay";
import ScrollToTopButton from "../components/ScrollToTopButton";
import HomeNewsShow from "../UI/HomeNewsShow";
// import NFTShow from "../UI/NFTShow";

const CategoriesSection = lazy(() => import("../UI/CategoriesSection"));
// const NFTAPP = lazy(() => import("../components/Homepage/nftHomePage/NFTAPP"));
// const SubscribeToNewsletter = lazy(() => import("../components/SubscribeToNewsletter"));

const Home = () => {
  return (
    <div className="w-full bg-blue-mix">
      <div className="min-h-screen max-w-full font-mono mt-6 text-white font-inter bg-blue">
        <div className="py-8">
          <Suspense fallback={<LoadingBlurOverlay />}>
            <CategoriesSection />
          </Suspense>
        </div>
        <div className="">
          <Suspense fallback={<LoadingBlurOverlay />}>
            <HomeNewsShow />
          </Suspense>
        </div>
        {/* <div className="py-8">
          <Suspense fallback={<LoadingBlurOverlay />}>
            <NFTShow />
          </Suspense>
        </div>
        <div className="py-8">
          <Suspense fallback={<LoadingBlurOverlay />}>
            <SubscribeToNewsletter />
          </Suspense>
        </div> */}
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default Home;