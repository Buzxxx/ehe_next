/**
 * @path src/components/workplace/features/employeeProfileHeader.tsx
 */

import Avataar from "@/components/lead/ui/leadPage/avataar"
import { Badge } from "@/components/ui/badge"
import { Edit, EllipsisVertical } from "@/components/ui/icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ChevronDown from "@/components/ui/icons/chevronDown"
import { FolderPen, UserRoundMinus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import React from "react"
import { Employee } from "./employeeColumn"

const EmployeeProfileHeader = ({
  isEditing,
  setIsEditing,
  onSave,
  role,
  setEmployee,
}: {
  isEditing: boolean
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
  onSave: () => void
  role: string 
  setEmployee: React.Dispatch<React.SetStateAction<Employee | undefined>>
}) => {
  const router = useRouter()
  const handleAliasClick = () => {
    const currentUrl = window.location.href
    // Append #aliasTable to the current URL
    const newUrl = currentUrl.includes("#")
      ? currentUrl.split("#")[0]
      : currentUrl
    router.push(`${newUrl}#aliasTable`)
  }

  const handleRoleChange = (newRole: string) => {
    setEmployee((prev) => {
      if (prev) {
        return {
          ...prev,
          role: newRole,
        }
      }
      return prev
    })
  }

  return (
    <div className="profile-header flex gap-4 justify-between items-center bg-white shadow-sm rounded-md md:p-4 px-2 mb-6">
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
              className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center gap-2"
            >
              {role}
              <ChevronDown />
            </Badge>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {["Admin", "User", "Sub-User"].map((r) => (
              <DropdownMenuItem
                key={r}
                className={`text-sm ${
                  role === r ? "text-blue-600" : "text-gray-600"
                }`}
                onClick={() => handleRoleChange(r)}
              >
                {r}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {!isEditing ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVertical className="text-gray-500 hover:text-gray-700 cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                className="text-sm text-gray-600"
                onClick={() => setIsEditing(true)}
              >
                <Edit size={16} className="mr-1" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-sm text-gray-600"
                onClick={handleAliasClick}
              >
                <FolderPen size={16} className="mr-1" />
                Alias
              </DropdownMenuItem>
              <DropdownMenuItem className="text-sm text-red-400">
                <UserRoundMinus size={16} className="mr-1" />
                Deactivate User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={onSave} className="h-8 w-fit py-0">
            Save
          </Button>
        )}
      </div>
    </div>
  )
}

export default EmployeeProfileHeader
