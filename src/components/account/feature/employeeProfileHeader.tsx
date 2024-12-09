/**
 * @path src/components/workplace/features/employeeProfileHeader.tsx
 */

import Avataar from "@/components/lead/ui/leadPage/avataar"
import { Badge } from "@/components/ui/badge"
import { EllipsisVertical } from "@/components/ui/icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ChevronDown from "@/components/ui/icons/chevronDown"


const EmployeeProfileHeader = ({isEditing, setIsEditing}: {isEditing: boolean, setIsEditing: React.Dispatch<React.SetStateAction<boolean>>}) => {
  return (
    <div className="profile-header flex gap-4 justify-between items-center bg-white shadow-sm rounded-md p-4 mb-6">
      <div className="flex gap-4 items-center">
        <div className="border-r pr-4">
          <Avataar className="rounded-full" />
        </div>
        <div>
          <h3 className="font-bold text-2xl text-gray-800">John Doe</h3>
          <span className="text-gray-500 text-sm">Software Engineer</span>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Badge
              variant="outline"
              className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center gap-2 fouc"
            >
              Admin
              <ChevronDown />
            </Badge>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="text-sm text-gray-600">User</DropdownMenuItem>
            <DropdownMenuItem className="text-sm text-gray-600">Sub-User</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <EllipsisVertical className="text-gray-500 hover:text-gray-700 cursor-pointer" />
      </div>
    </div>
  )
}

export default EmployeeProfileHeader
