
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AuthContext } from "../context/AuthContext.jsx";
import bgLoginImg from "../assets/bgLogin.png"; // Ensure this path is correct
import ScrollToTopButton from "../components/ScrollToTopButton.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const { token } = response.data;
      login(token, rememberMe); // Update context with token and set isAuthenticated

      toast.success("You successfully logged in!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/"); // Redirect to dashboard after successful login
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid Credentials!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error("Login error:", err);
    }
  };

  return (
    <>

    <div className="w-[90%] font-mono m-auto flex flex-col h-[90vh] items-center justify-center md:flex-row gap-2">
      <div
        className="w-full md:w-1/2 bg-cover bg-center  md:h-auto"
        // style={{
        //   backgroundImage:
        //     "url('https://img.freepik.com/free-psd/3d-nft-icon-chain_629802-28.jpg?t=st=1746711089~exp=1746714689~hmac=360149128f22fc5a0050e55cad3e19f9ece03779e6e1206c4f6bdc885bce658e&w=826')",
        // }}
        
      >
        <img src={bgLoginImg} alt="Login Background" />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center  p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-md">
          <h2 className="text-gray-500 text-xs sm:text-sm font-medium">
            Welcome back
          </h2>
          <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
            Login to your account
          </h1>
          <form onSubmit={handleLogin}>
            <div className="mb-3 sm:mb-4">
              <label
                className="block text-gray-700 text-xs sm:text-sm font-medium mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                required
              />
            </div>
            <div className="mb-3 sm:mb-4">
              <label
                className="block text-gray-700 text-xs sm:text-sm font-medium mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                required
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-4 sm:mb-6">
              <label className="flex items-center mb-2 sm:mb-0">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-1 sm:mr-2"
                />
                <span className="text-xs sm:text-sm">Remember Me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-blue-500 hover:underline text-xs sm:text-sm"
              >
                Forget password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white font-bold py-2 sm:py-3 rounded-lg hover:bg-green-600 transition text-sm sm:text-base"
            >
              Login now
            </button>
          </form>
          <p className="text-center text-gray-600 text-xs sm:text-sm mt-3 sm:mt-4">
            Do not have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Join free today
            </Link>
          </p>
        </div>
      </div>
    </div>
    <ScrollToTopButton/>
    </>
  );
};

export default Login;





// import { useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import { ethers } from "ethers";
// import { AuthContext } from "../context/AuthContext.jsx";
// // import bgLoginImg from "../assets/bgLogin.png"; // Ensure this path is correct
// import bgLoginImg from "../assets/bgLogin.png"; // Ensure this path is correct

// // import metamaskIcon from "../assets/metamask-icon.png"; // Add a local MetaMask icon
// import ScrollToTopButton from "../components/ScrollToTopButton.jsx";

// const Login = () => {
//   const [emailOrUsername, setEmailOrUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);

//   const validateForm = () => {
//     if (!emailOrUsername) {
//       return "Email or username is required";
//     }
//     if (emailOrUsername.includes("@") && !/^\S+@\S+\.\S+$/.test(emailOrUsername)) {
//       return "Invalid email format";
//     }
//     if (!password) {
//       return "Password is required";
//     }
//     if (password.length < 8) {
//       return "Password must be at least 8 characters";
//     }
//     return "";
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const validationError = validateForm();
//     if (validationError) {
//       setError(validationError);
//       toast.error(validationError, {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/login", {
//         email,
//         password,
//       });

//       const { token, user } = response.data;
//       login(token, user, rememberMe); // Update context with token, user, and rememberMe

//       toast.success("You successfully logged in!", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });

//       setError("");
//       setLoading(false);
//       navigate("/user_dashboard"); // Redirect to dashboard
//     } catch (err) {
//       const errorMessage = Array.isArray(err.response?.data?.message)
//         ? err.response.data.message.join(", ")
//         : err.response?.data?.message || "Invalid credentials";
//       setError(errorMessage);
//       toast.error(errorMessage, {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//       console.error("Login error:", err);
//       setLoading(false);
//     }
//   };

//   const handleMetaMaskLogin = async () => {
//     setLoading(true);
//     try {
//       if (!window.ethereum) {
//         const errorMessage = "MetaMask not detected. Please install MetaMask.";
//         setError(errorMessage);
//         toast.error(errorMessage, {
//           position: "top-right",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//         });
//         setLoading(false);
//         return;
//       }

//       const provider = new ethers.BrowserProvider(window.ethereum);
//       await provider.send("eth_requestAccounts", []);
//       const signer = await provider.getSigner();
//       const walletAddress = await signer.getAddress();

