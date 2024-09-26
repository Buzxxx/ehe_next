// src/ui/step1.tsx

"use client"

import React, { useState } from "react"
import { MultiSelectCombobox } from "../features/multiSelectComboBox"

const Step1 = ({
  onSelectItems,
  step,
}: {
  onSelectItems: (title: string, selectedItems: string[]) => void
  step: number
}) => {
  const [selectedItems, setSelectedItems] = useState<{
    [key: string]: string[]
  }>({})

  const stepInputFields = [
    [
      {
        title: "Capability",
        description:
          "Which of the following capabilities do you need the software to support?",
        imagePath: "/contracts/images/capabilities.webp",
        inputType: "multiSelect",
        choices: [
          "Change Management",
          "Configurable Approval Workflows",
          "AI Built in",
          "Version Comparison Redlining & Negotiation",
          "Repository and Integration Capabilities",
          "Custom Reporting and Queries",
          "Obligation Tracking and Upload of Evidence",
          "Vendor Rating and Scorecard Management",
          "Risk Management",
        ],
      },
      {
        title: "Organizational Function",
        description:
          "Which of the following functions do you need the software to support?",
        imagePath: "/contracts/images/capabilities.webp",
        inputType: "multiSelect",
        choices: [
          "Commercial",
          "Legal",
          "Other Dept",
          "Procurement",
          "Risk/Compliance",
        ],
      },
      {
        title: "Contract Types",
        description:
          "Which of the following contract types do you need the software to support?",
        imagePath: "/contracts/images/capabilities.webp",
        inputType: "multiSelect",
        choices: [
          "Buy Side",
          "Distribution",
          "Employment",
          "Other Type",
          "Sell Side",
        ],
      },
    ],
    [
      {
        title: "Licensing Model",
        description:
          "Which of the following integrations do you need the software to support?",
        imagePath: "/contracts/images/capabilities.webp",
        inputType: "multiSelect",
        choices: [
          "Annual subscription fee",
          "Annual subscription fee with maintenance",
          "Monthly subscription fee",
          "Perpetual",
          "Volume-based",
        ],
      },
      {
        title: " Integrations",
        description:
          "Do you require use of the software on specific device(s)?",
        imagePath: "/contracts/images/capabilities.webp",
        inputType: "multiSelect",
        choices: [
          "﻿Application Integration (API)",
          "E-mail Client",
          "eSignatures",
          "Financials and Supply Chain Management (FSCM)",
        ],
      },
      {
        title: "Region",
        description:
          "Do you require use of the software on specific device(s)?",
        imagePath: "/contracts/images/capabilities.webp",
        inputType: "multiSelect",
        choices: ["APAC", "EMEA", "LatAm", "North America"],
      },
    ],
  ]

  const handleSelectItems = (title: string, selectedItems: string[]) => {
    setSelectedItems((prev) => ({ ...prev, [title]: selectedItems }))
    onSelectItems(title.toLowerCase(), selectedItems)
  }

  return (
    <div className="flex flex-col gap-12 md:w-3/4 mx-auto">
      {stepInputFields[step].map((inputField) => (
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

export default Step1
