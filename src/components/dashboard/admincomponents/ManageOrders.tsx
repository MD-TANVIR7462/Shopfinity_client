"use client";

import Loader from "@/components/common/Loader";
import CheckRoleAndLogout from "@/hooks/CheckRoleAndLogout";
import { useGetProfileQuery } from "@/redux/api/authApi";
import { useGetAllOrdersForAdminHistoryQuery, useUpdateOrderStatusMutation } from "@/redux/api/orderApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ManageOrders = () => {
  CheckRoleAndLogout("admin");

  const [customersEmail, setCustomersEmail] = useState<string>("");

  const { data: profileData, isLoading } = useGetProfileQuery(undefined);
  const userProfileFromDb = profileData?.data;

  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  /* pagination */
  const [page, setPage] = useState<string>("1");
  const limit = "10";
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
      keyValuePairs.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
    }
    return keyValuePairs.join("&");
  };

  let queryParams = createQueryString(allFilters);

  useEffect(() => {
    queryParams = createQueryString({
      page,
      limit,
      customersEmail,
    });
  }, [page, limit, customersEmail]);

  const { data: orders, isLoading: isAllOrdersLoading } = useGetAllOrdersForAdminHistoryQuery(queryParams, {
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
      toast.success("Order status updated successfully", {
        position: "top-right",
        duration: 1500,
        icon: "🚀",
      });
    } else {
      toast.error("Failed to update order status", {
        position: "top-right",
        duration: 1500,
        icon: "😢",
      });
    }
  };

  if (isLoading || isAllOrdersLoading) {
    return <Loader />;
  }

  return (
    <div className="main-container pb-12   min-h-screen">
      <h3 className="text-center mt-10 lg:mt-14 text-3xl font-bold text-green-600">Manage Orders</h3>
      <p className="text-center text-gray-600 mt-2 text-md max-w-2xl mx-auto px-4">
        Welcome, <span className="text-green-600 font-semibold">{userProfileFromDb?.name}</span>! You can manage and
        update your orders here. Note: Orders can't be canceled once placed.
      </p>

      {/* Order list table */}
      <div className="w-full  mx-auto mt-12">
        <div className="bg-white shadow-xl rounded-xl p-6 lg:p-8 border border-green-100">
          <div className="relative overflow-x-auto rounded-lg">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="bg-green-100 text-green-700 text-xs uppercase tracking-wide">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer Email</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Payment</th>
                  <th className="px-6 py-4">Bill</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 bg-white">
                {isAllOrdersLoading && (
                  <tr>
                    <td colSpan={7} className="py-10 text-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500 mx-auto" />
                    </td>
                  </tr>
                )}

                {!isAllOrdersLoading && allOrders?.orders?.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-red-500 font-semibold">
                      🚫 No Orders Found
                    </td>
                  </tr>
                )}

                {!isAllOrdersLoading &&
                  allOrders?.orders?.length > 0 &&
                  allOrders?.orders?.map((order: any) => (
                    <tr key={order?.orderId} className="hover:bg-green-50 transition">
                      <td className="px-6 py-4 font-semibold">{order?.orderId}</td>
                      <td className="px-6 py-4">{order?.orderBy}</td>
                      <td className="px-6 py-4">{order?.createdAt.slice(0, 10)}</td>
                      <td className={`px-6 py-4 ${order?.isPaid ? "text-green-500" : "text-red-500"}`}>
                        {order?.isPaid ? "Paid" : "Unpaid"}
                      </td>
                      <td className={`px-6 py-4 ${!order?.isPaid ? "text-red-500" : ""}`}>${order?.totalBill}</td>
                      <td
                        className={`px-6 py-4 capitalize ${
                          order?.orderStatus === "delivered"
                            ? "text-green-600"
                            : order?.orderStatus === "processing"
                            ? "text-yellow-500"
                            : "text-red-500"
                        }`}
                      >
                        {order?.orderStatus}
                      </td>
                      <td className="px-6 py-4 space-x-2 flex items-center">
                        <button
                          className={`text-xs px-3 py-1 rounded shadow-sm transition font-medium
      ${
        order?.orderStatus === "processing"
          ? "bg-green-500 text-white opacity-70 cursor-not-allowed"
          : "bg-green-500 text-white hover:bg-green-600"
      }
    `}
                          disabled={order?.orderStatus === "processing"}
                          onClick={() => handleUpdateOrderStatus(order?._id, "processing")}
                        >
                          Mark Processing
                        </button>

                        <button
                          className={`text-xs px-3 py-1 rounded shadow-sm transition font-medium
      ${
        order?.orderStatus === "delivered"
          ? "bg-yellow-500 text-white opacity-70 cursor-not-allowed"
          : "bg-yellow-500 text-white hover:bg-yellow-600"
      }
    `}
                          disabled={order?.orderStatus === "delivered"}
                          onClick={() => handleUpdateOrderStatus(order?._id, "delivered")}
                        >
                          Mark Delivered
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {/* Pagination */}
            {!isAllOrdersLoading && allOrders?.orders?.length > 0 && (
              <div className="flex justify-end mt-6 gap-2">
                <button
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
                  onClick={() => handlePageChange(Number(page) - 1)}
                  disabled={Number(page) === 1}
                >
                  Prev
                </button>

                {[...Array(Math.min(totalPages, 5)).keys()].map((index) => {
                  const pageNumber = Number(page) - 2 + index;
                  return pageNumber > 0 && pageNumber <= totalPages ? (
                    <button
                      key={pageNumber}
                      className={`px-3 py-1 rounded transition ${
                        Number(page) === pageNumber
                          ? "bg-green-500 text-white font-semibold"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      onClick={() => handlePageChange(pageNumber)}
                      disabled={Number(page) === pageNumber}
                    >
                      {pageNumber}
                    </button>
                  ) : null;
                })}

                <button
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
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
  );
};

export default ManageOrders;
