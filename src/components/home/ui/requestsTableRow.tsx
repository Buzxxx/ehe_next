/**
 * @path src/components/home/ui/requestsTableRow.tsx
 */

import Avataar from "@/components/lead/ui/leadPage/avataar"
import { TableCell, TableRow } from "@/components/ui/table"

import { ArrowUp, Check } from "@/components/ui/icons"

const RequestsTableRow = () => {
  return (
    <TableRow className="border-gray-200/75">
      <TableCell width={"90%"} className="p-2">
        <h6 className=" text-base text-gray-800 font-medium">Leave Request</h6>
        <div className="flex gap-2 items-center">
          <Avataar className="size-4 border-2" />
          <p className="text-sm text-gray-500">John Doe</p>
        </div>
      </TableCell>
      <TableCell className="p-2">
        <button className="rounded-full border bg-sky-50/75 p-1 hover:*:stroke-sky-600">
          <Check size={16} />
        </button>
      </TableCell>
      <TableCell className="p-2">
        <button className="rounded-full border bg-gray-50 p-1 *:stroke-gray-500 hover:*:stroke-gray-950">
          <ArrowUp className="rotate-45" size={16} />
        </button>
      </TableCell>
    </TableRow>
  )
}

export default RequestsTableRow
