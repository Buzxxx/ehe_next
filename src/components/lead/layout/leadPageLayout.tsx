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
import FilterModal from "../features/leadListing/filterModal";

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
  const urlParams = {
    filter_by: { id: leadId },
  };
  useEffect(() => {
    const fetchLeads = async () => {
      try {
      } catch (error) {
        console.error("Failed to fetch leads:", error);
      }
    };

    fetchLeads();
  }, []);

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
      <section className="mt-4 md:px-8 md:w-4/5 mx-auto md:shadow-xl min-h-80 min-w-80 flex gap-2">
        <div className="md:w-3/4">{renderActiveTabContent()}</div>
        <div className="md:w-1/4 relative">
          <FilterModal className="z-20 top-24 mt-0" />
        </div>
      </section>
    </>
  );
};

export default LeadPageLayout;
