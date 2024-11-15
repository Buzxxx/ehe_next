/**
 * @path src/components/CRM/workplace/layout/emploayeeProfileLayout.tsx
 */

import EmployeeProfileHeader from "../feature/employeeProfileHeader"
import EmployeeStatsOverview from "../feature/employeeStatsOverview"
import EmployeeDetails from "../feature/employeeDetails"
import EmployeeActivityList from "../feature/employeeActivityList"

const EmpolyeeProfileLayout = () => {
  return (
    <div className="px-4 lg:px-6 py-6 bg-[#d1d1d1]/10 min-h-screen rounded-lg">
      <EmployeeProfileHeader />
      <EmployeeStatsOverview />
      <EmployeeDetails />
      <EmployeeActivityList />
    </div>
  )
}
export default EmpolyeeProfileLayout
