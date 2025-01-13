import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.mutation({
      query: (credentials) => ({
        url: "/users/registration",
        method: "POST",
        body: credentials,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
      }),
    }),
    googleAuth: builder.mutation({
      query: (credentials) => ({
        url: "/users/google",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
    useRegistrationMutation,
    useLoginMutation, useGoogleAuthMutation,
    useLogoutMutation
} = authApi