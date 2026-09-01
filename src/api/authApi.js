import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/auth`,
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/signup",
        method: "POST",
        body: credentials,
      }),
    }),
    forgetPassword: builder.mutation({
      query: (email) => ({
        url: "/forgetPassword",
        method: "POST",
        body: { email },
      }),
    }),
    verifyPasswordResetCode: builder.mutation({
      query: (credentials) => ({
        url: "/verifyPasswordResetCode",
        method: "POST",
        body: credentials,
      }),
    }),
    resetPassword: builder.mutation({
      query: (credentials) => ({
        url: "/resetPassword",
        method: "PUT",
        body: credentials,
      }),
    }),
    getMe: builder.query({
      query: () => "/getMe",
    }),
  }),
});

export const {
  useLoginUserMutation,
  useSignupMutation,
  useForgetPasswordMutation,
  useVerifyPasswordResetCodeMutation,
  useResetPasswordMutation,
  useGetMeQuery,
} = authApi;
