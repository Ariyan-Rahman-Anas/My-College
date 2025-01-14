import { Card } from "../ui/card"
import study from "./../../assets/key-services/1.jpg"
import sports from "./../../assets/key-services/2.jpg"
import events from "./../../assets/key-services/3.jpg"
import library from "./../../assets/key-services/4.jpg"

const KeyService = () => {

    const ourKeyService = [
        {
            title: "Study Rooms",
            description: "Reserve a quiet space for your group project or solo study time.",
            img: study
        },
        {
            title: "Sports Facilities",
            description: "Book basketball courts, gyms, and more for recreational activities.",
            img: sports
        },
        {
            title: "Event Spaces",
            description: "Rent event halls for clubs, lectures, or social gatherings.",
            img: events
        },
        {
            title: "Library Services",
            description: "Get your hands on study resources, study booths, and equipment.",
            img: library
        },
    ]

  return (
      <div className="space-y-4">
          <div className="text-center space-y-1.5">
              <h1 className="heading">Key Services</h1>
              <p className="text-gray-600" >Our mission is to provide a comprehensive, convenient, and affordable education experience for our students.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {
                  ourKeyService.map(({ title, description, img }, idx) => <Card key={idx} className="group" >
                      <div className="overflow-hidden rounded-lg">
                          <img src={img} alt={title} loading="lazy" className="w-full h-full rounded-lg group-hover:scale-100 scale-150 duration-500 " />
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

export default KeyService