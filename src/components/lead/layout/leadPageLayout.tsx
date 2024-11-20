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
import { LeadProfileProvider } from "@/components/lead/context/leadProfileContext"

import {
  individualLead,
  defaultIndividualLead,
} from "@/components/lead/features/leadObject"
import Modal from "../ui/modal"
import LeadProfile from "../features/leadPage/leadProfile"

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
  const [isEditing, setIsEditing] = useState(false)

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
      component: <LeadProfile isEditMode={isEditing} id={leadId} />,
    },
  ]

  return (
    <LeadProfileProvider>
      <LeadPageHeader
        leadResponse={leadResponse}
        id={parseInt(leadId)}
        navItems={navItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
      <section className=" min-h-80 min-w-80 flex gap-2">
        {navItems[activeTab].component}
      </section>
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
    </LeadProfileProvider>
  )
}

export default LeadPageLayout
