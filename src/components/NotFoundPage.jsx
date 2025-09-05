import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col items-center justify-center p-6 text-white font-sans">
      {/* Icon with Framer Motion */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-4"
      >
        <AlertCircle className="w-16 h-16 text-purple-500" />
      </motion.div>

      {/* 404 Number with Bounce Animation */}
      <motion.h1
        className="text-7xl md:text-9xl font-extrabold text-purple-500 drop-shadow-lg mb-4"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        404
      </motion.h1>

      {/* Heading and Message */}
      <motion.h2
        className="text-2xl md:text-3xl font-semibold text-white mb-3 drop-shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Page Not Found
      </motion.h2>

      <motion.p
        className="text-gray-300 max-w-md mx-auto text-center mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        The URL you&apos;re trying to access doesn&apos;t exist or may have been moved. Let&apos;s get you back on track.
      </motion.p>

      {/* Button */}
      <motion.button
        onClick={() => navigate("/")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-2 px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-600 transition-all duration-200"
      >
        Back to Home
      </motion.button>
    </div>
  );
};

export default NotFoundPage;
