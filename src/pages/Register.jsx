// import { useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import { ethers } from "ethers";
// import { AuthContext } from "../context/AuthContext.jsx";
// import bgregisterImg from "../assets/bgLogin.png"; // Ensure this path is correct
// import ScrollToTopButton from "../components/ScrollToTopButton.jsx";



// const Register = () => {
//   const [user, setUser] = useState({ name: "", email: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleManualSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const [firstName, ...lastNameParts] = user.name.trim().split(" ");
//       const lastName = lastNameParts.join(" ") || "";
//       const username = user.email.split("@")[0]; // Simple username from email

//       const response = await axios.post("http://localhost:5000/api/auth/register", {
//         username,
//         firstName,
//         lastName,
//         email: user.email,
//         password: user.password,
//       });

//       const { token } = response.data; // Assuming the backend returns a token
//       login(token, true); // Store token in localStorage and update auth state

//       toast.success("You are registered successfully!", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });

//       navigate("/"); // Redirect to dashboard after successful registration
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || "Registration failed";
//       setError(errorMessage);
//       toast.error(errorMessage, {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//       console.error("Manual registration error:", err);
//     }
//   };

//   const handleMetaMaskRegister = async () => {
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
//         return;
//       }

//       const provider = new ethers.BrowserProvider(window.ethereum);
//       await provider.send("eth_requestAccounts", []);
//       const signer = await provider.getSigner();
//       const walletAddress = await signer.getAddress();

//       // Request nonce
//       const { data: { nonce } } = await axios.post("http://localhost:5000/api/auth/metamask/nonce", {
//         walletAddress,
//       });

//       // Sign message
//       const message = `Sign in to NFT Marketplace: ${nonce}`;
//       const signature = await signer.signMessage(message);

//       // Login (registers if new user)
//       const { data: { token } } = await axios.post("http://localhost:5000/api/auth/metamask/login", {
//         walletAddress,
//         signature,
//       });

//       login(token, true); // Store token in localStorage and update auth state

//       toast.success("You are registered successfully with MetaMask!", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });

//       navigate("/dashboard"); // Redirect to dashboard
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || "MetaMask registration failed";
//       setError(errorMessage);
//       toast.error(errorMessage, {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//       console.error("MetaMask error:", err);
//     }
//   };

//   return (
//     <>

//     <div className="w-[90%] font-mono m-auto mb-2 h-[90vh] items-center justify-center flex flex-col md:flex-row">
//       <div
//         className="w-full md:w-1/2 bg-cover bg-center flex m-auto md:h-auto"
//         // style={{
//         //   backgroundImage:
//         //     "url('https://img.freepik.com/free-psd/3d-nft-icon-chain_629802-28.jpg?t=st=1746711089~exp=1746714689~hmac=360149128f22fc5a0050e55cad3e19f9ece03779e6e1206c4f6bdc885bce658e&w=826')",
//         // }}
//       >
//         <img src={bgregisterImg} alt="Register Background" />
//       </div>
//       <div className="w-full md:w-1/2 flex items-center justify-center  p-4 sm:p-6 md:p-8">
//         <div className="w-full max-w-md">
//           <h2 className="text-gray-500 text-xs sm:text-sm font-medium">
//             Welcome to registration
//           </h2>
//           <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
//             Create your account
//           </h1>
//           {error && <p className="text-red-500 text-xs sm:text-sm mb-4">{error}</p>}
//           <form onSubmit={handleManualSubmit}>
//             <div className="mb-3 sm:mb-4">
//               <label
//                 className="block text-gray-700 text-xs sm:text-sm font-medium mb-1"
//                 htmlFor="name"
//               >
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 id="name"
//                 placeholder="Your full name"
//                 value={user.name}
//                 onChange={handleChange}
//                 className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
//                 required
//               />
//             </div>
//             <div className="mb-3 sm:mb-4">
//               <label
//                 className="block text-gray-700 text-xs sm:text-sm font-medium mb-1"
//                 htmlFor="email"
//               >
//                 Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 id="email"
//                 placeholder="Your email"
//                 value={user.email}
//                 onChange={handleChange}
//                 className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
//                 required
//               />
//             </div>
//             <div className="mb-3 sm:mb-4">
//               <label
//                 className="block text-gray-700 text-xs sm:text-sm font-medium mb-1"
//                 htmlFor="password"
//               >
//                 Password
//               </label>
//               <input
//                 type="password"
//                 name="password"
//                 id="password"
//                 placeholder="Your password"
//                 value={user.password}
//                 onChange={handleChange}
//                 className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full cursor-pointer bg-green-500 text-white font-bold py-2 sm:py-3 rounded-lg hover:bg-green-600 transition text-sm sm:text-base"
//             >
//               Register now
//             </button>
//           </form>
//           <button
//             onClick={handleMetaMaskRegister}
//             className="w-full mt-3 cursor-pointer sm:mt-4 flex items-center justify-center bg-gray-800 text-white py-2 sm:py-3 rounded-lg hover:bg-gray-900 transition text-sm sm:text-base"
//           >
//             <img
//               src="https://metamask.io/favicon.ico"
//               alt="MetaMask"
//               className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2"
//               onError={(e) => (e.target.src = "https://via.placeholder.com/16")} // Fallback image
//             />
//             Or sign-up with MetaMask
//           </button>
//           <p className="text-center text-gray-600 text-xs sm:text-sm mt-3 sm:mt-4">
//             Already have an account?{" "}
//             <Link to="/login" className="text-blue-500 hover:underline">
//               Login here
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//     <ScrollToTopButton/>
//     </>
//   );
// };

