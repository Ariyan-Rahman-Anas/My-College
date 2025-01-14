import CollegeReviews from "@/components/home/CollegeReviews"
import GraduatesGallery from "@/components/home/GraduatesGallery"
import Hero from "@/components/home/Hero"
import HowItWorks from "@/components/home/HowItWorks"
import KeyService from "@/components/home/KeyService"
import ResearchPapers from "@/components/home/ResearchPapers"
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
      <GraduatesGallery />
      <CollegeReviews />
      <ResearchPapers />
    </div>
  )
}
export default HomePage