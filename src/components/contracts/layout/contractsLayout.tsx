/**
 * @path src\components\contracts\layout\contractsLayout.tsx
 */

"use client"

import React from "react"
import { MultiSelectCombobox } from "../features/multiSelectComboBox"
import { ContractSteps } from "../lib/contractSteps"
import ContractsHeaderTab from "../features/contractsHeaderTab"

const ContractsLayout = () => {
  const [activeTab, setActiveTab] = React.useState(0) // initial active tab

  const activeOptions = React.useMemo(
    () => ContractSteps[activeTab].options,
    [activeTab]
  ) // memoize active options

  return (
    <div className="md:w-3/4 md:p-16 mx-auto flex flex-col gap-20">
      <ContractsHeaderTab activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex flex-col gap-12">
        {activeOptions.map((option, index) => (
          <MultiSelectCombobox
            key={index}
            title={option.title}
            imagePath={option.imagePath}
            options={option.options}
            description={option.description}
          />
        ))}
      </div>
    </div>
  )
}

export default ContractsLayout
