/**
 * @path src/components/CRM/workplace/layout/emploayeeProfileLayout.tsx
 */
"use client"
import EmployeeProfileHeader from "../feature/employeeProfileHeader"
import EmployeeStatsOverview from "../feature/employeeStatsOverview"
import EmployeeDetails from "../feature/employeeDetails"
import EmployeeActivityList from "../feature/employeeActivityList"
import { useState } from "react"
import { employeeData } from "@/components/teams/lib/employees"

const EmpolyeeProfileLayout = ({ employeeId }: { employeeId: string }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [employee, setEmployee] = useState(
    employeeData.find((emp) => emp.id === parseInt(employeeId))
  )

  const handleSave = () => {
    console.log("Saving employee:", employee)
    setIsEditing(false)
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
    <div className="px-4 lg:px-6 py-6 bg-[#d1d1d1]/10 min-h-screen rounded-lg">
      <EmployeeProfileHeader
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        onSave={handleSave}
        role={employee?.role || "User"} // Pass current role
        onRoleChange={handleRoleChange}
      />
      <EmployeeStatsOverview />

      {employee && (
        <EmployeeDetails
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          employee={employee}
          setEmployee={setEmployee}
        />
      )}
      <EmployeeActivityList />
    </div>
  )
}
export default EmpolyeeProfileLayout
