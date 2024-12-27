/**
 * @path src/components/workplace/features/employeeProfileHeader.tsx
 */

import React, { useState } from "react"
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
import { Employee } from "@/components/account/feature/employeeColumn"
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"
import EditPassword from "@/components/ui/icons/editPassword"
import DialogItem from "@/components/lead/ui/dropDownModal"
import { DialogDescription, DialogTitle } from "@/components/ui/dialog"
import ForgotPassPasswordStep from "@/components/authentication/features/forms/forgotPassPasswordStep"
import { useToast } from "@/components/ui/use-toast"

const EmployeeProfileHeader = ({
  role,
  setEmployee,
  setShowResetPasswordModal,
  showResetPasswordModal,
}: {
  role: string
  setEmployee: React.Dispatch<React.SetStateAction<Employee | undefined>>
  setShowResetPasswordModal: React.Dispatch<React.SetStateAction<boolean>>
  showResetPasswordModal: boolean
}) => {
  const router = useRouter()
  const focusRef = React.useRef<HTMLButtonElement | null>(null)
  const dropdownTriggerRef = React.useRef<HTMLButtonElement | null>(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  function handleDialogItemSelect() {
    focusRef.current = dropdownTriggerRef.current // Save the trigger element
  }

  function handleDialogItemOpenChange(open: boolean) {
    setShowResetPasswordModal(open)

    if (!open && focusRef.current) {
      focusRef.current.focus() // Restore focus to the dropdown trigger
      focusRef.current = null // Reset focusRef
    }
  }

  const handleSubmit = () => {
    toast({
      title: "Password updated successfully",
      className: "bg-green-500 text-white",
    })
    setShowResetPasswordModal(false)
  }

  return (
    <div className="profile-header flex gap-4 justify-between items-center bg-white shadow-sm rounded-md md:p-4 p-2 mb-2 mt-1 md:mt-0">
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
            <EllipsisVertical className="text-gray-500 hover:text-gray-700 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            onCloseAutoFocus={(event) => {
              if (focusRef.current) {
                focusRef.current.focus()
                focusRef.current = null
                event.preventDefault()
              }
            }}
          >
            <DialogItem
              open={showResetPasswordModal}
              className="*:border-none w-fit rounded-none"
              triggerChildren={
                <div className="text-sm text-gray-600 flex items-center ">
                  <EditPassword size={16} className="mr-1" />
                  Reset Password
                </div>
              }
              onSelect={handleDialogItemSelect}
              onOpenChange={handleDialogItemOpenChange}
            >
              {/* <DialogTitle className="DialogTitle">Update Status</DialogTitle> */}
              <DialogDescription className="DialogDescription"></DialogDescription>
              <ForgotPassPasswordStep
                onSuccess={handleSubmit}
                setLoading={setLoading}
                isLoggedIn={true}
              />
            </DialogItem>

            <DropdownMenuItem className="text-sm text-red-400">
              <UserRoundMinus size={16} className="mr-1" />
              Deactivate User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default EmployeeProfileHeader
