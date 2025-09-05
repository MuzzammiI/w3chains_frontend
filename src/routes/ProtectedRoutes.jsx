// src/routes/ProtectedRoutes.jsx
import { lazy } from "react";
import { Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext.jsx";
// import DashboardLayout from "../pages/userDashboard/Sidebar.jsx";
// import { useAuth } from '../context/AuthContext'; // Assuming you have a useAuth hook
// import { Navigate } from 'react-router-dom';
// import Sidebar from "../pages/userDashboard/Sidebar.jsx";

const User = lazy(() => import("../pages/userDashboard/User.jsx"));

// const AdminDashboard = lazy(() => import("../pages/AdminDashboard.jsx")); // Example protected admin route

// A simple AuthGuard component (can be more complex with actual auth logic)
// const AuthGuard = ({ children }) => {
//   const { isAuthenticated } = useAuth(); // Get auth status from context
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />; // Redirect to login if not authenticated
//   }
//   return children;
// };

const ProtectedRoutes = () => {
  return (
    // You would typically wrap these in an AuthGuard component
    // <Route element={<AuthGuard />}>

    <>
      <AuthProvider>
        <Route path="/user_dashboard" element={<User />} />
        {/* <Route path="/admin_dashboard" element={<AdminDashboard />} /> */}
      </AuthProvider>
    </>
    // </Route>
  );
};

export default ProtectedRoutes;

// Then, you would import ProtectedRoutes into src/routes/index.jsx just like PublicRoutes and ChainRoutes.
