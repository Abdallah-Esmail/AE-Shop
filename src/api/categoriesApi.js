import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/categories`,
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (params) => ({
        url: "/",
        params,
      }),
    }),
    getCategory: builder.query({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useGetCategoriesQuery, useGetCategoryQuery } = categoriesApi;
