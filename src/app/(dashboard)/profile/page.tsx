/**
 * @path src/app/(dashboard)/profile/[user]/page.tsx
 */

import UserProfileLayout from "@/components/profile/layout/userProfileLayout"

interface ProfilePageProps {
  params: Promise<{
    user: string
  }>
}

const EmployeeProfile = async ({ params }: ProfilePageProps) => {
  const resolvedParams = await params

  return <UserProfileLayout employeeId={resolvedParams.user} />
}

export default EmployeeProfile
