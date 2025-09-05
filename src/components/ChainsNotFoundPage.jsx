import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const ChainsNotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 text-center">
      {/* Icon with animation */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-6"
      >
        <AlertTriangle className="w-16 h-16 text-purple-400 animate-pulse" />
      </motion.div>

      {/* Animated Heading */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold mb-4"
      >
        Chains Data Unavailable
      </motion.h1>

      {/* Animated Subtext */}
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-gray-300 text-lg max-w-md"
      >
        We&apos;re actively working to bring this data to you. Please check back soon — exciting updates are on the way!
      </motion.p>

      {/* Optional shimmer or wave effect on a bar */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ delay: 1, duration: 1.2 }}
        className="mt-10 h-1 w-full max-w-md bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 rounded-full animate-pulse"
      />
    </div>
  );
};

export default ChainsNotFoundPage;
