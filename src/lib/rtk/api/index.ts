import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IRootState } from '@/lib/rtk/hook';

export const baseQueryApi = fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as IRootState).auth.access_token;
        const type = (getState() as IRootState).auth.type;
        if(token) headers.set('Authorization', `${type} ${token}`);
        headers.set('Content-Type', 'application/json');
        return headers;
    },
});

export const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQueryApi(args, api, extraOptions);
    return result;
}