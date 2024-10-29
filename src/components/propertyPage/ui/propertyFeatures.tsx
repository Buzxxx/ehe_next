/**
 * @path src/components/propertyPage/ui/propertyFeatures.tsx
 */

import React from "react"

const PropertyFeature = ({
  featureName,
  featureValue,
}: {
  featureName: string
  featureValue: string
}) => {
  return (
    <div className="flex justify-between items-center w-full py-2 border-b border-slate-200/70">
      <p className="text-sm text-slate-500">{featureName}</p>
      <p className="text-sm text-slate-600 font-medium">{featureValue}</p>
    </div>
  )
}

// Property features list (two-column layout)
const PropertyFeatures = React.memo(
  ({ features }: { features: { name: string; value: string }[] }) => {
    // Split features into two halves
    const middleIndex = Math.ceil(features.length / 2)
    const leftColumnFeatures = features.slice(0, middleIndex)
    const rightColumnFeatures = features.slice(middleIndex)

    return (
      <div className="md:mt-16 mt-6">
        <h4 className="text-xl font-semibold">Property Features</h4>
        <div className="w-full flex md:flex-row flex-col mt-3 justify-between md:gap-20 md:max-h-72 max-h-64  overflow-y-auto md:px-0 md:pr-8 px-4">
          {/* Left Column */}
          <div className="flex-1 snap-mandatory snap-always snap-end">
            {leftColumnFeatures.map((feature, index) => (
              <PropertyFeature
                key={index}
                featureName={feature.name}
                featureValue={feature.value}
              />
            ))}
          </div>

          {/* Right Column */}
          <div className="flex-1 snap-mandatory snap-always snap-end">
            {rightColumnFeatures.map((feature, index) => (
              <PropertyFeature
                key={index + middleIndex} // Adjust key for the right column
                featureName={feature.name}
                featureValue={feature.value}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
)
PropertyFeatures.displayName = "PropertyFeatures"

export default PropertyFeatures
