'use client';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { siteConfig } from '@/lib/config';
import { RootState } from '@/store/store';
import { BaseResponse } from '@/lib/base-response';
import {
  CapturedImage,
  GetContestImagesDto,
  ImageMetadataDto,
  PresignedUrlDto,
  UploadConfirmationDto,
  UploadFileDto,
} from './types';

export const monitoringApi = createApi({
  reducerPath: 'monitoringApi',

  tagTypes: ['CapturedImages'],

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
    getContestImages: builder.query<CapturedImage[], GetContestImagesDto>({
      query: (params) =>
        `/records/${params.contestId}/students/${params.contestantId}`,
      transformResponse: (response: BaseResponse<CapturedImage[]>) =>
        response.data,
      providesTags: (result, error, params) => [
        {
          type: 'CapturedImages',
          id: `${params.contestId}_${params.contestantId}`,
        },
      ],
    }),

    generatePresignedUploadUrl: builder.mutation<
      PresignedUrlDto,
      ImageMetadataDto
    >({
      query: (params) => ({
        url: '/storage/presigned-upload-url',
        method: 'POST',
        body: params,
      }),
      transformResponse: (response: BaseResponse<PresignedUrlDto>) =>
        response.data,
    }),

    upload: builder.mutation<BaseResponse<any>, UploadFileDto>({
      query: ({ presignedUrl, file }) => ({
        url: presignedUrl,
        method: 'PUT',
        body: file,
      }),
    }),

    confirmUpload: builder.mutation<void, UploadConfirmationDto>({
      query: ({ token }) => ({
        url: '/storage/confirm-upload',
        method: 'POST',
        body: { token },
      }),
    }),
  }),
});

export const {
  useGetContestImagesQuery,
  useGeneratePresignedUploadUrlMutation,
  useUploadMutation,
  useConfirmUploadMutation,
} = monitoringApi;
