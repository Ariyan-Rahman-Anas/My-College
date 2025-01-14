import { useAllResearchPapersQuery } from "@/redux/features/researchPaperApi"
import ResearchPaperCard from "./ResearchPaperCard"
import IsRTKLoadingLoader from "../IsRTKLoadingLoader"
import { useGetCollegesQuery } from "@/redux/features/collegeApi"

const ResearchPapers = () => {
  const { data: researchPaperData, isLoading } = useAllResearchPapersQuery()
  const { data: collegeData } = useGetCollegesQuery()

  if (isLoading) {
    return <IsRTKLoadingLoader />
  }

  // Combine research papers and colleges by index
  const researchPapersWithCollege = researchPaperData?.researchPapers?.map((paper, index) => {
    const collegeName = collegeData?.colleges?.[index]?.name || "Unknown College"
    return {
      ...paper,
      collegeName
    }
  })

  return (
    <div className="space-y-4">
      <div className="text-center space-y-1.5">
        <h1 className="heading">Research Papers</h1>
        <p>Explore groundbreaking research papers, discover diverse academic insights, and celebrate the brilliance of student-led initiatives shaping the future.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {researchPapersWithCollege?.map((paper, idx) => (
          <ResearchPaperCard key={idx} paper={paper} />
        ))}
      </div>
    </div>
  )
}
export default ResearchPapers