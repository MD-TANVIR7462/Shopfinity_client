import Loader from "@/components/common/Loader";
import CheckRoleAndLogout from "@/hooks/CheckRoleAndLogout";
import { useBlockOrUnblockUserMutation, useGetAllCustomersQuery, useGetProfileQuery } from "@/redux/api/authApi";
import { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { MdBlockFlipped } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";
import demoUserImage from "../../../assets/images/babul.png";

const ManageCustomers = () => {
  CheckRoleAndLogout("admin");

  const [customerProfileToShowInModal, setVendorProfileToShowInModal] = useState<any>({});
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState<string>("1");
  const limit = "10";

  const allFilters = {
    page: page,
    limit: limit,
  };

  const createQueryString = (obj: any) => {
    const keyValuePairs = [];
    for (const key in obj) {
      keyValuePairs.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
    }
    return keyValuePairs.join("&");
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

  const { data: customersData, isLoading: isCustomerLoading } = useGetAllCustomersQuery(undefined);
  const customers = customersData?.data?.data;

  const [blockOrUnblockUser] = useBlockOrUnblockUserMutation();

  const handleBlockCustomer = async (id: string, block: boolean) => {
    const blockOrUnblockData = {
      id,
      block,
    };

    const response = await blockOrUnblockUser(blockOrUnblockData).unwrap();

    if (response?.statusCode === 200) {
      toast.success(response?.data?.message, {
        position: "top-right",
        duration: 1500,
        icon: "👏",
      });
    }
  };

  const totalItems = customersData?.data?.meta?.total;
  const totalPages = Math.ceil(Number(totalItems) / Number(limit));

  const handlePageChange = (page: number) => {
    setPage(page.toString());
  };

  if (isLoading || isCustomerLoading) {
    return <Loader />;
  }

  const viewCustomerProfile = (id: string) => {
    setShowModal(true);
    const customerProfile = customers?.find((customer: any) => customer._id === id);
    setVendorProfileToShowInModal(customerProfile);
  };

  const userImage = customerProfileToShowInModal?.profileImage || demoUserImage;

  return (
  <div className=" to-green-100 min-h-screen py-10 px-12">
  <h3 className="text-center text-3xl font-semibold text-green-600 drop-shadow-sm">
    Manage Customers
  </h3>
  <p className="text-center text-gray-600 mt-2 text-md max-w-2xl mx-auto">
    Welcome, <span className="text-green-600 font-semibold">{userProfileFromDb?.name}</span>! Manage your customers — view details, block/unblock accounts, and more. 🚀
  </p>

  <div className=" mx-auto mt-12 w-11/12">
    <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8 border border-green-100">
      {/* Table */}
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-green-100 text-green-700 text-sm uppercase tracking-wide">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Total Paid</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {!isLoading && customers?.length === 0 && (
              <tr>
                <td colSpan={5} className="py-10 text-center text-red-500 font-semibold">
                  🚫 No Customers Found
                </td>
              </tr>
            )}

            {customers?.map((customer: any) => (
              <tr
                key={customer._id}
                className="hover:bg-green-50 transition-all duration-150 ease-in-out"
              >
                <td className="px-6 py-4 font-semibold">{customer.name}</td>
                <td className="px-6 py-4">{customer.email}</td>
                <td
                  className={`px-6 py-4 font-medium ${
                    customer.isBlocked ? 'text-red-500' : 'text-green-600'
                  }`}
                >
                  {customer.isBlocked ? 'Inactive' : 'Active'}
                </td>
                <td className="px-6 py-4">${customer.totalPaid}</td>
                <td className="px-6 py-4 flex justify-center gap-4">
                  <button
                    title="View Profile"
                    className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 hover:scale-105 transition"
                    onClick={() => viewCustomerProfile(customer._id)}
                  >
                    <IoEyeOutline size={20} />
                  </button>
                  <button
                    title={customer.isBlocked ? 'Unblock' : 'Block'}
                    className={`p-2 rounded-full ${
                      customer.isBlocked
                        ? 'bg-green-100 text-green-600 hover:bg-green-200'
                        : 'bg-red-100 text-red-500 hover:bg-red-200'
                    } hover:scale-105 transition`}
                    onClick={() =>
                      handleBlockCustomer(customer._id, !customer.isBlocked)
                    }
                  >
                    <MdBlockFlipped size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {customers?.length > 0 && (
        <div className="flex justify-end mt-8 space-x-2">
          <button
            className="px-3 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 transition disabled:opacity-50"
            onClick={() => handlePageChange(Number(page) - 1)}
            disabled={Number(page) === 1}
          >
            Prev
          </button>
          {[...Array(Math.min(totalPages, 5)).keys()].map((index) => {
            const pageNumber = Number(page) - 2 + index;
            if (pageNumber > 0 && pageNumber <= totalPages) {
              return (
                <button
                  key={pageNumber}
                  className={`px-3 py-1 rounded transition ${
                    Number(page) === pageNumber
                      ? 'bg-green-500 text-white font-semibold'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => handlePageChange(pageNumber)}
                  disabled={Number(page) === pageNumber}
                >
                  {pageNumber}
                </button>
              );
            }
            return null;
          })}
          <button
            className="px-3 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 transition disabled:opacity-50"
            onClick={() => handlePageChange(Number(page) + 1)}
            disabled={Number(page) === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  </div>

  {/* Modal */}
  {showModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
        <button
          className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition"
          onClick={() => setShowModal(false)}
        >
          <RxCross2 size={20} />
        </button>

        <div className="flex flex-col items-center gap-3 mt-4">
          <img
            src={userImage}
            alt={customerProfileToShowInModal?.name}
            className="w-20 h-20 rounded-full object-cover shadow"
          />
          <h3 className="text-lg font-bold text-gray-800">
            {customerProfileToShowInModal?.name}
          </h3>
          <p className="text-sm text-gray-600">{customerProfileToShowInModal?.email}</p>
          <p className="text-sm text-gray-600">
            {customerProfileToShowInModal?.address?.mobile}
          </p>

          {customerProfileToShowInModal?.address?.address ? (
            <div className="text-center text-sm text-gray-500 mt-2 space-y-1">
              <p>
                {customerProfileToShowInModal.address.address},{' '}
                {customerProfileToShowInModal.address.postalCode}
              </p>
              <p>
                {customerProfileToShowInModal.address.city},{' '}
                {customerProfileToShowInModal.address.state},{' '}
                {customerProfileToShowInModal.address.country}
              </p>
            </div>
          ) : (
            <p className="text-sm text-red-400 mt-3 text-center">
              This customer hasn't updated their details yet!
            </p>
          )}
        </div>
      </div>
    </div>
  )}
</div>

  );
};

export default ManageCustomers;
