import HeroSection from "@/components/HeroSection"
import FeaturedSection from "@/components/FeaturedSection"
import ProductsSection from "@/components/ProductsSection"
import GlobalAppBar from "@/components/GlobalAppBar"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <GlobalAppBar />
      
      <main>
        <HeroSection />
        <FeaturedSection />
        <div id="productos">
          <ProductsSection />
        </div>
      </main>
    </div>
  )
}
