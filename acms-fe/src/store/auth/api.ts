'use client';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginViaEmail, User } from './types';
import { siteConfig } from '@/lib/config';
import { RootState } from '../store';
import { BaseResponse } from '@/lib/base-response';

export const authApi = createApi({
  reducerPath: 'authApi',

  tagTypes: ['User'],

  baseQuery: fetchBaseQuery({
    baseUrl: siteConfig.api.baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getUser: builder.query<any, void>({
      query: () => '/users/me',
      transformResponse: (response: BaseResponse<User>) => response.data,
      providesTags: (result) =>
        result ? [{ type: 'User', id: result.id }] : [],
    }),

    sendLoginLink: builder.mutation<any, LoginViaEmail>({
      query: (params) => ({
        url: '/auth/email',
        method: 'POST',
        body: params,
      }),
    }),
  }),
});

export const { useGetUserQuery, useSendLoginLinkMutation } = authApi;
