'use client';

import Loader from '@/components/common/Loader';
import CheckRoleAndLogout from '@/hooks/CheckRoleAndLogout';
import { useGetProfileQuery } from '@/redux/api/authApi';
import { useGetMyOrdersQuery } from '@/redux/api/orderApi';
import { useEffect, useState } from 'react';

const MyOrders = () => {
  CheckRoleAndLogout('customer');

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

  const { data: orders, isLoading: isMyOrdersLoading } = useGetMyOrdersQuery(
    queryParams,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const allOrders = orders?.data?.data;

  const totalItems = orders?.data?.meta?.total || 0;
  const totalPages = Math.ceil(Number(totalItems) / Number(limit));

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <h3 className="text-center mt-10 lg:mt-14 text-2xl">My Orders</h3>
      <p className="text-center lg:mt-2 md:text-md lg:w-2/3 lg:mx-auto">
        Welcome, {userProfileFromDb?.name}! Here you can see all your orders
        with all the details you might need to see. If you have any questions,
        please contact us. We are happy to help you.
      </p>
      {/* order list table */}
      <div className="lg:w-11/12 lg:mx-auto">
        <div className="mb-10 lg:mb-24 lg:mt-10 lg:shadow-md lg:rounded-md lg:py-5 lg:px-6 lg:pb-8">
          <div className="mt-0">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Order ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Products
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Order Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Payment Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total Bill
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Order Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {
                    // if orders are loading
                    isMyOrdersLoading ? (
                      <div className="mx-auto my-6">
                        <div className="flex justify-center items-center">
                          <div className="flex justify-center items-center">
                            <div className="animate-spin rounded-full size-12 border-b-2 border-red-500"></div>
                          </div>
                        </div>
                      </div>
                    ) : null
                  }
                  {!isMyOrdersLoading && allOrders?.length === 0 ? (
                    <tr>
                      <td className="text-red-400 font-semibold whitespace-nowrap py-8 pl-12">
                        No Order Found
                      </td>
                    </tr>
                  ) : null}
                  {!isMyOrdersLoading && allOrders?.length > 0
                    ? allOrders?.map((order: any) => (
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
                          <td className="px-6 py-6">
                            {order?.products.map((product: any) => (
                              <div
                                key={product?.productId}
                                className="flex items-center"
                              >
                                <p className="ml-2 border px-1 py-0.5 text-center text-sm rounded mt-1">
                                  {product?.title}
                                </p>
                              </div>
                            ))}
                          </td>
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
                            className={`px-6 py-6 text-sm ${
                              order.orderStatus === 'processing'
                                ? 'text-red-400'
                                : order?.orderStatus === 'delivered'
                                ? 'text-green-400'
                                : ''
                            }`}
                          >
                            {`${
                              order?.orderStatus === 'processing'
                                ? 'processing'
                                : 'completed'
                            }`}
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>

              {/*  pagination */}
              {isMyOrdersLoading || allOrders?.length === 0 ? (
                <div></div>
              ) : (
                <div
                  className={`flex justify-end my-5 ${
                    allOrders?.length < 5 ? 'mt-[200px]' : 'mt-4'
                  }`}
                >
                  <button
                    className={`px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-200 ${
                      allOrders?.length < 5 ? 'mr-2' : ''
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
                      allOrders?.length < 12 ? 'ml-2' : ''
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

export default MyOrders;
