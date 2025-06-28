import { baseApi } from './baseApi';

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => {
        return {
          url: '/orders/init-payment',
          method: 'POST',
          body: orderData,
        };
      },
      invalidatesTags: ['products', 'product', 'orders'],
    }),
    updateOrderStatus: builder.mutation({
      query: (data) => {
        return {
          url: `/orders/update-order-status/${data?.id}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['orders', 'order'],
    }),
    getAllOrdersForAdminHistory: builder.query({
      query: (query) => {
        return {
          url: `/orders/sells-history?${query}`,
          method: 'GET',
        };
      },
      providesTags: ['orders', 'order'],
    }),
    getMyOrders: builder.query({
      query: (query) => {
        return {
          url: `/orders/my-orders?${query}`,
          method: 'GET',
        };
      },
      providesTags: ['orders', 'order'],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersForAdminHistoryQuery,
  useGetMyOrdersQuery,
  useUpdateOrderStatusMutation,
} = orderApi;
