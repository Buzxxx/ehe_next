import React, { Dispatch, SetStateAction } from "react"
import { ContractSteps } from "../lib/contractSteps"

const ContractsHeaderTab = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: number
  setActiveTab: Dispatch<SetStateAction<number>>
}) => {
  return (
    <div className="flex justify-between items-center gap-2">
      {ContractSteps.map((step, index) => (
        <div
          key={index}
          className={`cursor-pointer p-4 flex-1 text-center flex gap-2 items-center justify-center bg-[#D9D9D9] text-sm font-medium ${
            activeTab === index ? "text-[#4C49E9]" : " text-gray-600"
          }`}
          onClick={() => setActiveTab(index)}
        >
          <span
            className={`${
              activeTab === index ? "bg-[#4C49E9]" : "bg-gray-600"
            } rounded-full h-5 w-5 flex items-center justify-center text-white text-sm `}
          >
            {index + 1}
          </span>
          {step.tab}
        </div>
      ))}
    </div>
  )
}

export default ContractsHeaderTab
