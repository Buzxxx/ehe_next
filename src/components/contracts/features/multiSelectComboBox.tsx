// /components/contracts/ui/multiSelectComboBox.tsx

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

interface Framework {
  value: string
  label: string
}

interface MultiSelectComboboxProps {
  title: string
  description: string
  imagePath: string
  options: string[]
}

export function MultiSelectCombobox({
  title,
  description,
  imagePath,
  options,
}: MultiSelectComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedItems, setSelectedItems] = React.useState<string[]>([])

  /**
   * Handles the selection of an item. If the item is already selected, removes it from the selected items array. Otherwise, adds it to the selected items array.
   * @param item The item to select or deselect.
   */
  const handleSelectItem = React.useCallback(
    (item: string) => {
      const updatedItems = selectedItems.includes(item)
        ? selectedItems.filter((selectedItem) => selectedItem !== item)
        : [...selectedItems, item]

      setSelectedItems(updatedItems)
    },
    [selectedItems, setSelectedItems]
  )

  /**
   * Handles the removal of a selected item from the `selectedItems` array.
   * @param item The item to remove.
   */
  const handleRemoveItem = React.useCallback(
    (item: string): void => {
      setSelectedItems((prevItems) => prevItems.filter((i) => i !== item))
    },
    [selectedItems, setSelectedItems]
  )

  return (
    <div className="flex gap-6 h-60">
      <Image
        src={imagePath}
        alt="image"
        width={300}
        height={200}
        className="object-cover"
      />
      <div className="flex-1">
        <div className="mb-4">
          <h1 className="md:text-3xl text-xl font-medium">{title}</h1>
          <p className="md:text-sm text-xs">{description}</p>
        </div>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild className="rounded-none rounded-t-md">
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between flex items-center"
            >
              {selectedItems.length
                ? `${selectedItems.length} item(s) selected`
                : "Select Function(s)"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[500px] ml-auto p-0">
            <Command>
              <CommandInput placeholder="Search framework..." />
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option}
                      value={option}
                      onSelect={() => {
                        handleSelectItem(option)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedItems.includes(option)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {option}
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
