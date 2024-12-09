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
  console.log(employee)
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="text-left">{children}</TooltipTrigger>
        <TooltipContent className="flex flex-col gap-4 p-0">
          <div className="flex gap-2 items-center border px-4 py-2">
            <Avataar className="w-10 h-10 border" />
            <div className="">
              <h4 className="font-semibold text-base">{employee.name}</h4>
              <p className="text-gray-600 text-sm">{employee.role} </p>
            </div>
          </div>
          <ul className="px-4">
            <h6 className="font-semibold mb-1">Contact</h6>
            <li className="flex gap-2 items-center text-gray-600 text-sm">
              <Mail size={16} />
              {employee.email}
            </li>
            <li className="flex gap-2 items-center text-gray-600 text-sm">
              <Phone size={16} />
              {employee.phone}
            </li>
          </ul>
          <div className="px-4 pb-4">
            <h4 className="font-semibold mb-1">Reports To</h4>
            <div className="flex gap-2 items-center">
              <Avataar className="size-8 border" />
              <div className="flex flex-col">
                <h4 className="font-medium">Batman</h4>
                <p className="text-gray-600 text-sm">{employee.role} </p>
              </div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default UserProfileModal
