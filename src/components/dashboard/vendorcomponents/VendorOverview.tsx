import Loader from '@/components/common/Loader';
import CheckRoleAndLogout from '@/hooks/CheckRoleAndLogout';
import {
  useGetProfileQuery,
  useGetVendorOverviewMetaDataQuery,
} from '@/redux/api/authApi';
import demoUserImage from '../../../assets/images/demoimg.png';

const VendorOverview = () => {
  CheckRoleAndLogout('vendor');

  const { data: profileData, isLoading } = useGetProfileQuery(undefined);
  const userProfileFromDb = profileData?.data;
  const { data: overViewData, isLoading: isOverViewDataLoading } =
    useGetVendorOverviewMetaDataQuery(undefined);

  const userImage = userProfileFromDb?.profileImage || demoUserImage;

  if (isLoading || isOverViewDataLoading) {
    return <Loader />;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-10">
      <h3 className="text-center mt-10 lg:mt-14 text-3xl font-semibold text-green-700">
        Vendor Overview
      </h3>
      <p className="text-center mt-2 text-gray-500 lg:w-2/3 lg:mx-auto">
        In this section, we provide you with an overview of your store.
        Currently, you can view your total products. More features will be added soon.
      </p>

      <div className="mt-16 md:mt-20 lg:mt-24 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
        {/* Store Details */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center border border-green-100">
          <img
            src={userImage}
            alt={userProfileFromDb?.name}
            className="h-24 w-24 rounded-full object-cover border-4 border-green-200"
          />
          <h3 className="text-lg font-bold text-green-700 mt-4">
            {userProfileFromDb?.name}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {userProfileFromDb?.email}
          </p>
          <p className="text-sm text-gray-600">{userProfileFromDb?.address?.mobile}</p>
          <p className="text-xs text-gray-400 mt-3 italic">
            Joined on {overViewData?.data?.joined}
          </p>
        </div>

        {/* Products Count */}
        <div className="bg-green-50 shadow-inner rounded-xl p-6 flex flex-col justify-center items-center border border-green-200">
          <h3 className="text-6xl font-extrabold text-green-600 drop-shadow-sm">
            {overViewData?.data?.totalProductsOfThisVendor < 10
              ? `0${overViewData?.data?.totalProductsOfThisVendor}`
              : overViewData?.data?.totalProductsOfThisVendor}
          </h3>
          <p className="text-lg font-medium text-green-700 mt-2">
            Awesome Products
          </p>
        </div>
      </div>
    </div>
  );
};

export default VendorOverview;
