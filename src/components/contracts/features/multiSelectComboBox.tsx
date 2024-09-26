"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
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
import SelectionDisplayBox from "../ui/selectionDisplayBox"
import Image from "next/image"

import styles from "@/app/contract/contract.module.css"

interface Framework {
  value: string
  label: string
}

interface MultiSelectComboboxProps {
  title: string
  description: string
  imagePath: string
  inputType?: "singleSelect" | "multiSelect" | string
  choices: string[]
  selectedItems: string[]
  onSelectItems: (selectedItems: string[]) => void
}

export function MultiSelectCombobox({
  title,
  description,
  imagePath,
  inputType,
  choices,
  selectedItems,
  onSelectItems,
}: MultiSelectComboboxProps) {
  const [open, setOpen] = React.useState(false)

  /**
   * Handles the selection of an item. If the item is already selected, removes it from the selected items array.
   * If inputType is singleSelect, only one item can be selected at a time.
   * @param item The item to select or deselect.
   */
  const handleSelectItem = React.useCallback(
    (item: string) => {
      let updatedItems = []

      if (inputType === "singleSelect") {
        updatedItems = [item] // Only keep the current item for singleSelect
        setOpen(false) // Close the dropdown after selecting
      } else {
        updatedItems = selectedItems.includes(item)
          ? selectedItems.filter((selectedItem) => selectedItem !== item)
          : [...selectedItems, item]
      }

      onSelectItems(updatedItems)
    },
    [inputType, selectedItems, onSelectItems]
  )

  /**
   * Handles the removal of a selected item from the `selectedItems` array.
   * @param item The item to remove.
   */
  const handleRemoveItem = React.useCallback(
    (item: string): void => {
      onSelectItems(selectedItems.filter((i) => i !== item))
    },
    [selectedItems, onSelectItems]
  )

  return (
    <div
      className={`flex gap-6 h-60 rounded-xl shadow-lg p-4 ${styles.vendorResultDisplayCard} border border-slate-200`}
    >
      <Image
        src={imagePath}
        alt="image"
        width={250}
        height={250}
        className="object-cover aspect-square rounded-l-lg"
      />
      <div className="flex-1">
        <div className="mb-3">
          <h1 className="md:text-xl text-lg font-medium">{title}</h1>
          <p className="md:text-sm text-xs">{description}</p>
        </div>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            asChild
            className="rounded-none rounded-t-md  border-slate-300"
          >
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={`w-full justify-between flex items-center ${styles.textGray}`}
            >
              {selectedItems.length
                ? `${selectedItems.length} item(s) selected`
                : "Select Function(s)"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[500px] ml-auto p-0">
            <Command>
              {choices.length > 5 && (
                <CommandInput placeholder="Search framework..." />
              )}

              <CommandList>
                <CommandEmpty>Nothing found.</CommandEmpty>
                <CommandGroup>
                  {choices.map((choice) => (
                    <CommandItem
                      key={choice}
                      value={choice}
                      onSelect={() => {
                        handleSelectItem(choice)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedItems.includes(choice)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {choice}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <SelectionDisplayBox
          selectedItems={selectedItems}
          onRemoveItem={handleRemoveItem}
        />
      </div>
    </div>
  )
}