// export default Register;





import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { ethers } from "ethers";
import { AuthContext } from "../context/AuthContext.jsx";
import bgregisterImg from "../assets/bgLogin.png"; // Ensure this path is correct
// import metamaskIcon from "../assets/metamask-icon.png"; // Add a local MetaMask icon
import ScrollToTopButton from "../components/ScrollToTopButton.jsx";

const Register = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setError(""); // Clear error on input change
  };

  const validateForm = () => {
    if (!user.username || user.username.length > 50) {
      return "Username is required and must be 50 characters or less";
    }
    if (!user.email || !/^\S+@\S+\.\S+$/.test(user.email)) {
      return "A valid email is required";
    }
    if (user.password && user.password.length < 8) {
      return "Password must be at least 8 characters if provided";
    }
    return "";
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      toast.error(validationError, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        username: user.username,
        email: user.email,
        password: user.password || undefined,
      });

      toast.success("You are registered successfully! Please log in.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setError("");
      navigate("/login"); // Redirect to login page after registration
    } catch (err) {
      const errorMessage = Array.isArray(err.response?.data?.message)
        ? err.response.data.message.join(", ")
        : err.response?.data?.message || "Registration failed";
      setError(errorMessage);
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error("Manual registration error:", err);
    }
  };

  const handleMetaMaskRegister = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      toast.error(validationError, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    try {
      if (!window.ethereum) {
        const errorMessage = "MetaMask not detected. Please install MetaMask.";
        setError(errorMessage);
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const walletAddress = await signer.getAddress();

      // Request nonce
      const { data: { nonce } } = await axios.post("http://localhost:5000/api/auth/metamask/nonce", {
        walletAddress,
        username: user.username,
        email: user.email,
      });

      // Sign message
      const message = `Sign in to NFT Marketplace: ${nonce}`;
      const signature = await signer.signMessage(message);

      // Login (registers if new user)
      const { data: { token } } = await axios.post("http://localhost:5000/api/auth/metamask/login", {
        walletAddress,
        signature,
        username: user.username,
        email: user.email,
      });

      login(token); // Store token and update auth state

      toast.success("You are registered and logged in with MetaMask!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setError("");
      navigate("/dashboard"); // Redirect to dashboard
    } catch (err) {
      const errorMessage = Array.isArray(err.response?.data?.message)
        ? err.response.data.message.join(", ")
        : err.response?.data?.message || "MetaMask registration failed";
      setError(errorMessage);
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error("MetaMask error:", err);
    }
  };

  return (
    <>
      <div className="w-[90%] font-mono m-auto mb-2 h-[90vh] items-center justify-center flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 bg-cover bg-center flex m-auto md:h-auto">
          <img src={bgregisterImg} alt="Register Background" className="w-full h-full object-cover" />
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8">
          <div className="w-full max-w-md">
            <h2 className="text-gray-500 text-xs sm:text-sm font-medium">
              Welcome to registration
            </h2>
            <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
              Create your account
            </h1>
            {error && <p className="text-red-500 text-xs sm:text-sm mb-4">{error}</p>}
            <form onSubmit={handleManualSubmit}>
              <div className="mb-3 sm:mb-4">
                <label
                  className="block text-gray-700 text-xs sm:text-sm font-medium mb-1"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Your username"
                  value={user.username}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                  required
                />
              </div>
              <div className="mb-3 sm:mb-4">
                <label
                  className="block text-gray-700 text-xs sm:text-sm font-medium mb-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your email"
                  value={user.email}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                  required
                />
              </div>
              <div className="mb-3 sm:mb-4">
                <label
                  className="block text-gray-700 text-xs sm:text-sm font-medium mb-1"
                  htmlFor="password"
                >
                  Password (optional)
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Your password"
                  value={user.password}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                />
              </div>
              <button
                type="submit"
                className="w-full cursor-pointer bg-green-500 text-white font-bold py-2 sm:py-3 rounded-lg hover:bg-green-600 transition text-sm sm:text-base"
              >
                Register now
              </button>
            </form>
            <button
              onClick={handleMetaMaskRegister}
              className="w-full mt-3 sm:mt-4 flex items-center justify-center bg-gray-800 text-white py-2 sm:py-3 rounded-lg hover:bg-gray-900 transition text-sm sm:text-base"
            >
              <img
                src="https://cdn.iconscout.com/icon/free/png-512/free-metamask-2728406-2261817.png?f=webp&w=512"
                alt="MetaMask"
                className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2"
                onError={(e) => (e.target.src = "https://via.placeholder.com/16")}
              />
              Or sign-up with MetaMask
            </button>
            <p className="text-center text-gray-600 text-xs sm:text-sm mt-3 sm:mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
      <ScrollToTopButton />
    </>
  );
};

export default Register;