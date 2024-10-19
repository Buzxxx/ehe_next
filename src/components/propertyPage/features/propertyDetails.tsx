import PropertyStatsOverview from "../ui/propertyStatsOverview"
import {
  Bed,
  Bath,
  SetSquare,
  CheckCircle,
  Paintbrush2Icon,
} from "@/components/ui/icons"
import BookAppointment from "./bookAppointment"

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
  return (
    <section className="flex md:flex-row flex-col gap-4 md:px-20 px-4 py-4 pt-2">
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
      </div>
      <div className="md:w-1/3 w-full">
        <BookAppointment />
      </div>
    </section>
  )
}

export default PropertyDetails
