import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center gap-6"
      >
        {/* Animated Spinner */}
        <div className="relative w-28 h-28">
          <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-b-transparent border-r-red-500 border-l-red-300 animate-spin shadow-xl"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="text-3xl"
            >
              🛍️
            </motion.div>
          </div>
        </div>

        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 text-lg font-semibold animate-pulse"
        >
          Getting your products ready...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Loader;
