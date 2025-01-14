import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.mutation({
      query: (credentials) => ({
        url: "/users/registration",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["user"]
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["user"]
    }),
    googleAuth: builder.mutation({
      query: (credentials) => ({
        url: "/users/google",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["user"]
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
      invalidatesTags: ["user"]
    }),
    updateProfile: builder.mutation({
      query: ({ userId, ...userData }) => ({
        url: `/users/edit-profile?userId=${userId}`,
        method: "PATCH",
        body: userData,
      }),
      invalidatesTags: ["user"],
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/users/forgot-session",
        method: "POST",
        body: email ,
      }),
      invalidatesTags: ["user"]
    }),
    resetPassword: builder.mutation({
      query: (email, password) => ({
        url: "/users/reset-password",
        method: "PATCH",
        body: email, password,
      }),
      invalidatesTags: ["user"]
    })
  }),
});

export const {
  useRegistrationMutation,
  useLoginMutation, useGoogleAuthMutation,
  useLogoutMutation,
  useUpdateProfileMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation
} = authApi