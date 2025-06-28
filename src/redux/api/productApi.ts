import { baseApi } from './baseApi';

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (productData) => {
        return {
          url: '/products',
          method: 'POST',
          body: productData,
        };
      },
      invalidatesTags: ['products'],
    }),
    getProducts: builder.query({
      query: (query) => {
        return {
          url: `/products?${query}`,
          method: 'GET',
        };
      },
      providesTags: ['products'],
    }),
    getSingleProduct: builder.query({
      query: (id) => {
        return {
          url: `/products/${id}`,
          method: 'GET',
        };
      },
      providesTags: ['product'],
    }),
    getAllProductsOfAVendorToManage: builder.query({
      query: (query) => {
        return {
          url: `/products/manage-products?${query}`,
          method: 'GET',
        };
      },
      providesTags: ['product', 'products'],
    }),
    updateProduct: builder.mutation({
      query: (productData) => {
        return {
          url: `/products/${productData?.id}`,
          method: 'PUT',
          body: productData,
        };
      },
      invalidatesTags: ['products', 'product'],
    }),
    deleteProduct: builder.mutation({
      query: (id) => {
        return {
          url: `/products/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['product', 'products'],
    }),
    deleteMultipleProducts: builder.mutation({
      query: (deleteContainer) => {
        return {
          url: `/products`,
          method: 'DELETE',
          body: {
            productIds: deleteContainer,
          },
        };
      },
      invalidatesTags: ['product', 'products'],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useDeleteMultipleProductsMutation,
  useGetAllProductsOfAVendorToManageQuery,
} = productApi;
