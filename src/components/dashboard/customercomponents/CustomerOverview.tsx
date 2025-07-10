import Loader from "@/components/common/Loader";
import CheckRoleAndLogout from "@/hooks/CheckRoleAndLogout";
import { useGetCustomerOverviewMetaDataQuery, useGetProfileQuery } from "@/redux/api/authApi";
import demoUserImage from "../../../assets/images/demoimg.png";
import { FaClipboardList, FaCheckCircle, FaDollarSign, FaShoppingCart, FaStar } from "react-icons/fa";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";

const CustomerOverview = () => {
  CheckRoleAndLogout("customer");

  const { data: profileData, isLoading } = useGetProfileQuery(undefined);
  const userProfileFromDb = profileData?.data;
  const { data: overViewData, isLoading: isOverViewDataLoading } = useGetCustomerOverviewMetaDataQuery(undefined);

  const userImage = userProfileFromDb?.profileImage || demoUserImage;

  if (isLoading || isOverViewDataLoading) {
    return <Loader />;
  }

  const formatNumber = (num: number) => (num < 10 ? `0${num}` : num);
  const formatCurrency = (amount: number) => (amount < 10 ? `$0${amount}` : `$${amount}`);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-600">Hello, {userProfileFromDb?.name?.split(" ")[0]} 👋</h1>
        <p className="text-gray-500 mt-2 max-w-xl mx-auto text-sm">
          Welcome to your dashboard. Manage your profile, track your orders, and review your stats in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="col-span-1 bg-white p-6 rounded-2xl shadow-lg text-center">
          <img src={userImage} alt="Profile" className="h-24 w-24 rounded-full mx-auto object-cover" />
          <h2 className="mt-4 text-xl font-semibold text-gray-700">{userProfileFromDb?.name}</h2>
          <p className="text-gray-500 flex justify-center items-center gap-1 text-sm mt-1">
            <MdEmail /> {userProfileFromDb?.email}
          </p>
          <p className="text-gray-500 flex justify-center items-center gap-1 text-sm mt-1">
            <MdPhone /> {userProfileFromDb?.address?.mobile}
          </p>
          <p className="text-gray-500 flex justify-center items-center gap-1 text-sm mt-1">
            <MdLocationOn /> {userProfileFromDb?.address?.city || "City not provided"}
          </p>
        </div>

        {/* Statistics */}
        <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-green-100 p-6 rounded-xl text-center shadow-md">
            <FaClipboardList className="text-green-600 text-3xl mx-auto mb-2" />
            <h3 className="text-3xl font-bold">{formatNumber(overViewData?.data?.pendingOrder)}</h3>
            <p className="text-sm text-gray-600">Pending Orders</p>
          </div>
          <div className="bg-blue-100 p-6 rounded-xl text-center shadow-md">
            <FaCheckCircle className="text-blue-600 text-3xl mx-auto mb-2" />
            <h3 className="text-3xl font-bold">{formatNumber(overViewData?.data?.completedOrder)}</h3>
            <p className="text-sm text-gray-600">Completed Orders</p>
          </div>
          <div className="bg-yellow-100 p-6 rounded-xl text-center shadow-md">
            <FaDollarSign className="text-yellow-600 text-3xl mx-auto mb-2" />
            <h3 className="text-3xl font-bold">{formatCurrency(overViewData?.data?.totalBillPaid)}</h3>
            <p className="text-sm text-gray-600">Total Spent</p>
          </div>
        </div>
      </div>

      {/* Additional Sections */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Activity</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>
              🛍️ Placed order <span className="font-medium">#123456</span>
            </li>
            <li>
              ✅ Order <span className="font-medium">#123454</span> marked as completed
            </li>
            <li>📥 Updated profile details</li>
            <li>
              💬 Left a review for <span className="font-medium">Product XYZ</span>
            </li>
          </ul>
        </div>

        {/* Favorite Products */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Favorite Products</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex justify-between">
              <span>
                <FaStar className="inline text-yellow-400 mr-1" /> Smart Watch
              </span>
              <span className="text-green-600 font-semibold">$120</span>
            </li>
            <li className="flex justify-between">
              <span>
                <FaStar className="inline text-yellow-400 mr-1" /> Wireless Earbuds
              </span>
              <span className="text-green-600 font-semibold">$85</span>
            </li>
            <li className="flex justify-between">
              <span>
                <FaStar className="inline text-yellow-400 mr-1" /> Backpack
              </span>
              <span className="text-green-600 font-semibold">$55</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-12 text-sm text-gray-400">
        🚀 More features coming soon: delivery tracking, payment analytics, reward system & more.
      </div>
    </div>
  );
};

export default CustomerOverview;
