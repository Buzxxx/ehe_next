import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import MultiSelectWithCheckbox from "@/components/ui/multiSelectWithCheckbox";
import {
  FilterSelect,
  get_default_filterBy_obj,
  filterBy_controller,
} from "../filterObject";

const FilterForm = ({ className }: { className: string }) => {
  const [selectedValues, setSelectedValues] = useState<{
    [key: string]: string[];
  }>({
    assigned_to: [],
    status: [],
  });

  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSelectedValues(get_default_filterBy_obj(params));
  }, [searchParams]);

  // Handle multi-select changes
  const handleMultiSelectChange = (filterName: string, selected: string[]) => {
    const params = new URLSearchParams(window.location.search);
    const newSelectedValues = {
      ...selectedValues,
      [filterName]: selected,
    };
    setSelectedValues(newSelectedValues);
    // updates URLs according to input by user
    filterBy_controller(params, newSelectedValues);
  };

  return (
    <div
      className={`w-3/4 md:w-1/4 ml-auto space-y-4 absolute min-h-full top-[6.5rem] right-0 border-x border-slate-300 p-4 duration-300 transition-all bg-charcoal-foregroundAccent overflow-clip ${className}`}
    >
      <div>
        <MultiSelectWithCheckbox
          label={FilterSelect.assigned_to.label}
          placeholder={FilterSelect.assigned_to.placeholder}
          options={FilterSelect.assigned_to.options}
          selectedValues={selectedValues.assigned_to}
          onSelectionChange={(selected) =>
            handleMultiSelectChange(FilterSelect.assigned_to.name, selected)
          }
        />
      </div>
      <div>
        <MultiSelectWithCheckbox
          label={FilterSelect.status.label}
          placeholder={FilterSelect.status.placeholder}
          options={FilterSelect.status.options}
          selectedValues={selectedValues.status} // Pass selected values
          onSelectionChange={(selected) =>
            handleMultiSelectChange(FilterSelect.status.name, selected)
          }
        />
      </div>
    </div>
  );
};

export default FilterForm;
