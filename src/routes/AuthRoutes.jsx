import { lazy } from "react";
import { Route } from "react-router-dom";

// Lazy-loaded Authentication Components
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
// Assuming you have a WalletConnect component, if not, create a placeholder
// const WalletConnect = lazy(() => import("../components/WalletConnect")); // Create this file if it doesn't exist

const AuthRoutes = () => {
  return (
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Add a route for WalletConnect if it's a separate page */}
      {/* <Route path="/wallet-connect" element={<WalletConnect />} /> */}
    </>
  );
};

export default AuthRoutes;
