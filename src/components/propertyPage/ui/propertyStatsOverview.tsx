/**
 * @path src/components/propertyPage/ui/PropertyStatsOverview.tsx
 */

import PropertyStat from "./propertyStat"

const PropertyStatsOverview = ({
  features,
}: {
  features: {
    icon: React.ReactNode
    text: string
    category: string
  }[]
}) => {
  return (
    <div className="flex justify-between gap-6 rounded-md border border-gray-300/75 px-8 py-4 ">
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
