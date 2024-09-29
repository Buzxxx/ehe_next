import React, { useState } from "react"
import {
  vendors,
  toCamelCase,
  calculateMatchPercentage,
} from "@/components/contracts/features/contractsObject"
import { Check, X } from "lucide-react"
import CircularProgress from "@/components/ui/icons/circularProgressBar"
import ChevronDown from "@/components/ui/icons/chevronDown"

const VendorCompareTable = ({
  selectedVendors,
  selectedOptions,
}: {
  selectedVendors: string[]
  selectedOptions: Record<string, string[]>
}) => {
  const [openCategory, setOpenCategory] = useState<string | null>(null) // State to track which accordion is open

  // Fetch the details of the selected vendors
  const selectedVendorDetails = vendors.filter((vendor) =>
    selectedVendors.includes(vendor.id)
  )
  const selectedOptionKeys = Object.keys(selectedOptions)

  // Function to toggle accordion
  const toggleAccordion = (category: string) => {
    setOpenCategory((prev) => (prev === category ? null : category))
  }

  return (
    <div className="flex-col gap-4 flex py-12">
      {/* Div for headers, i.e., selected vendors */}
      <div className="flex gap-4">
        <div className="w-1/3 font-bold"></div>
        {selectedVendorDetails.map((vendor) => (
          <div key={vendor.id} className="w-1/4 font-bold text-center">
            {vendor.vendorName}
          </div>
        ))}
      </div>

      {/* div for categories and percentage match */}
      {selectedOptionKeys.map((key) => {
        const isOpen = openCategory === key // Check if this category is open

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
              <div className="w-1/3 font-medium capitalize text-sm flex gap-2 items-center ">
                <ChevronDown />
                <p>{key}</p>
              </div>

              {/* Display the match percentage for each vendor */}
              {selectedVendorDetails.map((vendor) => {
                let vendorCategoryValues = (vendor as { [key: string]: any })[
                  toCamelCase(key)
                ]
                if (!vendorCategoryValues) {
                  vendorCategoryValues = []
                }

                // Calculate the match percentage
                const matchPercentage = calculateMatchPercentage(
                  selectedOptions[key],
                  vendorCategoryValues
                )

                return (
                  <div
                    key={vendor.id}
                    className="w-1/4 text-center flex items-center justify-center"
                  >
                    <CircularProgress percentage={matchPercentage} />
                  </div>
                )
              })}
            </div>

            {/* Accordion Content: Show selected items when category is open */}
            {isOpen && (
              <div className="flex flex-col gap-2 pl-4 pt-2">
                {/* Iterate over the selected items for this category */}
                {selectedOptions[key].map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-1/3 font-light text-xs">{item}</div>
                    {/* Check for each vendor if they have this item */}
                    {selectedVendorDetails.map((vendor) => {
                      let vendorCategoryValues = (
                        vendor as { [key: string]: any }
                      )[toCamelCase(key)]
                      if (!vendorCategoryValues) {
                        vendorCategoryValues = []
                      }

                      // Check if the vendor has this specific item
                      const hasItem = vendorCategoryValues.includes(item)

                      return (
                        <div
                          key={vendor.id}
                          className="w-1/4 text-left flex items-center justify-center"
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
