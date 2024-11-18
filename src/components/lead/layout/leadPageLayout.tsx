/**
 * @path src/components/lead/layout/leadPageLayout.tsx
 */

"use client"

import React, { useState } from "react"
import LeadPageHeader from "../features/leadPage/leadPageHeader"
import LeadTimeLine from "@/components/lead/features/leadPage/leadTimeline"
import LeadProfileUpdateForm from "@/components/lead/features/leadPage/leadProfileUpdateForm"
import LeadCallbackForm from "@/components/lead/features/leadPage/leadCallbackForm"
import LeadMeetingForm from "@/components/lead/features/leadPage/leadMeetingForm"

import {
  individualLead,
  defaultIndividualLead,
} from "@/components/lead/features/leadObject"
import LeadBody from "../features/leadPage/leadBody"
import { set } from "date-fns"

type LeadPageLayoutProps = {
  leadId: string
}

const LeadPageLayout = ({ leadId }: LeadPageLayoutProps) => {
  const [activeTab, setActiveTab] = React.useState(0)
  const [leadResponse, setLeadResponse] = useState<individualLead>(
    defaultIndividualLead
  )

  const navItems = [
    { name: "Timeline", component: <LeadTimeLine id={leadId} /> },
    { name: "Profile", component: <LeadProfileUpdateForm id={leadId} /> },
    { name: "Call back", component: <LeadCallbackForm id={leadId} /> },
    { name: "Meeting", component: <LeadMeetingForm id={leadId} /> },
  ]

  return (
    <>
      <LeadPageHeader
        leadResponse={leadResponse}
        id={parseInt(leadId)}
        navItems={navItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <LeadBody leadId={leadId} navItems={navItems} activeTab={activeTab} />
    </>
  )
}

export default LeadPageLayout
