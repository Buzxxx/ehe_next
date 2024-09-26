import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import React, { useEffect, useState } from "react"

import styles from "@/app/contract/contract.module.css"
import { Label } from "@/components/ui/label"

type SelectedOptions = {
  [key: string]: string[]
}

// Define props for ContractsFilter
interface ContractsFilterProps {
  selectedOptions: SelectedOptions
  handleSelectOption: (
    optionTitle: keyof SelectedOptions,
    selectedItems: string[]
  ) => void
}

/**
 * A component that renders a filter for contracts based on multiple options.
 *
 * @param {{
 *   selectedOptions: import("../layout/contractsLayout").SelectedOptions,
 *   handleSelectOption: (
 *     optionTitle: keyof SelectedOptions,
 *     selectedItems: string[]
 *   ) => void,
 * }} props
 */
const ContractsFilter: React.FC<ContractsFilterProps> = ({
  selectedOptions,
  handleSelectOption,
}) => {
  const stepInputFields = [
    {
      title: "capability",
      description:
        "Which of the following capabilities do you need the software to support?",
      imagePath: "/contracts/images/capabilities.webp",
      inputType: "multiSelect" as const,
      choices: [
        "Change Management",
        "Configurable Approval Workflows",
        "AI Built in",
        "Version Comparison Redlining & Negotiation",
        "Repository and Integration Capabilities",
        "Custom Reporting and Queries",
        "Obligation Tracking and Upload of Evidence",
      ],
    },
    {
      title: "organizational function",
      description:
        "Which of the following functions do you need the software to support?",
      imagePath: "/contracts/images/capabilities.webp",
      inputType: "multiSelect" as const,
      choices: [
        "Commercial",
        "Legal",
        "Other Dept",
        "Procurement",
        "Risk/Compliance",
      ],
    },
    {
      title: "contract type",
      description:
        "Which of the following contract types do you need the software to support?",
      imagePath: "/contracts/images/capabilities.webp",
      inputType: "multiSelect" as const,
      choices: [
        "Buy Side",
        "Distribution",
        "Employment",
        "Other Type",
        "Sell Side",
      ],
    },
    {
      title: "licensing model",
      description:
        "Which of the following integrations do you need the software to support?",
      imagePath: "/contracts/images/capabilities.webp",
      inputType: "multiSelect" as const,
      choices: [
        "Annual subscription fee",
        "Annual subscription fee with maintenance",
        "Monthly subscription fee",
        "Perpetual",
        "Volume-based",
      ],
    },
    {
      title: "integrations",
      description: "Do you require use of the software on specific device(s)?",
      imagePath: "/contracts/images/capabilities.webp",
      inputType: "multiSelect" as const,
      choices: [
        "Application Integration (API)",
        "E-mail Client",
        "eSignatures",
        "Financials and Supply Chain Management (FSCM)",
      ],
    },
    {
      title: "regions",
      description: "Do you require use of the software on specific device(s)?",
      imagePath: "/contracts/images/capabilities.webp",
      inputType: "multiSelect" as const,
      choices: ["APAC", "EMEA", "LatAm", "North America"],
    },
  ]

  // State to manage selected choices based on step titles
  const [selectedChoices, setSelectedChoices] =
    useState<SelectedOptions>(selectedOptions)

  const [openPopover, setOpenPopover] = useState<Record<string, boolean>>({})

  useEffect(() => {
    // Initialize selectedChoices with selectedOptions from props
    setSelectedChoices(selectedOptions)
  }, [selectedOptions])

  const handleCheckboxChange = (
    stepTitle: keyof SelectedOptions,
    choice: string
  ) => {
    setSelectedChoices((prevSelectedChoices) => {
      const selectedSet = new Set(prevSelectedChoices[stepTitle] || [])

      if (selectedSet.has(choice)) {
        selectedSet.delete(choice)
      } else {
        selectedSet.add(choice)
      }

      const updatedChoices = {
        ...prevSelectedChoices,
        [stepTitle]: Array.from(selectedSet),
      }

      // Update the parent component with the selected choices
      handleSelectOption(stepTitle, Array.from(selectedSet))
      return updatedChoices
    })
  }

  const handleOpenChange = (stepTitle: string, isOpen: boolean) => {
    setOpenPopover((prevState) => ({
      ...prevState,
      [stepTitle]: isOpen,
    }))
  }

  console.log(selectedOptions)

  return (
    <div className={`w-full p-4 ${styles.bgPrimary} rounded-xl shadow-lg`}>
      <div>
        {stepInputFields.map((step) => (
          <div className="mb-6" key={step.title}>
            <Label
              className={`text-xs mb-1 block uppercase ${styles.textGray}`}
            >
              {step.title}
            </Label>

            <ul>
              <li className="flex items-center mb-2 text-sm font-medium">
                <Popover
                  open={!!openPopover[step.title]}
                  onOpenChange={(isOpen) =>
                    handleOpenChange(step.title, isOpen)
                  }
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={!!openPopover[step.title]}
                      className={`w-full justify-between flex items-center text-sm ${ selectedChoices[step.title]?.length
                        ? styles.textPrimary : styles.textGray}`}
                    >
                      {selectedChoices[step.title]?.length
                        ? `${
                            selectedChoices[step.title].length
                          } item(s) selected`
                        : "Select Function(s)"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      {step.choices.length > 5 && (
                        <CommandInput placeholder="Search framework..." />
                      )}

                      <CommandList>
                        <CommandEmpty>Nothing found.</CommandEmpty>
                        <CommandGroup>
                          {step.choices.map((choice) => (
                            <CommandItem
                              key={choice}
                              value={choice}
                              onSelect={() =>
                                handleCheckboxChange(
                                  step.title as keyof SelectedOptions,
                                  choice
                                )
                              }
                              className="border-b border-slate-200 text-sm"
                            >
                              <Check
                                className={`mr-2 h-4 w-4 ${
                                  selectedChoices[step.title]?.includes(choice)
                                    ? "opacity-100"
                                    : "opacity-0"
                                }`}
                              />
                              {choice}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ContractsFilter
