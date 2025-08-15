import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryApi } from '@/lib/rtk/api/index';

export const authApiService = createApi({
    reducerPath: 'authApiService',
    baseQuery: baseQueryApi,
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (payload: {username: string; password: string}) => ({
                url: 'url',
                method: 'POST',
                body: payload
            })
        }),
        logout: builder.mutation({
            query: (payload: {access_token: string}) => ({
                url: 'url',
                method: 'POST',
                body: payload
            })
        })
    })
});

export const { useLoginMutation, useLogoutMutation } = authApiService;