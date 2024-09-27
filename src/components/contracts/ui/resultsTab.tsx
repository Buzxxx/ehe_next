/**
 * @path src/components/contracts/ui/resulsTab.tsx
 */

import React, { useState } from "react"
import VendorResultDisplayCard from "./vendorResultDisplayCard"
import ContractsFilter from "./contractsFilter"
import { SelectedOptions } from "../layout/contractsLayout"
import { Button } from "@/components/ui/button"
import { Filter, X } from "lucide-react"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"

// resultsTab.tsx

interface ResultsTabProps {
  selectedOptions: SelectedOptions
  handleSelectOption: (
    optionTitle: string | number,
    selectedItems: string[]
  ) => void
  selectedVendors: string[]
  handleSelectVendor: (vendorId: string, isSelected: boolean) => void
  isDrawerOpen: boolean
  setIsDrawerOpen: (open: boolean) => void
}
const ResultsTab: React.FC<ResultsTabProps> = ({
  selectedOptions,
  handleSelectOption,
  selectedVendors,
  handleSelectVendor,
  isDrawerOpen,
  setIsDrawerOpen,
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
      <div className="flex min-h-screen gap-8 ">
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
    </>
  )
}

export default ResultsTab
