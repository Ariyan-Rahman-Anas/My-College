import { baseApi } from "@/redux/api/baseApi";

const myCollegeApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        postMyCollege: builder.mutation({
            query: collegeData => ({
                url: "/my-college/create",
                method: "POST",
                body: collegeData,
            }),
            invalidatesTags:["myCollege"],
        }),
        getMyColleges: builder.query({
            query:(email)=>({
                url: "/my-college/list",
                params: { email }
            }),
            providesTags:["myCollege"]
        })
    })
})
export const {usePostMyCollegeMutation, useGetMyCollegesQuery } = myCollegeApi