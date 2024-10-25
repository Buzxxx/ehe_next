import { propertiesData } from "../noSql"
import PropertyListingCard from "../ui/propertyListingCard"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "@/components/ui/icons"

const PropertyListingSection = () => {
  return (
    <div className="md:px-20 px-2 md:mt-16 mt-6 py-2 pb-8">
      <div className="flex justify-between flex-wrap gap-2">
        <hgroup>
          <h4 className="text-xl font-semibold">Similar Listings</h4>
          <p className="text-slate-500 text-sm">
            View our carefully curated selection of the best homes on the market
            today
          </p>
        </hgroup>

        <Button className="bg-transparent text-slate-500 border border-slate-500 hover:text-slate-700 hover:border-slate-700 justify-between gap-1 pr-2 md:flex hidden">
          See All Listings <ChevronRight size={18} />
        </Button>
      </div>
      <div className="flex md:flex-row flex-col justify-between items-stretch md:gap-16 gap-4 mt-4">
        {propertiesData.map((property) => (
          <PropertyListingCard key={property.id} property={property} />
        ))}
      </div>
      <Button className="bg-transparent text-slate-500 border border-slate-500 hover:text-slate-700 hover:border-slate-700 justify-between gap-1 pr-2 md:hidden flex  mx-auto my-4 items-center">
        <p>See All Listings </p>
        <ChevronRight size={18} />
      </Button>
    </div>
  )
}

export default PropertyListingSection
