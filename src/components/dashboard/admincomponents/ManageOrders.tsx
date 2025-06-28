'use client';

import Loader from '@/components/common/Loader';
import CheckRoleAndLogout from '@/hooks/CheckRoleAndLogout';
import { useGetProfileQuery } from '@/redux/api/authApi';
import {
  useGetAllOrdersForAdminHistoryQuery,
  useUpdateOrderStatusMutation,
} from '@/redux/api/orderApi';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const ManageOrders = () => {
  CheckRoleAndLogout('admin');

  const [customersEmail, setCustomersEmail] = useState<string>('');

  const { data: profileData, isLoading } = useGetProfileQuery(undefined);
  const userProfileFromDb = profileData?.data;

  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  /* pagination */
  const [page, setPage] = useState<string>('1');
  const limit = '10';
  const handlePageChange = (page: number) => {
    setPage(page.toString());
  };

  /* query */
  const allFilters = {
    page: page,
    limit: limit,
    customersEmail: customersEmail,
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
      customersEmail,
    });
  }, [page, limit, customersEmail]);

  const { data: orders, isLoading: isAllOrdersLoading } =
    useGetAllOrdersForAdminHistoryQuery(queryParams, {
      refetchOnMountOrArgChange: true,
    });
  const allOrders = orders?.data?.data;

  const totalItems = orders?.data?.meta?.total || 0;
  const totalPages = Math.ceil(Number(totalItems) / Number(limit));

  const handleUpdateOrderStatus = async (id: string, status: string) => {
    const data = {
      id,
      orderStatus: status,
    };
    const response = await updateOrderStatus(data).unwrap();

    if (response.statusCode === 200) {
      toast.success('Order status updated successfully', {
        position: 'top-right',
        duration: 1500,
        icon: '🚀',
      });
    } else {
      toast.error('Failed to update order status', {
        position: 'top-right',
        duration: 1500,
        icon: '😢',
      });
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="main-container pb-8">
      <h3 className="text-center mt-10 lg:mt-14 text-xl mb-3 lg:text-2xl">
        Manage Orders
      </h3>
      <p className="text-center lg:mt-2 md:text-md lg:w-2/3 lg:mx-auto">
        Welcome, {userProfileFromDb?.name}! You can manage your orders here. You
        can view and update the status of your orders. Orders can't be canceled
        once they are placed.
      </p>
      {/* order list table */}
      <div className="lg:w-11/12 lg:mx-auto">
        <div className="mb-10 lg:mb-24 mt-6 lg:mt-10 lg:shadow-md lg:rounded-md lg:py-5 lg:px-6 lg:pb-8">
          <div className="mt-0">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Order ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Customer Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date of Order
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Payment Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Bill Paid
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Order Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {
                    // if orders are loading
                    isAllOrdersLoading ? (
                      <div className="mx-auto my-6">
                        <div className="flex justify-center items-center">
                          <div className="flex justify-center items-center">
                            <div className="animate-spin rounded-full size-12 border-b-2 border-red-500"></div>
                          </div>
                        </div>
                      </div>
                    ) : null
                  }
                  {!isAllOrdersLoading && allOrders?.orders?.length === 0 ? (
                    <tr>
                      <td className="text-red-400 font-semibold whitespace-nowrap py-8 pl-12">
                        No Order Found
                      </td>
                    </tr>
                  ) : null}
                  {!isAllOrdersLoading && allOrders?.orders?.length > 0
                    ? allOrders?.orders?.map((order: any) => (
                        <tr
                          className="bg-white border-b hover:bg-orange-50"
                          key={order?.orderId}
                        >
                          <th
                            scope="row"
                            className="px-6 py-6 font-medium text-gray-700 whitespace-nowrap"
                          >
                            {order?.orderId}
                          </th>
                          <td className="px-6 py-6">{`${order?.orderBy}`}</td>
                          <td className="px-6 py-6">{`${order?.createdAt.slice(
                            0,
                            10
                          )}`}</td>
                          <td
                            className={`px-6 py-6 ${
                              order?.isPaid
                                ? 'text-green-400 text-sm'
                                : 'text-red-400'
                            }`}
                          >
                            {order?.isPaid ? 'paid' : 'unpaid'}
                          </td>
                          <td
                            className={`px-6 py-6 ${
                              order?.isPaid ? '' : 'text-red-400'
                            }`}
                          >{`$${order?.totalBill}`}</td>
                          <td
                            className={`px-6 py-6 ${
                              order?.orderStatus === 'delivered'
                                ? 'text-green-400 text-sm'
                                : order?.orderStatus === 'processing' ||
                                  order?.orderStatus === 'cancelled'
                                ? 'text-red-400 text-sm'
                                : 'text-yellow-400 text-sm'
                            }`}
                          >
                            {order?.orderStatus}
                          </td>
                          <td className="py-6 px-1">
                            <button
                              className={`text-[13px] px-1  ${
                                order?.orderStatus === 'delivered'
                                  ? 'text-white bg-orange-400 p-1 rounded'
                                  : ' text-white bg-green-400 p-1 rounded'
                              }`}
                              title="update order status"
                              onClick={() =>
                                handleUpdateOrderStatus(
                                  order?._id,
                                  order?.orderStatus === 'delivered'
                                    ? 'processing'
                                    : 'delivered'
                                )
                              }
                            >
                              {order?.orderStatus === 'delivered'
                                ? 'Mark Processing'
                                : order?.orderStatus === 'processing'
                                ? 'Mark Delivered'
                                : 'Mark Processing'}
                            </button>
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>

              {/*  pagination */}
              {isAllOrdersLoading || allOrders?.orders?.length === 0 ? (
                <div></div>
              ) : (
                <div
                  className={`flex justify-end my-5 ${
                    allOrders?.orders?.length < 5 ? 'mt-[200px]' : 'mt-4'
                  }`}
                >
                  <button
                    className={`px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-200 ${
                      allOrders?.orders?.length < 5 ? 'mr-2' : ''
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
                    className={`px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-200 ${
                      allOrders?.orders?.length < 12 ? 'ml-2' : ''
                    }`}
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

export default ManageOrders;
