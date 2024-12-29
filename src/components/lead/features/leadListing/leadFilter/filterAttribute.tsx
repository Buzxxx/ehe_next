import React, { useState, useEffect, useMemo } from "react";
import { MultiSelectCombobox } from "@/components/lead/ui/multiSelectCombobox";
import { Badge } from "@/components/ui/badge";
import { filter_multiselect_change_controller } from "@/components/lead/features/filterObject";

// Define types
interface FilterAttributesProps {
  label: string;
  fetchData: () => Promise<any[]>; // Fetch function passed from parent
  filterKey: string; // Key for indexing filterBy
  filterBy: Record<string, any>; // Object with string keys and any type of values
  itemLabelField?: string; // Optional label field
  itemValueField?: string; // Optional value field
  badgeClassName?: string; // Optional badge className
}

const FilterAttributes: React.FC<FilterAttributesProps> = ({
  label,
  fetchData,
  filterKey,
  filterBy,
  itemLabelField = "label",
  itemValueField = "value",
  badgeClassName = "h-fit bg-sky-600/50 hover:bg-sky-600",
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Memoize items so they are only fetched once
  const [items, setItems] = useState<any[]>([]);
  const memoizedItems = useMemo(() => items, [items]);

  useEffect(() => {
    // Ensure selectedValues is always an array
    setSelectedValues(
      Array.isArray(filterBy[filterKey]) ? filterBy[filterKey] : []
    );
  }, [filterBy, filterKey]);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const itemsListResponse = await fetchData();
        if (itemsListResponse) {
          setItems(itemsListResponse);
        }
      } catch (err) {
        setError("Error fetching data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (memoizedItems.length === 0) {
      getData();
    }
  }, [fetchData, items.length]);

  // Handle change in selected values
  const handleMultiSelectChange = (
    filterBy: Record<string, any>,
    filterName: string,
    selected: string[]
  ) => {
    const params = new URLSearchParams(window.location.search);
    const merged = {
      ...filterBy,
      ...{ [filterName]: selected },
    };
    setSelectedValues(selected);
    filter_multiselect_change_controller(params, merged);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2 className="text-base font-medium mb-1">{label}</h2>
      <MultiSelectCombobox
        loading={loading}
        items={memoizedItems.map((item) => ({
          value: item[itemValueField],
          label: item[itemLabelField],
        }))}
        selectedValues={selectedValues} // Pass an array of strings
        onSelectionChange={(selected) =>
          handleMultiSelectChange(filterBy, filterKey, selected)
        }
      />
      <div className="mt-2 w-full">
        <h3 className="text-sm font-semibold">Selected:</h3>
        <div className="flex flex-wrap gap-2 mt-2 border min-h-20 p-2 w-full rounded-md">
          {selectedValues.length > 0 &&
            selectedValues.map((value) => (
              <Badge key={value} className={badgeClassName}>
                {
                  memoizedItems.find(
                    (item) => item[itemValueField] === value
                  )?.[itemLabelField]
                }
              </Badge>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FilterAttributes;
