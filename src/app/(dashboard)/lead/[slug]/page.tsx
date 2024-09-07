import { getLeadsById } from "@/components/lead/features/leadApiClient"
import React from "react"
import LeadPageLayout from "@/components/lead/layout/leadPageLayout"

const LeadPage = async ({ params }: { params: { slug: string } }) => {
  const leadDetails = await getLeadsById(params.slug)

  return (
    <>
      <LeadPageLayout leadId={params.slug} />
    </>
  )
}

export default LeadPage
