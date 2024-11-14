import Avataar from "@/components/lead/ui/leadPage/avataar"
import { Check, DotIcon, EllipsisVertical, Trash2 } from "@/components/ui/icons"
import { TableCell, TableRow } from "@/components/ui/table"

const TaskRow = () => {
  return (
    <TableRow className="border-gray-200/75">
      <TableCell className="px-2" width={'40%'}>
        <div className="flex gap-2 items-center">
          <DotIcon color="red" size={8} />
          <p className="text-base text-gray-800 font-medium">Visit Client</p>
        </div>
      </TableCell>

      <TableCell className="text-sm text-gray-600 px-2">12 Nov</TableCell>
      <TableCell className="px-2">
        <div className="flex items-center justify-between">
          <button className="rounded-full border bg-sky-50/75 p-1 hover:*:stroke-sky-600">
            <Check size={16} />
          </button>
          <button className=" bg-red-100/50 p-1 rounded-full border hover:*:stroke-red-600">
            <Trash2 size={16} />
          </button>
          <button className="rounded-full p-1 border ">
            <EllipsisVertical size={16} />
          </button>
        </div>
      </TableCell>
    </TableRow>
  )
}

export default TaskRow
