/**
 * @path src/components/contracts/features/contractsObject.tsx
 */

import {
  capabilities,
  contractTypes,
  integrations,
  licensingModels,
  organizationalFunctions,
  regions,
  vendors,
} from "../noSql"

export interface SelectedOptions {
  regions: number[]
  capabilities: number[]
  organizationalFunctions: number[]
  contractTypes: number[]
  licensingModels: number[]
  integrations: number[]
}

export interface Vendor {
  id: string
  vendorName: string
  logo: string
  email: string
  website: string
  description: string
  regions: number[]
  capabilities: number[]
  organizationalFunctions: number[]
  contractTypes: number[]
  licensingModels: number[]
  integrations: number[]
  vendorLocation: string
  vendorServices: string
  vendorMatchPercentage: number
  isVerified: boolean
}

export const stepInputFields = [
  {
    title: "capabilities",
    description:
      "Which of the following capabilities do you need the software to support?",
    imagePath: "/contracts/images/capability.png",
    inputType: "multiSelect" as const,
    choices: capabilities,
  },
  {
    title: "organizational functions",
    description:
      "Which of the following functions do you need the software to support?",
    imagePath: "/contracts/images/organizational_function.png",
    inputType: "multiSelect" as const,
    choices: organizationalFunctions,
  },
  {
    title: "contract types",
    description:
      "Which of the following contract types do you need the software to support?",
    imagePath: "/contracts/images/contract.webp",
    inputType: "multiSelect" as const,
    choices: contractTypes,
  },
  {
    title: "licensing models",
    description:
      "Which of the following integrations do you need the software to support?",
    imagePath: "/contracts/images/licensing.webp",
    inputType: "multiSelect" as const,
    choices: licensingModels,
  },
  {
    title: "integrations",
    description: "Do you require use of the software on specific device(s)?",
    imagePath: "/contracts/images/integrations.webp",
    inputType: "multiSelect" as const,
    choices: integrations,
  },
  {
    title: "regions",
    description: "Do you require use of the software on specific device(s)?",
    imagePath: "/contracts/images/regions.png",
    inputType: "multiSelect" as const,
    choices: regions,
  },
]

export const defaultSelectedOptions: SelectedOptions = {
  regions: [],
  capabilities: [],
  organizationalFunctions: [],
  contractTypes: [],
  licensingModels: [],
  integrations: [],
}

// Function to map step number to the correct slice of stepInputFields
export function getInputFieldsForStep(step: number) {
  return stepInputFields.slice(step * 3, (step + 1) * 3)
}

// Utility function to check if all selectedOptions are empty
export function isSelectedOptionsEmpty(selectedOptions: SelectedOptions) {
  return Object.values(selectedOptions).every((options) => options.length === 0)
}

export function toCamelCase(str: string) {
  // Split the string by spaces
  const words = str.split(" ")

  // Convert the first word to lowercase and capitalize the first letter of subsequent words
  const camelCased = words
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase() // First word is lowercase
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Capitalize the rest
    })
    .join("") // Join all the words together

  return camelCased
}

export function camelCaseToLowercase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Insert a space before each uppercase letter
    .toLowerCase() // Convert the entire string to lowercase
}

function calculateFeatureMatchPercentage(
  selectedValues: number[],
  vendorValues: number[]
): { percentage: number; breakdown: Record<number, boolean> } {
  if (!selectedValues.length || !vendorValues.length)
    return { percentage: 0, breakdown: {} }

  const breakdown: Record<number, boolean> = {}
  selectedValues.forEach((value) => {
    breakdown[value] = vendorValues.includes(value)
  })

  const matches = Object.values(breakdown).filter(Boolean).length
  const percentage = Math.round((matches / selectedValues.length) * 100)

  return { percentage, breakdown }
}

