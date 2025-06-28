import { useEffect, useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { RxCross2 } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  '🔥 Black Friday Mega Sale is LIVE!',
  '🛍️ Up to 13% OFF on all categories!',
  '🚚 Free shipping on orders above $50!',
  '🎁 Exclusive doorbusters — limited time only!',
];

const Topbar = () => {
  const [showTopbar, setShowTopbar] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);

  const handleShowTopbar = () => setShowTopbar(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {showTopbar && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-gradient-to-r from-black via-gray-900 to-black text-white text-sm md:text-base z-50 shadow-md"
        >
          <div className="main-container flex justify-between items-center py-3 px-4 lg:px-10 relative overflow-hidden">
            {/* Black Friday Tag */}
            <div className="flex gap-x-2 items-center">
              <p className="bg-yellow-400 text-black px-2 py-1 -rotate-6 rounded-md font-bold text-xs md:text-sm shadow-sm">
                Black
              </p>
              <span className="font-semibold text-white">Friday</span>
            </div>

            {/* Animated Ticker */}
            <div className="flex-1 text-center overflow-hidden px-2">
              <motion.p
                key={messageIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-yellow-300 font-medium text-sm md:text-base whitespace-nowrap"
              >
                {messages[messageIndex]}
              </motion.p>
            </div>

            {/* CTA Button */}
            <div className="flex-shrink-0">
              <Link to="/shop">
                <button className="bg-yellow-400 hover:bg-yellow-300 transition-colors duration-200 py-2 px-4 md:px-6 rounded-md text-black font-semibold flex items-center gap-x-2 shadow">
                  Shop Now <FaArrowRightLong />
                </button>
              </Link>
            </div>

            {/* Close Button */}
            <button
              onClick={handleShowTopbar}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black p-1 rounded hover:bg-gray-200 transition"
              aria-label="Dismiss notification"
            >
              <RxCross2 />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Topbar;
