import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

interface MultiSelectComboboxProps {
  items: { value: string; label: string }[]
  selectedValues: string[]
  onSelectionChange: (selected: string[]) => void
}

export function MultiSelectCombobox({
  items,
  selectedValues = [],
  onSelectionChange,
}: MultiSelectComboboxProps) {
  const handleSelect = (value: string) => {
    console.log(selectedValues)
    // Toggle the item in selectedValues
    const updatedSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value) // Remove if already selected
      : [...selectedValues, value] // Add if not selected

    console.log(updatedSelectedValues)

    // Call the parent function with the updated selection
    onSelectionChange(updatedSelectedValues)
  }

  return (
    <Command className="border rounded-md">
      <CommandInput placeholder="Search name..." />
      <CommandList className="max-h-40">
        <CommandEmpty>No name found.</CommandEmpty>
        <CommandGroup>
          {items.map((item) => (
            <CommandItem
              key={item.value}
              value={item.value}
              onSelect={() => handleSelect(item.value)}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  selectedValues.includes(item.value)
                    ? "opacity-100"
                    : "opacity-0"
                )}
              />
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
