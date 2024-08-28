'use client';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginViaEmail } from './types';
import { siteConfig } from '@/lib/config';
import { RootState } from '../store';

export const authApi = createApi({
  reducerPath: 'authApi',

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
