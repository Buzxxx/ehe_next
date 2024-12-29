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
import { Spinner } from "@/components/ui/icons";

interface MultiSelectComboboxProps {
  items: { value: string; label: string }[];
  selectedValues: string[];
  onSelectionChange: (selected: string[]) => void;
  loading?: boolean;
}

export function MultiSelectCombobox({
  items,
  selectedValues = [],
  onSelectionChange,
  loading,
}: MultiSelectComboboxProps) {
  const handleSelect = (value: string) => {
    const updatedSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value) // Remove if already selected
      : [...selectedValues, value]; // Add if not selected

    // Call the parent function with the updated selection
    onSelectionChange(updatedSelectedValues);
  };

  return (
    <Command className="border rounded-md">
      <CommandInput placeholder="Search name..." />

      <CommandList className="max-h-40 min-h-40">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Spinner></Spinner>
          </div>
        ) : items.length > 0 ? (
          <CommandGroup>
            {items.map((item) => {
              const isSelected = selectedValues.includes(item.value);

              return (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={() => handleSelect(item.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      isSelected ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              );
            })}
          </CommandGroup>
        ) : (
          <CommandEmpty>No name found.</CommandEmpty>
        )}
      </CommandList>
    </Command>
  );
}
