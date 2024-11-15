import dynamic from "next/dynamic"
import Navbar from "@/components/propertyPage/features/navbar"
import Hero from "../features/hero"
import PropertyStatsOverview from "../features/propertyStatsOverview"

// Dynamically import the other components
const BookAppointment = dynamic(() => import("../features/bookAppointment"))
const PropertyAbout = dynamic(() => import("../ui/propertyAbout"))
const PropertyForm = dynamic(
  () => import("@/components/propertyPage/features/propertyForm")
)
const PropertyFeaturesTable = dynamic(
  () => import("../features/propertyFeaturesTable")
)
const PropertyListerInfo = dynamic(() => import("../features/propertyListerInfo"))
const PropertyListingSection = dynamic(
  () => import("../ui/propertyListingSection")
)
const Footer = dynamic(() => import("../ui/footer"))

const PropertyPageLayout = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <section className="flex md:flex-row flex-col-reverse md:gap-2 gap-4 md:px-20 px-2 scroll-smooth">
        <div className="flex flex-col md:gap-0 gap-4 md:w-2/3">
          <PropertyStatsOverview />
          <PropertyAbout />
        </div>
        <BookAppointment />
      </section>

      <section className="flex md:flex-row flex-col gap-4 md:px-20 px-2 scroll-smooth">
        <div className="flex flex-col gap-4 md:w-2/3">
          <PropertyFeaturesTable />
          <PropertyListerInfo />
        </div>
        <PropertyForm bgClassName="relative w-full bg-center rounded-2xl shadow-xl border-slate-400 bg-fixed bg-[url('/property/property1.webp')] bg-cover text-white" title="Inquire Now"/>
      </section>

      <PropertyListingSection />
      <Footer />
    </>
  )
}

export default PropertyPageLayout
