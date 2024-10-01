import React, { Dispatch, SetStateAction } from "react"
import ResultsTab from "./resultsTab"
import StepUI from "../ui/stepUI"
import { getInputFieldsForStep } from "./contractsObject"
import { SelectedOptions } from "../features/contractsObject"

interface ContractBodyProps {
  activeTab: number
  setActiveTab: Dispatch<SetStateAction<number>>
  selectedOptions: Record<string, string[]>
  setSelectedOptions: Dispatch<SetStateAction<Record<string, string[]>>>
  selectedVendors: string[]
  setSelectedVendors: Dispatch<SetStateAction<string[]>>
  isDrawerOpen: boolean
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>
  setShowComparison: Dispatch<SetStateAction<boolean>>
}

const ContractBody: React.FC<ContractBodyProps> = ({
  activeTab,
  setActiveTab,
  selectedOptions,
  setSelectedOptions,
  selectedVendors,
  setSelectedVendors,
  isDrawerOpen,
  setIsDrawerOpen,
  setShowComparison,
}) => {
  const onSelectItems = (title: keyof SelectedOptions, items: string[]) => {
    setSelectedOptions((prevSelected) => ({
      ...prevSelected,
      [title]: items,
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

  const handleNext = () => {
    const inputFields = getInputFieldsForStep(activeTab)
    const totalSteps = inputFields.length

    if (activeTab < totalSteps - 1) {
      setActiveTab((prev) => prev + 1)
    }
  }

  const handleReset = () => {
    setActiveTab(0)
    setSelectedOptions({})
  }

  const inputFields = getInputFieldsForStep(activeTab)

  const steps = [
    <StepUI
      key={1}
      inputFields={inputFields}
      selectedItems={selectedOptions}
      onSelectItems={onSelectItems}
      handleNext={handleNext}
      activeTab={activeTab}
      totalSteps={inputFields.length}
      handleReset={handleReset}
    />,
    <StepUI
      key={2}
      inputFields={inputFields}
      selectedItems={selectedOptions}
      onSelectItems={onSelectItems}
      handleNext={handleNext}
      activeTab={activeTab}
      totalSteps={inputFields.length}
      handleReset={handleReset}
    />,
    <ResultsTab
      key={3}
      selectedOptions={selectedOptions}
      handleSelectOption={onSelectItems}
      selectedVendors={selectedVendors}
      handleSelectVendor={handleSelectVendor}
      isDrawerOpen={isDrawerOpen}
      setIsDrawerOpen={setIsDrawerOpen}
      setShowComparison={setShowComparison}
      handleReset={handleReset}
    />,
  ]

  return <div className="md:px-16 px-4 relative">{steps[activeTab]}</div>
}

export default ContractBody
