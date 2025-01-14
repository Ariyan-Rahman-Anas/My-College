import IsRTKLoadingLoader from "@/components/IsRTKLoadingLoader"
import { Card, CardTitle } from "@/components/ui/card"
import { useGetACollegeQuery } from "@/redux/features/collegeApi"
import { Star } from "lucide-react"
import { useParams } from "react-router-dom"

const CollegeDetailsPage = () => {
    const { id } = useParams()
    const { data, isLoading } = useGetACollegeQuery(id)
    const college = data?.college
    const { name, image, details, rating, admissionDates, researchHistory, events, sports } = college || {}

    const researchPapers = researchHistory?.split(",").map(paper => paper.trim())

    if (isLoading) {
        return <IsRTKLoadingLoader />;
    }

    return (
        <div className="p-2">
            <div className="grid grid-cols-1 md:grid-cols-2 items-start justify-between gap-4">
                <div className="flex-1">
                    <img src={image} alt={name} className="w-full h-full rounded-md" />
                </div>
                <div className="flex-1 flex flex-col items-start justify-between h-full border2 ">
                    <div>
                        <h2 className="text-3xl font-semibold" >{name} </h2>
                        <div className="flex items-center gap-1">
                            <p className="font-semibold" >{rating}</p>
                            {Array.from({ length: rating || 1 }, (_, idx) => idx + 1).map((num) => (
                                <Star key={num} size={14} color="gold" fill="gold" />
                            ))}
                        </div>
                    </div>
                    <p>{details}</p>
                </div>
            </div>

            <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4 space-y-4">
                <Card className="flex1">
                    <CardTitle>Admission on going:</CardTitle>
                    <ul>
                        {Object.entries(admissionDates).map(([key, value]) => (
                            <li key={key}> <span className="font-semibold capitalize">{key}:</span> {value.slice(0, 10)}</li>
                        ))}
                    </ul>
                </Card>

                <Card>
                    <CardTitle>Research Papers:</CardTitle>
                    <ul>
                        {researchPapers?.map(paper => (
                            <li key={paper}>{paper}</li>
                        ))}
                    </ul>
                </Card>
            </div>

            <Card>
                <CardTitle>Events:</CardTitle>
                <ul>
                    {events?.map(event => (
                        <li key={event}>{event}</li>
                    ))}
                </ul>
            </Card>

            <Card>
                <CardTitle>Sports:</CardTitle>
                <ul>
                    {sports?.map(sport => (
                        <li key={sport}>{sport}</li>
                    ))}
                </ul>
            </Card>
        </div>
    )
}
export default CollegeDetailsPage