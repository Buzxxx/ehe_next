/**
 * @path src/components/contracts/ui/resulsTab.tsx
 */

import React from "react"
import VendorResultDisplayCard from "./vendorResultDisplayCard"
import ContractsFilter from "./contractsFilter"
import { SelectedOptions } from "../layout/contractsLayout"

// resultsTab.tsx

interface ResultsTabProps {
  selectedOptions: SelectedOptions
  handleSelectOption: (
    optionTitle: string | number,
    selectedItems: string[]
  ) => void
  selectedVendors: string[]
  handleSelectVendor: (vendorId: string, isSelected: boolean) => void
}
const ResultsTab: React.FC<ResultsTabProps> = ({
  selectedOptions,
  handleSelectOption,
  selectedVendors,
  handleSelectVendor,
}) => {
  return (
    <div className="flex min-h-screen gap-8">
      <div className="md:w-1/4 max-h-screen sticky top-20 ">
        <h2 className="text-2xl font-semibold mb-2">Search Results</h2>
        <ContractsFilter
          selectedOptions={selectedOptions}
          handleSelectOption={handleSelectOption}
        />
      </div>
      <div className="flex-1 flex flex-col gap-4 md:w-3/4 ml-auto">
        <VendorResultDisplayCard
          vendorId="1"
          isSelected={selectedVendors.includes("1")}
          onSelectVendor={handleSelectVendor}
        />
        <VendorResultDisplayCard
          vendorId="2"
          isSelected={selectedVendors.includes("2")}
          onSelectVendor={handleSelectVendor}
        />
        <VendorResultDisplayCard
          vendorId="3"
          isSelected={selectedVendors.includes("3")}
          onSelectVendor={handleSelectVendor}
        />
      </div>
    </div>
  )
}

export default ResultsTab
