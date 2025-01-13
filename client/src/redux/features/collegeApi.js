import { baseApi } from "@/redux/api/baseApi";

const collegeApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getCollegesWithPagination: builder.query({
            query: ({ page }) => {
                let basQuery = `/colleges/list?page=${page}`;
                return basQuery;
            },
            providesTags: ["college"]
        }),
        getColleges: builder.query({
            query: () => "/colleges/all",
            providesTags: ["college"]
        }),
        getACollege: builder.query({
            query: (collegeId) => `colleges/${collegeId}`,
            providesTags: ["college"]
        }),
        searchColleges: builder.query({
            query: (key) => {
                return `/colleges/search/${key}`;
            },
            providesTags: ["college"]
        })
    })
});

export const {
    useGetCollegesWithPaginationQuery,
    useGetCollegesQuery,
    useGetACollegeQuery,
    useSearchCollegesQuery
} = collegeApi
