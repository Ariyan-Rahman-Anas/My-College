import IsRTKLoadingLoader from "@/components/IsRTKLoadingLoader"
import { useResearchPaperDetailQuery } from "@/redux/features/researchPaperApi"
import { useParams } from "react-router-dom"

const ResearchPaperDetailsPage = () => {

    const {id} = useParams()
    const { data, isLoading, error } = useResearchPaperDetailQuery(id)
    const { title } = data?.researchPaper || {}
    
    if (isLoading) {
        return <IsRTKLoadingLoader />
    }

  return (
    <div className="p-2" >{title} </div>
  )
}

export default ResearchPaperDetailsPage