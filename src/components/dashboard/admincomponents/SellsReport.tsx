'use client';

import Loader from '@/components/common/Loader';
import CheckRoleAndLogout from '@/hooks/CheckRoleAndLogout';
import { useGetProfileQuery } from '@/redux/api/authApi';
import { useGetAllOrdersForAdminHistoryQuery } from '@/redux/api/orderApi';
import { useEffect, useState } from 'react';

const SellsReport = () => {
  CheckRoleAndLogout('admin');

  const [timeframe, setTimeframe] = useState<string>('yearly');
  const [customersEmail, setCustomersEmail] = useState<string>('');

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
    timeframe: timeframe,
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
      timeframe,
      customersEmail,
    });
  }, [page, limit, customersEmail, timeframe]);

  const { data: orders, isLoading: isAllOrdersLoading } =
    useGetAllOrdersForAdminHistoryQuery(queryParams, {
      refetchOnMountOrArgChange: true,
    });
  const allOrders = orders?.data?.data;

  const { data: profileData, isLoading } = useGetProfileQuery(undefined);
  const userProfileFromDb = profileData?.data;

  const totalItems = orders?.data?.meta?.total || 0;
  const totalPages = Math.ceil(Number(totalItems) / Number(limit));

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <h3 className="text-center mt-10 lg:mt-14 text-2xl">Sells Report</h3>
      <p className="text-center lg:mt-2 md:text-md lg:w-2/3 lg:mx-auto">
        Welcome, {userProfileFromDb?.name}! Here you can see total sells history
        of Shopinity. You can view daily sells, monthly sells, weekly sells or
        yearly sells. You will get a proper idea of your business's growth.
      </p>

      {/* buttons */}
      <div className="main-container lg:w-11/12 lg:mx-auto my-3 lg:my-0">
        <div className="flex flex-col md:flex-row space-y-2 mt-5 justify-end items-center space-x-2 lg:space-x-4">
          <button
            className={`${
              timeframe === 'daily' ? 'bg-red-400' : 'bg-red-200'
            } rounded-md px-6 py-1 cursor-pointer text-white  transition-colors duration-300 ease-in-out mt-3`}
            onClick={() => setTimeframe('daily')}
          >
            Daily
          </button>
          <button
            className={`${
              timeframe === 'weekly' ? 'bg-red-400' : 'bg-red-200'
            } rounded-md px-6 py-1 cursor-pointer text-white  transition-colors duration-300 ease-in-out`}
            onClick={() => setTimeframe('weekly')}
          >
            Weekly
          </button>
          <button
            className={`${
              timeframe === 'monthly' ? 'bg-red-400' : 'bg-red-200'
            } rounded-md px-6 py-1 cursor-pointer text-white  transition-colors duration-300 ease-in-out`}
            onClick={() => setTimeframe('monthly')}
          >
            Monthly
          </button>
          <button
            className={`${
              timeframe === 'yearly' ? 'bg-red-400' : 'bg-red-200'
            } rounded-md px-6 py-1 cursor-pointer text-white  transition-colors duration-300 ease-in-out`}
            onClick={() => setTimeframe('yearly')}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* summary */}
      <div className="main-container lg:w-11/12 lg:mx-auto my-3 lg:my-0">
        <div className="grid grid-cols-12 gap-y-6 lg:gap-x-12 mt-6 md:mt-8 lg:mt-14">
          <div className="h-44 col-span-12 lg:col-span-4 py-5 px-3 shadow-md rounded-md flex flex-col justify-center items-center gap-y-5">
            <h3 className={`gradientTitle text-4xl font-bold`}>
              {allOrders?.completedSells === undefined
                ? 0
                : allOrders?.completedSells}
            </h3>
            <p className="text-xl font-semibold">Sells Completed</p>
          </div>
          <div className="h-44 col-span-12 lg:col-span-4 py-5 px-3 shadow-md rounded-md flex flex-col justify-center items-center gap-y-5">
            <h3 className={`gradientTitle text-4xl font-bold`}>
              {`$${
                allOrders?.totalSells?.toFixed(2) === undefined
                  ? 0
                  : allOrders?.totalSells?.toFixed(2)
              }`}
            </h3>
            <p className="text-xl font-semibold">Total Sells</p>
          </div>
          <div className="h-44 col-span-12 lg:col-span-4 py-5 px-3 shadow-md rounded-md flex flex-col justify-center items-center gap-y-5">
            <h3 className={`gradientTitle text-4xl font-bold`}>
              {`$${
                allOrders?.gizmobuyProfit?.toFixed(2) === undefined
                  ? 0
                  : allOrders?.gizmobuyProfit?.toFixed(2)
              }`}
            </h3>
            <p className="text-xl font-semibold">Shopinity Profit</p>
          </div>
        </div>
      </div>

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

export default SellsReport;
