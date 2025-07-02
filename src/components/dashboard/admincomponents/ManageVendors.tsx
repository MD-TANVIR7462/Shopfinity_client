'use client';

import Loader from '@/components/common/Loader';
import CheckRoleAndLogout from '@/hooks/CheckRoleAndLogout';
import {
  useBlockOrUnblockUserMutation,
  useGetAllVendorsForAdminQuery,
  useGetProfileQuery,
} from '@/redux/api/authApi';
import { useEffect, useState } from 'react';
import { IoEyeOutline } from 'react-icons/io5';
import { MdBlockFlipped } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { toast } from 'sonner';
import demoUserImage from '../../../assets/images/babul.png';

const ManageVendors = () => {
  CheckRoleAndLogout('admin');

  const [showModal, setShowModal] = useState(false);
  const [vendorProfileToShowInModal, setVendorProfileToShowInModal] =
    useState<any>({});
  const [page, setPage] = useState<string>('1');
  const limit = '10';

  const allFilters = {
    page: page,
    limit: limit,
  };

  const createQueryString = (obj: any) => {
    const keyValuePairs = [];
    for (const key in obj) {
      keyValuePairs.push(
        encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
      );
    }
    return keyValuePairs.join('&');
  };

  let queryParams = createQueryString(allFilters);

  useEffect(() => {
    queryParams = createQueryString({
      page,
      limit,
    });
  }, [page, limit]);

  const { data: profileData, isLoading } = useGetProfileQuery(undefined);
  const userProfileFromDb = profileData?.data;

  const { data: vendorsData, isLoading: isVendorsLoading } =
    useGetAllVendorsForAdminQuery(undefined);
  const vendors = vendorsData?.data?.data;

  const [blockOrUnblockUser] = useBlockOrUnblockUserMutation();

  const handleBlockVendor = async (id: string, block: boolean) => {
    const blockOrUnblockData = {
      id,
      block,
    };

    const response = await blockOrUnblockUser(blockOrUnblockData).unwrap();

    if (response?.statusCode === 200) {
      toast.success(response?.data?.message, {
        position: 'top-right',
        duration: 1500,
        icon: '👏',
      });
    }
  };

  const totalItems = vendorsData?.data?.meta?.total;
  const totalPages = Math.ceil(Number(totalItems) / Number(limit));

  const handlePageChange = (page: number) => {
    setPage(page.toString());
  };

  if (isLoading || isVendorsLoading) {
    return <Loader />;
  }

  const viewVendorProfile = (id: string) => {
    setShowModal(true);
    const vendorprofile = vendors?.find((vendor: any) => vendor._id === id);
    setVendorProfileToShowInModal(vendorprofile);
  };

  const userImage = vendorProfileToShowInModal?.profileImage || demoUserImage;

  return (
  <div className="px-4 md:px-6 lg:px-12 py-8">
  <h3 className="text-center text-3xl font-bold text-green-600">Manage Vendors</h3>
  <p className="text-center mt-2 text-gray-600 max-w-2xl mx-auto">
    Welcome, <span className="font-semibold text-green-700">{userProfileFromDb?.name}</span>!
    Manage all vendors here—view, inspect, or block vendors. More features coming soon!
  </p>

  <div className="mt-10 lg:w-11/12 mx-auto bg-white shadow-md rounded-lg overflow-hidden">
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left text-gray-600">
        <thead className="bg-green-100 text-green-700 uppercase text-xs font-semibold">
          <tr>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Email</th>
            <th className="px-6 py-4">Products</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {!isLoading && vendors?.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-8 text-red-400 font-medium">
                No Vendor Found
              </td>
            </tr>
          ) : (
            vendors?.map((vendor: any) => (
              <tr
                key={vendor._id}
                className="border-b hover:bg-green-50 transition-all"
              >
                <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap">
                  {vendor.name}
                </td>
                <td className="px-6 py-4">{vendor.email}</td>
                <td className="px-6 py-4">53</td>
                <td
                  className={`px-6 py-4 font-semibold ${
                    vendor?.isBlocked ? 'text-red-500' : 'text-green-500'
                  }`}
                  title={
                    vendor?.isBlocked
                      ? 'Vendor is blocked'
                      : 'Vendor is active'
                  }
                >
                  {vendor?.isBlocked ? 'Inactive' : 'Active'}
                </td>
                <td className="px-6 py-4 flex space-x-4 items-center">
                  <button
                    title="View Profile"
                    className="text-green-600 hover:text-green-800 text-lg"
                    onClick={() => viewVendorProfile(vendor._id)}
                  >
                    <IoEyeOutline />
                  </button>
                  <button
                    title={vendor.isBlocked ? 'Unblock Vendor' : 'Block Vendor'}
                    className={`text-lg ${
                      vendor.isBlocked ? 'text-green-500' : 'text-red-500'
                    } hover:scale-105 transition`}
                    onClick={() =>
                      handleBlockVendor(vendor._id, !vendor.isBlocked)
                    }
                  >
                    <MdBlockFlipped />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>

    {/* Pagination */}
    {isLoading || vendors?.length === 0 ? null : (
      <div className="flex justify-end p-4 space-x-2 bg-gray-50">
        <button
          className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
          disabled={Number(page) === 1}
          onClick={() => handlePageChange(Number(page) - 1)}
        >
          Prev
        </button>
        {[...Array(Math.min(totalPages, 5)).keys()]
          .map((i) => Number(page) - 2 + i)
          .filter((p) => p > 0 && p <= totalPages)
          .map((p) => (
            <button
              key={p}
              onClick={() => handlePageChange(p)}
              className={`px-3 py-1 text-sm rounded border ${
                Number(page) === p
                  ? 'bg-green-600 text-white'
                  : 'bg-white border-gray-300 hover:bg-gray-100'
              }`}
            >
              {p}
            </button>
          ))}
        <button
          className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
          disabled={Number(page) === totalPages}
          onClick={() => handlePageChange(Number(page) + 1)}
        >
          Next
        </button>
      </div>
    )}
  </div>

  {/* Vendor Modal */}
  {showModal && (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
          <div className="flex justify-between items-center border-b pb-3">
            <h3 className="text-lg font-semibold">
              {vendorProfileToShowInModal?.name}
            </h3>
            <button
              className="text-xl text-red-400 hover:text-red-600"
              onClick={() => setShowModal(false)}
            >
              <RxCross2 />
            </button>
          </div>
          <div className="text-center mt-4">
            <img
              src={userImage}
              alt="vendor"
              className="w-20 h-20 mx-auto rounded-full object-cover"
            />
            <p className="mt-3 text-gray-700">
              {vendorProfileToShowInModal?.email}
            </p>
            <p className="text-gray-600">
              {vendorProfileToShowInModal?.address?.mobile}
            </p>
            {vendorProfileToShowInModal?.address?.address ? (
              <div className="mt-3 text-gray-600 text-sm">
                <p>
                  {vendorProfileToShowInModal.address.address},{' '}
                  {vendorProfileToShowInModal.address.postalCode}
                </p>
                <p>
                  {vendorProfileToShowInModal.address.city},{' '}
                  {vendorProfileToShowInModal.address.state},{' '}
                  {vendorProfileToShowInModal.address.country}
                </p>
              </div>
            ) : (
              <p className="mt-3 text-red-400 text-sm">
                This vendor hasn't updated their address yet!
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  )}
</div>

  );
};

export default ManageVendors;
