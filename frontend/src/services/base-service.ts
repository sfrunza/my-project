import { toast } from "sonner";
import { isRejectedWithValue, type Middleware } from "@reduxjs/toolkit";
import { type BaseQueryFn, type FetchArgs, type FetchBaseQueryError, type FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from "js-cookie";

export type QueryFn = BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>

interface RefreshTokenResponse {
  token: string;
}
type RefreshResult = {
  data?: RefreshTokenResponse;
  error?: FetchBaseQueryError;
}


const baseQuery: QueryFn = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_URL}/api/v1`,
  credentials: 'include',
});


export const baseQueryWithReauth: QueryFn = async (args, api, extraOptions) => {
  // First attempt
  let result = await baseQuery(args, api, extraOptions);

  // If we get a 401 and it's not already a refresh token request
  if (result.error?.status === 401 &&
    typeof args === 'object' &&
    args.url !== '/session/refresh_token') {

    // Try to refresh the token
    const refreshResult = await baseQuery(
      { url: '/session/refresh_token', method: 'GET' },
      api,
      extraOptions
    ) as RefreshResult;

    if (refreshResult.data?.token) {
      // If refresh was successful, retry the original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      // If refresh failed, clear the session
      Cookies.remove("session_id");
      // You might want to dispatch a logout action here
      // api.dispatch(logout());
    }
  }

  return result;
};

export interface ApiError {
  status: number | string;
  error?: string;
  data?: {
    error?: string;
    errors?: Record<string, string | string[]>;
    message?: string;
  };
}

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const error = action.payload as ApiError;

    if (error?.status === 'FETCH_ERROR') {
      toast.error('Network error: Please check your internet connection.');
    } else if (error?.status === 401) {
      // toast.error('Error', {
      //   description: error.data?.error,
      // });
    } else if (error?.status === 403) {
      // toast.error(error.data?.error);
      // return null
    } else if (error?.status === 500) {
      // toast.error('Internal Server Error');
    }
  }
  return next(action);
};