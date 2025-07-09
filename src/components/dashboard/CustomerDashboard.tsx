import { useGetProfileQuery } from "@/redux/api/authApi";
import { setUserInLocalState, useCurrentUser } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { TCurrentUser } from "@/types/commonTypes";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { toast } from "sonner";
import demoUserImage from "../../assets/images/demoimg.png";
import logo from "../../assets/images/logo.png";

import { IoMdHome, IoMdLogOut, IoMdPerson } from "react-icons/io";
import { TbLayoutDashboard, TbShoppingBag, TbUserEdit } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";


const CustomerDashboard = () => {
  const userInfo = useAppSelector(useCurrentUser);
  const { name, role } = userInfo as TCurrentUser;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeDashboardRoute, setActiveDashboardRoute] = useState("");
  const dispatch = useAppDispatch();

  const { data } = useGetProfileQuery(undefined);
  const userProfile = data?.data;

  useEffect(() => {
    if (role !== "customer") {
      setUserInLocalState({ user: null, token: null });
      return;
    }

    const path = location.pathname;
    if (path.includes("overview")) setActiveDashboardRoute("overview");
    else if (path.includes("profile")) setActiveDashboardRoute("profile");
    else if (path.includes("manage-orders")) setActiveDashboardRoute("ordermanagement");
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

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const profileClickHandler = () => {
    setIsSidebarOpen(false);
    setActiveDashboardRoute("profile");
  };

  const userImage = userProfile?.profileImage || demoUserImage;

  return (
    <div className="relative">
      {/* Toggle Button for Mobile */}
      <button
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-600 rounded-lg sm:hidden hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-300"
        onClick={toggleSidebar}
      >
        <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-white border-r border-gray-200 shadow-sm transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full px-4 py-6 overflow-y-auto">
          {/* Logo */}
          <Link
            to="/dashboard/customer/overview"
            className="flex items-center space-x-3 mb-8"
            onClick={() => {
              setActiveDashboardRoute("overview");
              setIsSidebarOpen(false);
            }}
          >
            <img src={logo} alt="logo" className="h-8 w-8 object-contain" />
            <span className="text-xl font-bold text-green-500">Shophinity</span>
          </Link>

          {/* Close button (Mobile) */}
          <div className="flex justify-end mb-4 sm:hidden">
            <button className="text-2xl text-green-400 hover:text-green-600" onClick={toggleSidebar}>
              <RxCross2 />
            </button>
          </div>

          <ul className="space-y-2 font-medium">
            {/* Profile (Mobile) */}
            <li className="lg:hidden">
              <Link
                to="/dashboard/customer/profile"
                className={`flex items-center space-x-3 px-3 py-2 rounded-md ${
                  activeDashboardRoute === "profile" ? "bg-green-500 text-white" : "text-gray-600 hover:bg-green-100"
                }`}
                onClick={profileClickHandler}
              >
                <img src={userImage} alt="profile" className="w-8 h-8 rounded-full" />
                <span>{name}</span>
              </Link>
            </li>

            {/* Overview */}
            <li>
              <Link
                to="/dashboard/customer/overview"
                className={`flex items-center space-x-3 p-2 rounded-md transition-all duration-200 ${
                  activeDashboardRoute === "overview"
                    ? "bg-green-500 text-white shadow"
                    : "text-gray-600 hover:bg-green-100 hover:text-green-600"
                }`}
                onClick={() => {
                  setActiveDashboardRoute("overview");
                  setIsSidebarOpen(false);
                }}
              >
                <TbLayoutDashboard className="text-xl" />
                <span>Overview</span>
              </Link>
            </li>

            {/* Profile */}
            <li>
              <Link
                to="/dashboard/customer/profile"
                className={`flex items-center space-x-3 p-2 rounded-md transition-all duration-200 ${
                  activeDashboardRoute === "profile"
                    ? "bg-green-500 text-white shadow"
                    : "text-gray-600 hover:bg-green-100 hover:text-green-600"
                }`}
                onClick={() => {
                  setActiveDashboardRoute("profile");
                  setIsSidebarOpen(false);
                }}
              >
                <IoMdPerson className="text-xl" />
                <span>Profile</span>
              </Link>
            </li>

            {/* Orders */}
            <li>
              <Link
                to="/dashboard/customer/manage-orders"
                className={`flex items-center space-x-3 p-2 rounded-md transition-all duration-200 ${
                  activeDashboardRoute === "ordermanagement"
                    ? "bg-green-500 text-white shadow"
                    : "text-gray-600 hover:bg-green-100 hover:text-green-600"
                }`}
                onClick={() => {
                  setActiveDashboardRoute("ordermanagement");
                  setIsSidebarOpen(false);
                }}
              >
                <TbShoppingBag className="text-xl" />
                <span>My Orders</span>
              </Link>
            </li>

            {/* Bottom Links */}
            <li className="absolute bottom-10 w-full space-y-2">
              <Link
                to="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-green-500 px-2"
                onClick={() => setIsSidebarOpen(false)}
              >
                <IoMdHome className="text-xl" />
                <span>Back To Home</span>
              </Link>
              <Link
                to="/login"
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-500 px-2"
              >
                <IoMdLogOut className="text-xl" />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="transition-all sm:ml-64 p-4">
        {/* Top Profile (Desktop) */}
        <div className="hidden lg:flex justify-end items-center bg-white py-4 pr-6">
          <Link
            to="/dashboard/customer/profile"
            className={`flex items-center space-x-2 hover:text-green-500 ${
              activeDashboardRoute === "profile" ? "text-green-500" : "text-gray-600"
            }`}
            onClick={profileClickHandler}
          >
            <img src={userImage} alt="profile" className="w-8 h-8 rounded-full" />
            <span className="text-md">{name}</span>
          </Link>
        </div>

        {/* Route content */}
        <div className="bg-gray-50 min-h-screen p-4 rounded-lg shadow-inner">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;

