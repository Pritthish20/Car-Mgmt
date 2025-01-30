import { fetchBaseQuery,createApi } from "@reduxjs/toolkit/query/react";
import {BASE_URL} from '../constants'

<<<<<<< HEAD
const baseQuery=fetchBaseQuery({
    baseUrl: BASE_URL ,
     credentials:"include",
    });
=======
const baseQuery=fetchBaseQuery({baseUrl: BASE_URL });
>>>>>>> cde62efa4c428218d0c581529393dcf34cb76523

export const apiSlice=createApi({
    baseQuery,
    endpoints:()=>({}),
});
