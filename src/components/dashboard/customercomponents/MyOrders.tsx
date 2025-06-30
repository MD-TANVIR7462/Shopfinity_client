"use client";

import Loader from "@/components/common/Loader";
import CheckRoleAndLogout from "@/hooks/CheckRoleAndLogout";
import { useGetProfileQuery } from "@/redux/api/authApi";
import { useGetMyOrdersQuery } from "@/redux/api/orderApi";
import { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaCheckCircle,
  FaTimesCircle,
  FaTruck,
  FaInfoCircle,
} from "react-icons/fa";

const MyOrders = () => {
  CheckRoleAndLogout("customer");

  const [page, setPage] = useState<string>("1");
  const limit = "10";

  const queryParams = new URLSearchParams({ page, limit }).toString();
  const handlePageChange = (newPage: number) => setPage(newPage.toString());

  const { data: profileData, isLoading: isProfileLoading } = useGetProfileQuery(undefined);
  const { data: orders, isLoading: isOrdersLoading } = useGetMyOrdersQuery(queryParams, {
    refetchOnMountOrArgChange: true,
  });

  const user = profileData?.data;
  const allOrders = orders?.data?.data || [];
  const totalItems = orders?.data?.meta?.total || 0;
  const totalPages = Math.ceil(Number(totalItems) / Number(limit));

  const loading = isProfileLoading || isOrdersLoading;
  if (loading) return <Loader />;

  return (
    <div className="min-h-screen py-12 px-4 lg:px-10 bg-gradient-to-br from-white to-gray-100 max-w-[1600px] mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-indigo-700">My Orders</h2>
        <p className="text-gray-600 mt-1">
          Welcome, <span className="font-semibold text-indigo-600">{user?.name}</span> — Here's a breakdown of your recent purchases.
        </p>
      </div>

      {allOrders.length === 0 ? (
        <p className="text-center text-red-600 font-semibold text-lg">No orders found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700">
            <thead className="bg-indigo-50">
              <tr>
                <th className="px-6 py-4 text-left font-semibold uppercase">Order ID</th>
                <th className="px-6 py-4 text-left font-semibold uppercase">Date</th>
                <th className="px-6 py-4 text-left font-semibold uppercase"># of Items</th>
                <th className="px-6 py-4 text-left font-semibold uppercase">Products</th>
                <th className="px-6 py-4 text-left font-semibold uppercase">Payment</th>
                <th className="px-6 py-4 text-left font-semibold uppercase">Shipping</th>
                <th className="px-6 py-4 text-left font-semibold uppercase">Total</th>
                <th className="px-6 py-4 text-left font-semibold uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {allOrders.map((order: any) => (
                <tr key={order.orderId} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-indigo-700">{order.orderId}</td>
                  <td className="px-6 py-4">{order.createdAt.slice(0, 10)}</td>
                  <td className="px-6 py-4">{order.products.length}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {order.products.map((product: any) => (
                        <span
                          key={product.productId}
                          className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-xs font-medium"
                        >
                          {product.title}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {order.isPaid ? (
                      <span className="inline-flex items-center text-green-700 font-semibold text-sm">
                        <FaCheckCircle className="mr-1" /> Paid
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-red-600 font-semibold text-sm">
                        <FaTimesCircle className="mr-1" /> Unpaid
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                      Standard
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">${order.totalBill}</td>
                  <td className="px-6 py-4">
                    {order.orderStatus === "processing" ? (
                      <span className="inline-flex items-center bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs font-semibold">
                        <FaTruck className="mr-1" /> Processing
                      </span>
                    ) : (
                      <span className="inline-flex items-center bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-semibold">
                        <FaBoxOpen className="mr-1" /> Delivered
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 space-x-2">
          <button
            onClick={() => handlePageChange(Number(page) - 1)}
            disabled={Number(page) === 1}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition"
          >
            Prev
          </button>
          {[...Array(Math.min(totalPages, 5)).keys()].map((index) => {
            const pageNumber = Number(page) - 2 + index;
            if (pageNumber > 0 && pageNumber <= totalPages) {
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-4 py-2 rounded ${
                    Number(page) === pageNumber
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            }
            return null;
          })}
          <button
            onClick={() => handlePageChange(Number(page) + 1)}
            disabled={Number(page) === totalPages}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
