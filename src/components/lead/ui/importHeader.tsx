import { CircleDashed, CheckCircle } from "lucide-react"
import React from "react"

interface ImportHeaderProps {
  currentStep: number
}

const steps = [
  {
    label: "1. Import your Lead List",
    description: "Upload your file & preview.",
  },
  { label: "2. Map your data", description: "Review your data before import." },
  {
    label: "3. Confirm",
    description: "Confirm and complete the import process.",
  },
]

const ImportHeader: React.FC<ImportHeaderProps> = ({ currentStep }) => {
  return (
    <ol className="flex justify-between md:items-center py-4 gap-4 md:gap-0">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep
        const isCurrent = index === currentStep
        const firstWord = step.label.split(" ")[1] // Extract the first word of the label

        return (
          <li
            key={index}
            className={`flex flex-col flex-1 justify-start items-start md:items-center mb-4 md:mb-0 md:border-r border-r-border last:border-r-0  max-md:pb-2  ${
              isCurrent ? "border-b-2 border-green-500 md:border-b-0" : ""
            }`}
          >
            <div className="flex gap-2 items-center">
              {isCompleted ? (
                <CheckCircle color="green" size={16} />
              ) : (
                <CircleDashed color={isCurrent ? "green" : "gray"} size={16} />
              )}

              {/* Display full label on desktop and only the first word on mobile */}
              <span
                className={`font-semibold text-lg md:text-xl ${
                  isCurrent ? "text-green-600" : "text-neutral-700"
                }`}
              >
                <span className="block md:hidden">{firstWord}</span>{" "}
                <span className="hidden md:block">{step.label}</span>{" "}
              </span>
            </div>

            <p className="text-xs text-slate-700 md:text-base mt-1 md:mt-0 md:text-center ">
              {step.description}
            </p>
          </li>
        )
      })}
    </ol>
  )
}

export default ImportHeader
