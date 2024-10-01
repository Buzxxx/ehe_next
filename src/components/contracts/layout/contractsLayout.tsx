/**
 * @path src/components/contracts/layout/contractsLayout.tsx
 */

"use client"
import React from "react"
import ContractsHeaderTab from "../features/contractsHeaderTab"
import ContractsNavbar from "../features/contractsNavbar"
import ContractBody from "../features/contractBody"
import VendorCompareModal from "../features/vendorCompareModal"

const ContractsLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState(0)
  const [selectedOptions, setSelectedOptions] = React.useState<
    Record<string, string[]>
  >({})
  const [selectedVendors, setSelectedVendors] = React.useState<string[]>([])
  const [showComparison, setShowComparison] = React.useState(false)

  return (
    <div
      className={`bg-gray-100 overflow-hidden w-full`}
    >
      <ContractsNavbar />
      <div className=" flex flex-col md:gap-12  min-h-screen overflow-hidden w-full">
        <ContractsHeaderTab activeTab={activeTab} setActiveTab={setActiveTab} />
        <ContractBody
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          selectedVendors={selectedVendors}
          setSelectedVendors={setSelectedVendors}
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          setShowComparison={setShowComparison}
        />
      </div>
      <VendorCompareModal
        selectedVendors={selectedVendors}
        showComparision={showComparison}
        setShowComparison={setShowComparison}
        selectedOptions={selectedOptions}
      />
    </div>
  )
}

export default ContractsLayout
