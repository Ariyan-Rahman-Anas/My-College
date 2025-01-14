import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.mutation({
      query: (credentials) => ({
        url: "/users/registration",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags:["user"]
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags:["user"]
    }),
    googleAuth: builder.mutation({
      query: (credentials) => ({
        url: "/users/google",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags:["user"]
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
      invalidatesTags:["user"]
    }),
    // updateProfile: builder.mutation({
    //   query: ({ userId, ...userData }) => ({
    //     url: `/users/edit-profile`,
    //     method: "PATCH",
    //     body: userData,
    //     params: userId
    //   }),
    //   invalidatesTags:["user"]
    // })
    updateProfile: builder.mutation({
  query: ({ userId, ...userData }) => ({
    url: `/users/edit-profile?userId=${userId}`, // Append userId to the query string
    method: "PATCH",
    body: userData, // Include only the fields to be updated in the body
  }),
  invalidatesTags: ["user"], // Invalidate user-related cache
}),

  }),
});

export const {
  useRegistrationMutation,
  useLoginMutation, useGoogleAuthMutation,
  useLogoutMutation,
  useUpdateProfileMutation
} = authApi