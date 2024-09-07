import LeadHeader from "@/components/lead/ui/leadHeader"
import { getLeadsById } from "@/components/lead/feature/leadApiClient"
import React from "react"


const LeadPage = async ({ params }: { params: { slug: string } }) => {
  
  const leadDetails = await getLeadsById(params.slug)
  
  return (
    <>
      <LeadHeader id={params.slug} />
    </>
  )
}

export default LeadPage
