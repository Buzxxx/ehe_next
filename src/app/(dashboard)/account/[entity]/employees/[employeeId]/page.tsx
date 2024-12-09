/**
 * @path src/app/(dashboard)/account/[entity]/[employeeId]/page.tsx
 */

import EmpolyeeProfileLayout from "@/components/account/layout/empolyeeProfileLayout"

const EmployeeProfile = ({ params }: { params: { employeeId: string } }) => {
  return <EmpolyeeProfileLayout employeeId={params.employeeId} />
}

export default EmployeeProfile
