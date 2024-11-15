"use client";
import LeadPageHeader from "../features/leadPage/leadPageHeader";
import React, { useState, useEffect } from "react";
import LeadTimeLine from "@/components/lead/features/leadPage/leadTimeline";
import LeadProfileUpdateForm from "@/components/lead/features/leadPage/leadProfileUpdateForm";
import LeadCallbackForm from "@/components/lead/features/leadPage/leadCallbackForm";
import LeadMeetingForm from "@/components/lead/features/leadPage/leadMeetingForm";
import {
  individualLead,
  defaultIndividualLead,
} from "@/components/lead/features/leadObject";

type LeadPageLayoutProps = {
  leadId: string;
};

const NAVITEMS = ["Timeline", "Profile", "Call back", "Meeting"];

const LeadPageLayout = ({ leadId }: LeadPageLayoutProps) => {
  const [activeTab, setActiveTab] = useState(NAVITEMS[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [leadResponse, setLeadResponse] = useState<individualLead>(
    defaultIndividualLead
  );
  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "Timeline":
        return <LeadTimeLine id={leadId} />;
      case "Profile":
        return <LeadProfileUpdateForm id={leadId} />;
      case "Call back":
        return <LeadCallbackForm id={leadId} />;
      case "Meeting":
        return <LeadMeetingForm id={leadId} />;
      default:
        return null;
    }
  };
  return (
    <>
      <LeadPageHeader
        id={leadId}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        leadResponse={leadResponse}
        setLeadResponse={setLeadResponse}
      />
      <section className="mt-4 md:px-8 md:w-4/5 mx-auto md:shadow-xl min-h-80 min-w-80">
        {renderActiveTabContent()}
      </section>
    </>
  );
};

export default LeadPageLayout;
