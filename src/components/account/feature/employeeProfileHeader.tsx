/**
 * @path src/components/workplace/features/employeeProfileHeader.tsx
 */

import Avataar from "@/components/lead/ui/leadPage/avataar"
import { BackIcon, Edit, EllipsisVertical } from "@/components/ui/icons"
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
import React, { useCallback } from "react"
import { Employee } from "./employeeColumn"
import RoleDropdown from "../ui/roleDropDown"

const EmployeeProfileHeader = React.memo(
  ({
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
    const handleAliasClick = useCallback(() => {
      const currentUrl = window.location.href
      const newUrl = currentUrl.includes("#")
        ? currentUrl.split("#")[0]
        : currentUrl
      router.push(`${newUrl}#aliasTable`)
    }, [router])

    const handleRoleChange = useCallback((newRole: string) => {
      setEmployee((prev) => (prev ? { ...prev, role: newRole } : prev))
    }, [])

    return (
      <div className="profile-header flex gap-4 justify-between items-center bg-white shadow-sm rounded-md md:p-4 px-2 py-4 mb-6">
        <div className="flex justify-between items-center md:gap-4 gap-2">
          <div>
            <BackIcon onClick={() => router.back()} className="w-fit p-0" />
          </div>
          {/* <span className="h-10 w-px bg-gray-200"></span> */}
          <div className="flex gap-2 items-center">
            <Avataar className="rounded-full md:size-10 size-8 border" />
            <div className="flex flex-col ">
              <h3
                className="font-semibold md:text-2xl text-lg text-gray-800  max-w-40 truncate cursor-pointer "
                title="John Doe"
              >
                John Doe
              </h3>
              <span className="text-gray-500 text-sm">Software Engineer</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <RoleDropdown role={role} onRoleChange={handleRoleChange} />

          {!isEditing ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVertical
                  size={16}
                  className="text-gray-500 hover:text-gray-700 cursor-pointer"
                />
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
            <Button
              onClick={onSave}
              className="h-8 w-fit py-0 bg-sky-600 hover:bg-sky-700"
            >
              Save
            </Button>
          )}
        </div>
      </div>
    )
  }
)
EmployeeProfileHeader.displayName = "EmployeeProfileHeader"

export default EmployeeProfileHeader
