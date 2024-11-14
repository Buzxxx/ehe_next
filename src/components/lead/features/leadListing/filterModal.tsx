import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MultiSelectCombobox } from "../../ui/multiSelectCombobox"
import { cn } from "@/lib/utils"
import {
  filter_multiselect_change_controller,
  FilterSelect,
  get_default_filterBy_obj,
  get_filter_object,
} from "../filterObject"
import { useSearchParams } from "next/navigation"

type FilterSelectType = {
  assigned_to: {
    name: string
    label: string
    placeholder: string
    options: { value: string; label: string }[]
  }
  status: {
    name: string
    label: string
    placeholder: string
    options: { value: string; label: string }[]
  }
}

const FilterModal = ({ className }: { className: string }) => {
  const [selectedValues, setSelectedValues] = useState<{
    [key: string]: string[]
  }>({
    assigned_to: [],
    status: [],
  })
  const [filterSelect, setFilterSelect] =
    useState<FilterSelectType>(FilterSelect)

  const searchParams = useSearchParams()

  useEffect(() => {
    async function fetchAndSetFilters() {
      const filterData = await get_filter_object()
      if (filterData) {
        setFilterSelect((prevFilters) => ({
          ...prevFilters,
          assigned_to: {
            ...prevFilters.assigned_to,
            options: filterData.assigned_to?.options || [],
          },
          status: {
            ...prevFilters.status,
            options: filterData.status?.options || [],
          },
        }))
      }
    }

    fetchAndSetFilters()

    const params = new URLSearchParams(window.location.search)
    setSelectedValues(get_default_filterBy_obj(params)) // Set default filter values based on URL params
  }, [searchParams])

  // Handle multi-select changes
  const handleMultiSelectChange = (filterName: string, selected: string[]) => {
    const params = new URLSearchParams(window.location.search)
    const newSelectedValues = {
      ...selectedValues,
      [filterName]: selected,
    }
    setSelectedValues(newSelectedValues)
    // updates URLs according to input by user
    filter_multiselect_change_controller(params, newSelectedValues)
  }

  return (
    <aside
      className={cn(
        "absolute top-16 mt-2 p-4 overflow-y-auto min-h-fit border right-2 z-50 md:w-96 bg-white rounded-md transition-all ease-in-out duration-100 shadow-lg",
        className
      )}
    >
      <div>
        <h3 className="text-lg font-semibold flex items-center">Filter</h3>
        <Tabs
          defaultValue="assigned_to"
          className="flex items-start w-full justify-between gap-4"
        >
          <div className="w-1/3 h-full">
            <TabsList className="flex justify-start flex-col w-full h-full bg-transparent">
              <TabsTrigger
                value="assigned_to"
                className="w-full text-sm px-4 data-[state=active]:bg-sky-100/70"
              >
                Assigned To
              </TabsTrigger>
              <TabsTrigger
                value="status"
                className="w-full data-[state=active]:bg-sky-100/50"
              >
                Status
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="w-2/3">
            {/* Content on the right */}
            <TabsContent value="assigned_to">
              <h2 className="text-base font-medium mb-4">Select Assignees</h2>

              {/* Multi-Select Combobox */}
              <MultiSelectCombobox
                items={filterSelect.assigned_to.options}
                selectedValues={selectedValues.assigned_to}
                onSelectionChange={(selected) =>
                  handleMultiSelectChange("assigned_to", selected)
                }
              />

              {/* Display Selected Names */}
              <div className="mt-2 w-full">
                <h3 className="text-sm font-semibold">Selected:</h3>
                <div className="flex flex-wrap gap-2 mt-2 border min-h-20 p-2 w-full rounded-md">
                  {selectedValues.assigned_to.map((name) => (
                    <Badge key={name} className="h-fit">
                      {name}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="status">
              <h2 className="text-lg font-semibold mb-4">Status Settings</h2>
              <MultiSelectCombobox
                items={filterSelect.status.options}
                selectedValues={selectedValues.status}
                onSelectionChange={(selected) =>
                  handleMultiSelectChange("status", selected)
                }
              />

              {/* Display Selected Status */}
              <div className="mt-2 w-full">
                <h3 className="text-sm font-semibold">Selected:</h3>
                <div className="flex flex-wrap gap-2 mt-2 border min-h-20 p-2 w-full rounded-md">
                  {selectedValues.status.map((name) => (
                    <Badge key={name} className="h-fit">
                      {name}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </aside>
  )
}

export default FilterModal
