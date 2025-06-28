import { Link } from 'react-router-dom';
import androidapp from '../../assets/images/download-android.png';
import appleapp from '../../assets/images/download-apple.png';
import logo from '../../assets/images/logo.png';

const Footer = () => {
  return (
    <div className="bg-custom-black pt-10 lg:pt-16 pb-4">
      <div className="main-container text-white grid grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-10 lg:gap-x-28 lg:gap-y-0 justify-items-center">
        {/* logo */}
        <div className="col-sapn-12 lg:col-span-3 ml-10 lg:ml-0">
          <Link className="flex gap-x-1 lg:gap-x-2 items-center lg:w-24" to="/">
            <img
              src={logo}
              alt="GizmoBuy"
              className="w-6 lg:w-8 h-6 lg:h-8 object-cover"
            />
            <span className="font-bold text-base lg:text-xl">GizmoBuy</span>
          </Link>
          <div>
            <p className="text-offgray text-sm mt-4 lg:mt-6">
              Customer Support:
            </p>
            <p className="text-sm lg:text-base">+880-1740-020464</p>
          </div>
          <div className="my-4 lg:my-5 text-sm text-offgray">
            Jinjirtala, Dhunat Pouroshava <br />
            Dhunat 5850, Bogura, Bangladesh
          </div>
          <div className="text-sm lg:text-base">babulakterfsd@gmail.com</div>
        </div>
        {/* top categories */}
        <div className="col-sapn-12 lg:col-span-3 ">
          <p className="uppercase font-semibold mb-4 text-sm lg:text-base">
            top categoris
          </p>
          <div className="links flex flex-col gap-y-3">
            <Link
              to="/shop"
              className="text-offgray font-semibold text-sm hover:text-yellow-200 hover:pl-1 hover:transition-all duration-300"
            >
              Desktop
            </Link>
            <Link
              to="/shop"
              className="text-offgray font-semibold text-sm hover:text-yellow-200 hover:pl-1 hover:transition-all duration-300"
            >
              Laptop
            </Link>
            <Link
              to="/shop"
              className="text-offgray font-semibold text-sm hover:text-yellow-200 hover:pl-1 hover:transition-all duration-300"
            >
              SmartPhone
            </Link>
            <Link
              to="/shop"
              className="text-offgray font-semibold text-sm hover:text-yellow-200 hover:pl-1 hover:transition-all duration-300"
            >
              Fashion
            </Link>
            <Link
              to="/shop"
              className="text-offgray font-semibold text-sm hover:text-yellow-200 hover:pl-1 hover:transition-all duration-300"
            >
              Accessories
            </Link>
            <Link
              to="/shop"
              className="text-yellow-200 font-semibold text-sm hover:text-[#77878F] hover:pl-1 hover:transition-all duration-300"
            >
              All Categories <span>&rarr;</span>
            </Link>
          </div>
        </div>
        {/* quick links */}
        <div className="col-sapn-12 lg:col-span-3 -ml-5 md:-ml-20 lg:ml-0">
          <p className="uppercase font-semibold mb-4 text-sm lg:text-base">
            quick links
          </p>
          <div className="links flex flex-col gap-y-3">
            <Link
              to="/"
              className="text-offgray font-semibold text-sm hover:text-yellow-200 hover:pl-1 hover:transition-all duration-300"
            >
              Home
            </Link>
            <Link
              to="/login"
              className="text-offgray font-semibold text-sm hover:text-yellow-200 hover:pl-1 hover:transition-all duration-300"
            >
              Sign In
            </Link>
            <Link
              to="/shop"
              className="text-offgray font-semibold text-sm hover:text-yellow-200 hover:pl-1 hover:transition-all duration-300"
            >
              Shop Now
            </Link>
            <Link
              to="/about-us"
              className="text-offgray font-semibold text-sm hover:text-yellow-200 hover:pl-1 hover:transition-all duration-300"
            >
              About Us
            </Link>
            <Link
              to="/faq"
              className="text-offgray font-semibold text-sm hover:text-yellow-200 hover:pl-1 hover:transition-all duration-300"
            >
              FAQ
            </Link>
            <Link
              to="/support"
              className="text-offgray font-semibold text-sm hover:text-yellow-200 hover:pl-1 hover:transition-all duration-300"
            >
              Support
            </Link>
          </div>
        </div>
        {/* downlaod */}
        <div className="col-sapn-12 lg:col-span-3">
          <p className="uppercase font-semibold mb-4 text-sm lg:text-base">
            download app
          </p>
          <div className="links flex flex-col gap-y-3">
            <a href="https://babulakter.com" target="_blank">
              <img
                src={appleapp}
                alt="Download Apple App"
                className="w-[90px] h-auto object-cover"
              />
            </a>
            <a href="https://babulakter.com" target="_blank">
              <img
                src={androidapp}
                alt="Download Android App"
                className="w-[90px] h-auto object-cover"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="h-[1px] bg-gray mt-16"></div>
      <div className="flex gap-x-8 justify-center items-center mt-2 lg:mt-6 flex-col lg:flex-row gap-y-2">
        <p className="text-offgray text-sm font-semibold mt-2 lg:mt-0">
          All rights reserved by GizmoBuy &copy;2024
        </p>
        <p className="text-offgray text-[13px] lg:text-sm font-semibold hidden lg:inline-block">
          |
        </p>
        <p className="text-offgray text-[13px] lg:text-sm font-semibold">
          Developed with love by{' '}
          <a
            href="https://babulakter.com"
            target="_blank"
            className="hover:text-orange-400"
          >
            Babul Akter
          </a>
          &trade;
        </p>
      </div>
    </div>
  );
};

export default Footer;
