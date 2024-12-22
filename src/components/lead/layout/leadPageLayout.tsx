"use client";

import React, { useState } from "react";
import LeadPageHeader from "../features/leadPage/header/leadPageHeader";
import { LeadProfileProvider } from "@/components/lead/features/leadPage/context/leadProfileContext";
import LeadProfile from "../features/leadPage/profile/leadProfile";
import LeadTimeLine from "@/components/lead/features/leadPage/timeline/leadTimeline";

const LeadPageLayout = ({ leadId }: { leadId: string }) => {
  const [activeTab, setActiveTab] = React.useState(0);

  const navItems = [
    {
      name: "Timeline",
      component: <LeadTimeLine />,
    },
    {
      name: "Profile",
      component: <LeadProfile />,
    },
  ];

  return (
    <LeadProfileProvider leadId={leadId}>
      <div className="flex h-screen flex-col">
        <LeadPageHeader
          id={parseInt(leadId)}
          navItems={navItems}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {navItems[activeTab].component}
      </div>
    </LeadProfileProvider>
  );
};

export default LeadPageLayout;
