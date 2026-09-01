import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  tagTypes: ["Wishlist"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/wishlist`,
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMyWishlist: builder.query({
      query: () => "",
      providesTags: ["Wishlist"],
    }),
    addToMyWishlist: builder.mutation({
      query: (credentials) => ({
        url: "/",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Wishlist"],
    }),
    removeFromMyWishlist: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const {
  useGetMyWishlistQuery,
  useAddToMyWishlistMutation,
  useRemoveFromMyWishlistMutation,
} = wishlistApi;