function getPercentageBreakdown(
  vendor: Vendor,
  selectedOptions: SelectedOptions
) {
  return {
    regionMatch: calculateFeatureMatchPercentage(
      vendor.regions,
      selectedOptions.regions
    ),
    capabilitiesMatch: calculateFeatureMatchPercentage(
      vendor.capabilities,
      selectedOptions.capabilities
    ),
    organizationalFunctionMatch: calculateFeatureMatchPercentage(
      vendor.organizationalFunctions,
      selectedOptions.organizationalFunctions
    ),
    contractTypeMatch: calculateFeatureMatchPercentage(
      vendor.contractTypes,
      selectedOptions.contractTypes
    ),
    licensingModelMatch: calculateFeatureMatchPercentage(
      vendor.licensingModels,
      selectedOptions.licensingModels
    ),
    integrationMatch: calculateFeatureMatchPercentage(
      vendor.integrations,
      selectedOptions.integrations
    ),
  }
}

function getAveragePercentage(
  breakdown: Record<string, { percentage: number }>
): number {
  const totalPercentage = Object.values(breakdown).reduce(
    (acc, val) => acc + val.percentage,
    0
  )
  return totalPercentage / Object.keys(breakdown).length
}

export function calculateVendorMatchBreakdown(
  selectedOptions: SelectedOptions,
  selectedVendors: string[]
) {
  // Filter the vendorData to only include vendors that are in the selectedVendors list
  const filteredVendors = vendors.filter((vendor) =>
    selectedVendors.includes(vendor.id)
  )

  // Calculate the match percentages for the filtered vendors only
  return filteredVendors.map((vendor) => {
    const breakdown = getPercentageBreakdown(vendor, selectedOptions)

    const averageMatchPercentage = Math.round(getAveragePercentage(breakdown))

    return {
      vendorName: vendor.vendorName,
      breakdown: {
        regions: {
          percentage: breakdown.regionMatch.percentage,
          values: breakdown.regionMatch.breakdown,
        },
        capabilities: {
          percentage: breakdown.capabilitiesMatch.percentage,
          values: breakdown.capabilitiesMatch.breakdown,
        },
        organizationalFunctions: {
          percentage: breakdown.organizationalFunctionMatch.percentage,
          values: breakdown.organizationalFunctionMatch.breakdown,
        },
        contractTypes: {
          percentage: breakdown.contractTypeMatch.percentage,
          values: breakdown.contractTypeMatch.breakdown,
        },
        licensingModels: {
          percentage: breakdown.licensingModelMatch.percentage,
          values: breakdown.licensingModelMatch.breakdown,
        },
        integrations: {
          percentage: breakdown.integrationMatch.percentage,
          values: breakdown.integrationMatch.breakdown,
        },
      },
      averageMatchPercentage,
    }
  })
}

export function calculateVendorAverageMatchPercentage(selectedOptions: SelectedOptions) {
  return vendors.map((vendor) => {
    const breakdown = getPercentageBreakdown(vendor, selectedOptions)
    const averageMatchPercentage = Math.floor(getAveragePercentage(breakdown))

    return {
      vendorName: vendor.vendorName,
      averageMatchPercentage,
    }
  })
}

export function filterSelectedOptions(obj: SelectedOptions) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value.length > 0)
  )
}

// Helper function to map the selected item's numeric ID to its display name
export function getDisplayName(category: string, id: number): string {
  switch (category) {
    case "regions":
      return regions.find((region) => region.id === id)?.name || `Region ${id}`
    case "capabilities":
      return (
        capabilities.find((capability) => capability.id === id)?.name ||
        `Capability ${id}`
      )
    case "organizationalFunctions":
      return (
        organizationalFunctions.find((func) => func.id === id)?.name ||
        `Function ${id}`
      )
    case "contractTypes":
      return (
        contractTypes.find((type) => type.id === id)?.name || `Contract ${id}`
      )
    case "licensingModels":
      return (
        licensingModels.find((model) => model.id === id)?.name ||
        `Licensing ${id}`
      )
    case "integrations":
      return (
        integrations.find((integration) => integration.id === id)?.name ||
        `Integration ${id}`
      )
    default:
      return `Item ${id}`
  }
}
