"use client"
import LeadPageHeader from "../features/leadPage/leadPageHeader"
import React, { useState, useEffect } from "react"
import LeadTimeLine from "@/components/lead/features/leadPage/leadTimeline"
import LeadProfileUpdateForm from "@/components/lead/features/leadPage/leadProfileUpdateForm"
import LeadCallbackForm from "@/components/lead/features/leadPage/leadCallbackForm"
import LeadMeetingForm from "@/components/lead/features/leadPage/leadMeetingForm"
import {
  individualLead,
  defaultIndividualLead,
} from "@/components/lead/features/leadObject"
import { Button } from "@/components/ui/button"

type LeadPageLayoutProps = {
  leadId: string
}

const NAVITEMS = ["Timeline", "Profile", "Call back", "Meeting"]

const LeadPageLayout = ({ leadId }: LeadPageLayoutProps) => {
  const [activeTab, setActiveTab] = useState(NAVITEMS[0])
  const [isLoading, setIsLoading] = useState(true)
  const [leadResponse, setLeadResponse] = useState<individualLead>(
    defaultIndividualLead
  )

  const navItems = ["Timeline", "Profile", "Call back", "Meeting"]

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "Timeline":
        return <LeadTimeLine id={leadId} />
      case "Profile":
        return <LeadProfileUpdateForm id={leadId} />
      case "Call back":
        return <LeadCallbackForm id={leadId} />
      case "Meeting":
        return <LeadMeetingForm id={leadId} />
      default:
        return null
    }
  }
  return (
    <>
      <LeadPageHeader leadResponse={leadResponse} id={parseInt(leadId)} />

      <nav className="py-2 md:px-4 mt-4 flex items-center justify-start gap-4 bg-white w-full max-md:pl-4">
        {navItems.map((item) => (
          <Button
            key={item}
            className={`text-xs px-2 h-8 hover:text-sky-600 hover:bg-sky-600  ${
              activeTab === item
                ? "bg-sky-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setActiveTab(item)}
          >
            {item}
          </Button>
        ))}
      </nav>
      <section className="mt-4 min-h-80 min-w-80 flex gap-2">
        <div className="">{renderActiveTabContent()}</div>
      </section>
    </>
  )
}

export default LeadPageLayout
