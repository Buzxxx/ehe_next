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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from "next/image"

const VendorCompareTable = ({
  selectedOptions,
  vendorComparisonData,
}: {
  selectedOptions: SelectedOptions
  vendorComparisonData: any
}) => {
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set())

  const filteredSelectedOptions = filterSelectedOptions(selectedOptions)
  const filteredSelectedOptionsKeys = Object.keys(filteredSelectedOptions)

  // Toggle accordion for categories
  const toggleAccordion = (category: string) => {
    setOpenCategories((prev) => {
      const newCategories = new Set(prev)
      if (newCategories.has(category)) {
        newCategories.delete(category)
      } else {
        newCategories.add(category)
      }
      return newCategories
    })
  }

  return (
    <Table>
      <TableHeader >
        <TableRow>
          <TableHead className="w-1/3"></TableHead>
          {vendorComparisonData.map((vendor: Vendor) => (
            <TableHead
              key={vendor.id}
              className="text-center font-bold text-xs"
              style={{ width: `${67 / vendorComparisonData.length}%` }}
            
            >
              <div className="flex flex-col gap-2 items-center justify-start">
                <Image
                  src={vendor.logo}
                  alt="vendor logo"
                  height={120}
                  width={120}
                />
                {vendor.vendorName}
              </div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {filteredSelectedOptionsKeys.map((key) => {
          const isOpen = openCategories.has(key)

          return (
            <React.Fragment key={key}>
              {/* Primary row for category name and average match percentages */}
              <TableRow
                className={`cursor-pointer ${isOpen && "border-0"}`}
                onClick={() => toggleAccordion(key)}
              >
                <TableCell className="w-1/3 p-0 pl-2">
                  <div className="flex gap-2 items-start">
                    <ChevronDown />
                    <p className="font-medium capitalize text-sm flex-1">
                      {camelCaseToLowercase(key)}
                    </p>
                  </div>
                </TableCell>

                {vendorComparisonData.map(
                  (vendor: {
                    id: React.Key | null
                    averageMatchPercentage: number
                  }) => (
                    <TableCell
                      key={vendor.id}
                      align="center"
                      className="items-center justify-center p-0 py-2"
                      style={{ width: `${67 / vendorComparisonData.length}%` }}
                    >
                      <CircularProgress
                        percentage={vendor.averageMatchPercentage}
                      />
                    </TableCell>
                  )
                )}
              </TableRow>

              {/* Secondary row for sub-items comparison (accordion content) */}
              {isOpen && (
                <TableRow className="border-b border-slate-200  w-full ml-4">
                  {/* Display the sub-items vertically for each vendor */}
                  <TableCell className="w-1/3 p-0 pl-8">
                    {filteredSelectedOptions[key].map((item: number) => (
                      <div
                        key={item}
                        className="font-light text-xs mb-2 capitalize"
                      >
                        {getDisplayName(key, item)}
                      </div>
                    ))}
                  </TableCell>

                  {vendorComparisonData.map((vendor: any) => (
                    <TableCell
                      key={vendor.id}
                      className=" justify-start items-center p-0 pt-2"
                      align="center"
                    >
                      {filteredSelectedOptions[key].map((item: number) => {
                        const vendorCategoryValues =
                          vendor.breakdown[key]?.values || {}
                        return (
                          <div key={item} className="mb-2">
                            {vendorCategoryValues[item] ? (
                              <Check color="green" size={18} />
                            ) : (
                              <X color="red" size={18} />
                            )}
                          </div>
                        )
                      })}
                    </TableCell>
                  ))}
                </TableRow>
              )}
            </React.Fragment>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default VendorCompareTable
