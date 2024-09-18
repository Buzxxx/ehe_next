import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import MultiSelectWithCheckbox from "@/components/ui/multiSelectWithCheckbox";
import {
  FilterSelect,
  get_default_filterBy_obj,
  filter_multiselect_change_controller,
  get_filter_object,
} from "../filterObject";

const FilterForm = ({ className }: { className: string }) => {
  const [selectedValues, setSelectedValues] = useState<{
    [key: string]: string[];
  }>({
    assigned_to: [],
    status: [],
  });
  const [filterSelect, setFilterSelect] = useState(FilterSelect);

  const searchParams = useSearchParams();

  useEffect(() => {
    async function fetchAndSetFilters() {
      const filterData = await get_filter_object();
      if (filterData) {
        setFilterSelect((prevFilters) => ({
          ...prevFilters,
          assigned_to: {
            ...prevFilters.assigned_to,
            options: filterData.assigned_to?.options || {},
          },
          status: {
            ...prevFilters.status,
            options: filterData.status?.options || {},
          },
        }));
      }
    }

    fetchAndSetFilters();

    const params = new URLSearchParams(window.location.search);
    setSelectedValues(get_default_filterBy_obj(params)); // Set default filter values based on URL params
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
    filter_multiselect_change_controller(params, newSelectedValues);
  };

  return (
    <div
      className={`w-3/4 md:w-1/4 ml-auto space-y-4 absolute min-h-full top-[6.5rem] right-0 border-x border-slate-300 p-4 duration-300 transition-all bg-charcoal-foregroundAccent overflow-clip ${className}`}
    >
      <div>
        <MultiSelectWithCheckbox
          label={filterSelect.assigned_to.label}
          placeholder={filterSelect.assigned_to.placeholder}
          options={filterSelect.assigned_to.options}
          selectedValues={selectedValues.assigned_to}
          onSelectionChange={(selected) =>
            handleMultiSelectChange(filterSelect.assigned_to.name, selected)
          }
        />
      </div>
      <div>
        <MultiSelectWithCheckbox
          label={filterSelect.status.label}
          placeholder={filterSelect.status.placeholder}
          options={filterSelect.status.options}
          selectedValues={selectedValues.status} // Pass selected values
          onSelectionChange={(selected) =>
            handleMultiSelectChange(filterSelect.status.name, selected)
          }
        />
      </div>
    </div>
  );
};

export default FilterForm;
