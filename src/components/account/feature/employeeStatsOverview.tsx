// src/components/workplace/features/employeeStatsOverview.tsx

import { Button } from "@/components/ui/button"
import ChevronDown from "@/components/ui/icons/chevronDown"
import EmployeeStatCard from "../ui/employeeStatCard"

const EmployeeStatsOverview = () => {
  return (
    <>
      <div className="flex justify-between items-center mt-4 mb-2">
        <div>
          <h4 className="text-lg font-semibold text-gray-800">Overview</h4>
          <p className="text-gray-500">Joined: 12 August 2024</p>
        </div>
      
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 mt-4">
        <EmployeeStatCard title="Attendance" value="16/28" />
        <EmployeeStatCard title="Working Hours" value="2.43" />
        <EmployeeStatCard title="Earnings" value="711" />
        <EmployeeStatCard title="Awards" value="18" />
      </div>
    </>
  )
}

export default EmployeeStatsOverview
