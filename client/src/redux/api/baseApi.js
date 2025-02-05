import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL || "http://localhost:3000/api",
    // baseUrl: "http://localhost:3000/api",
    credentials: "include",
  }),
  tagTypes: ["user", "college", "myCollege", "clgReview", "research"],
  endpoints: () => ({}),
});