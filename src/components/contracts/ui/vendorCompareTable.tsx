import React, { useState } from "react"
import {
  SelectedOptions,
  filterSelectedOptions,
  getDisplayName,
  Vendor,
  camelCaseToLowercase,
} from "@/components/contracts/features/contractsObject"
import { Check, X } from "lucide-react"
import CircularProgress from "@/components/ui/icons/circularProgressBar"
import ChevronDown from "@/components/ui/icons/chevronDown"

const VendorCompareTable = ({
  selectedOptions,
  vendorComparisonData,
}: {
  selectedOptions: SelectedOptions
  vendorComparisonData: any
}) => {
const [openCategories, setOpenCategories] = useState<Set<string>>(new Set())  

  // Filter the selectedOptions to remove empty arrays
  const filteredSelectedOptions = filterSelectedOptions(selectedOptions)
  const filteredSelectedOptionsKeys = Object.keys(filteredSelectedOptions)

  // Function to toggle accordion
  const toggleAccordion = (category: string) => {
    setOpenCategories((prev) => {
      const newCategories = new Set(prev) // Create a copy of the current set
      if (newCategories.has(category)) {
        newCategories.delete(category) // Close the category if it's already open
      } else {
        newCategories.add(category) // Open the category if it's closed
      }
      return newCategories // Return the updated set
    })
  }

  return (
    <div className="flex-col gap-4 flex py-12">
      {/* Div for headers, i.e., selected vendors */}
      <div className="flex gap-4">
        <div className="w-1/4 font-bold"></div>
        {vendorComparisonData.map((vendor: Vendor) => (
          <div key={vendor.id} className="flex-1 font-bold text-xs text-center">
            {vendor.vendorName}
          </div>
        ))}
      </div>

      {/* div for categories and percentage match */}
      {filteredSelectedOptionsKeys.map((key) => {
        const isOpen = openCategories.has(key) // Check if this category is open

        return (
          <div
            key={key}
            className="flex flex-col hover:bg-slate-100 duration-300 transition-all"
          >
            {/* Accordion Header: Display the category name */}
            <div
              className="flex items-center gap-4 cursor-pointer"
              onClick={() => toggleAccordion(key)}
            >
              <div className="w-1/4 font-medium capitalize text-sm flex gap-2 items-center ">
                <ChevronDown />
                <p>{camelCaseToLowercase(key)}</p>
              </div>

              {/* Display the match percentage for each vendor */}
              {vendorComparisonData.map(
                (vendor: {
                  id: React.Key | null | undefined
                  averageMatchPercentage: number
                }) => {
                  return (
                    <div
                      key={vendor.id}
                      className="w-1/3 text-center flex items-center justify-center"
                    >
                      <CircularProgress
                        percentage={vendor.averageMatchPercentage}
                      />
                    </div>
                  )
                }
              )}
            </div>

            {/* Accordion Content: Show selected items when category is open */}
            {isOpen && (
              <div className="flex flex-col gap-2 pl-4 pt-2">
                {/* Iterate over the selected items for this category */}
                {filteredSelectedOptions[key].map((item: number) => (
                  <div key={item} className="flex items-center gap-4">
                    <div className={`w-1/4 font-light text-xs`}>
                      {getDisplayName(key, item)}
                    </div>
                    {vendorComparisonData.map((vendor: any) => {
                      // Access the breakdown category's values for the current item
                      const vendorCategoryValues =
                        vendor.breakdown[key]?.values || {}

                      // Check if the vendor has this specific item by accessing the object
                      const hasItem = !!vendorCategoryValues[item]
                      return (
                        <div
                          key={vendor.id}
                          className="w-1/3 justify-center text-left flex items-center "
                        >
                          {hasItem ? (
                            <Check color="green" size={18} />
                          ) : (
                            <X color="red" size={18} />
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default VendorCompareTable
