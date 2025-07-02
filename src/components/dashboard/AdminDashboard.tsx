import { useGetProfileQuery } from "@/redux/api/authApi";
import { setUserInLocalState, useCurrentUser } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { TCurrentUser } from "@/types/commonTypes";
import { ShoppingBasket } from "lucide-react";
import { useEffect, useState } from "react";
import { FaUserTie } from "react-icons/fa";
import { FcShop } from "react-icons/fc";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoMdHome, IoMdLogOut } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { Link, Outlet } from "react-router-dom";
import { toast } from "sonner";
import demoUserImage from "../../assets/images/babul.png";
import logo from "../../assets/images/logo.png";
import ScrollToTop from "../ui/ToTop";

const AdminDashboard = () => {
  const userInfo = useAppSelector(useCurrentUser);
  const { name, role } = userInfo as TCurrentUser;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeDashboardRoute, setActiveDashboardRoute] = useState("");
  const dispatch = useAppDispatch();

  const { data } = useGetProfileQuery(undefined);
  const userProfile = data?.data;

  useEffect(() => {
    if (role !== "admin") {
      setUserInLocalState({ user: null, token: null });
      return;
    }

    if (location.pathname === "/dashboard/admin/overview") {
      setActiveDashboardRoute("overview");
    } else if (location.pathname === "/dashboard/admin/profile") {
      setActiveDashboardRoute("profile");
    } else if (location.pathname === "/dashboard/admin/manage-products") {
      setActiveDashboardRoute("productmanagement");
    } else if (location.pathname === "/dashboard/admin/manage-vendors") {
      setActiveDashboardRoute("vendormanagement");
    } else if (location.pathname === "/dashboard/admin/manage-customers") {
      setActiveDashboardRoute("customermanagement");
    } else if (location.pathname === "/dashboard/admin/manage-orders") {
      setActiveDashboardRoute("ordermanagement");
    } else if (location.pathname === "/dashboard/admin/sells-report") {
      setActiveDashboardRoute("sellsreport");
    }
  }, [location.pathname, dispatch, role]);

  const handleLogout = () => {
    toast.success("Logout Successful", {
      position: "top-right",
      icon: "👏",
      duration: 1500,
    });
    dispatch(setUserInLocalState({ user: null, token: null }));
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const profileClickHandler = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setActiveDashboardRoute("profile");
  };

  const userImage = userProfile?.profileImage || demoUserImage;

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">

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
            to="/dashboard/admin/overview"
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
            to="/dashboard/admin/profile"
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
              to="/dashboard/admin/overview"
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
              to="/dashboard/admin/manage-vendors"
              className={`flex items-center space-x-3 rounded-lg px-4 py-3 font-medium transition-colors ${
                activeDashboardRoute === "vendormanagement"
                  ? "bg-green-500 text-white shadow-lg"
                  : "text-gray-700 hover:bg-green-100 hover:text-green-600 dark:text-gray-300 dark:hover:bg-green-600 dark:hover:text-white"
              }`}
              onClick={() => setActiveDashboardRoute("vendormanagement")}
            >
              <div className="flex items-center space-x-2" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <FcShop className="text-xl" />
                <span>Manage vendors</span>
              </div>
            </Link>

            <Link
              to="/dashboard/admin/manage-customers"
              className={`flex items-center space-x-3 rounded-lg px-4 py-3 font-medium transition-colors ${
                activeDashboardRoute === "customermanagement"
                  ? "bg-green-500 text-white shadow-lg"
                  : "text-gray-700 hover:bg-green-100 hover:text-green-600 dark:text-gray-300 dark:hover:bg-green-600 dark:hover:text-white"
              }`}
              onClick={() => setActiveDashboardRoute("customermanagement")}
            >
              <div className="flex items-center space-x-2" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <FaUserTie className="text-lg text-[#528b30]" />
                <span>Manage Customers</span>
              </div>
            </Link>

            <Link
              to="/dashboard/admin/manage-orders"
              className={`flex items-center space-x-3 rounded-lg px-4 py-3 font-medium transition-colors ${
                activeDashboardRoute === "ordermanagement"
                  ? "bg-green-500 text-white shadow-lg"
                  : "text-gray-700 hover:bg-green-100 hover:text-green-600 dark:text-gray-300 dark:hover:bg-green-600 dark:hover:text-white"
              }`}
              onClick={() => setActiveDashboardRoute("ordermanagement")}
            >
              <div className="flex items-center space-x-2" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <ShoppingBasket className="text-lg text-amber-600" />
                <span>Manage Orders</span>
              </div>
            </Link>

            <Link
              to="/dashboard/admin/sells-report"
              className={`flex items-center space-x-3 rounded-lg px-4 py-3 font-medium transition-colors ${
                activeDashboardRoute === "sellsreport"
                  ? "bg-green-500 text-white shadow-lg"
                  : "text-gray-700 hover:bg-green-100 hover:text-green-600 dark:text-gray-300 dark:hover:bg-green-600 dark:hover:text-white"
              }`}
              onClick={() => setActiveDashboardRoute("sellsreport")}
            >
              <div className="flex items-center space-x-2" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <HiOutlineDocumentReport className="text-xl text-deep-yellow" />
                <span>Sells Report</span>
              </div>
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
       p-4 md:p-10
          bg-gray-50 dark:bg-gray-900
        `}
      >
        {/* Top Bar */}
        <div className="hidden lg:flex justify-end items-center bg-white dark:bg-gray-800 rounded-md px-6 py-4 shadow-md mb-8">
          <Link
            to="/dashboard/admin/profile"
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

export default AdminDashboard;
//  <ul className="font-medium lg:mt-12">
//           <Link
//             to={`/dashboard/admin/profile`}
//             className={` lg:hidden flex items-center space-x-2 mb-4 hover:text-orange-400 md:hover:text-white transition-all duration-300 ease-in-out rounded-md py-2.5 px-3 md:mt-6 ${
//               activeDashboardRoute === 'profile'
//                 ? 'bg-orange text-white'
//                 : 'bg-none text-offgray'
//             }`}
//             onClick={profileClickHandler}
//           >
//             <img
//               src={userImage}
//               alt="profile"
//               className="w-8 h-8 rounded-full"
//             />

//             <li className="">{` ${name}`}</li>
//           </Link>
//           <hr className="mt-2 lg:hidden" />
//           <li className="my-2">
//             <Link
//               to="/dashboard/admin/manage-vendors"
//               className={`flex items-center p-2 rounded-lg  hover:bg-orange-400 hover:text-white group ${
//                 activeDashboardRoute === 'vendormanagement'
//                   ? 'bg-orange text-white'
//                   : 'bg-none text-offgray'
//               }`}
//               onClick={() => setActiveDashboardRoute('vendormanagement')}
//             >
//               <div
//                 className="flex items-center space-x-2"
//                 onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//               >
//                 <FcShop className="text-xl" />
//                 <span>Manage vendors</span>
//               </div>
//             </Link>
//           </li>
//           <li className="my-2">
//             <Link
//               to="/dashboard/admin/manage-customers"
//               className={`flex items-center p-2 rounded-lg  hover:bg-orange-400 hover:text-white group ${
//                 activeDashboardRoute === 'customermanagement'
//                   ? 'bg-orange text-white'
//                   : 'bg-none text-offgray'
//               }`}
//               onClick={() => setActiveDashboardRoute('customermanagement')}
//             >
//               <div
//                 className="flex items-center space-x-2"
//                 onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//               >
//                 <FaUserTie className="text-lg text-[#528b30]" />
//                 <span>Manage Customers</span>
//               </div>
//             </Link>
//           </li>
//           <li className="my-2">
//             <Link
//               to="/dashboard/admin/manage-orders"
//               className={`flex items-center p-2 rounded-lg  hover:bg-orange-400 hover:text-white group ${
//                 activeDashboardRoute === 'ordermanagement'
//                   ? 'bg-orange text-white'
//                   : 'bg-none text-offgray'
//               }`}
//               onClick={() => setActiveDashboardRoute('ordermanagement')}
//             >
//               <div
//                 className="flex items-center space-x-2"
//                 onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//               >
//                 <ShoppingBasket className="text-lg text-amber-600" />
//                 <span>Manage Orders</span>
//               </div>
//             </Link>
//           </li>
//           <li className="my-2">
//             <Link
//               to="/dashboard/admin/sells-report"
//               className={`flex items-center p-2 rounded-lg  hover:bg-orange-400 hover:text-white group ${
//                 activeDashboardRoute === 'sellsreport'
//                   ? 'bg-orange text-white'
//                   : 'bg-none text-offgray'
//               }`}
//               onClick={() => setActiveDashboardRoute('sellsreport')}
//             >
//               <div
//                 className="flex items-center space-x-2"
//                 onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//               >
//                 <HiOutlineDocumentReport className="text-xl text-deep-yellow" />
//                 <span>Sells Report</span>
//               </div>
//             </Link>
//           </li>

//           <div className="absolute bottom-20 sm:bottom-10">
//             <li>
//               <Link
//                 to="/"
//                 className="cursor-pointer ms-5 text-offgray hover:text-orange-400"
//               >
//                 <div
//                   className="flex items-center space-x-2"
//                   onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//                 >
//                   <IoMdHome />
//                   <span>Back To Home</span>
//                 </div>
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/login"
//                 className="cursor-pointer ms-5 text-offgray hover:text-orange-400"
//                 onClick={handleLogout}
//               >
//                 <div
//                   className="flex items-center space-x-2"
//                   onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//                 >
//                   <IoMdLogOut />
//                   <span>Logout</span>
//                 </div>
//               </Link>
//             </li>
//           </div>
//         </ul>
