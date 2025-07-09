import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { toast } from 'sonner';
import {
  RemoveUserFromLocalState,
  setUserInLocalState,
} from '../features/authSlice';
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://shipfinity-backend.vercel.app/api',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState)?.auth?.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error) {
    const errorMessage = (result.error.data as any)?.message;
    toast.error(errorMessage || 'Something went wrong', {
      position: 'top-right',
      duration: 1500,
      icon: '🚨',
    });
  }

  if (result?.error?.status === 401) {
    const response = await fetch(
      'https://shipfinity-backend.vercel.app/api/auth/refresh-token',
      {
        method: 'POST',
        credentials: 'include',
      }
    );

    const data = await response.json();
    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUserInLocalState({
          user,
          token: data?.data?.accessToken,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(RemoveUserFromLocalState());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: [
    'user',
    'products',
    'product',
    'orders',
    'order',
    'coupons',
    'reviews',
    'review',
  ],
  endpoints: () => ({}),
});
