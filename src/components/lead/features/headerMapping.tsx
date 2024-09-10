import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select"
import { useState } from "react"
import LeadImportNavButtons, { LeadImportButtonProps } from "./importLeads/leadImportNavButtons"

interface HeaderMappingProps {
  headers: string[]
  onHeaderSelect: (mapping: { [key: string]: string }) => void
  buttons: LeadImportButtonProps[]
}

export const HeaderMapping = ({
  headers,
  onHeaderSelect,
  buttons
}: HeaderMappingProps) => {
  const [selectedMapping, setSelectedMapping] = useState<{
    [key: string]: string
  }>({})

  // Available options for mapping
  const allOptions = ["Name", "Email", "Phone", "Null"] // Adjust based on actual column names or your use case

  const handleHeaderChange = (header: string, column: string) => {
    setSelectedMapping((prev) => ({
      ...prev,
      [header]: column,
    }))
  }

  const handleSubmit = () => {
    onHeaderSelect(selectedMapping)
  }

  return (
    <>
    <LeadImportNavButtons buttons={buttons}/>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        {headers.map((header) => (
          <div key={header} className="flex items-center justify-between">
            {/* Left Column: CSV Header */}
            <span className="text-sm font-medium">{header}</span>

            {/* Right Column: Select Dropdown */}
            <Select
              onValueChange={(value) => handleHeaderChange(header, value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a column" />
              </SelectTrigger>
              <SelectContent>
                {allOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
    </>
  )
}
