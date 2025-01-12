import { baseApi } from "@/redux/api/baseApi";

const collegeApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getColleges: builder.query({
            query: ({ page }) => {
                let basQuery = `/colleges/list?page=${page}`;
                return basQuery;
            }
        }),
        getACollege: builder.query({
            query: (collegeId) => `colleges/${collegeId}`
        }),
        searchColleges: builder.query({
            query: (key) => {
                return `/colleges/search/${key}`;
            }
        })
    })
});

export const { useGetCollegesQuery, useGetACollegeQuery, useSearchCollegesQuery } = collegeApi