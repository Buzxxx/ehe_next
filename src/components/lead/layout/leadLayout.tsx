"use client";

import React, { useEffect, useState } from "react";
import DashboardBreadcrumb from "../../dashboard/ui/breadcrumb";
import { useSearchParams, useRouter } from "next/navigation";
import LeadUtils from "@/components/lead/features/leadListing/LeadUtils";
import DashboardTopBar from "@/components/dashboard/ui/dashboardTopbar";
import { Spinner } from "@/components/ui/icons";
import { Filter } from "@/components/lead/features/filter";
import { getLeads, LeadCardProps, setUrl } from "@/components/lead/features/leadApiClient";
import VisitorPanelBody from "@/components/lead/ui/visitorPanel";


const LeadLayout = () => {
  const [leads, setLeads] = useState<LeadCardProps[]>([]);
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const filter = new Filter();

        // Set parameters from the current URL
        filter.setFilterParams(searchParams);

        // Generate the full URL for redirection or API call
        const fullUrl = filter.getUrlOrDefaultUrl();

        // Redirect to this URL if necessary
        router.push(fullUrl, { scroll: false });

        // Set the API URL with only the query parameters and fetch leads
        const filterQuery = filter.buildQuery();
        setUrl(filterQuery);
        const fetchedLeads = await getLeads();

        const leadsWithSelection: LeadCardProps[] = fetchedLeads.leads.map(
          (lead: LeadCardProps) => ({
            ...lead,
            isSelected: false,
          })
        );
        setLeads(leadsWithSelection);
      } catch (error) {
        console.error("Failed to fetch leads:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, [searchParams, router]);

  const selectedCount = LeadUtils.getSelectedCount(leads);
  const totalLeads = LeadUtils.getTotalLeads(leads);

  const handleToggleLeadSelection = (index: number) => {
    const updatedLeads = LeadUtils.toggleLeadSelection(leads, index);
    setLeads(updatedLeads);
    setSelectedLeads(LeadUtils.getSelectedLeads(updatedLeads));
  };

  const handleSelectAllLeads = () => {
    const updatedLeads = LeadUtils.selectAllLeads(leads);
    setLeads(updatedLeads);
    setSelectedLeads(LeadUtils.getSelectedLeads(updatedLeads));
  };

  const handleUnselectAllLeads = () => {
    const updatedLeads = LeadUtils.unselectAllLeads(leads);
    setLeads(updatedLeads);
    setSelectedLeads([]);
  };

  const handleReassign = () => {
    setModalLoading(true);
    try {
      const selectedLeadIds = selectedLeads.join(",");
      router.push(`/lead/leadReassignModal/?leads=${selectedLeadIds}`);
    } catch (error) {
      console.log(error);
    }

    setModalLoading(false);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-neutral-900 font-normal">
          Lead
          <span className="text-base ml-4 text-neutral-600">Control Panel</span>
        </h1>
        <DashboardBreadcrumb />
      </div>

      <DashboardTopBar
        onSelectAll={handleSelectAllLeads}
        onUnselectAll={handleUnselectAllLeads}
        onReassign={handleReassign}
        selectedCount={selectedCount}
        totalLeads={totalLeads}
        page={"lead"}
      />

      {modalLoading && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-95 z-50 min-h-screen"></div>
      )}

      <div className="w-full">
        {isLoading ? (
          <div className="absolute inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50 min-h-screen">
            <Spinner className="animate-spin h-10 w-10 " />
          </div>
        ) : (
          <VisitorPanelBody
            leads={leads}

            onToggleLead={handleToggleLeadSelection}
          />
        )}
      </div>
    </>
  );
};

export default LeadLayout;
