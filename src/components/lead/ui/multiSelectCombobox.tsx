import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/tailwindClassnameMergeLib";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface MultiSelectComboboxProps {
  items: { value: string; label: string }[];
  selectedValues: number[];
  onSelectionChange: (selected: number[]) => void;
}

export function MultiSelectCombobox({
  items,
  selectedValues = [],
  onSelectionChange,
}: MultiSelectComboboxProps) {
  const handleSelect = (value: string) => {
    const updatedSelectedValues = selectedValues.includes(parseInt(value))
      ? selectedValues.filter((v) => v !== parseInt(value)) // Remove if already selected
      : [...selectedValues, parseInt(value)]; // Add if not selected

    // Call the parent function with the updated selection
    onSelectionChange(updatedSelectedValues);
  };

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
                  selectedValues.includes(parseInt(item.value))
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
  );
}
