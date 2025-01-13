import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    // baseUrl: import.meta.env.VITE_SERVER_URL,
    credentials: "include",
  }),
  tagTypes: ["college", "myCollege", "clgReview"],
  endpoints: () => ({}),
});