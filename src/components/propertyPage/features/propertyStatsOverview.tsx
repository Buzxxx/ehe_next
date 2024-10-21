/**
 * @path src/components/propertyPage/ui/PropertyStatsOverview.tsx
 */

import PropertyStat from "../ui/propertyStat"
import {
  Bed,
  Bath,
  SetSquare,
  CheckCircle,
  Paintbrush2Icon,
} from "@/components/ui/icons"

const PropertyStatsOverview = () => {
  const features = [
    { icon: <CheckCircle size={16} />, text: "Active", category: "Status" },
    {
      icon: <Paintbrush2Icon size={18} />,
      text: "3",
      category: "Repair Quality",
    },
    {
      icon: <SetSquare size={18} />,
      text: "6000 sq ft",
      category: "Square Feet",
    },
    { icon: <Bath size={18} />, text: "2 ", category: "Bathrooms" },
    { icon: <Bed size={18} />, text: "3", category: "Bedrooms" },
  ]

  return (
    <div className="grid grid-cols-3 md:grid-cols-5 md:place-items-center gap-x-6 gap-y-6 rounded-md border border-gray-300/75 md:px-0 px-4 py-4">
      {features.map((feature, index) => (
        <PropertyStat
          key={index}
          icon={feature.icon}
          text={feature.text}
          category={feature.category}
        />
      ))}
    </div>
  )
}

export default PropertyStatsOverview
