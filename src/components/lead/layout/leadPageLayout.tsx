/**
 * @path src/components/lead/layout/leadPageLayout.tsx
 */

"use client"

import React, { useState } from "react"
import LeadPageHeader from "../features/leadPage/leadPageHeader"
import LeadTimeLine from "@/components/lead/features/leadPage/leadTimeline"
import { LeadProfileProvider } from "@/components/lead/context/leadProfileContext"
import LeadProfile from "../features/leadPage/leadProfile"

type LeadPageLayoutProps = {
  leadId: string
}

const LeadPageLayout = ({ leadId }: LeadPageLayoutProps) => {
  const [activeTab, setActiveTab] = React.useState(0)
  const [showCallbackForm, setShowCallbackForm] = useState(false)
  const [showMeetingForm, setShowMeetingForm] = useState(false)

  const navItems = [
    {
      name: "Timeline",
      component: (
        <LeadTimeLine
          setShowCallback={setShowCallbackForm}
          setShowMeeting={setShowMeetingForm}
          id={leadId}
        />
      ),
    },
    {
      name: "Profile",
      component: <LeadProfile />,
    },
  ]

  return (
    <LeadProfileProvider leadId={leadId}>
      <LeadPageHeader
        id={parseInt(leadId)}
        navItems={navItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <section className="  flex gap-2">
        {navItems[activeTab].component}
      </section>
    </LeadProfileProvider>
  )
}

export default LeadPageLayout
