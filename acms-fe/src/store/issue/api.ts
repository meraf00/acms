'use client';

import { siteConfig } from '@/lib/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { Issue } from './types';

export const issueApi = createApi({
  reducerPath: 'issueApi',

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
    reportIssue: builder.mutation<any, Issue>({
      query: (params) => ({
        url: '/issues',
        method: 'POST',
        body: params,
      }),
    }),
  }),
});

export const { useReportIssueMutation } = issueApi;
