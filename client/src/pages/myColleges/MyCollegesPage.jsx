import { useGetMyCollegesQuery } from "@/redux/features/myCollegeApi"
import { useSelector } from "react-redux"

const MyCollegesPage = () => {

  const userEmail = useSelector(state=>state?.auth?.user?.email)
  const { data, isLoading, error } = useGetMyCollegesQuery(userEmail)

  return (
    <div className="p-2" >

    </div>
  )
}

export default MyCollegesPage