//       // Request nonce
//       const { data: { nonce } } = await axios.post("http://localhost:5000/api/auth/metamask/nonce", {
//         walletAddress,
//         username: emailOrUsername, // Use emailOrUsername as fallback username
//         email: emailOrUsername.includes("@") ? emailOrUsername : "", // Only send email if valid
//       });

//       // Sign message
//       const message = `Sign in to NFT Marketplace: ${nonce}`;
//       const signature = await signer.signMessage(message);

//       // Login
//       const { data: { token, user } } = await axios.post("http://localhost:5000/api/auth/metamask/login", {
//         walletAddress,
//         signature,
//         username: emailOrUsername,
//         email: emailOrUsername.includes("@") ? emailOrUsername : "",
//       });

//       login(token, user, rememberMe); // Update context with token, user, and rememberMe

//       toast.success("You successfully logged in with MetaMask!", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });

//       setError("");
//       setLoading(false);
//       navigate("/dashboard"); // Redirect to dashboard
//     } catch (err) {
//       const errorMessage = Array.isArray(err.response?.data?.message)
//         ? err.response.data.message.join(", ")
//         : err.response?.data?.message || "MetaMask login failed";
//       setError(errorMessage);
//       toast.error(errorMessage, {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//       console.error("MetaMask login error:", err);
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="w-[90%] font-mono m-auto flex flex-col h-[90vh] items-center justify-center md:flex-row gap-2">
//         <div className="w-full md:w-1/2 bg-cover bg-center md:h-auto">
//           <img src={bgLoginImg} alt="Login Background" className="w-full h-full object-cover" />
//         </div>
//         <div className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8">
//           <div className="w-full max-w-md">
//             <h2 className="text-gray-500 text-xs sm:text-sm font-medium">
//               Welcome back
//             </h2>
//             <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
//               Login to your account
//             </h1>
//             {error && <p className="text-red-500 text-xs sm:text-sm mb-4">{error}</p>}
//             <form onSubmit={handleLogin}>
//               <div className="mb-3 sm:mb-4">
//                 <label
//                   className="block text-gray-700 text-xs sm:text-sm font-medium mb-1"
//                   htmlFor="emailOrUsername"
//                 >
//                   Email or Username
//                 </label>
//                 <input
//                   type="text"
//                   id="emailOrUsername"
//                   placeholder="Your email or username"
//                   value={emailOrUsername}
//                   onChange={(e) => {
//                     setEmailOrUsername(e.target.value);
//                     setError("");
//                   }}
//                   className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
//                   required
//                 />
//               </div>
//               <div className="mb-3 sm:mb-4">
//                 <label
//                   className="block text-gray-700 text-xs sm:text-sm font-medium mb-1"
//                   htmlFor="password"
//                 >
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   placeholder="Your password"
//                   value={password}
//                   onChange={(e) => {
//                     setPassword(e.target.value);
//                     setError("");
//                   }}
//                   className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
//                   required
//                 />
//               </div>
//               <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-4 sm:mb-6">
//                 <label className="flex items-center mb-2 sm:mb-0">
//                   <input
//                     type="checkbox"
//                     checked={rememberMe}
//                     onChange={(e) => setRememberMe(e.target.checked)}
//                     className="mr-1 sm:mr-2"
//                   />
//                   <span className="text-xs sm:text-sm">Remember Me</span>
//                 </label>
//                 <Link
//                   to="/forgot-password"
//                   className="text-blue-500 hover:underline text-xs sm:text-sm"
//                 >
//                   Forgot password?
//                 </Link>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-green-500 text-white font-bold py-2 sm:py-3 rounded-lg hover:bg-green-600 transition text-sm sm:text-base disabled:bg-gray-400"
//                 disabled={loading}
//               >
//                 {loading ? "Logging in..." : "Login now"}
//               </button>
//             </form>
//             <button
//               onClick={handleMetaMaskLogin}
//               className="w-full mt-3 sm:mt-4 flex items-center justify-center bg-gray-800 text-white py-2 sm:py-3 rounded-lg hover:bg-gray-900 transition text-sm sm:text-base disabled:bg-gray-400"
//               disabled={loading}
//             >
//               <img
//                 src="https://cdn.iconscout.com/icon/free/png-512/free-metamask-2728406-2261817.png?f=webp&w=512"
//                 alt="MetaMask"
//                 className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2"
//                 onError={(e) => (e.target.src = "https://via.placeholder.com/16")}
//               />
//               Or login with MetaMask
//             </button>
//             <p className="text-center text-gray-600 text-xs sm:text-sm mt-3 sm:mt-4">
//               Do not have an account?{" "}
//               <Link to="/register" className="text-blue-500 hover:underline">
//                 Join free today
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//       <ScrollToTopButton />
//     </>
//   );
// };

// export default Login;