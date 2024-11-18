/**
 * @path src/app/(dashboard)/lead/[slug]/page.tsx
 */

import LeadPageLayout from "@/components/lead/layout/leadPageLayout"

interface LeadPageProps {
  params: Promise<{
    slug: string
  }>
}

const LeadPage = async ({ params }: LeadPageProps) => {
  const resolvedParams = await params 

  return (
    <>
      <LeadPageLayout leadId={resolvedParams.slug} />
    </>
  )
}

export default LeadPage
