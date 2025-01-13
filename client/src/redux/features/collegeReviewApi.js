import { baseApi } from "@/redux/api/baseApi";

const collegeReviewApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getCollegeReviews: builder.query({
            query: (clgId) => ({
                url: "/reviews/clg-review",
                params: clgId
            }),
            providesTags: ["clgReview"]
        }),
        createReview: builder.mutation({
            query: (reviewData) => ({
                url: `/reviews/create`,
                method: "POST",
                body: reviewData,
            }),
            invalidatesTags: ["clgReview"]
        }),
    })
})

export const { useGetCollegeReviewsQuery, useCreateReviewMutation } = collegeReviewApi;