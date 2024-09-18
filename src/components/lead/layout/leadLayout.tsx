"use client";

import React, { useEffect, useState } from "react";
import DashboardBreadcrumb from "../../dashboard/ui/breadcrumb";
import TopBar from "../features/leadListing/topBar";
import {
  LeadsResponse,
  DefaultLeadsResponse,
} from "@/components/lead/features/leadObject";
import LeadList from "../features/leadListing/leadList";

const LeadLayout = () => {
  const [leadsResponse, setLeadsResponse] =
    useState<LeadsResponse>(DefaultLeadsResponse);

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-neutral-900 font-normal">
          Lead
          <span className="text-base ml-4 text-neutral-600">Control Panel</span>
        </h1>
        <DashboardBreadcrumb />
      </div>
      <TopBar LeadsResponse={leadsResponse} />
      <LeadList
        leadsResponse={leadsResponse}
        setLeadsResponse={setLeadsResponse}
      />
    </>
  );
};

export default LeadLayout;
