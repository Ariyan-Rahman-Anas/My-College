import IsRTKLoadingLoader from "@/components/IsRTKLoadingLoader"
import { useGetMyCollegesQuery } from "@/redux/features/myCollegeApi"
import { useSelector } from "react-redux"

const MyCollegesPage = () => {

  const userEmail = useSelector(state=>state?.auth?.user?.email)
  const { data, isLoading, error } = useGetMyCollegesQuery(userEmail)


  if (isLoading) return <IsRTKLoadingLoader/>

  return (
    <div className="p-2" >
       <table className="w-full text-left text-sm border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-200">
            <th
              className="p-3 border border-gray-700 cursor-pointer"
            >
              College
            </th>  
            <th
              className="p-3 border border-gray-700 cursor-pointer"
            >
              Subject
            </th>  
            <th
              className="p-3 border border-gray-700 cursor-pointer"
            >
              Email
            </th>
            <th
              className="p-3 border border-gray-700 cursor-pointer"
            >
              Applied on
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.colleges?.length > 0 ? (
            data?.colleges?.map(({ id, name, email, createdAt, college, subject }, index) => (
              <tr key={index} className="even:bg-gray-200 odd:bg-gray-300">
                <td className="p-3 border border-gray-700">{college?.name}</td>
                <td className="p-3 border border-gray-700">{subject}</td>
                <td className="p-3 border border-gray-700">{email}</td>
                <td className="p-3 border border-gray-700">{createdAt?.slice(0, 10)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-3">
                No results found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default MyCollegesPage