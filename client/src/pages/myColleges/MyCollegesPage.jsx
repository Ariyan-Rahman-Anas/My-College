import IsRTKLoadingLoader from "@/components/IsRTKLoadingLoader"
import ReviewModal from "@/components/ReviewModal"
import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"
import { useGetMyCollegesQuery } from "@/redux/features/myCollegeApi"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const MyCollegesPage = () => {

  const userEmail = useSelector(state => state?.auth?.user?.email)
  const { data, isLoading, error } = useGetMyCollegesQuery(userEmail)

  if (isLoading) return <IsRTKLoadingLoader />

  return (
    <div className="p-2 min-h-[50vh] flex flex-col items-center justify-center " >

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {
          data?.colleges?.map(({ name, email, image, college, subject, createdAt }, idx) => <Card key={idx}
            className="space-y-4">
            <div>
              <img src={college.image} alt={college?.name} className="w-full h-full rounded-lg" />
            </div>
            <div className="text-sm">
              <CardTitle className="text-xl">{college?.name}</CardTitle>
              <h3>Applied for : {subject}</h3>
              <h3>Applied on : {createdAt.slice(0, 10)}</h3>
            </div>
            <div className="flex items-center gap-2 overflow-hidden ">
              <div className="h-10 min-w-10 rounded-full">
                <img src={image?.url} alt={name} className="w-full h-full rounded-full" />
              </div>
              <div>
                <h1 className="font-semibold">{name}</h1>
                <p className="text-sm">{email}</p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <Link to={`/colleges/${college?._id}`}>
                <Button>Details</Button>
              </Link>
              <div>
                <ReviewModal clgId={college?._id}/>
              </div>
            </div>
          </Card>)
        }
      </div>

      {
        error && <div className="border-2 border-dashed rounded-lg border-gray-300 w-full md:w-fit mx-auto">
          <div className="text-center p-4 space-y-2">
            <h1 className="text-2xl font-semibold">Oops!</h1>
            <p className="text-sm font-semibold " >{error?.data?.message}</p>
          </div>
        </div>
      }
    </div>
  )
}
export default MyCollegesPage