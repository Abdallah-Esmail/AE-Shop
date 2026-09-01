import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const cartApi = createApi({
  reducerPath: "cartApi",
  tagTypes: ["Cart"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/carts`,
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMyCart: builder.query({
      query: () => "",
      providesTags: ["Cart"],
    }),
    addToMyCart: builder.mutation({
      query: (credentials) => ({
        url: "/",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCartItemQuantity: builder.mutation({
      query: ({ id, quantity }) => ({
        url: `/${id}`,
        method: "PUT",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"],
    }),
    deleteCartItem: builder.mutation({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    clearCart: builder.mutation({
      query: () => ({
        url: "/",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    createCashOrder: builder.mutation({
      query: ({ cartId, shippingAddress }) => ({
        url: `/${cartId}/orders`,
        method: "POST",
        body: { shippingAddress },
      }),
      invalidatesTags: ["Cart"],
    }),

    checkoutSession: builder.query({
      query: ({ cartId, shippingAddress }) => ({
        url: `/${cartId}/checkout-session`,
        method: "GET",
        params: shippingAddress,
      }),
    }),
  }),
});

export const {
  useGetMyCartQuery,
  useAddToMyCartMutation,
  useUpdateCartItemQuantityMutation,
  useDeleteCartItemMutation,
  useCreateCashOrderMutation,
  useLazyCheckoutSessionQuery,
  useClearCartMutation,
} = cartApi;
