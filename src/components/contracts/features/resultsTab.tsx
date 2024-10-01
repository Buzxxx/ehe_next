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
  handleReset
}) => {
  return (
    <>
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        {/* <DrawerTrigger className="ml-8 md:hidden">
          <Filter color="gray" />
        </DrawerTrigger> */}
        <DrawerContent className="w-screen top-0 mt-2 md:hidden h-full">
          <div className="flex justify-between items-center px-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <Button
              className="bg-transparent"
              onClick={() => setIsDrawerOpen(false)}
            >
              {" "}
              <X color="gray" />{" "}
            </Button>
          </div>

          <ContractsFilter
            selectedOptions={selectedOptions}
            handleSelectOption={handleSelectOption}
          />
        </DrawerContent>
      </Drawer>
      <div className="flex min-h-screen gap-8 pb-20">
        <div
          className={`md:w-1/4 w-full z-40 max-h-screen md:sticky hidden md:block`}
        >
          <h2 className="text-2xl font-semibold mb-2 ">Search Results</h2>

          <ContractsFilter
            selectedOptions={selectedOptions}
            handleSelectOption={handleSelectOption}
          />
        </div>

        <div className="flex-1 flex flex-col gap-4 md:w-3/4 ml-auto max-md:px-4 max-md:mt-4">
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
      <div
        className={`fixed left-0 bottom-0 z-50 flex justify-end gap-8 items-center ${styles.bgAccentMuted} bg-gray-300/50 backdrop-blur-3xl py-3 px-16 border w-full`}
      >
        <div className={`justify-center gap-4 flex`}>
          <Button
            className={`${styles.btnSecondary} h-fit md:hidden`}
            onClick={() => setIsDrawerOpen(true)}
          >
            Filter
          </Button>
          <Button className={`${styles.btnSecondary} h-fit `} onClick={handleReset}>Reset</Button>
          <Button
            className={`${styles.btnSecondary} h-fit `}
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
