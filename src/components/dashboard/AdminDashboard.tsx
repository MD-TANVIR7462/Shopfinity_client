import { useGetProfileQuery } from '@/redux/api/authApi';
import {
  setUserInLocalState,
  useCurrentUser,
} from '@/redux/features/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { TCurrentUser } from '@/types/commonTypes';
import { ShoppingBasket } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FaUserTie } from 'react-icons/fa';
import { FcShop } from 'react-icons/fc';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { IoMdHome, IoMdLogOut } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import { Link, Outlet } from 'react-router-dom';
import { toast } from 'sonner';
import demoUserImage from '../../assets/images/babul.png';
import logo from '../../assets/images/logo.png';
import ScrollToTop from '../ui/ToTop';

const AdminDashboard = () => {
  const userInfo = useAppSelector(useCurrentUser);
  const { name, role } = userInfo as TCurrentUser;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeDashboardRoute, setActiveDashboardRoute] = useState('');
  const dispatch = useAppDispatch();

  const { data } = useGetProfileQuery(undefined);
  const userProfile = data?.data;

  useEffect(() => {
    if (role !== 'admin') {
      setUserInLocalState({ user: null, token: null });
      return;
    }

    if (location.pathname === '/dashboard/admin/overview') {
      setActiveDashboardRoute('overview');
    } else if (location.pathname === '/dashboard/admin/profile') {
      setActiveDashboardRoute('profile');
    } else if (location.pathname === '/dashboard/admin/manage-products') {
      setActiveDashboardRoute('productmanagement');
    } else if (location.pathname === '/dashboard/admin/manage-vendors') {
      setActiveDashboardRoute('vendormanagement');
    } else if (location.pathname === '/dashboard/admin/manage-customers') {
      setActiveDashboardRoute('customermanagement');
    } else if (location.pathname === '/dashboard/admin/manage-orders') {
      setActiveDashboardRoute('ordermanagement');
    } else if (location.pathname === '/dashboard/admin/sells-report') {
      setActiveDashboardRoute('sellsreport');
    }
  }, [location.pathname, dispatch, role]);

  const handleLogout = () => {
    toast.success('Logout Successful', {
      position: 'top-right',
      icon: '👏',
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
    setActiveDashboardRoute('profile');
  };

  const userImage = userProfile?.profileImage || demoUserImage;

  return (
    <div>
      <ScrollToTop />
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        onClick={toggleSidebar}
      >
        <span className="sr-only">Open</span>
        <svg
          className="w-6 h-6 text-xl text-red-300 hover:text-red-700 hover:transition-all duration-300 ease-in-out"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarOpen ? '' : '-translate-x-full sm:translate-x-0'
        }`}
        aria-label="Sidebar"
      >
        <div className="h-screen px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <Link
            to={`/dashboard/admin/overview`}
            onClick={() => setActiveDashboardRoute('overview')}
          >
            <div
              className="flex justify-start items-center space-x-1 hover:cursor-pointer"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <img
                src={logo}
                alt="logo"
                className="h-6 lg:h-7 w-6 lg:w-7 lg:ml-2 lg:mt-6 object-contain"
              />

              <h3
                className={`text-md lg:text-xl font-bold text-center lg:text-left lg:mt-6 text-orange`}
              >
                Shopinity
              </h3>
            </div>
          </Link>
          <div className="flex justify-end items-center mb-5 sm:hidden">
            <button
              className="text-2xl text-orange hover:text-orange-400 hover:transition-all duration-300 ease-in-out"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <RxCross2 />
            </button>
          </div>
          <ul className="font-medium lg:mt-12">
            <Link
              to={`/dashboard/admin/profile`}
              className={` lg:hidden flex items-center space-x-2 mb-4 hover:text-orange-400 md:hover:text-white transition-all duration-300 ease-in-out rounded-md py-2.5 px-3 md:mt-6 ${
                activeDashboardRoute === 'profile'
                  ? 'bg-orange text-white'
                  : 'bg-none text-offgray'
              }`}
              onClick={profileClickHandler}
            >
              <img
                src={userImage}
                alt="profile"
                className="w-8 h-8 rounded-full"
              />

              <li className="">{` ${name}`}</li>
            </Link>
            <hr className="mt-2 lg:hidden" />
            <li className="my-2">
              <Link
                to="/dashboard/admin/manage-vendors"
                className={`flex items-center p-2 rounded-lg  hover:bg-orange-400 hover:text-white group ${
                  activeDashboardRoute === 'vendormanagement'
                    ? 'bg-orange text-white'
                    : 'bg-none text-offgray'
                }`}
                onClick={() => setActiveDashboardRoute('vendormanagement')}
              >
                <div
                  className="flex items-center space-x-2"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                  <FcShop className="text-xl" />
                  <span>Manage vendors</span>
                </div>
              </Link>
            </li>
            <li className="my-2">
              <Link
                to="/dashboard/admin/manage-customers"
                className={`flex items-center p-2 rounded-lg  hover:bg-orange-400 hover:text-white group ${
                  activeDashboardRoute === 'customermanagement'
                    ? 'bg-orange text-white'
                    : 'bg-none text-offgray'
                }`}
                onClick={() => setActiveDashboardRoute('customermanagement')}
              >
                <div
                  className="flex items-center space-x-2"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                  <FaUserTie className="text-lg text-bluish" />
                  <span>Manage Customers</span>
                </div>
              </Link>
            </li>
            <li className="my-2">
              <Link
                to="/dashboard/admin/manage-orders"
                className={`flex items-center p-2 rounded-lg  hover:bg-orange-400 hover:text-white group ${
                  activeDashboardRoute === 'ordermanagement'
                    ? 'bg-orange text-white'
                    : 'bg-none text-offgray'
                }`}
                onClick={() => setActiveDashboardRoute('ordermanagement')}
              >
                <div
                  className="flex items-center space-x-2"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                  <ShoppingBasket className="text-lg text-amber-600" />
                  <span>Manage Orders</span>
                </div>
              </Link>
            </li>
            <li className="my-2">
              <Link
                to="/dashboard/admin/sells-report"
                className={`flex items-center p-2 rounded-lg  hover:bg-orange-400 hover:text-white group ${
                  activeDashboardRoute === 'sellsreport'
                    ? 'bg-orange text-white'
                    : 'bg-none text-offgray'
                }`}
                onClick={() => setActiveDashboardRoute('sellsreport')}
              >
                <div
                  className="flex items-center space-x-2"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                  <HiOutlineDocumentReport className="text-xl text-deep-yellow" />
                  <span>Sells Report</span>
                </div>
              </Link>
            </li>

            <div className="absolute bottom-20 sm:bottom-10">
              <li>
                <Link
                  to="/"
                  className="cursor-pointer ms-5 text-offgray hover:text-orange-400"
                >
                  <div
                    className="flex items-center space-x-2"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  >
                    <IoMdHome />
                    <span>Back To Home</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="cursor-pointer ms-5 text-offgray hover:text-orange-400"
                  onClick={handleLogout}
                >
                  <div
                    className="flex items-center space-x-2"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  >
                    <IoMdLogOut />
                    <span>Logout</span>
                  </div>
                </Link>
              </li>
            </div>
          </ul>
        </div>
      </aside>

      <div className={`p-4 lg:p-0 ${isSidebarOpen ? 'sm:ml-64' : ''} sm:ml-64`}>
        {/* dashboard content */}
        <div className="py-10 hidden lg:flex justify-end items-center bg-gray-50">
          <Link
            to="/dashboard/admin/profile"
            className={`flex justify-center items-center space-x-2 hover:text-orange-400 mr-10 ${
              activeDashboardRoute === 'profile'
                ? 'text-orange'
                : 'text-offgray'
            }`}
            onClick={profileClickHandler}
          >
            <img
              src={userImage}
              alt="profile"
              className="w-8 h-8 rounded-full"
            />
            <li className="list-none text-md font-[500]">{` ${name}`}</li>
          </Link>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
