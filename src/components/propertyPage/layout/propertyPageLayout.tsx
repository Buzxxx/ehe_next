import Navbar from "@/components/propertyPage/features/navbar"
import Hero from "../features/hero"
import PropertyListingSection from "../features/propertyListingSection"
import BookAppointment from "../features/bookAppointment"
import PropertyStatsOverview from "../features/propertyStatsOverview"
import PropertyAbout from "../ui/propertyAbout"
import PropertyForm from "@/components/propertyPage/features/propertyForm"
import PropertyFeaturesTable from "../features/propertyFeaturesTable"
import PropertyListerInfo from "../ui/propertyListerInfo"

const PropertyPageLayout = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <section className="flex md:flex-row flex-col-reverse md:gap-2 gap-4 md:px-20 px-4">
        <div className="flex flex-col md:gap-0 gap-4 md:w-2/3">
          <PropertyStatsOverview />
          <PropertyAbout />
        </div>
        <BookAppointment />
      </section>

      <section className="flex md:flex-row flex-col gap-4 md:px-20 px-4">
        <div className="flex flex-col gap-4 md:w-2/3">
          <PropertyFeaturesTable />
          <PropertyListerInfo />
        </div>
        <PropertyForm />
      </section>

      <PropertyListingSection />
    </>
  )
}

export default PropertyPageLayout
