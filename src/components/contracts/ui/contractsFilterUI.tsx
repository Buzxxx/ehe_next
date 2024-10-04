// File: /components/ui/ContractsFilterUI.tsx

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
import { Label } from "@/components/ui/label"
import styles from "@/app/contracts/contract.module.css"

interface ContractsFilterUIProps {
  stepInputFields: { title: string; choices: string[] }[]
  selectedChoices: { [key: string]: string[] }
  openPopover: { [key: string]: boolean }
  handleOpenChange: (stepTitle: string, isOpen: boolean) => void
  handleCheckboxChange: (stepTitle: string, choice: string) => void
}

const ContractsFilterUI: React.FC<ContractsFilterUIProps> = ({
  stepInputFields,
  selectedChoices,
  openPopover,
  handleOpenChange,
  handleCheckboxChange,
}) => {
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
                      className={`w-full justify-between flex items-center text-sm ${
                        selectedChoices[step.title]?.length
                          ? styles.textPrimary
                          : styles.textGray
                      }`}
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
                                handleCheckboxChange(step.title, choice)
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

export default ContractsFilterUI
