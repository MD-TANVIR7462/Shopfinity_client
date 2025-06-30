import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  setUserInLocalState,
  useCurrentToken,
  useCurrentUser,
} from '@/redux/features/authSlice';
import { useShoppingCartProducts } from '@/redux/features/shoppingCartSlice';
import { useWishedProducts } from '@/redux/features/wishListSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { TCurrentUser } from '@/types/commonTypes';
import { useEffect } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { BsCart2, BsHeart } from 'react-icons/bs';
import { CiLocationOn } from 'react-icons/ci';
import { FaArrowRightLong, FaLinkedinIn } from 'react-icons/fa6';
import { IoIosInformationCircleOutline, IoLogoGithub } from 'react-icons/io';
import { IoLogoFacebook } from 'react-icons/io5';
import {
  PiArrowBendDoubleUpRightThin,
  PiHeadphonesThin,
  PiPhoneDisconnectThin,
} from 'react-icons/pi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import logo from '../../assets/images/logo-white.png';

const Navbar = () => {
  const navigate = useNavigate();
  const currentUser = useAppSelector(useCurrentUser) as TCurrentUser;
  const wishedProducts = useAppSelector(useWishedProducts);
  const shoppingCartProducts = useAppSelector(useShoppingCartProducts);

  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch('https://gizmobuy-backend.vercel.app/api/auth/verify-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data: any) => {
        if (data?.data !== true) {
          dispatch(setUserInLocalState({ user: null, token: null }));
        }
      });
  }, [token]);

  const logouthandlerfromnavbar = () => {
    dispatch(setUserInLocalState({ user: null, token: null }));
    toast.success('Logged out successfully.', {
      position: 'top-right',
      duration: 1500,
      icon: '👋',
    });
    navigate('/');
  };

  return (
    <div className="navbar">
      <div className="bg-[#528b30] text-white">
        <div className="main-container">
          {/* welcome */}
          <div className="flex flex-col md:flex-row gap-y-2 justify-between items-center py-3">
            {currentUser?.name ? (
              <h2 className="text-sm tracking-wider">
                Welcome to Shopinity,{' '}
                <span className="text-orange-400">{currentUser?.name}</span>
              </h2>
            ) : (
              <h2 className="text-sm tracking-wider">
                Welcome to Shopinity store
              </h2>
            )}
            <div className="text-sm flex gap-x-2 items-center">
              <span className="mr-3">Follow us: </span>
              <a href="#" target="_blank">
                <IoLogoFacebook />
              </a>
              <a href="https://www.linkedin.com/in/md-tajul-islam-tanvir-531682278/" target="_blank">
                <FaLinkedinIn />
              </a>
              <a href="https://github.com/MD-TANVIR7462" target="_blank">
                <IoLogoGithub />
              </a>
            </div>
          </div>
        </div>
        <div className="h-[1px] bg-[#136948]"></div>
        {/* navbar */}
        <div className="bg-[#528b30] py-5">
          <div className="main-container flex justify-between items-center">
            {/* logo */}
            <Link className="flex gap-x-1 lg:gap-x-2 items-center w-24" to="/">
              <img
                src={logo}
                alt="Shopinity"
                className="w-6 lg:w-10 h-6 lg:h-10 object-cover"
              />
              <span className="font-bold text-xl md:text-2xl lg:text-2xl">
                Shopinity
              </span>
            </Link>
            {/* menubar */}
            <div className="ml-6 md:ml-20 lg:ml-0">
              <ul className="flex space-x-5 items-center justify-center">
                <Link to="/shop">
                  <li className="text-white cursor-pointer hover:text-yellow-500 transition-all duration-300 hover:transition-all text-base">
                    Shop
                  </li>
                </Link>
                <Link to="/about-us" className="hidden md:inline-block">
                  <li className="text-white cursor-pointer hover:text-yellow-500 transition-all duration-300 hover:transition-all text-base">
                    About Us
                  </li>
                </Link>
                <Link to="/faq" className="hidden lg:inline-block">
                  <li className="text-white cursor-pointer hover:text-yellow-500 transition-all duration-300 hover:transition-all text-base">
                    FAQ
                  </li>
                </Link>
                <Link to="/support" className="hidden md:inline-block">
                  <li className="text-white cursor-pointer hover:text-yellow-500 transition-all duration-300 hover:transition-all text-base">
                    Support
                  </li>
                </Link>
              </ul>
            </div>
            {/* items */}
            <div className="flex justify-center space-x-3 md:space-x-5 items-center">
              {/* cart */}
              <Link
                to={token ? `/${currentUser?._id}/shopping-cart` : '/login'}
                className="relative"
              >
                <span className="text-xl md:text-2xl text-white cursor-pointer">
                  <BsCart2 />
                </span>
                {shoppingCartProducts?.length > 0 && (
                  <span className="absolute -top-4 -right-2.5 bg-white p-1 rounded-full text-custom-black  h-5 w-5 text-xs font-semibold text-center">
                    {shoppingCartProducts?.length}
                  </span>
                )}
              </Link>
              {/* wishlist */}
              <Link
                to={token ? `/${currentUser?._id}/wishlist` : '/login'}
                className="relative"
              >
                <span className="text-base md:text-xl mt-1 text-white cursor-pointer">
                  <BsHeart />
                </span>
                {wishedProducts?.length > 0 && (
                  <span className="absolute -top-4 -right-2.5 bg-white p-1 rounded-full text-custom-black  h-5 w-5 text-xs font-semibold text-center">
                    {wishedProducts?.length}
                  </span>
                )}
              </Link>
              {/* auth actions */}
              {currentUser?.email ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <span className="text-xl md:text-2xl text-white cursor-pointer">
                      <AiOutlineUser />
                    </span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white mt-2 mr-2 py-3 px-2">
                    <Link to={`/dashboard/${currentUser?.role}/profile`}>
                      <DropdownMenuItem className="cursor-pointer hover:text-[#528b30] transition-all duration-300">
                        Profile
                      </DropdownMenuItem>
                    </Link>
                    <Link to={`/dashboard/${currentUser?.role}/overview`}>
                      <DropdownMenuItem className="cursor-pointer hover:text-[#528b30] transition-all duration-300 -mt-1">
                        Dashboard
                      </DropdownMenuItem>
                    </Link>

                    <DropdownMenuItem
                      className="cursor-pointer hover:text-red-600 transition-all duration-300 mt-2 border-t pt-3 border-gray-300"
                      onClick={logouthandlerfromnavbar}
                    >
                      LogOut
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/login">
                  <span className="text-xl md:text-2xl text-white cursor-pointer">
                    <AiOutlineUser />
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="py-4 shadow-sm mb-6 hidden lg:block">
        <div className="main-container items-center hidden lg:flex">
          {/* shop button*/}
          <div className="">
            <Link to="/shop">
              <button className="text-white bg-offwhite hover:bg-[#e8ebec] focus:outline-none rounded-sm text-sm px-5 py-4 text-center items-center text-gray flex space-x-2">
                <span className="font-semibold">Shop Now</span>{' '}
                <FaArrowRightLong />
              </button>
            </Link>
          </div>
          {/* process */}
          <div className="flex space-x-5 items-center lg:ml-10">
            <div className="flex space-x-1 items-center">
              <CiLocationOn className="text-xl" />
              <p className="text-sm text-pure-gray">Track Order</p>
            </div>
            <div className="flex space-x-1 items-center">
              <PiArrowBendDoubleUpRightThin className="text-xl" />
              <p className="text-sm text-pure-gray">Compare</p>
            </div>
            <div className="flex space-x-1 items-center">
              <PiHeadphonesThin className="text-xl" />
              <p className="text-sm text-pure-gray">Customer Support</p>
            </div>
            <div className="flex space-x-1 items-center">
              <IoIosInformationCircleOutline className="text-xl" />
              <p className="text-sm text-pure-gray">Need Help</p>
            </div>
          </div>
          {/* phone */}
          <div className="phone flex items-center space-x-1 ml-auto">
            <PiPhoneDisconnectThin />
            <span className="text-pure-gray text-sm">+880-1998-863753</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
