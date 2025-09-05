
import "./index.css";
import Footer from "./UI/Footer.jsx";
import MainNavbar from "./components/MainNavbar.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes";

const App = () => {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen font-sans">
        <MainNavbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto mt-15">
          <AppRoutes /> {/* Main routing logic */}
        </main>
        <Footer />
        <ToastContainer />
      </div>
    </AuthProvider>
  );
};

export default App;





















