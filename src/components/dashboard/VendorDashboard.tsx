import { useGetProfileQuery } from "@/redux/api/authApi";
import { setUserInLocalState, useCurrentUser } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { TCurrentUser } from "@/types/commonTypes";
import { useEffect, useState } from "react";
import { IoMdHome, IoMdLogOut } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { TbShoppingBagEdit } from "react-icons/tb";
import { Link, Outlet } from "react-router-dom";
import { toast } from "sonner";
import demoUserImage from "../../assets/images/babul.png";
import logo from "../../assets/images/logo.png";
import ScrollToTop from "../ui/ToTop";

const VendorDashboard = () => {
  const userInfo = useAppSelector(useCurrentUser);
  const { name, role } = userInfo as TCurrentUser;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeDashboardRoute, setActiveDashboardRoute] = useState("");
  const dispatch = useAppDispatch();

  const { data } = useGetProfileQuery(undefined);
  const userProfile = data?.data;

  useEffect(() => {
    if (role !== "vendor") {
      setUserInLocalState({ user: null, token: null });
      return;
    }

    const path = location.pathname;
    if (path.includes("/overview")) setActiveDashboardRoute("overview");
    else if (path.includes("/profile")) setActiveDashboardRoute("profile");
    else if (path.includes("/manage-products")) setActiveDashboardRoute("productmanagement");
    else if (path.includes("/sells-report")) setActiveDashboardRoute("sellsreport");
  }, [location.pathname, dispatch, role]);

  const handleLogout = () => {
    toast.success("Logout Successful", {
      position: "top-right",
      icon: "👏",
      duration: 1500,
    });
    dispatch(setUserInLocalState({ user: null, token: null }));
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const profileClickHandler = () => {
    setIsSidebarOpen(false);
    setActiveDashboardRoute("profile");
  };

  const userImage = userProfile?.profileImage || demoUserImage;

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <ScrollToTop />
      {/* Sidebar Toggle Button for mobile */}
      <button
        aria-label="Open sidebar"
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-green-500 text-white sm:hidden hover:bg-green-600 transition"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-64 transform bg-white shadow-lg dark:bg-gray-800
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          sm:translate-x-0
        `}
        aria-label="Sidebar"
      >
        <div className="flex flex-col h-full px-6 py-8">
          {/* Logo */}
          <Link
            to="/dashboard/vendor/overview"
            onClick={() => {
              setActiveDashboardRoute("overview");
              setIsSidebarOpen(false);
            }}
            className="flex items-center mb-10"
          >
            <img src={logo} alt="Shopinity Logo" className="h-8 w-8 object-contain" />
            <h1 className="ml-3 text-2xl font-extrabold text-green-600 dark:text-green-400">Shopinity</h1>
          </Link>

          {/* Close button for mobile */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="self-end mb-6 text-green-500 sm:hidden hover:text-green-600"
            aria-label="Close sidebar"
          >
            <RxCross2 size={24} />
          </button>

          {/* Profile Link */}
          <Link
            to="/dashboard/vendor/profile"
            onClick={profileClickHandler}
            className={`flex items-center space-x-4 rounded-lg px-4 py-3 font-semibold cursor-pointer transition-colors ${
              activeDashboardRoute === "profile"
                ? "bg-green-500 text-white shadow-lg"
                : "text-gray-700 hover:bg-green-100 hover:text-green-600 dark:text-gray-300 dark:hover:bg-green-600 dark:hover:text-white"
            }`}
          >
            <img
              src={userImage}
              alt={`${name}'s profile`}
              className="w-10 h-10 rounded-full border-2 border-green-500"
            />
            <span>{name}</span>
          </Link>

          <nav className="flex flex-col mt-12 space-y-4 flex-grow">
            <Link
              to="/dashboard/vendor/overview"
              onClick={() => {
                setActiveDashboardRoute("overview");
                setIsSidebarOpen(false);
              }}
              className={`flex items-center space-x-3 rounded-lg px-4 py-3 font-medium transition-colors ${
                activeDashboardRoute === "overview"
                  ? "bg-green-500 text-white shadow-lg"
                  : "text-gray-700 hover:bg-green-100 hover:text-green-600 dark:text-gray-300 dark:hover:bg-green-600 dark:hover:text-white"
              }`}
            >
              <IoMdHome className="text-2xl" />
              <span>Overview</span>
            </Link>
            <Link
              to="/dashboard/vendor/manage-products"
              onClick={() => {
                setActiveDashboardRoute("productmanagement");
                setIsSidebarOpen(false);
              }}
              className={`flex items-center space-x-3 rounded-lg px-4 py-3 font-medium transition-colors ${
                activeDashboardRoute === "productmanagement"
                  ? "bg-green-500 text-white shadow-lg"
                  : "text-gray-700 hover:bg-green-100 hover:text-green-600 dark:text-gray-300 dark:hover:bg-green-600 dark:hover:text-white"
              }`}
            >
              <TbShoppingBagEdit className="text-2xl" />
              <span>Manage Products</span>
            </Link>
          </nav>

          {/* Footer links */}
          <div className="mt-auto pt-6 space-y-4">
            <Link
              to="/"
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center space-x-3 text-gray-600 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400 transition"
            >
              <IoMdHome className="text-2xl" />
              <span>Back To Home</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition w-full"
            >
              <IoMdLogOut className="text-2xl" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`
          flex-1 min-h-screen flex flex-col 
          transition-margin duration-300 ease-in-out
          sm:ml-64
          p-6 sm:p-10
          bg-gray-50 dark:bg-gray-900
        `}
      >
        {/* Top Bar */}
        <div className="hidden lg:flex justify-end items-center bg-white dark:bg-gray-800 rounded-md px-6 py-4 shadow-md mb-8">
          <Link
            to="/dashboard/vendor/profile"
            onClick={profileClickHandler}
            className={`flex items-center space-x-3 cursor-pointer transition-colors ${
              activeDashboardRoute === "profile"
                ? "text-green-600 dark:text-green-400 font-semibold"
                : "text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400"
            }`}
          >
            <img
              src={userImage}
              alt={`${name}'s profile`}
              className="w-10 h-10 rounded-full border-2 border-green-500"
            />
            <span className="text-lg">{name}</span>
          </Link>
        </div>

        <Outlet />
      </main>
    </div>
  );
};

export default VendorDashboard;
