"use client";

import Loader from "@/components/common/Loader";
import CheckRoleAndLogout from "@/hooks/CheckRoleAndLogout";
import { useGetProfileQuery } from "@/redux/api/authApi";
import { useGetAllOrdersForAdminHistoryQuery } from "@/redux/api/orderApi";
import { useEffect, useMemo, useState } from "react";

const SellsReport = () => {
  CheckRoleAndLogout("admin");

  const [timeframe, setTimeframe] = useState("yearly");
  const [customersEmail, setCustomersEmail] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const queryParams = useMemo(() => {
    const query = new URLSearchParams();
    query.set("page", page.toString());
    query.set("limit", limit.toString());
    query.set("timeframe", timeframe);
    if (customersEmail) query.set("customersEmail", customersEmail);
    return query.toString();
  }, [page, limit, timeframe, customersEmail]);

  const { data: orders, isLoading: isAllOrdersLoading } = useGetAllOrdersForAdminHistoryQuery(queryParams, {
    refetchOnMountOrArgChange: true,
  });

  const { data: profileData, isLoading: isProfileLoading } = useGetProfileQuery(undefined);
  const userProfileFromDb = profileData?.data;
  const allOrders = orders?.data?.data;

  const totalItems = orders?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalItems / limit);

  if (isProfileLoading) return <Loader />;

  return (
    <div className="px-4 md:px-8 lg:px-16 py-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <h3 className="text-center text-3xl font-bold text-gray-800">Sales Report</h3>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mt-2">
        Welcome, <span className="font-medium text-gray-800">{userProfileFromDb?.name}</span>! Track your shop's
        performance through daily, weekly, monthly, or yearly sales statistics.
      </p>

      Timeframe Buttons
      <div className="flex flex-wrap justify-center gap-3 mt-8">
        {["daily", "weekly", "monthly", "yearly"].map((label) => (
          <button
            key={label}
            className={`capitalize px-6 py-2 rounded-md font-medium shadow-sm transition-all duration-300 text-white ${
              timeframe === label ? "bg-red-500" : "bg-red-300 hover:bg-red-400"
            }`}
            onClick={() => {
              setTimeframe(label);
              setPage(1); // reset to first page when changing filter
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center text-center">
          <h3 className="text-4xl font-bold text-red-500">{allOrders?.completedSells ?? 0}</h3>
          <p className="text-gray-700 mt-2 text-lg font-medium">Sales Completed</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center text-center">
          <h3 className="text-4xl font-bold text-green-500">${allOrders?.totalSells?.toFixed(2) ?? 0}</h3>
          <p className="text-gray-700 mt-2 text-lg font-medium">Total Sales</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center text-center">
          <h3 className="text-4xl font-bold text-blue-500">${allOrders?.gizmobuyProfit?.toFixed(2) ?? 0}</h3>
          <p className="text-gray-700 mt-2 text-lg font-medium">Shopinity Profit</p>
        </div>
      </div>

      {/* Order Table */}
      <div className="mt-12 overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-600">
          <thead className="bg-gray-100 text-gray-700 text-xs uppercase">
            <tr>
              <th className="px-6 py-4 text-left">Order ID</th>
              <th className="px-6 py-4 text-left">Customer Email</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Payment</th>
              <th className="px-6 py-4 text-left">Total</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {isAllOrdersLoading ? (
              <tr>
                <td colSpan={5} className="text-center py-8">
                  <div className="animate-spin size-10 border-4 border-red-500 border-t-transparent rounded-full mx-auto"></div>
                </td>
              </tr>
            ) : allOrders?.orders?.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-red-400 py-8 font-medium">
                  No Orders Found
                </td>
              </tr>
            ) : (
              allOrders?.orders?.map((order: any) => (
                <tr key={order?.orderId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800">{order?.orderId}</td>
                  <td className="px-6 py-4">{order?.orderBy}</td>
                  <td className="px-6 py-4">{order?.createdAt?.slice(0, 10)}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        order?.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                      }`}
                    >
                      {order?.isPaid ? "Paid" : "Unpaid"}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-700">${order?.totalBill}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!isAllOrdersLoading && allOrders?.orders?.length > 0 && (
        <div className="flex justify-center mt-8 gap-2">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          {[...Array(Math.min(totalPages, 5)).keys()]
            .map((index) => page - 2 + index)
            .filter((p) => p > 0 && p <= totalPages)
            .map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                disabled={page === pageNum}
                className={`px-3 py-1 rounded ${
                  page === pageNum ? "bg-red-500 text-white font-bold" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
              >
                {pageNum}
              </button>
            ))}
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SellsReport;
