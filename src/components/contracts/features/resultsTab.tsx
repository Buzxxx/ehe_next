/**
 * @path src/components/contracts/features/resulsTab.tsx
 */

import React, { Dispatch, SetStateAction } from "react"
import VendorResultDisplayCard from "../ui/vendorResultDisplayCard"
import ContractsFilter from "./contractsFilter"
import { SelectedOptions } from "../features/contractsObject"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Drawer, DrawerContent } from "@/components/ui/drawer"

import styles from "@/app/contracts/contract.module.css"

interface ResultsTabProps {
  selectedOptions: SelectedOptions
  handleSelectOption: (
    title: keyof SelectedOptions,
    selectedItems: string[]
  ) => void
  selectedVendors: string[]
  handleSelectVendor: (vendorId: string, isSelected: boolean) => void
  isDrawerOpen: boolean
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>
  setShowComparison: Dispatch<SetStateAction<boolean>>
  handleReset: () => void
}
const ResultsTab: React.FC<ResultsTabProps> = ({
  selectedOptions,
  handleSelectOption,
  selectedVendors,
  handleSelectVendor,
  isDrawerOpen,
  setIsDrawerOpen,
  setShowComparison,
  handleReset,
}) => {
  const vendorData = [
    {
      vendorId: "1",
      vendorName: "Basware",
      vendorLogo: "/contracts/images/basware.svg",
      vendorDesc:
        "Track spending on assets within your purchase-to-pay process. Costs and warranty information are collected in your e-procurement system. Helps you conduct life cycle value comparisons, track which assets are on warranties and service contracts, properly depreciate fixed assets and get the most useful life from your equipment",
      vendorLocation: "Mumbai",
      vendorServices: "12 Services",
      vendorMatchPercentage: 90,
      isVerified: true,
    },
    {
      vendorId: "2",
      vendorName: "Bravo Solution Now Jagger",
      vendorLogo: "/contracts/images/Jaggaer-Logo-Red.svg",
      vendorDesc:
        " JAGGAER Contracts enables you to manage every phase of contract development from initiation through approval and execution. In JAGGAER ONE it is a complete end-to-end solution that provides full authoring and automated review and approval workflows to reduce risk and increase compliance.",
      vendorLocation: "Delhi",
      vendorServices: "15 Services",
      vendorMatchPercentage: 75,
      isVerified: false,
    },
    {
      vendorId: "3",
      vendorName: "Cobblestone Systems",
      vendorLogo: "/contracts/images/hub.webp",
      vendorDesc:
        "Cobblestone's flagship product is Contract Insight Enterprise. Based on the summary of our clients’ feedback, Contract Insight Enterprise is a “great solution to an organization’s needs.",
      vendorLocation: "Bangalore",
      vendorServices: "10 Services",
      vendorMatchPercentage: 21,
      isVerified: true,
    },
  ]

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
              key={vendor.vendorId}
              vendorId={vendor.vendorId}
              isSelected={selectedVendors.includes(vendor.vendorId)}
              onSelectVendor={handleSelectVendor}
              vendorName={vendor.vendorName}
              vendorLogo={vendor.vendorLogo}
              vendorDesc={vendor.vendorDesc}
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
            onClick={() => setShowComparison(true)}
          >
            Compare
          </Button>
        </div>
      </div>
    </>
  )
}

export default ResultsTab
