import Hero from "@/components/home/Hero"
import HowItWorks from "@/components/home/HowItWorks"
import KeyService from "@/components/home/KeyService"
import SearchCollege from "@/components/SearchCollege"

const HomePage = () => {
  return (
    <div className="px-2 space-y-20">
      <div className="space-y-2">
        <SearchCollege />
      <Hero />
      </div>
      <KeyService />
      <HowItWorks />
    </div>
  )
}

export default HomePage