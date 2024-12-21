/**
 * @path src/components/account/feature/employeeDetails.tsx
 */

import EmployeeDetail from "../ui/employeeDetail"
import { Copy } from "@/components/ui/icons"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Employee } from "./employeeColumn"
import React, { SetStateAction } from "react"

const EmployeeDetails = ({
  isEditing,
  employee,
  setEmployee,
}: {
  isEditing: boolean
  employee: Employee
  setEmployee: React.Dispatch<SetStateAction<Employee | undefined>>
}) => {
  return (
    <Card className="p-4 rounded-md border mt-4 bg-white shadow-sm">
      <CardHeader className="py-2 border-b flex-row justify-between">
        <div className="flex gap-2 items-center">
          <h4 className="text-xl font-medium">Employee Details</h4>
          <Badge
            variant="secondary"
            className="text-xs bg-green-600 font-normal text-gray-100"
          >
            Active
          </Badge>
        </div>
        <h6 className="font-semibold">
          EMP <span className="text-sky-600 ">020040</span>{" "}
          <button className="ml-2">
            <Copy color="gray" size={16} />
          </button>
        </h6>
      </CardHeader>
      <CardContent className="p-0 md:px-4 md:flex-row flex-col mt-4 flex gap-4 justify-between items-start">
        {/* Work Details */}
        <div className="p-4 border bg-gray-50 rounded-md shadow-sm flex-1 w-full">
          <div className="pb-2 border-b mb-4">
            <h6 className="font-medium text-gray-700">Work Details</h6>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <EmployeeDetail
              employee={employee}
              setEmployee={setEmployee}
              isEditable={true}
              isEditing={isEditing}
              title="Manager"
              value="EHE Industries"
              span={2}
            />
            <EmployeeDetail
              employee={employee}
              setEmployee={setEmployee}
              isEditable={true}
              isEditing={isEditing}
              title="Department"
              value="Software"
            />

            <EmployeeDetail
              employee={employee}
              setEmployee={setEmployee}
              isEditable={true}
              isEditing={isEditing}
              title="Date Joined"
              value="12 August 2024"
              type="date"
            />
            <EmployeeDetail
              employee={employee}
              setEmployee={setEmployee}
              isEditable={true}
              isEditing={isEditing}
              span={2}
              title="Location"
              value="India"
            />
          </div>
        </div>

        {/* Personal Details */}
        <div className="p-4 border bg-gray-50 rounded-md shadow-sm flex-1 w-full">
          <div className="pb-2 border-b mb-4">
            <h6 className="font-medium text-gray-700">Personal Details</h6>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <EmployeeDetail
              employee={employee}
              setEmployee={setEmployee}
              isEditable={true}
              isEditing={isEditing}
              title="Name"
              value={"John Doe"}
              span={2}
            />
            <EmployeeDetail
              employee={employee}
              setEmployee={setEmployee}
              isEditable={true}
              isEditing={isEditing}
              title="Phone Number"
              value="+91 9012344567"
            />

            <EmployeeDetail
              employee={employee}
              setEmployee={setEmployee}
              isEditable={true}
              isEditing={isEditing}
              title="Email"
              value="example@ehe.com"
            />
            <EmployeeDetail
              employee={employee}
              setEmployee={setEmployee}
              isEditable={true}
              isEditing={isEditing}
              span={2}
              title="Address"
              value="004 Gurugram, Haryana, India"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default React.memo(EmployeeDetails)