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
import UserProfileEditable from "../feature/userProfileEditable"
import UserWorkDetailsEditable from "../feature/userWorkDetailsEditable"

const UserProfileLayout = () => {
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false)
  const [employee, setEmployee] = useState(
    employeeData.find((emp) => emp.id == 1)
  )

  return (
    <div className=" min-h-screen rounded-lg scroll-smooth">
      <UserProfileHeader
        role={employee?.role || "User"}
        setEmployee={setEmployee}
        setShowResetPasswordModal={setShowResetPasswordModal}
        showResetPasswordModal={showResetPasswordModal}
      />
      {/* <EmployeeStatsOverview /> */}
      <div className="flex gap-2 items-stretch md:flex-row flex-col ">
        <div className="md:w-1/3">
          <UserProfileEditable employee={employee!} setEmployee={setEmployee} />
        </div>
        <div className="md:w-2/3">
          <UserWorkDetailsEditable
            employee={employee!}
            setEmployee={setEmployee}
          />
        </div>
      </div>
      {/* <UserProfileDetails
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        employee={employee!}
        setEmployee={setEmployee}
      /> */}

      <div className="flex gap-2 items-stretch md:flex-row flex-col mt-2">
        <EmployeeActivityList />
        <UserAliasTable />
      </div>
    </div>
  )
}
export default UserProfileLayout
