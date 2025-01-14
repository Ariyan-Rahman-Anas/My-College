import { Link } from "react-router-dom"
import { Card, CardTitle } from "../ui/card"

const ResearchPaperCard = ({ paper }) => {
    const { _id, title, collegeName, publication_date } = paper || {}

    return (
        <Link to={`/research-details/${_id}`}>
            <Card>
                <p className="text-sm font-semibold ">{collegeName}</p>

                <div className="mt-2">
                <CardTitle className="tracking-wide leading-5">{title}</CardTitle>

                </div>

                <p className="text-sm ">Published on: {publication_date.slice(0,10)}</p>
            </Card>
        </Link>
    )
}
export default ResearchPaperCard