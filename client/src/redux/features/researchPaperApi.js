import { baseApi } from "@/redux/api/baseApi";

const researchPaperApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        allResearchPapers: builder.query({
            query: () => "/research/list",
            providesTags: ["research"]
        }),
        researchPaperDetail: builder.query({
            query: (researchPaperId) => `/research/${researchPaperId}`,
            providesTags: ["research"]
        })
    })
})
export const { useAllResearchPapersQuery, useResearchPaperDetailQuery } = researchPaperApi;