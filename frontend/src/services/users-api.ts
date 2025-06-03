import type { User } from '@/types/user';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './base-service';


export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUserById: builder.query<User, { id: number }>({
      query: ({ id }) => `/users/${id}`,
      providesTags: (_, error, { id }) => error ? [] : [{ type: 'User', id }],
    }),
  }),
})

export const { useGetUserByIdQuery } = usersApi
