import { apiSlice } from "./apiSlice";
import { BASE_URL,USER_URL } from "../constants";

export const authApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(data)=>({
                url:`${BASE_URL}${USER_URL}/login`,
                method: 'POST',
                body: data,
            }),
        }),
        logout:builder.mutation({
            query:()=>({
                url:`${BASE_URL}${USER_URL}/logout`,
                method: 'POST',
            }),
        }),
        signin:builder.mutation({
            query:(data)=>({
                url:`${BASE_URL}${USER_URL}/signup`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useSigninMutation
}=authApiSlice;