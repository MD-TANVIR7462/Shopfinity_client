import Loader from '@/components/common/Loader';
import CheckRoleAndLogout from '@/hooks/CheckRoleAndLogout';
import {
  useBlockOrUnblockUserMutation,
  useGetAllCustomersQuery,
  useGetProfileQuery,
} from '@/redux/api/authApi';
import { useEffect, useState } from 'react';
import { IoEyeOutline } from 'react-icons/io5';
import { MdBlockFlipped } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { toast } from 'sonner';
import demoUserImage from '../../../assets/images/babul.png';

const ManageCustomers = () => {
  CheckRoleAndLogout('admin');

  const [customerProfileToShowInModal, setVendorProfileToShowInModal] =
    useState<any>({});
  const [showModal, setShowModal] = useState(false);
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

  const { data: customersData, isLoading: isCustomerLoading } =
    useGetAllCustomersQuery(undefined);
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
        position: 'top-right',
        duration: 1500,
        icon: '👏',
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
    const customerProfile = customers?.find(
      (customer: any) => customer._id === id
    );
    setVendorProfileToShowInModal(customerProfile);
  };

  const userImage = customerProfileToShowInModal?.profileImage || demoUserImage;

  return (
    <div>
      <h3 className="text-center mt-10 lg:mt-14 text-2xl">Manage Customers</h3>
      <p className="text-center lg:mt-2 md:text-md lg:w-2/3 lg:mx-auto">
        Welcome, {userProfileFromDb?.name}! Here you can manage customers. You
        can view all customers, view a single customer and also can block a
        customer. In our next update, we will add more features here.
      </p>
      <div className="lg:w-11/12 lg:mx-auto">
        <div className="mb-10 lg:mb-24 lg:mt-16 lg:shadow-md lg:rounded-md lg:py-5 lg:px-6 lg:pb-8">
          {/* customer list table */}
          <div className="mt-8">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Account Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total BillPaid
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!isLoading && customers?.length === 0 ? (
                    <tr>
                      <td className="text-red-400 font-semibold whitespace-nowrap py-8 pl-12">
                        No Customer Found
                      </td>
                    </tr>
                  ) : null}
                  {!isLoading && customers?.length > 0
                    ? customers.map((customer: any) => (
                        <tr
                          className="bg-white border-b hover:bg-orange-50"
                          key={customer._id}
                        >
                          <th
                            scope="row"
                            className="px-6 py-6 font-medium text-gray-700 whitespace-nowrap"
                          >
                            {customer.name}
                          </th>
                          <td className="px-6 py-6">{`${customer.email}`}</td>
                          <td
                            className={`px-6 py-6 ${
                              customer?.isBlocked
                                ? 'text-red-400'
                                : 'text-green-400'
                            }`}
                            title={`${
                              customer?.isBlocked
                                ? 'This user can not login now'
                                : 'This user can login normally'
                            }`}
                          >{`${
                            customer?.isBlocked ? 'Inactive' : 'Active'
                          }`}</td>
                          <td className="px-6 py-6">{`$${customer?.totalPaid}`}</td>
                          <td className="ml-5 py-6 flex space-x-4 justify-start items-center">
                            <button
                              className="text-lg text-bluish"
                              title="view profile"
                              onClick={() => viewCustomerProfile(customer._id)}
                            >
                              <IoEyeOutline />
                            </button>
                            <button
                              className={`text-md ${
                                customer.isBlocked
                                  ? 'text-green-400'
                                  : 'text-red-400'
                              } `}
                              title={customer.isBlocked ? 'Unblock' : 'Block'}
                              onClick={() =>
                                handleBlockCustomer(
                                  customer?._id,
                                  !customer.isBlocked
                                )
                              }
                            >
                              <MdBlockFlipped />
                            </button>
                            {/* show modal */}
                            <div>
                              {showModal ? (
                                <>
                                  <div
                                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                    data-aos="zoom-in"
                                    data-aos-duration="500"
                                  >
                                    <div className="relative w-11/12 md:w-96 my-6 mx-auto">
                                      {/*content*/}
                                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none pb-4">
                                        {/*header*/}
                                        <div className="flex justify-between p-5 border-b border-solid border-slate-200 rounded-t items-center">
                                          <h3 className="text-md font-semibold text-center">
                                            {customerProfileToShowInModal?.name}
                                          </h3>
                                          <button
                                            className="text-2xl text-red-300 hover:text-red-700 hover:transition-all duration-300 ease-in-out"
                                            onClick={() =>
                                              setShowModal(!showModal)
                                            }
                                          >
                                            <RxCross2 />
                                          </button>
                                        </div>
                                        {/*body*/}
                                        <img
                                          src={userImage}
                                          alt={
                                            customerProfileToShowInModal?.name
                                          }
                                          className="h-20 w-20 rounded-full object-cover mx-auto mt-2"
                                        />

                                        <h3 className="text-sm mt-4 text-center">
                                          {customerProfileToShowInModal?.email}
                                        </h3>
                                        <h3 className="text-sm mt-0.5 text-center">
                                          {
                                            customerProfileToShowInModal
                                              ?.address?.mobile
                                          }
                                        </h3>
                                        {customerProfileToShowInModal?.address
                                          ?.address &&
                                        customerProfileToShowInModal?.address
                                          ?.city &&
                                        customerProfileToShowInModal?.address
                                          ?.country &&
                                        customerProfileToShowInModal?.address
                                          ?.postalCode ? (
                                          <div className="text-sm mt-4 text-center">
                                            <span>
                                              {
                                                customerProfileToShowInModal
                                                  ?.address?.address
                                              }
                                            </span>
                                            {','}
                                            <span>
                                              {
                                                customerProfileToShowInModal
                                                  ?.address?.postalCode
                                              }
                                            </span>{' '}
                                            <br />
                                            <span>
                                              {
                                                customerProfileToShowInModal
                                                  ?.address?.city
                                              }
                                              {','}
                                              {
                                                customerProfileToShowInModal
                                                  ?.address?.state
                                              }
                                              {','}
                                              {
                                                customerProfileToShowInModal
                                                  ?.address?.country
                                              }
                                            </span>
                                          </div>
                                        ) : (
                                          <span className="mt-3 text-center text-sm text-red-400">
                                            This customer did'nt update his
                                            details yet!
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="opacity-25 fixed inset-0 z-40 bg-black transition-all duration-300"></div>
                                </>
                              ) : null}
                            </div>
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>

              {/* pagination */}
              {isLoading || customers?.length === 0 ? (
                <div></div>
              ) : (
                <div
                  className={`flex justify-end my-5 ${
                    customers?.length < 5 ? 'mt-[200px]' : 'mt-4'
                  }`}
                >
                  <button
                    className={`px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-200 ${
                      customers?.length < 11 ? 'mr-2' : ''
                    }`}
                    onClick={() => handlePageChange(Number(page) - 1)}
                    disabled={Number(page) === 1}
                  >
                    Prev
                  </button>
                  {[...Array(Math.min(totalPages, 5)).keys()].map((index) => {
                    const pageNumber = Number(page) - 2 + index;
                    // Check if pageNumber is within valid range and greater than 0
                    if (pageNumber > 0 && pageNumber <= totalPages) {
                      return (
                        <button
                          key={pageNumber}
                          className={`mx-2 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-200 ${
                            Number(page) === pageNumber ? 'font-bold' : ''
                          }`}
                          onClick={() => handlePageChange(pageNumber)}
                          disabled={Number(page) === pageNumber}
                        >
                          {pageNumber}
                        </button>
                      );
                    }
                    return null; // Render nothing for invalid pageNumber
                  })}
                  <button
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-200"
                    onClick={() => handlePageChange(Number(page) + 1)}
                    disabled={Number(page) === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCustomers;
