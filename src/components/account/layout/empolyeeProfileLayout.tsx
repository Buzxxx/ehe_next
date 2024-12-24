/**
 * @path src/components/CRM/workplace/layout/emploayeeProfileLayout.tsx
 */

"use client"

import EmployeeProfileHeader from "../feature/employeeProfileHeader"
import EmployeeStatsOverview from "../feature/employeeStatsOverview"
import EmployeeDetails from "../feature/employeeDetails"
import { useMemo, useState } from "react"
import { employeeData } from "@/components/teams/lib/employees"
import dynamic from "next/dynamic"

const EmployeeActivityList = dynamic(
  () => import("../feature/employeeActivityList")
)

const UserAliasTable = dynamic(() => import("../feature/userAliasTable"))

const EmpolyeeProfileLayout = ({ employeeId }: { employeeId: string }) => {
  const [isEditing, setIsEditing] = useState(false)
  const currentEmployee = useMemo(
    () => employeeData.find((emp) => emp.id === parseInt(employeeId)),
    [employeeId]
  )

  const [employee, setEmployee] = useState(currentEmployee)

  return (
    <div className="p-2 lg:px-6 md:py-6 bg-[#d1d1d1]/10 min-h-screen rounded-lg">
      <EmployeeProfileHeader
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        onSave={() => setIsEditing(false)}
        role={employee?.role || "User"}
        setEmployee={setEmployee}
      />
      <EmployeeStatsOverview />

      {employee && (
        <EmployeeDetails
          isEditing={isEditing}
          employee={employee}
          setEmployee={setEmployee}
        />
      )}
      <UserAliasTable />
      <EmployeeActivityList />
    </div>
  )
}
export default EmpolyeeProfileLayout
