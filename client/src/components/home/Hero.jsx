import { Link } from "react-router-dom"
import hero from "./../../assets/hero.gif"
import { Button } from "../ui/button"

const Hero = () => {
  return (
    <div className="relative max-h-[110vh] ">
      <img src={hero} alt="hero section media file" loading="lazy" className="w-full h-full rounded-md max-h-[110vh] " />
      <div className="h-full w-full bg-black absolute top-0 left-0 rounded-md opacity-65 flex items-center justify-center ">
        <div className="text-white text-center space-y-3 px-2 ">
          <h1 className="text-xl md:text-4xl font-semibold" >Book College Services & Facilities with Ease!</h1>
          <p className="text-xs md:text-base">Explore, book, and manage services and facilities like study rooms, sports equipment, event spaces, and more.</p>
          <div>
            <Link to={"/colleges"} className="mt-3">
              <Button className="bg-white text-black font-bold hover:bg-gray-300 duration-500 ">Explore Services</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Hero