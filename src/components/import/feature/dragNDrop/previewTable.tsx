import React, { useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface PreviewTableProps {
  data: any[]
}

const PreviewTable: React.FC<PreviewTableProps> = ({ data }) => {
  const headers = data.length > 0 ? Object.keys(data[0]) : []

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  // Calculate the number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage)

  // Get the current data slice based on pagination
  const getCurrentDataSlice = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return data.slice(startIndex, endIndex)
  }

  // Calculate the current range of entries being displayed
  const startIndex = (currentPage - 1) * itemsPerPage + 1
  const endIndex = Math.min(currentPage * itemsPerPage, data.length)

  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-xl ml-4 text-neutral-900 font-medium mt-8 pb-4">
          Preview
        </p>{" "}
        <p className="text-neutral-700 text-sm font-semibold">
          Showing {startIndex}-{endIndex} of {data.length} entries
        </p>
      </div>
      <Table className=" table-auto md:shadow-md md:max-w-[96%] mx-auto  md:text-sm text-xs">
        <TableCaption>A preview of the imported leads data.</TableCaption>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index} className="w-[150px]">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {getCurrentDataSlice().map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {headers.map((header, cellIndex) => (
                <TableCell key={cellIndex}>{row[header]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </>
  )
}

export default PreviewTable
