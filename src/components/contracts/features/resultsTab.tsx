/**
 * @path src/components/contracts/features/resulsTab.tsx
 */

import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import VendorResultDisplayCard from "../ui/vendorResultDisplayCard"
import ContractsFilter from "./contractsFilter"
import {
  calculateVendorAverageMatchPercentage,
  calculateVendorMatchBreakdown,
  defaultSelectedOptions,
  SelectedOptions,
  Vendor,
} from "../features/contractsObject"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Drawer, DrawerContent } from "@/components/ui/drawer"

import styles from "@/app/contracts/contract.module.css"
import VendorCompareModal from "./vendorCompareModal"
import { vendors } from "../noSql"

interface ResultsTabProps {
  setActiveTab: Dispatch<SetStateAction<number>>
  selectedOptions: SelectedOptions
  setSelectedOptions: Dispatch<SetStateAction<SelectedOptions>>
  selectedVendors: string[]
  setSelectedVendors: Dispatch<SetStateAction<string[]>>
  isDrawerOpen: boolean
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>
}
const ResultsTab: React.FC<ResultsTabProps> = ({
  setActiveTab,
  selectedOptions,
  setSelectedOptions,
  selectedVendors,
  setSelectedVendors,
  isDrawerOpen,
  setIsDrawerOpen,
}) => {
  const [vendorData, setVendorData] = useState(vendors)
  const [showComparison, setShowComparison] = React.useState(false)
  const [comparisonData, setComparisonData] = React.useState<
    { vendorName: string; breakdown: {}; averageMatchPercentage: number }[]
  >([])

  useEffect(() => {
    // Get match percentages for each vendor
    const matchPercentages =
      calculateVendorAverageMatchPercentage(selectedOptions)

    // Update vendorData with the calculated match percentages
    const updatedVendorData = vendorData.map((vendor: Vendor) => {
      const match = matchPercentages.find(
        (m) => m.vendorName === vendor.vendorName
      )
      return match
        ? { ...vendor, vendorMatchPercentage: match.averageMatchPercentage }
        : vendor
    })

    setVendorData(updatedVendorData)
  }, [selectedOptions])

  const handleSelectOption = (
    title: keyof SelectedOptions,
    items: number[]
  ) => {
    setSelectedOptions((prevSelected) =>
      prevSelected[title] === items
        ? { ...prevSelected }
        : { ...prevSelected, [title]: items }
    )
  }

  const handleReset = () => {
    setActiveTab(0)
    setSelectedOptions(defaultSelectedOptions)
  }

  const handleShowComparison = () => {
    const data = calculateVendorMatchBreakdown(selectedOptions, selectedVendors)
    setComparisonData(data)
    setShowComparison(true)
  }

  const handleSelectVendor = (vendorId: string, isSelected: boolean) => {
    setSelectedVendors(
      (prevSelected) =>
        isSelected
          ? [...prevSelected, vendorId] // Add vendor if selected
          : prevSelected.filter((id) => id !== vendorId) // Remove vendor if unselected
    )
  }

  return (
    <>
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="w-screen top-0 mt-2 md:hidden h-full">
          <div className="flex justify-between items-center px-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <Button
              className="bg-transparent"
              onClick={() => setIsDrawerOpen(false)}
            >
              <X color="gray" />
            </Button>
          </div>

          <ContractsFilter
            selectedOptions={selectedOptions}
            handleSelectOption={handleSelectOption}
          />
        </DrawerContent>
      </Drawer>

      <div className="flex min-h-screen gap-8 pb-20">
        <div className="md:w-1/4 w-full z-40 max-h-screen md:sticky hidden md:block">
          <h2 className="text-2xl font-semibold mb-2">Search Results</h2>

          <ContractsFilter
            selectedOptions={selectedOptions}
            handleSelectOption={handleSelectOption}
          />
        </div>

        <div className="flex-1 flex flex-col gap-4 md:w-3/4 ml-auto max-md:px-4 max-md:mt-4">
          {vendorData.map((vendor) => (
            <VendorResultDisplayCard
              key={vendor.id}
              vendorId={vendor.id}
              isSelected={selectedVendors.includes(vendor.id)}
              onSelectVendor={handleSelectVendor}
              vendorName={vendor.vendorName}
              vendorLogo={vendor.logo}
              vendorDesc={vendor.description}
              vendorLocation={vendor.vendorLocation}
              vendorServices={vendor.vendorServices}
              vendorMatchPercentage={vendor.vendorMatchPercentage}
              isVerified={vendor.isVerified}
            />
          ))}
        </div>
      </div>

      <div
        className={`fixed left-0 bottom-0 z-50 flex justify-end gap-8 items-center ${styles.bgAccentMuted} bg-gray-300/50 backdrop-blur-3xl py-3 px-16 border w-full`}
      >
        <div className="justify-center gap-4 flex">
          <Button
            className={`${styles.btnSecondary} h-fit md:hidden`}
            onClick={() => setIsDrawerOpen(true)}
          >
            Filter
          </Button>
          <Button
            className={`${styles.btnSecondary} h-fit`}
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            className={`${styles.btnSecondary} h-fit`}
            disabled={selectedVendors.length < 2}
            onClick={handleShowComparison}
          >
            Compare
          </Button>
        </div>
      </div>

      <VendorCompareModal
        vendorComparisonData={comparisonData}
        showComparision={showComparison}
        setShowComparison={setShowComparison}
        selectedOptions={selectedOptions}
      />
    </>
  )
}

export default ResultsTab
