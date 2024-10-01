import React, { Dispatch, SetStateAction } from "react"
import styles from "@/app/contracts/contract.module.css"

const ContractsHeaderTab = ({
  activeStep,
  setActiveStep,
}: {
  activeStep: number
  setActiveStep: Dispatch<SetStateAction<number>>
}) => {
  const ContractSteps = ["Step 1", "Step 2", "Results"]

  return (
    <div
      className={`flex justify-between items-center gap-1 md:w-3/4 mx-auto w-full max-md:px-4 mt-12`}
    >
      {ContractSteps.map((step, index) => (
        <React.Fragment key={index}>
          <div
            className={`cursor-pointer py-4 p-2 text-center flex gap-1 items-center justify-center  flex-1 font-medium text-xs md:text-sm ${
              activeStep === index ? styles.textSecondary : "text-gray-500"
            }`}
            onClick={() => setActiveStep(index)}
          >
            <span
              className={`${
                activeStep === index
                  ? styles.bgSecondary + " " + styles.textWhitePrimary
                  : styles.bgTertiary + " text-gray-300"
              } 
              } rounded-full p-2 h-5 w-5 flex items-center justify-center  text-xs `}
            >
              {index + 1}
            </span>
            {step}
          </div>
          {index !== ContractSteps.length - 1 && (
            <div className="w-auto flex-1 h-px bg-gray-300"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default ContractsHeaderTab
