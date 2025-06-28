import { baseApi } from './baseApi';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginData) => {
        return {
          url: '/auth/login',
          method: 'POST',
          body: loginData,
        };
      },
      invalidatesTags: ['user'],
    }),
    signup: builder.mutation({
      query: (signupData) => {
        return {
          url: '/auth/register',
          method: 'POST',
          body: signupData,
        };
      },
      invalidatesTags: ['user'],
    }),
    getProfile: builder.query({
      query: () => {
        return {
          url: '/auth/get-profile',
          method: 'GET',
        };
      },
      providesTags: ['user'],
    }),
    changePassword: builder.mutation({
      query: (passwordData) => {
        return {
          url: '/auth/change-password',
          method: 'POST',
          body: passwordData,
        };
      },
    }),
    updateProfile: builder.mutation({
      query: (profileDataToBeUpdated) => {
        return {
          url: '/auth/update-profile',
          method: 'PUT',
          body: profileDataToBeUpdated,
        };
      },
      invalidatesTags: ['user'],
    }),
    getAdminOverviewMetaData: builder.query({
      query: () => {
        return {
          url: '/auth/getadminoverviewdata',
          method: 'GET',
        };
      },
      providesTags: ['user'],
    }),
    getVendorOverviewMetaData: builder.query({
      query: () => {
        return {
          url: '/auth/getvendoroverviewdata',
          method: 'GET',
        };
      },
      providesTags: ['user'],
    }),
    getCustomerOverviewMetaData: builder.query({
      query: () => {
        return {
          url: '/auth/getcustomeroverviewdata',
          method: 'GET',
        };
      },
      providesTags: ['user'],
    }),
    getAllVendorsForAdmin: builder.query({
      query: (query) => {
        return {
          url: `/auth/getallvendors?${query}`,
          method: 'GET',
        };
      },
      providesTags: ['user'],
    }),
    getAllCustomers: builder.query({
      query: (query) => {
        return {
          url: `/auth/getallcustomers?${query}`,
          method: 'GET',
        };
      },
      providesTags: ['user'],
    }),
    blockOrUnblockUser: builder.mutation({
      query: (blockOrUnblockData) => {
        return {
          url: '/auth/blockorunblockuser',
          method: 'PUT',
          body: {
            id: blockOrUnblockData.id,
            block: blockOrUnblockData.block,
          },
        };
      },
      invalidatesTags: ['user'],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useGetProfileQuery,
  useChangePasswordMutation,
  useUpdateProfileMutation,
  useGetAdminOverviewMetaDataQuery,
  useGetVendorOverviewMetaDataQuery,
  useGetCustomerOverviewMetaDataQuery,
  useGetAllVendorsForAdminQuery,
  useGetAllCustomersQuery,
  useBlockOrUnblockUserMutation,
} = authApi;
