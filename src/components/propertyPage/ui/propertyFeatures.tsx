import React from "react"

// Single property feature item
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
const PropertyFeatures = ({
  features,
}: {
  features: { name: string; value: string }[]
}) => {
  // Split features into two halves
  const middleIndex = Math.ceil(features.length / 2)
  const leftColumnFeatures = features.slice(0, middleIndex)
  const rightColumnFeatures = features.slice(middleIndex)

  return (
    <div className="mt-10">
      <h4 className="text-xl font-semibold">Property Features</h4>
      <div className="w-full flex flex-wrap mt-3 justify-between gap-20 max-h-80 overflow-y-auto pr-8">
        {/* Left Column */}
        <div className="flex-1">
          {leftColumnFeatures.map((feature, index) => (
            <PropertyFeature
              key={index}
              featureName={feature.name}
              featureValue={feature.value}
            />
          ))}
        </div>

        {/* Right Column */}
        <div className="flex-1">
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

export default PropertyFeatures
