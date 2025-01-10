import { baseApi } from "@/redux/api/baseApi";

const myCollegeApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        postMyCollege: builder.mutation({
            query: collegeData => ({
                url: "/my-college/create",
                method: "POST",
                body: collegeData,
            })
        }),
        getMyColleges: builder.query({
            query:(email)=>({
                url: "/my-college/list",
                params: { email }
            })
        })
    })
})

export const {usePostMyCollegeMutation, useGetMyCollegesQuery } = myCollegeApi