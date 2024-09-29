/**
 * @path src/components/contracts/layout/contractsLayout.tsx
 */

"use client"
import React from "react"
import ContractsHeaderTab from "../features/contractsHeaderTab"
import Step from "../ui/step"
import ResultsTab from "../ui/resultsTab"

import styles from "@/app/contract/contract.module.css"
import { Button } from "@/components/ui/button"
import { isSelectedOptionsEmpty } from "../features/contractsObject"
import Modal from "@/components/ui/modal"
import VendorCompareTable from "../ui/vendorCompareTable"
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog"

export interface SelectedOptions {
  [key: string]: string[]
}

const ContractsLayout = () => {
  const [activeStep, setActiveStep] = React.useState(2)
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
  const [selectedOptions, setSelectedOptions] = React.useState<
    Record<string, string[]>
  >({})
  const [selectedVendors, setSelectedVendors] = React.useState<string[]>([])
  const [showComparision, setShowComparison] = React.useState(false)

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
    setSelectedVendors((prevSelected) =>
      isSelected
        ? [...prevSelected, vendorId]
        : prevSelected.filter((id) => id !== vendorId)
    )
  }

  const totalSteps = 3

  const handleNext = () => {
    setActiveStep((prev) => (prev >= totalSteps - 1 ? prev : prev + 1))
  }

  const handleReset = () => {
    setActiveStep(0)
    setSelectedOptions({})
  }

  return (
    <>
      <div className="md:p-16 flex flex-col md:gap-12  min-h-screen overflow-hidden w-full">
        <ContractsHeaderTab
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
        {activeStep !== totalSteps - 1 ? (
          <Step onSelectItems={handleSelectOption} step={activeStep} />
        ) : (
          <ResultsTab
            selectedOptions={selectedOptions}
            handleSelectOption={handleSelectOption}
            selectedVendors={selectedVendors}
            handleSelectVendor={handleSelectVendor}
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
          />
        )}
      </div>
      {/* Next/Show Results Button */}
      <div
        className={`fixed bottom-0 z-50 flex justify-end gap-8 items-center ${styles.bgAccentMuted} bg-gray-300/50 backdrop-blur-3xl py-3 md:px-16 px-4 border w-full`}
      >
        {activeStep === totalSteps - 1 ? (
          <div className={`justify-center gap-4 flex`}>
            <Button
              className={`${styles.btnSecondary} h-fit md:hidden`}
              onClick={() => setIsDrawerOpen(true)}
            >
              Filter
            </Button>
            <Button
              className={`${styles.btnSecondary} h-fit `}
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              className={`${styles.btnSecondary} h-fit `}
              disabled={selectedVendors.length < 2}
              onClick={() => setShowComparison((prev) => !prev)}
            >
              Compare
            </Button>
          </div>
        ) : (
          <div className={`justify-center gap-4 flex`}>
            <Button
              className={`${styles.btnSecondary} h-fit `}
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              onClick={handleNext}
              className={`${styles.btnSecondary}  px-4 h-fit `}
              disabled={
                isSelectedOptionsEmpty(selectedOptions) &&
                activeStep === totalSteps - 2
              }
            >
              {activeStep === totalSteps - 2 ? "Show Results" : "Next"}
            </Button>
          </div>
        )}
      </div>

      <Dialog open={showComparision} defaultOpen={false}>
        <DialogOverlay className="">
          <DialogContent className="h-[400] overflow-scroll transition-all">
            <VendorCompareTable
              selectedVendors={selectedVendors}
              selectedOptions={selectedOptions}
            />
          </DialogContent>
        </DialogOverlay>
      </Dialog>
    </>
  )
}

export default ContractsLayout
