// "MultiSelectCombobox" component
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

export function MultiSelectCombobox({
  items,
  onSelectionChange,
}: {
  items: { value: string; label: string }[]
  onSelectionChange: (selected: string[]) => void
}) {
  const [selectedValues, setSelectedValues] = React.useState<string[]>([])

  const handleSelect = (value: string) => {
    setSelectedValues((prevSelected) => {
      const isSelected = prevSelected.includes(value)
      const newSelected = isSelected
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value]
      onSelectionChange(newSelected) // Update parent with selected values
      return newSelected
    })
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
