// File: components/FilterForm.tsx

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import filterCategories from "../library/filterCategories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePicker from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import { Filter } from "@/components/lead/features/filter";

// Create a single instance of the Filter class
const filter = new Filter();

const FilterForm = ({ className }: { className: string }) => {
  // State to hold selected values
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);

  // Handle select changes
  const handleSelectChange = (categoryName: string, value: string) => {
    const stringValue = value.toString(); // Ensure the value is converted to string
    setFormValues((prev) => ({
      ...prev,
      [categoryName]: stringValue,
    }));

    // Update the Filter instance based on the select change
    filter.setFilter(categoryName, stringValue);

    // Trigger URL update with the new parameters
    filter.updateUrl();
  };

  // Update the URL when date pickers are used (for custom date selection)
  useEffect(() => {
    if (formValues.date === "Custom" && fromDate && toDate) {
      // Convert dates to string format or keep any desired formatting
      filter.setFilter("from", fromDate.toISOString());
      filter.setFilter("to", toDate.toISOString());
      filter.updateUrl();
    }
  }, [fromDate, toDate, formValues.date]);

  return (
    <div
      className={`w-3/4 md:w-1/4 ml-auto space-y-4 absolute min-h-full top-[6.5rem] right-0 border-x border-slate-300 p-4 duration-300 transition-all bg-charcoal-foregroundAccent overflow-clip ${className}`}
    >
      {filterCategories.map((category) => {
        if (category.name === "date") {
          return (
            <div key={category.name}>
              <Label className="mb-4">{category.label}</Label>
              <Select
                value={formValues[category.name] || ""}
                onValueChange={(value) =>
                  handleSelectChange(category.name, value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Date">
                    {formValues[category.name] || "Select Date"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {category.options.map((option) => (
                    <SelectItem key={option} value={option.toString()}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Show date pickers if "Custom" is selected */}
              {formValues.date === "Custom" && (
                <div className="flex gap-2 mt-2 flex-col space-y-2">
                  <DatePicker
                    date={fromDate}
                    onChange={setFromDate}
                    label="From"
                  />
                  <DatePicker date={toDate} onChange={setToDate} label="To" />
                </div>
              )}
            </div>
          );
        }

        return (
          <div key={category.name} className="flex flex-col">
            <Label className="mb-4">{category.label}</Label>
            <Select
              key={category.name}
              value={formValues[category.name] || ""}
              onValueChange={(value) =>
                handleSelectChange(category.name, value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder={`Select ${category.label}`}>
                  {formValues[category.name] || `Select ${category.label}`}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {category.options.map((option) => (
                  <SelectItem key={option} value={option.toString()}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      })}
    </div>
  );
};

export default FilterForm;
