import { MoreHorizontal } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { Edit, GreenDot, Plus, DotIcon } from "@/components/ui/icons"

type ActionCellProps = {
  workerStatus: string
  userId: number
}

// New component to handle the actions cell
const ActionCell = ({ workerStatus, userId }: ActionCellProps) => {
  return (
    // Render this content for mobile screens
    <DropdownMenu> 
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-28 text-">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          className="flex gap-2 cursor-pointer"
          onClick={() => console.log(userId)}
        >
          <Edit size={16} color="grey" /> Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex gap-2 cursor-pointer">
          {workerStatus === "active" ? (
            <>
              <DotIcon color="red" size={8} /> Deactivate
            </>
          ) : (
            <>
              <DotIcon color="green" size={8} /> Activate
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex gap-2 cursor-pointer">
          <Plus size={14} /> Alias
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ActionCell
