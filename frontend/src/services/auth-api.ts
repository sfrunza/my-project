import { createApi } from '@reduxjs/toolkit/query/react'
import { setUser } from '@/slices/auth-slice'
import { baseQueryWithReauth } from './base-service'


export interface SessionUser {
  id: number;
  first_name: string;
  last_name: string;
  email_address: string;
  role: "customer" | "admin" | "manager" | "foreman" | "driver" | "helper";
}

interface LoginResponse {
  user: SessionUser
  token: string
}


interface LoginRequest {
  email_address: string
  password: string
}

interface AuthResponse {
  token: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/session',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          dispatch(setUser(response.data.user));
        } catch (error) {
          console.log("error", error);
        }
      },
    }),
    refreshToken: builder.mutation<AuthResponse, void>({
      query: () => ({
        url: '/session/refresh_token',
        method: 'GET',
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/session',
        method: 'DELETE',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(setUser(null));
        } catch (error) {
          console.log("error", error);
        }
      },
    }),
    forgotPassword: builder.mutation<{
      message: string;
    }, { email_address: string }>({
      query: (credentials) => ({
        url: '/passwords',
        method: 'POST',
        body: credentials,
      }),
    }),
    resetPassword: builder.mutation<{
      message: string;
    }, { password: string, token: string }>({
      query: (credentials) => ({
        url: `/passwords/${credentials.token}`,
        method: 'PUT',
        body: credentials,
      }),
    }),
    verify: builder.mutation<{ error: string } | { user: SessionUser }, void>({
      query: () => ({
        url: '/session',
        method: 'GET',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          if ('error' in response.data) {
            dispatch(setUser(null));
          } else {
            dispatch(setUser(response.data.user));
          }
        } catch (error) {
          dispatch(setUser(null));
          console.log("error", error);
        }
      },
    }),
  }),
})

export const { useLoginMutation, useRefreshTokenMutation, useVerifyMutation, useForgotPasswordMutation, useResetPasswordMutation, useLogoutMutation } = authApi
