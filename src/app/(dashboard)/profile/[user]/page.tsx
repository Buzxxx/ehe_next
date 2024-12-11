/**
 * @path src/app/(dashboard)/profile/[user]/page.tsx
 */

import EmpolyeeProfileLayout from "@/components/account/layout/empolyeeProfileLayout"

interface ProfilePageProps {
  params: Promise<{
    user: string
  }>
}

const EmployeeProfile = async ({ params }: ProfilePageProps) => {
  const resolvedParams = await params

  return <EmpolyeeProfileLayout employeeId={resolvedParams.user} />
}

export default EmployeeProfile
