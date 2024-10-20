import PropertyStatsOverview from "../ui/propertyStatsOverview"
import {
  Bed,
  Bath,
  SetSquare,
  CheckCircle,
  Paintbrush2Icon,
} from "@/components/ui/icons"
import BookAppointment from "./bookAppointment"
import PropertyListerInfo from "../ui/propertyListerInfo"
import PropertyFeatures from "../ui/propertyFeatures"
import PropertyForm from "@/components/propertyPage/features/propertyForm"

const PropertyDetails = () => {
  const features = [
    { icon: <CheckCircle size={16} />, text: "Active", category: "Status" },
    {
      icon: <Paintbrush2Icon size={20} />,
      text: "3",
      category: "Repair Quality",
    },
    {
      icon: <SetSquare size={20} />,
      text: "6000 sq ft",
      category: "Square Feet",
    },
    { icon: <Bath size={20} />, text: "2 ", category: "Bathrooms" },
    { icon: <Bed size={20} />, text: "3", category: "Bedrooms" },
  ]

  const featuresData = [
    { name: "Area", value: "2500 sqft" },
    { name: "Bedrooms", value: "3" },
    { name: "Bathrooms", value: "2" },
    { name: "Parking", value: "1 Garage" },
    { name: "Year Built", value: "2015" },
    { name: "Furnishing", value: "Semi-Furnished" },
    { name: "Balconies", value: "2" },
    { name: "Floor", value: "5th out of 10" },
    { name: "Power Backup", value: "24/7" },
    { name: "Gym", value: "Fully Equipped" },
    { name: "Swimming Pool", value: "Yes" },
    { name: "Security", value: "24/7 CCTV Surveillance" },
    { name: "Clubhouse", value: "Included" },
    { name: "Elevators", value: "3" },
  ]

  return (
    <section className="flex md:flex-row flex-col gap-8 md:px-20 px-4">
      <div className="md:w-2/3 w-full">
        <PropertyStatsOverview features={features} />
        <h3 className="text-2xl font-semibold mt-10">About This Home</h3>
        <p className="text-gray-700 text-sm mt-4">
          Microtek Greenburg, the name itself suggests that the whole place is
          surrounded with plenteous greenery so eco-friendly and healthy
          environment.
          <br /> <br />
          Everyone is aware that Gurgaon has been witnessing constant
          development enabling people to invest. It has easy access to National
          Highway-8 linking Gurgaon to Delhi, Alwar and Jaipur. Every apartment
          in Microtek GreenBurg Gurgaon is designed with swanky interiors and
          has expansive rooms. Indeed, living rooms have separate flooring and
          the bedrooms have separate ones. It is certain that you will
          experience luxury in every nook and corner of the property. The
          development company has made it sure that premises are properly
          guarded by high-graded security system. Indeed, the property
          explicates wide space where everything is engaged so attractively that
          one could not take their eyes off from the scintillating atmosphere.
          These 2, 3 and 4 BHK luxury apartments are planned in the best way for
          experiencing elite lifestyle. And of course, you get the panoramic
          view of the city from balconies.
          <br /> <br />
          Microtek Greenburg in Sector 86, Gurgaon presents 2BHK, 3BHK and 4BHK
          resort style ultra-luxury apartments with more than 86 premium
          lifestyle amenities. The spacious apartments range from 1480 sq. ft.
          to 3005 sq. ft. configuration. World Class facilities include Quick
          Summary
        </p>
        <PropertyListerInfo />
        <PropertyFeatures features={featuresData} />
      </div>
      <div className="md:w-1/3 w-full">
        <BookAppointment />
        <PropertyForm />
      </div>
    </section>
  )
}

export default PropertyDetails
