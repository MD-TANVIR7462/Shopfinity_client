import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { setUserInLocalState, useCurrentToken, useCurrentUser } from "@/redux/features/authSlice";
import { useShoppingCartProducts } from "@/redux/features/shoppingCartSlice";
import { useWishedProducts } from "@/redux/features/wishListSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { TCurrentUser } from "@/types/commonTypes";
import { AiOutlineUser, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BsCart2, BsHeart } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { FaArrowRightLong, FaLinkedinIn } from "react-icons/fa6";
import { IoIosInformationCircleOutline, IoLogoGithub } from "react-icons/io";
import { IoLogoFacebook } from "react-icons/io5";
import { PiArrowBendDoubleUpRightThin, PiHeadphonesThin, PiPhoneDisconnectThin } from "react-icons/pi";
import { toast } from "sonner";
import logo from "../../assets/images/logo-white.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(useCurrentUser) as TCurrentUser;
  const token = useAppSelector(useCurrentToken);
  const wishedProducts = useAppSelector(useWishedProducts);
  const shoppingCartProducts = useAppSelector(useShoppingCartProducts);

  useEffect(() => {
    fetch("https://shipfinity-backend.vercel.app/api/auth/verify-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
    toast.success("Logged out successfully.", {
      position: "top-right",
      duration: 1500,
      icon: "👋",
    });
    navigate("/");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="navbar">
      <div className="bg-[#528b30] text-white">
        {/* Top Header */}
        <div className="main-container py-3 flex flex-col md:flex-row gap-y-2 justify-between items-center">
          <h2 className="text-sm tracking-wider">
            Welcome to Shopinity
            {currentUser?.name && (
              <>
                {" "}
                <span className="text-yellow-300">, {currentUser?.name}</span>
              </>
            )}
          </h2>

          <div className="text-sm flex flex-wrap gap-x-4 gap-y-2 items-center">
            <div className="flex items-center gap-x-2">
              <span>Follow us:</span>
              <a href="#">
                <IoLogoFacebook />
              </a>
              <a href="https://www.linkedin.com/in/md-tajul-islam-tanvir-531682278/" target="_blank">
                <FaLinkedinIn />
              </a>
              <a href="https://github.com/MD-TANVIR7462" target="_blank">
                <IoLogoGithub />
              </a>
            </div>

            {!currentUser?.email && (
              <div className="flex items-center gap-x-3">
                <Link to="/login" className="hover:text-yellow-300">
                  Login
                </Link>
                <span>|</span>
                <Link to="/signup" className="hover:text-yellow-300">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
        {currentUser?.email && (
          <div className="flex items-center gap-x-3 justify-center text-sm">
            <Link to={`/dashboard/${currentUser?.role}/profile`} className="hover:text-yellow-300">
              Profile
            </Link>
            <Link to={`/dashboard/${currentUser?.role}/overview`} className="hover:text-yellow-300">
              Dashboard
            </Link>
            <button onClick={logouthandlerfromnavbar} className="hover:text-[#ef4444]">
              Logout
            </button>
          </div>
        )}
        {/* Divider */}
        <div className="h-[1px] bg-[#136948]"></div>

        {/* Main Navbar */}
        <div className="bg-[#528b30] py-4 relative">
          <div className="main-container flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex gap-x-2 items-center w-24">
              <img src={logo} alt="Shopinity" className="w-6 lg:w-16 h-6 lg:h-16 object-cover" />
              <span className="font-bold text-xl lg:text-2xl">Shopinity</span>
            </Link>

            {/* Hamburger */}
            <div className="lg:hidden text-2xl text-white cursor-pointer" onClick={toggleMenu}>
              {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
            </div>

            {/* Desktop Menu */}
            <ul className="hidden lg:flex space-x-6 text-base text-white">
              <Link to="/shop">
                <li className="hover:text-yellow-500">Shop</li>
              </Link>
              <Link to="/about-us">
                <li className="hover:text-yellow-500">About Us</li>
              </Link>
              <Link to="/faq">
                <li className="hover:text-yellow-500">FAQ</li>
              </Link>
              <Link to="/support">
                <li className="hover:text-yellow-500">Support</li>
              </Link>
            </ul>

            {/* Desktop Right Actions */}
            <div className="hidden lg:flex space-x-4 items-center">
              <Link to={token ? `/${currentUser?._id}/shopping-cart` : "/login"} className="relative">
                <BsCart2 className="text-2xl" />
                {shoppingCartProducts?.length > 0 && (
                  <span className="absolute -top-3 -right-3 bg-white text-custom-black h-5 w-5 text-xs font-semibold rounded-full flex items-center justify-center">
                    {shoppingCartProducts.length}
                  </span>
                )}
              </Link>
              <Link to={token ? `/${currentUser?._id}/wishlist` : "/login"} className="relative">
                <BsHeart className="text-xl mt-1" />
                {wishedProducts?.length > 0 && (
                  <span className="absolute -top-3 -right-3 bg-white text-custom-black h-5 w-5 text-xs font-semibold rounded-full flex items-center justify-center">
                    {wishedProducts.length}
                  </span>
                )}
              </Link>

              {currentUser?.email ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <AiOutlineUser className="text-2xl cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white mt-2 mr-2 py-3 px-2">
                    <Link to={`/dashboard/${currentUser?.role}/profile`}>
                      <DropdownMenuItem className="hover:text-[#528b30]">Profile</DropdownMenuItem>
                    </Link>
                    <Link to={`/dashboard/${currentUser?.role}/overview`}>
                      <DropdownMenuItem className="hover:text-[#528b30]">Dashboard</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                      onClick={logouthandlerfromnavbar}
                      className="hover:text-red-600 mt-2 border-t pt-3 border-gray-300"
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/login">
                  <AiOutlineUser className="text-2xl cursor-pointer" />
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Slide-in Menu */}
          <div
            className={`lg:hidden absolute top-full left-0 w-full bg-[#528b30] z-50 transition-all duration-300 ${
              menuOpen ? "max-h-[500px] py-4" : "max-h-0 overflow-hidden"
            }`}
          >
            <ul className="flex flex-col items-center gap-4 text-white">
              <Link to="/shop">
                <li onClick={toggleMenu} className="hover:text-yellow-400">
                  Shop
                </li>
              </Link>
              <Link to="/about-us">
                <li onClick={toggleMenu} className="hover:text-yellow-400">
                  About Us
                </li>
              </Link>
              <Link to="/faq">
                <li onClick={toggleMenu} className="hover:text-yellow-400">
                  FAQ
                </li>
              </Link>
              <Link to="/support">
                <li onClick={toggleMenu} className="hover:text-yellow-400">
                  Support
                </li>
              </Link>

              {/* Bottom Icons Section */}
              <div className="w-full mt-6 border-t pt-4 border-white/20 flex flex-col items-center gap-4 text-white text-base">
                <Link to={token ? `/${currentUser?._id}/shopping-cart` : "/login"} onClick={toggleMenu}>
                  <li className="flex items-center gap-2 hover:text-yellow-400 ">Cart</li>
                </Link>
                <Link to={token ? `/${currentUser?._id}/wishlist` : "/login"} onClick={toggleMenu}>
                  <li className="flex items-center gap-2 hover:text-yellow-400">Wishlist</li>
                </Link>

                {currentUser?.email && (
                  <>
                    <Link to={`/dashboard/${currentUser?.role}/profile`} onClick={toggleMenu}>
                      <li className="flex items-center gap-2 hover:text-yellow-400">Profile</li>
                    </Link>
                    <Link to={`/dashboard/${currentUser?.role}/overview`} onClick={toggleMenu}>
                      <li className="flex items-center gap-2 hover:text-yellow-400">Dashboard</li>
                    </Link>
                    <li
                      onClick={() => {
                        logouthandlerfromnavbar();
                        toggleMenu();
                      }}
                      className=" flex items-center gap-2 text-sm cursor-pointer px-5 py-1 bg-red-500/80 hover:bg-red-500 rounded-2xl"
                    >
                      Logout
                    </li>
                  </>
                )}
              </div>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section for Large Devices */}
      <div className="py-4 shadow-sm mb-6 hidden lg:block">
        <div className="main-container flex items-center">
          <Link to="/shop">
            <button className="text-white bg-offwhite hover:bg-[#e8ebec] focus:outline-none rounded-sm text-sm px-5 py-4 text-center items-center text-gray flex space-x-2">
              <span className="font-semibold">Shop Now</span>
              <FaArrowRightLong />
            </button>
          </Link>
          <div className="flex space-x-5 items-center lg:ml-10 text-pure-gray text-sm">
            <div className="flex items-center gap-1">
              <CiLocationOn /> Track Order
            </div>
            <div className="flex items-center gap-1">
              <PiArrowBendDoubleUpRightThin /> Compare
            </div>
            <div className="flex items-center gap-1">
              <PiHeadphonesThin /> Customer Support
            </div>
            <div className="flex items-center gap-1">
              <IoIosInformationCircleOutline /> Need Help
            </div>
          </div>
          <div className="ml-auto flex items-center gap-1 text-pure-gray text-sm">
            <PiPhoneDisconnectThin />
            <span>+880-1998-863753</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
