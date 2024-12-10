/**
 * @path src/components/teams/ui/userProfileModal.tsx
 */

import { Employee } from "@/components/account/feature/employeeColumn"
import Avataar from "@/components/dashboard/ui/avataar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Mail, Phone } from "lucide-react"

const UserProfileModal = ({
  children,
  employee,
}: {
  children: React.ReactNode
  employee: Employee
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="text-left">{children}</TooltipTrigger>
        <TooltipContent className="flex flex-col p-0 w-80 shadow-lg rounded-md border bg-white">
          {/* Header Section */}
          <div className="flex items-center gap-2 px-4 py-2 border-b">
            <Avataar className="w-12 h-12 rounded-full shadow" />
            <div className="flex flex-col">
              <h4 className="font-semibold text-lg">{employee.name}</h4>
              <p className="text-gray-500 text-sm">{employee.role}</p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="p-4 pt-2 border-b">
            <h6 className="font-semibold mb-2 text-sm text-gray-700">
              Contact
            </h6>
            <ul className="space-y-2">
              <li className="flex gap-3 items-center text-gray-600 text-sm">
                <Mail size={16} className="text-gray-500" />
                <span>{employee.email}</span>
              </li>
              <li className="flex gap-3 items-center text-gray-600 text-sm">
                <Phone size={16} className="text-gray-500" />
                <span>{employee.phone}</span>
              </li>
            </ul>
          </div>

          {/* Reports To Section */}
          <div className="p-4 pt-2">
            <h6 className="font-semibold mb-2 text-sm text-gray-700">
              Reports To
            </h6>
            <div className="flex gap-4 items-center">
              <Avataar className="w-10 h-10 rounded-full shadow" />
              <div className="flex flex-col">
                <h4 className="font-medium text-sm">Batman</h4>
                <p className="text-gray-500 text-xs">{employee.role}</p>
              </div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default UserProfileModal
