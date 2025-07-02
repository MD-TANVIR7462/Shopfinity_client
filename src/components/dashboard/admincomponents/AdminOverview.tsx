/* eslint-disable no-unsafe-optional-chaining */
import Loader from '@/components/common/Loader';
import CheckRoleAndLogout from '@/hooks/CheckRoleAndLogout';
import { useGetAdminOverviewMetaDataQuery } from '@/redux/api/authApi';
import { AdminDonutChart } from '../CustomDonutChart';
import { AdminPieChart } from '../CustomPieChart';
import {
  UsersIcon,
  UserCog,
  PackageCheck,
  ShoppingCart,
  DollarSign,
  Briefcase,
  Store,
  User,
} from 'lucide-react';

const AdminOverview = () => {
  CheckRoleAndLogout('admin');

  const { data: overViewData, isLoading: isOverViewDataLoading } =
    useGetAdminOverviewMetaDataQuery(undefined);

  if (isOverViewDataLoading) {
    return <Loader />;
  }

  const stats = [
    {
      label: 'Total Users',
      value: overViewData?.data?.totalUsers,
      icon: UsersIcon,
    },
    {
      label: 'Admins',
      value: overViewData?.data?.totalAdmin,
      icon: UserCog,
    },
    {
      label: 'Vendors',
      value: overViewData?.data?.totalVendor,
      icon: Briefcase,
    },
    {
      label: 'Customers',
      value: overViewData?.data?.totalCustomer,
      icon: User,
    },
    {
      label: 'Products',
      value: overViewData?.data?.totalProduct,
      icon: PackageCheck,
    },
    {
      label: 'Orders Completed',
      value: overViewData?.data?.totalOrders,
      icon: ShoppingCart,
    },
    {
      label: 'Total Sales',
      value: `$${(overViewData?.data?.totalSellByAllVendors).toFixed(2)}`,
      icon: DollarSign,
    },
    {
      label: 'Shopinity Profit',
      value: `$${(overViewData?.data?.totalProfitOfGizmobuy).toFixed(2)}`,
      icon: Store,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 md:px-6b mt-10 ">
      <h1 className="text-3xl font-bold text-green-700 mb-10">Admin Dashboard</h1>

      {/* Top Section: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white shadow-md border border-green-100 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-green-700 mb-4">Order Overview</h2>
          <AdminDonutChart totalOrders={overViewData?.data?.totalOrders} />
        </div>
        <div className="bg-white shadow-md border border-green-100 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-green-700 mb-4">User Roles Distribution</h2>
          <AdminPieChart
            admin={overViewData?.data?.totalAdmin}
            vendor={overViewData?.data?.totalVendor}
            customer={overViewData?.data?.totalCustomer}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white border border-gray-100 shadow-sm rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition duration-300"
          >
            <div className="bg-green-100 text-green-600 p-3 rounded-full">
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                {typeof stat.value === 'number' && stat.value < 10
                  ? `0${stat.value}`
                  : stat.value}
              </h3>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOverview;
