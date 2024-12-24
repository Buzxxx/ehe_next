import Link from "next/link"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Avataar from "@/components/dashboard/ui/avataar"

import {
  Phone,
  WhatsAppOutline,
  PersonIcon,
  CalendarIcon,
} from "@/components/ui/icons"

import { formatDate } from "@/utility/formatDate"
import { Badge } from "@/components/ui/badge"
import { Employee } from "../feature/employeeColumn"
import React from "react"

type EmployeeCardProps = {
  location: string
  employee: Employee
  onResetPassword: () => void
  onDeactivateUser: () => void
}

export const EmployeeCard = React.memo(
  ({
    employee,
    onResetPassword,
    onDeactivateUser,
    location,
  }: EmployeeCardProps) => {
    return (
      <Card className="bg-white shadow-sm drop-shadow-sm border border-slate-200 text-gray-800 rounded-lg transition hover:shadow-xl md:w-[49%] lg:w-[32.85%] w-full flex flex-col">
        <CardHeader className="flex flex-row items-start justify-between p-4 gap-3 space-y-0">
          <div className="flex gap-2 items-center rounded-sm border p-1 ">
            <span className="text-xs font-medium opac">
              {employee.role ?? "User"}
            </span>
          </div>

          <Badge className="bg-slate-300/75 text-slate-800 hover:bg-slate-400/50 font-medium capitalize">
            {employee.status ?? "Unknown"}
          </Badge>
        </CardHeader>

        <CardContent className="pb-6 px-4 text-sm flex-1 md:pb-2">
          <CardTitle className="text-indigo-950/80 mb-1 font-normal text-sm"></CardTitle>
          <Link
            href={`/account/${employee.teamId}/${location}/employees/${employee.id}`}
            className="flex items-center gap-1"
          >
            <PersonIcon size={20} color="transparent" stroke="gray" />
            <Badge className="bg-indigo-300/25 text-slate-700 justify-between pr-6 pl-2 items-center hover:bg-slate-400/50 gap-1">
              <Avataar className="h-4 w-4 rounded-full border border-slate-400" />
              <p className="text-sm">{employee.name ?? "Unknown Name"}</p>
            </Badge>
          </Link>
          <div className="flex gap-2 items-center mt-2 text-xs">
            <button
              onClick={onResetPassword}
              className="text-blue-600 underline"
            >
              Reset Password
            </button>
            <button
              onClick={onDeactivateUser}
              className="text-red-600 underline"
            >
              Deactivate User
            </button>
          </div>
        </CardContent>

        <CardFooter className="p-4 py-2 flex gap-2 justify-between border-t border-slate-200">
          <div className="flex gap-2 justify-start items-center">
            <Button
              variant="ghost"
              className="p-0 text-green-600 hover:fill-green-500/30 rounded-full h-fit"
            >
              <Link
                href={`https://wa.me/${employee.phone}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppOutline size={16} />
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="p-0 text-blue-600 hover:fill-blue-500/30 rounded-full h-fit w-fit"
            >
              <Link
                href={`tel:${employee.phone}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone size={16} />
              </Link>
            </Button>
          </div>
          <div className="flex gap-2 items-center justify-end text-xs text-gray-500">
            {employee.date_joined && (
              <>
                <CalendarIcon size={16} />
                {formatDate(employee.date_joined, { onlyDate: true })}
              </>
            )}
          </div>
        </CardFooter>
      </Card>
    )
  }
)

// Add display name for debugging
EmployeeCard.displayName = "EmployeeCard"
