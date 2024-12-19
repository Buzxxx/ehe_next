/**
 * @path src/components/CRM/workplace/layout/emploayeeProfileLayout.tsx
 */
"use client"
import UserProfileHeader from "../feature/userProfileHeader"
import EmployeeStatsOverview from "@/components/account/feature/employeeStatsOverview"
import UserProfileDetails from "../feature/userProfileDetails"
import EmployeeActivityList from "@/components/account/feature/employeeActivityList"
import { useState } from "react"
import { employeeData } from "@/components/teams/lib/employees"
import UserAliasTable from "@/components/account/feature/userAliasTable"
import ResetPasswordModal from "../feature/resetPasswordModal"

const UserProfileLayout = ({ employeeId }: { employeeId: string }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false)
  const [employee, setEmployee] = useState(
    employeeData.find((emp) => emp.id == 1)
  )

  const handleSave = () => {
    console.log("Saving employee:", employee)
    setIsEditing(false)
  }

  return (
    <div className="md:px-4 px-2 lg:px-6 md:py-6 bg-[#d1d1d1]/10 min-h-screen rounded-lg scroll-smooth">
      <UserProfileHeader
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        onSave={handleSave}
        role={employee?.role || "User"}
        setEmployee={setEmployee}
        setShowResetPasswordModal={setShowResetPasswordModal}
      />
      <EmployeeStatsOverview />

      <UserProfileDetails
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        employee={employee!}
        setEmployee={setEmployee}
      />

      <UserAliasTable />
      <EmployeeActivityList />
      <ResetPasswordModal
        open={showResetPasswordModal}
        handleOpenClose={() => setShowResetPasswordModal(false)}
      />
    </div>
  )
}
export default UserProfileLayout
