/**
 * @path src/app/(dashboard)/lead/[slug]/page.tsx
 */

import EntityPageLayout from "@/components/account/layout/entityPageLayout"

interface EntityPageProps {
  params: Promise<{
    entity: string
  }>
}

const LeadPage = async ({ params }: EntityPageProps) => {
  const resolvedParams = await params

  return (
    <>
      <EntityPageLayout entity={decodeURI(resolvedParams.entity)} />
    </>
  )
}

export default LeadPage
