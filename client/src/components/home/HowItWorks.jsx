import { CalendarCheck2, MonitorCheck, PackageSearch } from "lucide-react"
import { Card } from "../ui/card"

const HowItWorks = () => {

    const works = [
        {
            title: "Browse Services",
            description: "Explore available spaces and resources.",
            icon: <PackageSearch />
        },
        {
            title: "Select Your Time",
            description: "Choose a time slot that suits your schedule.",
            icon:<CalendarCheck2 />
        },
        {
            title: "Confirm & Book",
            description: "Complete your booking in seconds.",
            icon:<MonitorCheck />
        },
    ]

  return (
      <div className="space-y-4">
          <h1 className="heading ">How It works</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full md:w-[85%] mx-auto">
                         {
                            works.map(({ title, description, icon }, idx) => <Card key={idx}>
                                <div className="overflow-hidden rounded-lg">
                                    <>
                                    {icon}
                                    </>
                                </div>
                                <div>
                                    <h1 className="font-semibold text-xl mt-3 mb-1" >{title}</h1>
                                    <p className="text-gray-600" >{description}</p>
                                </div>
                            </Card> )
                        }
          </div>
    </div>
  )
}

export default HowItWorks