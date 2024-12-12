/**
 * @path src/app/(dashboard)/account/[entity]/[employeeId]/page.tsx
 */

import EmpolyeeProfileLayout from "@/components/account/layout/empolyeeProfileLayout"

interface EmployeePageProps {
  params: Promise<{
    employeeId: string
  }>
}

const EmployeeProfile = async ({ params }: EmployeePageProps) => {
  const resolvedParams = await params

  return <EmpolyeeProfileLayout employeeId={resolvedParams.employeeId} />
}

export default EmployeeProfile
