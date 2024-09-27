// src/ui/step1.tsx

"use client"

import React, { useState } from "react"
import { MultiSelectCombobox } from "../features/multiSelectComboBox"
import { getInputFieldsForStep } from "../features/contractsObject"

const Step = ({
  onSelectItems,
  step,
}: {
  onSelectItems: (title: string, selectedItems: string[]) => void
  step: number
}) => {
  const [selectedItems, setSelectedItems] = useState<{
    [key: string]: string[]
  }>({})

  const inputFields = getInputFieldsForStep(step)
  const handleSelectItems = (title: string, selectedItems: string[]) => {
    console.log("hello")
    setSelectedItems((prev) => ({ ...prev, [title]: selectedItems }))
    onSelectItems(title.toLowerCase(), selectedItems)
  }

  return (
    <div className="flex flex-col gap-12 md:w-3/4 mx-auto max-md:px-4">
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
            handleSelectItems(inputField.title, selectedItems)
          }
        />
      ))}
    </div>
  )
}

export default Step
