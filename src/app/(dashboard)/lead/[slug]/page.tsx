import LeadHeader from "@/components/lead/ui/leadHeader"
import React from "react"

const LeadPage = ({ params }: { params: { slug: string } }) => {
  return (
    <>
      <LeadHeader id={params.slug} />
    </>
  )
}

export default LeadPage
