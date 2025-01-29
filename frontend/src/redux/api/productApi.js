import { apiSlice } from "./apiSlice";
import { BASE_URL,CARS_URL, UPLOAD_URL } from "../constants";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getAllProduct: builder.query({
      query: () => `${BASE_URL}${CARS_URL}/all`,
    }),

    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: `${BASE_URL}${CARS_URL}/create`,
        method: "POST",
        body: newProduct,
      }),
    }),

    updateProduct: builder.mutation({
      query: ({ id, updatedProduct }) => ({
        url: `${BASE_URL}${CARS_URL}/update/${id}`,
        method: "PUT",
        body: updatedProduct,
      }),
    }),


    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${BASE_URL}${CARS_URL}/delete/${id}`,
        method: "DELETE",
      }),
    }),

    getSpecificMovie: builder.query({
      query: (id) => `${BASE_URL}${CARS_URL}/${id}`,
    }),

    uploadImage: builder.mutation({
      query: (formData) => ({
        url: `${BASE_URL}${UPLOAD_URL}`,
        method: "POST",
        body: formData,
      }),
    }),

   
  }),
});

export const{
  useGetAllProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetSpecificMovieQuery,
  useUploadImageMutation,
 }=productApiSlice;
