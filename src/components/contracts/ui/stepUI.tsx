// File: /components/ui/StepUI.tsx

import { MultiSelectCombobox } from "./multiSelectComboBox"
import { Button } from "@/components/ui/button"
import styles from "@/app/contracts/contract.module.css"

interface StepUIProps {
  inputFields: {
    title: string
    description: string
    imagePath: string
    inputType: string
    choices: string[]
  }[]
  selectedItems: { [key: string]: string[] }
  onSelectItems: (title: string, selectedItems: string[]) => void
  handleNext: () => void
  isNextDisabled?: boolean
  activeTab: number
  totalSteps: number
  handleReset: () => void
}

const StepUI: React.FC<StepUIProps> = ({
  inputFields,
  selectedItems,
  onSelectItems,
  handleNext,
  isNextDisabled,
  activeTab,
  totalSteps,
  handleReset,
}) => {
  return (
    <>
      <div className="flex flex-col gap-12 md:w-3/4 mx-auto max-md:px-4 pb-20">
        {inputFields.map((inputField) => (
          <MultiSelectCombobox
            key={inputField.title}
            title={inputField.title}
            description={inputField.description}
            imagePath={inputField.imagePath}
            inputType={inputField.inputType}
            choices={inputField.choices}
            selectedItems={selectedItems[inputField.title] || []}
            onSelectItems={(selectedItems) =>
              onSelectItems(inputField.title, selectedItems)
            }
          />
        ))}
      </div>
      <div
        className={`fixed left-0 bottom-0 z-50 flex justify-end gap-8 items-center ${styles.bgAccentMuted} bg-gray-300/50 backdrop-blur-3xl py-3 px-16 border w-full mt-8`}
      >
        <div className="justify-center gap-4 flex">
          <Button
            className={`${styles.btnSecondary} h-fit `}
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            onClick={handleNext}
            className={`${styles.btnSecondary} px-4 h-fit `}
          >
            {activeTab === totalSteps - 2 ? "Show Results" : "Next"}
          </Button>
        </div>
      </div>
    </>
  )
}

export default StepUI
