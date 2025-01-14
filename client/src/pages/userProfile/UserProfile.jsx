import ProfileEditModal from "@/components/ProfileEditModal"
import { Card, CardTitle } from "@/components/ui/card"
import { useSelector } from "react-redux"

const UserProfile = () => {
  const { name, email, createdAt } = useSelector(state => state?.auth?.user)
  
  return (
    <div className="p-2">
      <Card className="w-full md:w-[85%] mx-auto relative ">
        <CardTitle className="text-2xl">{name}</CardTitle>
        <p>{email}</p>
        <p className="absolute top-4 right-4 text-sm font-semibold " >Joined on {createdAt.slice(0, 10)}</p>

        <div className="flex items-center ml-auto w-fit">
          <ProfileEditModal />
        </div>
      </Card>
    </div>
  )
}
export default UserProfile