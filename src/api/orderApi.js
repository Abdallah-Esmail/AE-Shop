import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const orderApi = createApi({
  reducerPath: "orderApi",
  tagTypes: ["Order"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/orders`,
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMyOrders: builder.query({
      query: ({ sort }) => ({
        url: "/",
        params: {
          sort,
        },
      }),
      providesTags: ["Order"],
    }),
    getOrder: builder.query({
      query: (id) => `/${id}`,
      providesTags: ["Order"],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetMyOrdersQuery,
  useGetOrderQuery,
  useUpdateOrderStatusMutation,
} = orderApi;
