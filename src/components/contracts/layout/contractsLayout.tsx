// ContractsLayout.tsx
"use client"
import React from "react"
import ContractsHeaderTab from "../features/contractsHeaderTab"
import Step from "../ui/step"
import ResultsTab from "../ui/resultsTab"

import styles from "@/app/contract/contract.module.css"
import { Button } from "@/components/ui/button"

export interface SelectedOptions {
  [key: string]: string[]
}

const ContractsLayout = () => {
  const ContractSteps = ["Step 1", "Step 2", "Results"]

  const [activeTab, setActiveTab] = React.useState(0) // Initial active tab
  const [selectedOptions, setSelectedOptions] = React.useState<SelectedOptions>(
    {
      capability: [],
      organizational_function: [],
      contract_type: [],
      licensing_model: [],
      integrations: [],
      regions: [],
    }
  )

  const [selectedVendors, setSelectedVendors] = React.useState<string[]>([]) // State for selected vendors

  const handleSelectOption = (
    optionTitle: string | number,
    selectedItems: string[]
  ) => {
    setSelectedOptions((prevSelected) => ({
      ...prevSelected,
      [optionTitle]: selectedItems,
    }))
  }

  const handleSelectVendor = (vendorId: string, isSelected: boolean) => {
    setSelectedVendors(
      (prevSelected) =>
        isSelected
          ? [...prevSelected, vendorId] // Add vendor if selected
          : prevSelected.filter((id) => id !== vendorId) // Remove vendor if unselected
    )
  }

  const totalSteps = ContractSteps.length

  const handleNext = () => {
    if (activeTab < totalSteps - 1) {
      setActiveTab((prev) => prev + 1)
    } else {
      const filteredSelectedOptions = Object.fromEntries(
        Object.entries(selectedOptions).filter(
          ([key, value]) => value.length > 0
        )
      )

      console.log("Final Selected Options:", filteredSelectedOptions)
    }
  }

  // Utility function to check if all selectedOptions are empty
  const isSelectedOptionsEmpty = () => {
    return Object.values(selectedOptions).every(
      (options) => options.length === 0
    )
  }

  return (
    <>
      <div className="md:p-16 flex flex-col gap-12 min-h-screen">
        <ContractsHeaderTab activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab !== totalSteps - 1 ? (
          <Step onSelectItems={handleSelectOption} step={activeTab} />
        ) : (
          <ResultsTab
            selectedOptions={selectedOptions}
            handleSelectOption={handleSelectOption}
            selectedVendors={selectedVendors} // Pass selected vendors
            handleSelectVendor={handleSelectVendor} // Pass vendor selection handler
          />
        )}
      </div>
      {/* Next/Show Results Button */}
      <div
        className={`fixed bottom-0 flex justify-end gap-8 items-center ${styles.bgAccentMuted} bg-gray-300/50 backdrop-blur-3xl py-3 px-16 border w-full`}
      >
        {activeTab === totalSteps - 1 ? (
          <div className={`justify-center gap-4 flex`}>
            <Button className={`${styles.btnSecondary} h-fit `}>Reset</Button>
            <Button
              className={`${styles.btnSecondary} h-fit `}
              disabled={selectedVendors.length < 2} // Disable if less than 2 vendors
            >
              Compare
            </Button>
          </div>
        ) : (
          <div className={`justify-center gap-4 flex`}>
            <Button className={`${styles.btnSecondary} h-fit `}>Reset</Button>
            <Button
              onClick={handleNext}
              className={`${styles.btnSecondary}  px-4 h-fit `}
              disabled={
                isSelectedOptionsEmpty() && activeTab === totalSteps - 2
              }
            >
              {activeTab === totalSteps - 2 ? "Show Results" : "Next"}
            </Button>
          </div>
        )}
      </div>
    </>
  )
}

export default ContractsLayout
