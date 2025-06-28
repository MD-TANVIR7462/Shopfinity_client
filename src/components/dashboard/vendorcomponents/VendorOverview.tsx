import Loader from '@/components/common/Loader';
import CheckRoleAndLogout from '@/hooks/CheckRoleAndLogout';
import {
  useGetProfileQuery,
  useGetVendorOverviewMetaDataQuery,
} from '@/redux/api/authApi';
import demoUserImage from '../../../assets/images/babul.png';

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
    <div>
      <h3 className="text-center mt-10 lg:mt-14 text-2xl">Vendor Overview</h3>
      <p className="text-center lg:mt-2 md:text-md lg:w-2/3 lg:mx-auto">
        In this section, we provide you with an overview of your store. You can
        see your total products currently. In future update, we will add more
        features to this section.
      </p>
      <div className="mt-16 md:mt-20 lg:mt-24 grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-8 px-6 pb-8 lg:pb-16">
        {/* store details */}
        <div className="flex shadow rounded p-2 flex-col justify-center items-center">
          <img
            src={userImage}
            alt={userProfileFromDb?.name}
            className="h-20 w-20 rounded-full object-cover"
          />
          <h3 className="text-md font-semibold mt-1">
            {userProfileFromDb?.name}
          </h3>
          <h3 className="text-sm mt-4">{userProfileFromDb?.email}</h3>
          <h3 className="text-sm mt-0.5">
            {userProfileFromDb?.address?.mobile}
          </h3>
          <p className="text-sm text-gray-400 mt-3">{`Joined on ${overViewData?.data?.joined}`}</p>
        </div>
        {/* products */}
        <div className="py-4 px-3 flex justify-center items-center flex-col shadow bg-gray-100 rounded">
          <h3 className="gradientTitle tracking-wider text-5xl font-bold">
            {overViewData?.data?.totalProductsOfThisVendor < 10
              ? `0${overViewData?.data?.totalProductsOfThisVendor}`
              : overViewData?.data?.totalProductsOfThisVendor}
          </h3>
          <p className="text-lg font-semibold text-gray-400 mt-1.5">
            Awesome Products
          </p>
        </div>
      </div>
    </div>
  );
};

export default VendorOverview;
