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
import Modal from "../ui/modal"

type LeadPageLayoutProps = {
  leadId: string
}

const LeadPageLayout = ({ leadId }: LeadPageLayoutProps) => {
  const [activeTab, setActiveTab] = React.useState(0)
  const [leadResponse, setLeadResponse] = useState<individualLead>(
    defaultIndividualLead
  )
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
    { name: "Profile", component: <LeadProfileUpdateForm id={leadId} /> },
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
      <Modal
        open={showCallbackForm}
        title="Call back"
        setOpen={setShowCallbackForm}
      >
        {<LeadCallbackForm id={leadId} />}
      </Modal>
      <Modal
        open={showMeetingForm}
        title="Meeting"
        setOpen={setShowMeetingForm}
      >
        {<LeadMeetingForm id={leadId} />}
      </Modal>
    </>
  )
}

export default LeadPageLayout
