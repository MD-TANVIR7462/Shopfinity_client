import { useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { RxCross2 } from 'react-icons/rx';
import { Link } from 'react-router-dom';

const Topbar = () => {
  const [showTopbar, setShowTopbar] = useState(true);

  const handleShowTopbar = () => {
    setShowTopbar(!showTopbar);
  };

  if (!showTopbar) return null;

  return (
    <div className="bg-custom-black text-sm lg:text-base">
      <div className="main-container flex justify-start lg:justify-between items-center text-white py-4 md:py-2 lg:py-0 lg:h-16 gap-x-7 md:space-x-28 md:gap-x-0">
        <div className="flex gap-x-1 lg:gap-x-2">
          <p className="bg-yellow text-custom-black px-2 py-1 -rotate-6 rounded font-semibold">
            Black
          </p>
          <span>Friday</span>
        </div>
        <div className="flex gap-x-1 lg:gap-x-2 items-center">
          <span className="hidden md:inline-block">Up to</span>{' '}
          <span className="text-xl md:text-2xl lg:text-4xl text-deep-yellow font-semibold">
            13%
          </span>{' '}
          <span className="text-sm md:text-base">OFF</span>
        </div>
        <div>
          <Link to="/shop">
            <button className="bg-deep-yellow py-1.5 md:py-2 lg:py-2.5 px-2 lg:px-6 rounded text-custom-black font-semibold flex items-center gap-x-1 md:gap-x-2">
              Shop Now <FaArrowRightLong />
            </button>
          </Link>
        </div>
        <div className="absolute right-1 md:right-3">
          <button className="bg-gray p-1" onClick={handleShowTopbar}>
            <RxCross2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
