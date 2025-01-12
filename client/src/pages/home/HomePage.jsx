import Hero from "@/components/Hero"
import SearchCollege from "@/components/SearchCollege"

const HomePage = () => {
  return (
    <div className="px-2 space-y-4">
      <SearchCollege />
      <Hero />
    </div>
  )
}

export default HomePage