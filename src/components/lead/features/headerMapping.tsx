import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select"
import { MoveLeft, MoveRight } from "@/components/ui/icons"
import { useState } from "react"

interface HeaderMappingProps {
  headers: string[]
  data: any[]
  onHeaderSelect: (mapping: { [key: string]: string }) => void
  handlePrevStep: () => void
}

export const HeaderMapping = ({
  headers,
  data,
  onHeaderSelect,
  handlePrevStep,
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
      <div className="flex gap-2 justify-between items-center">
        <Button
          onClick={handlePrevStep}
          className="mt-4 text-slate-800 bg-transparent border border-slate-600 hover:border-slate-900 hover:text-slate-900"
        >
          <MoveLeft className="mr-2" />
          Prev Step
        </Button>
        <Button
          onClick={handleSubmit}
          className="mt-4 px-4 py-2 bg-dashboard-primary hover:bg-dashboard-secondary text-white rounded"
        >
          Submit Mapping
          <MoveRight className="ml-2" />
        </Button>
      </div>

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

      {/* <Table className="w-full table-auto border-collapse mt-6">
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header} className="border p-2">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.slice(0, 20).map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {headers.map((header) => (
                <TableCell key={header} className="border p-2">
                  {row[header]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table> */}
    </>
  )
}
